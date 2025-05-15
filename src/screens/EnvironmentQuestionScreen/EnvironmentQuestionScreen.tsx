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

type EnvironmentQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EnvironmentQuestion'
>;

// Types d'environnement disponibles
type EnvironmentType = 'indoor' | 'outdoor' | 'indifferent';

// Options à afficher
const environmentOptions: Array<{
  value: EnvironmentType,
  label: string
}> = [
  {
    value: 'indoor',
    label: 'En intérieur'
  },
  {
    value: 'outdoor',
    label: 'En extérieur'
  },
  {
    value: 'indifferent',
    label: 'Peu importe'
  }
];

const EnvironmentQuestionScreen: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentType | null>(null);
  const navigation = useNavigation<EnvironmentQuestionScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedEnvironment) {
      navigation.navigate('ExperienceTypeQuestion');
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
            As-tu une préférence pour une activité en intérieur, en extérieur, ou cela t'est-il égal ?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <View style={styles.buttonRow}>
            {environmentOptions.slice(0, 2).map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  selectedEnvironment === option.value && styles.selectedOption
                ]}
                onPress={() => setSelectedEnvironment(option.value)}
              >
                <Text style={[
                  styles.optionText,
                  selectedEnvironment === option.value && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={[
              styles.optionButtonFull,
              selectedEnvironment === 'indifferent' && styles.selectedOption
            ]}
            onPress={() => setSelectedEnvironment('indifferent')}
          >
            <Text style={[
              styles.optionText,
              selectedEnvironment === 'indifferent' && styles.selectedOptionText
            ]}>
              {environmentOptions[2].label}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bouton Suivant */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedEnvironment && styles.disabledButton
            ]}
            onPress={handleNext}
            disabled={!selectedEnvironment}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
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
  buttonContainer: {
    padding: spacing.screenPadding,
    marginBottom: spacing.md,
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

export default EnvironmentQuestionScreen; 