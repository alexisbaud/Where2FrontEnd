import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Mascot from '../../components/Mascot';
import Header from '../../components/Header';
import { PrimaryButton } from '../../components/Button';
import ChoiceButton from '../../components/ChoiceButton';
import QuestionText from '../../components/QuestionText/QuestionText';
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

const PermanenceQuestionScreen: React.FC = () => {
  const [selectedPermanence, setSelectedPermanence] = useState<PermanenceType | null>(null);
  const navigation = useNavigation<PermanenceQuestionScreenNavigationProp>();

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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Header />
          
          <View style={styles.content}>
            <View style={styles.topContent}>
              <View style={styles.mascotContainer}>
                <Mascot size="large" expression="normal" />
              </View>
              
              <View style={styles.questionContainer}>
                <QuestionText>
                  Es-tu plus intéressé(e) par un événement éphémère ou une activité permanente ?
                </QuestionText>
              </View>
            </View>
            
            <View style={styles.optionsContainer}>
              <View style={styles.row}>
                <ChoiceButton
                  title="Événement éphémère"
                  onPress={() => setSelectedPermanence('ephemeral')}
                  selected={selectedPermanence === 'ephemeral'}
                  style={styles.choiceButton}
                />
                <ChoiceButton
                  title="Activité permanente"
                  onPress={() => setSelectedPermanence('permanent')}
                  selected={selectedPermanence === 'permanent'}
                  style={styles.choiceButton}
                />
              </View>
              <ChoiceButton
                title="Peu importe"
                onPress={() => setSelectedPermanence('indifferent')}
                selected={selectedPermanence === 'indifferent'}
                style={styles.fullWidthButton}
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Chercher des activités"
              onPress={handleNext}
              disabled={!selectedPermanence}
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 0,
  },
  topContent: {
    alignItems: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    marginTop: -spacing.sm,
    marginBottom: spacing.xs,
  },
  questionContainer: {
    width: '100%',
    marginTop: 0,
    marginBottom: spacing.md,
  },
  optionsContainer: {
    marginTop: spacing.md,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  choiceButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  fullWidthButton: {
    width: '100%',
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default PermanenceQuestionScreen; 