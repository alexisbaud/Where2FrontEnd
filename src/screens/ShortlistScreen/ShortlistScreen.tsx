import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Mascot from '../../components/Mascot';
import { RootStackParamList, Activity } from '../../navigation/types';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

// Import des icônes
const walkIcon = require('../../assets/walk_icon.png');
const transitIcon = require('../../assets/transit_icon.png');
const placeholderImage = require('../../assets/activity_placeholder.png');

type ShortlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shortlist'>;
type ShortlistScreenRouteProp = RouteProp<RootStackParamList, 'Shortlist'>;

const { width } = Dimensions.get('window');
const cardWidth = width - 40; // Légère marge des deux côtés

// --- Fonctions utilitaires déplacées hors du composant principal pour être passées en props ---
const formatPrice = (price: number, isFree: boolean) => {
  if (isFree) return 'Gratuit';
  if (price === 0) return 'Gratuit';
  return `${price}€`;
};

const formatDuration = (min: number, max: number) => {
  if (min === max) {
    if (min >= 60) {
      const hours = Math.floor(min / 60);
      const remainingMins = min % 60;
      if (remainingMins === 0) {
        return `${hours}h`;
      }
      return `${hours}h${remainingMins}`;
    }
    return `${min} min`;
  }
  if (min >= 60 || max >= 60) {
    const minHours = Math.floor(min / 60);
    const minRemaining = min % 60;
    const maxHours = Math.floor(max / 60);
    const maxRemaining = max % 60;
    if (minHours === 0) {
      return `${min}min - ${maxHours}h${maxRemaining > 0 ? maxRemaining : ''}`;
    } else if (maxHours === 0) {
      return `${minHours}h${minRemaining > 0 ? minRemaining : ''} - ${max}min`;
    } else {
      return `${minHours}h${minRemaining > 0 ? minRemaining : ''} - ${maxHours}h${maxRemaining > 0 ? maxRemaining : ''}`;
    }
  }
  return `${min} - ${max} min`;
};

const getTransportIcon = (travelType: number) => {
  switch(travelType) {
    case 1: return walkIcon;
    case 2: return transitIcon; // Supposant vélo = transit pour l'icône
    case 3: return transitIcon;
    case 4: return transitIcon; // Supposant voiture = transit pour l'icône
    default: return walkIcon;
  }
};
// --- Fin des fonctions utilitaires ---

interface ActivityCardProps {
  item: Activity;
  imageErrorIds: string[];
  onImageError: (id: string) => void;
  onDismiss: (id: string) => void;
  onLearnMore: (activity: Activity) => void;
  // Les fonctions utilitaires sont maintenant passées en props
  formatPrice: (price: number, isFree: boolean) => string;
  formatDuration: (min: number, max: number) => string;
  getTransportIcon: (travelType: number) => any; // any car require() peut retourner divers types
  placeholderImage: any; // any car require() peut retourner divers types
  // styles: any; // Les styles sont définis ci-dessous et sont globaux au fichier pour l'instant
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  item,
  imageErrorIds,
  onImageError,
  onDismiss,
  onLearnMore,
  formatPrice,
  formatDuration,
  getTransportIcon,
  placeholderImage,
  // styles // Les styles sont accessibles globalement
}) => {
  // Vérifions si l'URL est une URL Google Maps
  const isGoogleMapsUrl = item.image_url?.includes('maps.googleapis.com');
  
  // Utiliser useCallback pour la fonction de gestion d'erreur
  const handleImageError = useCallback(() => {
    console.log('[ActivityCard] handleImageError triggered for ID:', item.id);
    // Pour les URLs Google Maps, désactiver temporairement la gestion d'erreur
    // car elles peuvent être valides même si React Native signale une erreur
    if (isGoogleMapsUrl) {
      console.log('[ActivityCard] Google Maps URL detected, ignoring error for now');
      // Ne pas appeler onImageError pour les URLs Google Maps
      return;
    }
    onImageError(item.id);
  }, [item.id, onImageError, isGoogleMapsUrl]);

  // Modifier la logique pour ne pas utiliser le placeholder pour les URLs Google Maps
  // même si elles sont dans imageErrorIds
  const shouldUsePlaceholder = !item.image_url || (!isGoogleMapsUrl && imageErrorIds.includes(item.id));
  
  console.log('[ActivityCard] shouldUsePlaceholder for ID:', item.id, 'is', shouldUsePlaceholder, 
              'image_url:', item.image_url, 
              'isError:', imageErrorIds.includes(item.id),
              'isGoogleMapsUrl:', isGoogleMapsUrl);

  const travelTimeInMinutes = Math.round(item.estimated_travel_time / 60);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardShadow}>
        <View style={styles.cardInner}>
          <View style={styles.imageContainer}>
            <Image
              source={shouldUsePlaceholder ? placeholderImage : { uri: item.image_url }}
              style={styles.activityImage}
              resizeMode="cover"
              onError={handleImageError}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onDismiss(item.id)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyInfoContainer}>
            <View style={[styles.infoItem, { borderRightWidth: 1, borderRightColor: colors.border }]}>
              <Text style={styles.infoValue}>{formatPrice(item.price_eur, item.is_free)}</Text>
            </View>
            <View style={[styles.infoItem, { borderRightWidth: 1, borderRightColor: colors.border }]}>
              <Text style={styles.infoValue}>{formatDuration(item.duration_min, item.duration_max)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image
                source={getTransportIcon(item.travel_type)}
                style={styles.transportIcon}
              />
              <Text style={styles.infoValue}>{travelTimeInMinutes} min</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          </View>
          <View style={styles.moreButtonContainer}>
            <TouchableOpacity style={styles.moreButton} onPress={() => onLearnMore(item)}>
              <Text style={styles.moreButtonText}>En savoir plus →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

/**
 * Écran de shortlist qui affiche les 3 suggestions d'activités
 */
const ShortlistScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrorIds, setImageErrorIds] = useState<string[]>([]);
  const [dismissedActivities, setDismissedActivities] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<ShortlistScreenNavigationProp>();
  const route = useRoute<ShortlistScreenRouteProp>();
  const { activities } = route.params;
  console.log('[ShortlistScreen] Received activities:', JSON.stringify(activities, null, 2));
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };
  
  const handleBackPress = () => {
    navigation.navigate('RefinementQuestions');
  };
  
  const handleDismissActivity = (activityId: string) => {
    const newDismissed = [...dismissedActivities, activityId];
    setDismissedActivities(newDismissed);
    
    if (newDismissed.length === activities.length) {
      navigation.navigate('RefinementQuestions');
    }
  };
  
  const handleLearnMore = (activity: Activity) => {
    navigation.navigate('ActivityDetail', { activity });
  };

  // Nouvelle fonction pour gérer l'erreur d'image, passée à ActivityCard
  const handleAddImageErrorId = useCallback((id: string) => {
    if (!imageErrorIds.includes(id)) {
      setImageErrorIds(prev => [...prev, id]);
    }
  }, [imageErrorIds]);

  const renderActivityCard = ({ item }: { item: Activity }) => {
    if (dismissedActivities.includes(item.id)) {
      return null; // Ne pas rendre si fermée
    }
    return (
      <ActivityCard
        item={item}
        imageErrorIds={imageErrorIds}
        onImageError={handleAddImageErrorId} // Utilise la nouvelle fonction
        onDismiss={handleDismissActivity}
        onLearnMore={handleLearnMore}
        formatPrice={formatPrice}
        formatDuration={formatDuration}
        getTransportIcon={getTransportIcon}
        placeholderImage={placeholderImage}
        // styles={styles} // Les styles sont globaux
      />
    );
  };

  return (
    <LinearGradient 
      colors={[colors.backgroundSecondary, colors.background]} 
      style={styles.gradientContainer}
      locations={[0.7, 1.0]}
    >
      <SafeAreaView style={styles.container}>
        {/* Bouton retour */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Rien ne me plaît</Text>
          </TouchableOpacity>
        </View>
        
        {/* Carrousel d'activités */}
        <FlatList
          ref={flatListRef}
          data={activities.filter(activity => !dismissedActivities.includes(activity.id))} // Filtrer les activités ici aussi
          renderItem={renderActivityCard}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          snapToInterval={width}
          decelerationRate="fast"
          style={styles.carousel}
        />
        
        {/* Section de la mascotte */}
        <View style={styles.mascotSection}>
          <Image
            source={require('../../assets/mascot.png')}
            style={styles.mascot}
          />
          <Text style={styles.mascotText}>
            Regarde moi ce que je t'ai dégoté ! Si tu n'es pas convaincu, je t'en trouverai d'autres !
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backButtonText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text,
  },
  carousel: {
    flex: 1,
  },
  cardContainer: {
    width: width,
    alignItems: 'center',
    padding: spacing.md,
  },
  cardShadow: {
    width: cardWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: -2,
  },
  cardInner: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    margin: 8,
  },
  activityImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  keyInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoValue: {
    ...typography.body,
    fontWeight: '600',
    fontSize: 15,
  },
  transportIcon: {
    width: 22,
    height: 22,
    marginRight: spacing.xs,
  },
  contentContainer: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 0,
    flexShrink: 1,
    flexGrow: 1,
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.sm,
    fontSize: 22,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontSize: 15,
    lineHeight: 20,
  },
  moreButtonContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingBottom: spacing.md,
  },
  moreButton: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  moreButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  mascotSection: {
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.md,
  },
  mascot: {
    width: 80,
    height: 80,
    marginRight: spacing.md,
    resizeMode: 'contain',
  },
  mascotText: {
    ...typography.body,
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    backgroundColor: colors.background,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text,
  },
});

export default ShortlistScreen; 