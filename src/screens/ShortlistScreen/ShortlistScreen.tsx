import React, { useState, useRef } from 'react';
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

/**
 * Écran de shortlist qui affiche les 3 suggestions d'activités
 */
const ShortlistScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<ShortlistScreenNavigationProp>();
  const route = useRoute<ShortlistScreenRouteProp>();
  const { activities } = route.params;
  
  // Gestion du swipe entre les activités
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };
  
  // Formatage du prix pour l'affichage
  const formatPrice = (price: number, isFree: boolean) => {
    if (isFree) return 'Gratuit';
    if (price === 0) return 'Gratuit';
    return `${price}€`;
  };
  
  // Formatage de la durée
  const formatDuration = (min: number, max: number) => {
    if (min === max) {
      // Si plus d'une heure, convertir en heures
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
    
    // Pour une plage de durée
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
  
  // Transport icon selector based on travel_type
  const getTransportIcon = (travelType: number) => {
    // 1 = marche, 2 = vélo, 3 = transport en commun, 4 = voiture
    switch(travelType) {
      case 1:
        return walkIcon;
      case 2:
        return transitIcon;
      case 3:
        return transitIcon;
      case 4:
        return transitIcon; // Nous pourrions avoir une icône de voiture spécifique dans le futur
      default:
        return walkIcon;
    }
  };
  
  // Rendu d'une carte d'activité
  const renderActivityCard = ({ item }: { item: Activity }) => {
    const handleLearnMore = () => {
      navigation.navigate('ActivityDetail', { activity: item });
    };

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardShadow}>
          <View style={styles.cardInner}>
            {/* Image de l'activité */}
            <View style={styles.imageContainer}>
              <Image 
                source={item.image_url ? { uri: item.image_url } : placeholderImage} 
                style={styles.activityImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.closeButton} onPress={handleBackPress}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {/* Informations clés */}
            <View style={styles.keyInfoContainer}>
              {/* Prix */}
              <View style={[styles.infoItem, { borderRightWidth: 1, borderRightColor: colors.border }]}>
                <Text style={styles.infoValue}>{formatPrice(item.price_eur, item.is_free)}</Text>
              </View>
              
              {/* Durée */}
              <View style={[styles.infoItem, { borderRightWidth: 1, borderRightColor: colors.border }]}>
                <Text style={styles.infoValue}>{formatDuration(item.duration_min, item.duration_max)}</Text>
              </View>
              
              {/* Temps de trajet */}
              <View style={styles.infoItem}>
                <Image 
                  source={getTransportIcon(item.travel_type)} 
                  style={styles.transportIcon}
                />
                <Text style={styles.infoValue}>{item.estimated_travel_time} min</Text>
              </View>
            </View>
            
            {/* Contenu */}
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            </View>
            
            {/* Bouton En savoir plus */}
            <View style={styles.moreButtonContainer}>
              <TouchableOpacity style={styles.moreButton} onPress={handleLearnMore}>
                <Text style={styles.moreButtonText}>En savoir plus →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Gestion du bouton retour
  const handleBackPress = () => {
    navigation.goBack();
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
            <Text style={styles.backButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
        
        {/* Carrousel d'activités */}
        <FlatList
          ref={flatListRef}
          data={activities}
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