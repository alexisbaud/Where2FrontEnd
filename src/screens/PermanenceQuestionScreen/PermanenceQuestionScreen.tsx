import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigation/types';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

type PermanenceQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PermanenceQuestion'
>;

// Types de permanence disponibles
type PermanenceType = 'ephemeral' | 'permanent' | 'indifferent';

// Options à afficher
const permanenceOptions: Array<{
  value: PermanenceType,
  label: string,
}> = [
  {
    value: 'ephemeral',
    label: 'Événement éphémère',
  },
  {
    value: 'permanent',
    label: 'Activité permanente',
  },
  {
    value: 'indifferent',
    label: 'Peu importe',
  }
];

const PermanenceQuestionScreen: React.FC = () => {
  const [selectedPermanence, setSelectedPermanence] = useState<PermanenceType | null>(null);
  const navigation = useNavigation<PermanenceQuestionScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  // À ce stade, nous avons toutes les réponses pour les questions de raffinement
  // Dans un cas réel, nous devrions récupérer toutes les réponses depuis un état global
  const handleNext = () => {
    if (selectedPermanence) {
      // Ici nous devrions avoir les données de toutes les questions
      // Pour l'exemple, nous utilisons des valeurs factices
      navigation.navigate('RefinementLoading', {
        canceledActivity: 'Concert',
        sameActivityType: false,
        budget: 50,
        transportTime: 30,
        energyLevel: 5,
        numberOfParticipants: 2,
        environmentPreference: 'indoor',
        experienceType: 'authentic',
        eventPermanence: selectedPermanence
      });
    }
  };

  return (
    <LinearGradient
      colors={[colors.backgroundSecondary, colors.background]}
      style={styles.gradientContainer}
      locations={[0.7, 1.0]}
    >
      <SafeAreaView style={styles.container}>
        {/* En-tête avec navigation */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Es-tu intéressé(e) par un événement éphémère ou une activité disponible de façon plus permanente ?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <View style={styles.buttonRow}>
            {permanenceOptions.slice(0, 2).map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  selectedPermanence === option.value && styles.selectedOption
                ]}
                onPress={() => setSelectedPermanence(option.value)}
              >
                <Text style={[
                  styles.optionText,
                  selectedPermanence === option.value && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={[
              styles.optionButtonFull,
              selectedPermanence === 'indifferent' && styles.selectedOption
            ]}
            onPress={() => setSelectedPermanence('indifferent')}
          >
            <Text style={[
              styles.optionText,
              selectedPermanence === 'indifferent' && styles.selectedOptionText
            ]}>
              {permanenceOptions[2].label}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bouton Suivant */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedPermanence && styles.disabledButton
            ]}
            onPress={handleNext}
            disabled={!selectedPermanence}
          >
            <Text style={styles.nextButtonText}>Chercher des activités</Text>
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  questionContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginVertical: spacing.xl,
  },
  questionText: {
    ...typography.h3,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.md,
    paddingVertical: spacing.xl,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionButtonFull: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.md,
    paddingVertical: spacing.xl,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionText: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.primary,
  },
  buttonContainer: {
    padding: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.borderRadius,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.inactive,
  },
  nextButtonText: {
    ...typography.buttonLabel,
    color: colors.background,
  },
});

export default PermanenceQuestionScreen; 