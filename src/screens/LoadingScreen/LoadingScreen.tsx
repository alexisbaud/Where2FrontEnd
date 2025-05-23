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
import { RootStackParamList, EnumTriState } from '../../navigation/types';
import { suggestActivities } from '../../services/api';

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loading'>;
type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;

/**
 * Écran de chargement pendant l'appel à l'API de suggestions
 */
const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const route = useRoute<LoadingScreenRouteProp>();
  const { canceledActivity, sameActivityType, budget, transportTime, energyLevel } = route.params;
  
  useEffect(() => {
    // Fonction pour appeler l'API et naviguer vers l'écran suivant
    const fetchSuggestions = async () => {
      try {
        // Convertir le booléen en valeur d'énumération
        const sameType = sameActivityType === true ? 'yes' : 'no';
        
        // Appel API
        const result = await suggestActivities({
          canceledActivity,
          sameActivityType,
          budget,
          transportTime,
          energyLevel
        });
        
        // Navigation vers l'écran de shortlist avec les résultats
        navigation.replace('Shortlist', { 
          activities: result.activities 
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
        // Gestion des erreurs - Pour l'instant, naviguer vers l'écran principal
        // Dans une version finale, afficher un message d'erreur et proposer de réessayer
        Alert.alert('Erreur', 'Une erreur est survenue lors de la recherche d\'activités. Veuillez réessayer.');
        navigation.goBack();
      }
    };
    
    fetchSuggestions();
  }, [canceledActivity, sameActivityType, budget, transportTime, energyLevel, navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <Mascot size="large" expression="happy" />
        </View>
        
        <View style={styles.loadingTextContainer}>
          <Text style={styles.loadingText}>Je cherche les meilleures activités pour toi...</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  mascotContainer: {
    marginBottom: spacing.xxl,
  },
  loadingTextContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
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
  },
});

export default LoadingScreen; 