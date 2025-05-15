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
import Mascot from '../../components/Mascot';
import Header from '../../components/Header';
import ChoiceButton from '../../components/ChoiceButton';
import { PrimaryButton } from '../../components/Button';
import QuestionText from '../../components/QuestionText/QuestionText';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { RootStackParamList } from '../../navigation/types';

type QuestionChoiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionChoice'>;
type QuestionChoiceScreenRouteProp = RouteProp<RootStackParamList, 'QuestionChoice'>;

/**
 * Deuxième écran du flow de questions qui demande si l'utilisateur veut faire le même type d'activité
 */
const QuestionChoiceScreen: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const navigation = useNavigation<QuestionChoiceScreenNavigationProp>();
  const route = useRoute<QuestionChoiceScreenRouteProp>();
  const { canceledActivity } = route.params;
  
  const handleNext = () => {
    if (selectedChoice !== null) {
      // Navigation vers l'écran de budget
      navigation.navigate('QuestionBudget', { 
        canceledActivity, 
        sameActivityType: selectedChoice 
      });
      console.log('Navigation vers l\'écran de budget avec:', {
        canceledActivity,
        sameActivityType: selectedChoice
      });
    }
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
                Souhaites-tu faire le même type d'activité ?
              </QuestionText>
              
              <View style={styles.choicesContainer}>
                <ChoiceButton
                  title="Oui"
                  onPress={() => setSelectedChoice(true)}
                  selected={selectedChoice === true}
                  style={styles.choiceButton}
                />
                <ChoiceButton
                  title="Non"
                  onPress={() => setSelectedChoice(false)}
                  selected={selectedChoice === false}
                  style={styles.choiceButton}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Suivant"
              onPress={handleNext}
              disabled={selectedChoice === null}
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
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    width: '105%',
    marginLeft: '-2.5%',
    paddingHorizontal: -spacing.xs,
  },
  choiceButton: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default QuestionChoiceScreen; 