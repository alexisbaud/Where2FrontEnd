import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Mascot from '../../components/Mascot';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { RootStackParamList } from '../../navigation/types';
import { suggestRefinedActivities } from '../../services/api';

type RefinementLoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RefinementLoading'>;
type RefinementLoadingScreenRouteProp = RouteProp<RootStackParamList, 'RefinementLoading'>;

/**
 * Écran de chargement pendant l'appel à l'API pour les suggestions raffinées
 */
const RefinementLoadingScreen: React.FC = () => {
  const navigation = useNavigation<RefinementLoadingScreenNavigationProp>();
  const route = useRoute<RefinementLoadingScreenRouteProp>();
  const { 
    canceledActivity, 
    sameActivityType, 
    budget, 
    transportTime, 
    energyLevel,
    numberOfParticipants,
    environmentPreference,
    experienceType,
    eventPermanence
  } = route.params;
  
  useEffect(() => {
    // Fonction pour appeler l'API et naviguer vers l'écran suivant
    const fetchRefinedSuggestions = async () => {
      try {
        // Pour le moment, nous utilisons la même fonction API mais avec plus de paramètres
        // Dans une implémentation réelle, il pourrait y avoir une fonction dédiée
        const result = await suggestRefinedActivities({
          canceledActivity,
          sameActivityType,
          budget,
          transportTime,
          energyLevel,
          numberOfParticipants,
          environmentPreference,
          experienceType,
          eventPermanence
        });
        
        // Navigation vers l'écran de shortlist avec les résultats
        navigation.replace('Shortlist', { 
          activities: result.activities 
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions raffinées:', error);
        Alert.alert(
          'Erreur', 
          'Une erreur est survenue lors de la recherche d\'activités raffinées. Veuillez réessayer.'
        );
        navigation.goBack();
      }
    };
    
    fetchRefinedSuggestions();
  }, [
    canceledActivity, 
    sameActivityType, 
    budget, 
    transportTime, 
    energyLevel,
    numberOfParticipants,
    environmentPreference,
    experienceType,
    eventPermanence,
    navigation
  ]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <Mascot size="large" expression="happy" />
        </View>
        
        <View style={styles.loadingTextContainer}>
          <Text style={styles.loadingText}>Je suis en train d'affiner mes recherches pour toi...</Text>
          <Text style={styles.loadingSubText}>Cela peut prendre jusqu'à 60 secondes</Text>
        </View>
        
        <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  loadingTextContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  loadingText: {
    ...typography.h3,
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  loadingSubText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  spinner: {
    marginTop: spacing.xl,
  }
});

export default RefinementLoadingScreen; 