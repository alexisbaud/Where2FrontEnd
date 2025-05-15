import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Activity } from '../../navigation/types';
import Header from '../../components/Header';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

// Commenter ou supprimer l'import de mapPlaceholder car il n'est plus utilisé et le fichier n'existe pas
// const mapPlaceholder = require('../../assets/map_placeholder.png'); 
const placeholderImage = require('../../assets/activity_placeholder.png');

// Icônes de transport
const walkIcon = require('../../assets/walk_icon.png');
const transitIcon = require('../../assets/transit_icon.png');

type ActivityDetailScreenRouteProp = RouteProp<RootStackParamList, 'ActivityDetail'>;
type ActivityDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ActivityDetail'>;

const { width: screenWidth } = Dimensions.get('window');
const imageHorizontalMargin = spacing.md; // 16px
const calculatedImageWidth = screenWidth - (2 * imageHorizontalMargin);
const calculatedImageHeight = (calculatedImageWidth / 343) * 260;

interface NavApp {
  name: string;
  scheme: string;
  urlBuilder: (lat: number, lng: number, name: string) => string;
  webFallbackUrlBuilder?: (lat: number, lng: number, name: string) => string;
}

const ActivityDetailScreen: React.FC = () => {
  const route = useRoute<ActivityDetailScreenRouteProp>();
  const navigation = useNavigation<ActivityDetailScreenNavigationProp>();
  const { activity } = route.params;
  const [imageLoadingError, setImageLoadingError] = useState(false);

  // Convertir le temps de trajet de secondes en minutes
  const travelTimeInMinutes = Math.round(activity.estimated_travel_time / 60);

  // Réinitialiser l'erreur de chargement lorsque l'écran devient focus
  useFocusEffect(
    useCallback(() => {
      console.log('[ActivityDetailScreen] Screen focused, resetting imageLoadingError. Activity ID:', activity.id);
      setImageLoadingError(false);
      return () => {
        // Optionnel: actions de nettoyage si l'écran perd le focus et que le composant n'est pas démonté
        console.log('[ActivityDetailScreen] Screen lost focus. Activity ID:', activity.id);
      };
    }, [activity.id]) // S'assurer de recréer la callback si l'id de l'activité change, pour avoir le bon id dans les logs
  );

  console.log('[ActivityDetailScreen] Rendering. imageLoadingError:', imageLoadingError, 'activity.image_url:', activity.image_url);
  console.log('[ActivityDetailScreen] Calculated image dimensions WxH:', calculatedImageWidth, calculatedImageHeight);

  const formatPrice = (price: number, isFree: boolean) => {
    if (isFree || price === 0) return 'Gratuit';
    return `${price}€`;
  };

  const getTransportIcon = (travelType: number) => {
    switch(travelType) {
      case 1: // Marche
        return walkIcon;
      case 2: // Vélo (utilise transit pour l'instant)
      case 3: // Transport en commun
        return transitIcon;
      // case 4: // Voiture - future icône?
      default:
        return walkIcon;
    }
  };

  const handleOpenExternalUrl = () => {
    if (activity.external_url) {
      Linking.openURL(activity.external_url).catch(err => 
        console.error("Couldn't load page", err)
      );
    }
  };

  const handleMainImageError = () => {
    console.log('[ActivityDetailScreen] handleMainImageError called. Setting imageLoadingError to true.'); // Log dans handleMainImageError
    
    // Vérifier si l'URL est de Google Maps
    const isGoogleMapsUrl = activity.image_url?.includes('maps.googleapis.com');
    if (isGoogleMapsUrl) {
      console.log('[ActivityDetailScreen] Google Maps URL detected, ignoring error');
      // Ne pas marquer comme erreur pour les URLs Google Maps
      return;
    }
    
    setImageLoadingError(true);
  };

  const handleGoToActivity = async () => {
    console.log('[handleGoToActivity] Function called'); // Log de débogage initial
    try {
      if (!activity.location || typeof activity.location.lat !== 'number' || typeof activity.location.lng !== 'number') {
        console.warn('[handleGoToActivity] Location data is missing or invalid.');
        Alert.alert('Erreur de localisation', 'Les informations de localisation pour cette activité sont manquantes ou incorrectes.');
        return;
      }
      console.log('[handleGoToActivity] Location data validated.', activity.location);

      const { lat, lng, name } = activity.location;
      const encodedName = encodeURIComponent(name);

      const navApps: NavApp[] = [
        { name: 'Apple Plans', scheme: Platform.OS === 'ios' ? 'maps://' : 'https://maps.apple.com/?', urlBuilder: (lat: number, lng: number, name: string) => Platform.OS === 'ios' ? `maps://app?daddr=${lat},${lng}&q=${name}` : `https://maps.apple.com/?daddr=${lat},${lng}&q=${name}` },
        { name: 'Google Maps', scheme: 'comgooglemaps://', urlBuilder: (lat: number, lng: number, name: string) => `comgooglemaps://?daddr=${lat},${lng}&q=${name}`, webFallbackUrlBuilder: (lat: number, lng: number, name: string) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` },
        { name: 'Citymapper', scheme: 'citymapper://', urlBuilder: (lat: number, lng: number, name: string) => `citymapper://directions?endcoord=${lat},${lng}&endname=${name}` },
        { name: 'Waze', scheme: 'waze://', urlBuilder: (lat: number, lng: number, name: string) => `waze://?ll=${lat},${lng}&navigate=yes&q=${name}` },
      ];
      console.log('[handleGoToActivity] navApps defined:', navApps);

      const availableApps: NavApp[] = [];
      console.log('[handleGoToActivity] Checking available apps...');
      for (const app of navApps) {
        console.log(`[handleGoToActivity] Checking app: ${app.name} with scheme: ${app.scheme}`);
        try {
          if (app.name === 'Apple Plans' && Platform.OS === 'ios') { // Apple Plans sur iOS est toujours considéré comme "disponible" via maps://
            availableApps.push(app);
            console.log(`[handleGoToActivity] ${app.name} added (iOS default).`);
          } else {
            const canOpen = await Linking.canOpenURL(app.scheme);
            console.log(`[handleGoToActivity] canOpenURL for ${app.name}: ${canOpen}`);
            if (canOpen) {
              availableApps.push(app);
              console.log(`[handleGoToActivity] ${app.name} added.`);
            }
          }
        } catch (e) {
          console.error(`[handleGoToActivity] Error checking Linking.canOpenURL for ${app.name}:`, e);
        }
      }
      console.log('[handleGoToActivity] availableApps determined:', availableApps);

      if (availableApps.length === 0) {
        console.warn('[handleGoToActivity] No navigation apps found.');
        Alert.alert('Aucune application de navigation', 'Aucune application de navigation compatible n\'a été trouvée sur votre appareil.');
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        if(await Linking.canOpenURL(webUrl)){
          Linking.openURL(webUrl);
        }
        return;
      }

      const options = [...availableApps.map(app => app.name), 'Annuler'];
      const cancelButtonIndex = options.length - 1;
      console.log('[handleGoToActivity] ActionSheet options:', options);

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Ouvrir avec',
          message: 'Choisissez une application pour la navigation :',
          options: options,
          cancelButtonIndex: cancelButtonIndex,
        },
        async (buttonIndex) => {
          console.log(`[handleGoToActivity] ActionSheet button pressed, index: ${buttonIndex}`);
          if (buttonIndex === cancelButtonIndex) {
            console.log('[handleGoToActivity] ActionSheet cancelled.');
            return;
          }

          const selectedApp = availableApps[buttonIndex];
          if (!selectedApp) {
            console.warn('[handleGoToActivity] No selected app for button index.');
            return;
          }
          console.log('[handleGoToActivity] Selected app:', selectedApp.name);

          let urlToOpen = selectedApp.urlBuilder(lat, lng, encodedName);
          let appNameToDisplay = selectedApp.name;
          console.log(`[handleGoToActivity] Trying to open URL: ${urlToOpen} for app: ${appNameToDisplay}`);

          try {
            const supported = await Linking.canOpenURL(urlToOpen);
            console.log(`[handleGoToActivity] URL supported for ${appNameToDisplay}: ${supported}`);
            if (supported) {
              await Linking.openURL(urlToOpen);
              console.log(`[handleGoToActivity] Opened ${appNameToDisplay} with URL: ${urlToOpen}`);
            } else {
              console.warn(`[handleGoToActivity] URL not supported for ${appNameToDisplay}. Attempting fallback if available.`);
              if (selectedApp.webFallbackUrlBuilder) {
                const webFallbackUrl = selectedApp.webFallbackUrlBuilder(lat, lng, encodedName);
                console.log(`[handleGoToActivity] Trying web fallback URL: ${webFallbackUrl}`);
                const webSupported = await Linking.canOpenURL(webFallbackUrl);
                console.log(`[handleGoToActivity] Web fallback URL supported: ${webSupported}`);
                if (webSupported) {
                  await Linking.openURL(webFallbackUrl);
                  console.log(`[handleGoToActivity] Opened web fallback: ${webFallbackUrl}`);
                } else {
                  console.error('[handleGoToActivity] Web fallback URL not supported.');
                  Alert.alert('Erreur', `Impossible d\'ouvrir ${appNameToDisplay} ou une alternative web.`);
                }
              } else {
                console.warn('[handleGoToActivity] No web fallback for ${appNameToDisplay}.');
                Alert.alert('Application introuvable', `Impossible d\'ouvrir ${appNameToDisplay}. L\'application n\'est peut-être pas installée.`);
              }
            }
          } catch (linkError) {
            console.error(`[handleGoToActivity] Error linking to ${appNameToDisplay}:`, linkError);
            Alert.alert('Erreur', `Une erreur est survenue en essayant d\'ouvrir ${appNameToDisplay}.`);
          }
        }
      );
    } catch (error) {
      console.error('[handleGoToActivity] CRITICAL ERROR in function:', error);
      Alert.alert('Erreur critique', 'Une erreur inattendue est survenue dans la fonction de navigation.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageOuterContainer}>
          <Image 
            source={activity.image_url && (!imageLoadingError || activity.image_url.includes('maps.googleapis.com')) ? 
              { uri: activity.image_url } : placeholderImage}
            style={styles.activityImage}
            onError={handleMainImageError}
            resizeMode="cover" // Assurons-nous que resizeMode est bien là
          />
        </View>

        <View style={styles.contentPadding}>
          <View style={styles.priceTagContainer}>
            <Text style={styles.priceTagText}>
              {formatPrice(activity.price_eur, activity.is_free)}
            </Text>
          </View>

          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.description}>{activity.description}</Text>

          {/* Mini Map */} 
          {activity.location && typeof activity.location.lat === 'number' && typeof activity.location.lng === 'number' && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: activity.location.lat,
                  longitude: activity.location.lng,
                  latitudeDelta: 0.01, // Zoom initial
                  longitudeDelta: 0.01, // Zoom initial
                }}
                scrollEnabled={false} // Désactive le scroll sur la mini-map
                zoomEnabled={false}   // Désactive le zoom sur la mini-map
                pitchEnabled={false}  // Désactive l'inclinaison
                rotateEnabled={false} // Désactive la rotation
              >
                <Marker
                  coordinate={{
                    latitude: activity.location.lat,
                    longitude: activity.location.lng,
                  }}
                  title={activity.location.name}
                />
              </MapView>
            </View>
          )}

          {activity.external_url && (
            <TouchableOpacity style={styles.externalLinkButton} onPress={handleOpenExternalUrl}>
              <Text style={styles.externalLinkText}>Plus d'infos sur le site ↗</Text>
            </TouchableOpacity>
          )}

          {/* TODO: Ajouter les sections "Niveau 1", "Niveau 2" si les données sont disponibles */} 
          
          {/* La section de la carte a été supprimée
          <View style={styles.mapContainer}>
            <Image source={mapPlaceholder} style={styles.mapImage} />
          </View>
          */}
        </View>
      </ScrollView>

      {/* Bottom Info Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInfo}>
          <Text style={styles.bottomBarTitle} numberOfLines={2}>{activity.title}</Text>
          <Text style={styles.bottomBarPrice}>
            {formatPrice(activity.price_eur, activity.is_free)}
          </Text>
          <View style={styles.bottomBarTravelInfo}>
            <Image 
              source={getTransportIcon(activity.travel_type)} 
              style={styles.bottomBarTransportIcon}
            />
            <Text style={styles.bottomBarTravelText}>
              {travelTimeInMinutes} min
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.goToButton} onPress={handleGoToActivity}>
          <Text style={styles.goToButtonText}>J'y vais</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 120, // Augmentation pour la bottomBar plus haute
  },
  imageOuterContainer: {
    marginHorizontal: imageHorizontalMargin,
    marginTop: spacing.sm, // Ajout d'un petit espace en haut
    borderRadius: 8,
    overflow: 'hidden', // Pour que le borderRadius s'applique à l'image
  },
  activityImage: {
    width: calculatedImageWidth,
    height: calculatedImageHeight,
    resizeMode: 'cover',
    borderRadius: 8, // Appliqué aussi ici au cas où l'overflow ne suffit pas sur toutes les plateformes
  },
  contentPadding: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },
  priceTagContainer: {
    backgroundColor: colors.text, // Fond noir
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.borderRadius,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  priceTagText: {
    ...typography.caption,
    color: colors.background, // Texte blanc
    fontWeight: 'bold',
    fontSize: 16, // Taille de police à 16px
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md, // Réduction de la marge pour laisser de la place à la carte
    lineHeight: typography.body.fontSize * 1.5,
  },
  externalLinkButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  externalLinkText: {
    ...typography.body,
    color: colors.primary, 
    fontWeight: '600',
    fontSize: 15,
  },
  mapContainer: {
    height: 200,
    borderRadius: spacing.borderRadius,
    overflow: 'hidden', // Important pour que le borderRadius s'applique à MapView
    marginVertical: spacing.md, // Espace au-dessus et en dessous de la carte
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alignement vertical au centre pour le bouton et le bloc d'info
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.xl, 
  },
  bottomBarInfo: {
    flex: 1,
    marginRight: spacing.md,
    marginLeft: spacing.xs, // Ajout d'une petite marge à gauche
    justifyContent: 'center', // Centre le contenu si moins d'espace est pris
  },
  bottomBarTitle: {
    ...typography.body, // Utilisation de body comme base
    fontSize: 12, // Taille de police spécifique
    fontWeight: 'bold',
    marginBottom: 4, // Petit espace en dessous (remplace spacing.xxs)
  },
  bottomBarPrice: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4, // Petit espace en dessous (remplace spacing.xxs)
  },
  bottomBarTravelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBarTransportIcon: {
    width: 16, // Taille ajustée pour la bottom bar
    height: 16, // Taille ajustée pour la bottom bar
    marginRight: spacing.xs,
  },
  bottomBarTravelText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  goToButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.borderRadius * 2,
  },
  goToButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: 'bold',
  },
});

export default ActivityDetailScreen; 