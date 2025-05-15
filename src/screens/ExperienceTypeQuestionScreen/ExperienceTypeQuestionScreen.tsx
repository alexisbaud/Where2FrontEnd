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

type ExperienceTypeQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExperienceTypeQuestion'
>;

// Types d'expérience disponibles
type ExperienceType = 'authentic' | 'touristic' | 'indifferent';

// Options à afficher
const experienceOptions: Array<{
  value: ExperienceType,
  label: string,
}> = [
  {
    value: 'authentic',
    label: 'Plutôt authentique',
  },
  {
    value: 'touristic',
    label: 'Plutôt touristique',
  },
  {
    value: 'indifferent',
    label: 'Peu importe',
  }
];

const ExperienceTypeQuestionScreen: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
  const navigation = useNavigation<ExperienceTypeQuestionScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedExperience) {
      navigation.navigate('PermanenceQuestion');
    }
  };

  return (
    <View style={styles.container}>
      {/* En-tête avec navigation */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        Quel genre d'expérience recherches-tu principalement ?
      </Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.buttonRow}>
          {experienceOptions.slice(0, 2).map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selectedExperience === option.value && styles.selectedOption
              ]}
              onPress={() => setSelectedExperience(option.value)}
            >
              <Text style={[
                styles.optionText,
                selectedExperience === option.value && styles.selectedOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={[
            styles.optionButtonFull,
            selectedExperience === 'indifferent' && styles.selectedOption
          ]}
          onPress={() => setSelectedExperience('indifferent')}
        >
          <Text style={[
            styles.optionText,
            selectedExperience === 'indifferent' && styles.selectedOptionText
          ]}>
            {experienceOptions[2].label}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bouton Suivant */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !selectedExperience && styles.disabledButton
        ]}
        onPress={handleNext}
        disabled={!selectedExperience}
      >
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.screenPadding,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text,
  },
  questionText: {
    ...typography.h3,
    textAlign: 'center',
    marginBottom: spacing.xl * 2,
    marginTop: spacing.xl,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: spacing.xl,
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
  nextButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  disabledButton: {
    backgroundColor: colors.inactive,
  },
  nextButtonText: {
    ...typography.buttonLabel,
    color: 'white',
  },
});

export default ExperienceTypeQuestionScreen; 