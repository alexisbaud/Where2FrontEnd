import React, { useState } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import Mascot from '../../components/Mascot';
import Header from '../../components/Header';
import { PrimaryButton } from '../../components/Button';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { RootStackParamList } from '../../navigation/types';
import QuestionText from '../../components/QuestionText/QuestionText';

type QuestionBudgetScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionBudget'>;
type QuestionBudgetScreenRouteProp = RouteProp<RootStackParamList, 'QuestionBudget'>;

/**
 * Troisième écran du flow de questions qui demande le budget que l'utilisateur souhaite dépenser
 */
const QuestionBudgetScreen: React.FC = () => {
  const [budget, setBudget] = useState<number>(50);
  const navigation = useNavigation<QuestionBudgetScreenNavigationProp>();
  const route = useRoute<QuestionBudgetScreenRouteProp>();
  const { canceledActivity, sameActivityType } = route.params;
  
  const handleNext = () => {
    // Navigation vers l'écran de transport
    navigation.navigate('QuestionTransport', { 
      canceledActivity, 
      sameActivityType,
      budget
    });
    console.log('Navigation vers l\'écran de transport avec:', {
      canceledActivity,
      sameActivityType,
      budget
    });
  };

  // Fonction pour afficher le texte du budget en fonction de la valeur du slider
  const getBudgetText = (value: number) => {
    if (value === 0) return "Pas de budget";
    if (value === 100) return "Peu importe";
    return `${value}€ max`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Header />
          
          <View style={styles.content}>
            <View style={styles.mascotContainer}>
              <Mascot size="large" expression="normal" />
            </View>
            
            <View style={styles.questionContainer}>
              <QuestionText>
                Combien veux-tu dépenser pour cette nouvelle activité ?
              </QuestionText>
              
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabelsContainer}>
                  <Text style={styles.sliderMinLabel}>Pas de budget</Text>
                  <Text style={styles.sliderMaxLabel}>Peu importe</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={budget}
                  onValueChange={setBudget}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Text style={styles.budgetLabel}>{getBudgetText(budget)}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Suivant"
              onPress={handleNext}
              style={styles.button}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 0,
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  questionContainer: {
    width: '100%',
    marginTop: 0,
  },
  sliderContainer: {
    width: '100%',
    marginTop: spacing.md,
    alignItems: 'center',
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xs,
  },
  sliderMinLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sliderMaxLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  budgetLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default QuestionBudgetScreen; 