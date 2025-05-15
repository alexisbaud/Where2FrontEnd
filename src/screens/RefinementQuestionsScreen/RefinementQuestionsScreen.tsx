import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigation/types';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

type RefinementQuestionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RefinementQuestions'
>;

const RefinementQuestionsScreen: React.FC = () => {
  const navigation = useNavigation<RefinementQuestionsScreenNavigationProp>();

  const handleContinue = () => {
    navigation.navigate('ParticipantsQuestion');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient 
      colors={[colors.backgroundSecondary, colors.background]} 
      style={styles.gradientContainer}
      locations={[0.7, 1.0]}
    >
      <SafeAreaView style={styles.container}>
        {/* En-tête */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <View style={styles.contentContainer}>
          {/* Image de la mascotte */}
          <Image
            source={require('../../assets/mascot.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          {/* Message et explication */}
          <Text style={styles.title}>
            J'ai besoin de plus d'informations !
          </Text>
          
          <Text style={styles.description}>
            Pour te trouver les meilleures activités, j'aurais besoin de quelques précisions supplémentaires. 
            Cela me permettra d'affiner mes suggestions.
          </Text>

          {/* Bouton pour continuer */}
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>
              C'est parti !
            </Text>
          </TouchableOpacity>
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
  },
  headerContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backButtonText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  mascotImage: {
    width: 120,
    height: 120,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.borderRadius,
    marginTop: spacing.lg,
  },
  continueButtonText: {
    ...typography.buttonLabel,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default RefinementQuestionsScreen; 