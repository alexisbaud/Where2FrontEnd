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

type ExperienceTypeQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExperienceTypeQuestion'
>;

// Types d'expérience disponibles
type ExperienceType = 'authentic' | 'touristic' | 'indifferent';

const ExperienceTypeQuestionScreen: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
  const navigation = useNavigation<ExperienceTypeQuestionScreenNavigationProp>();

  const handleNext = () => {
    if (selectedExperience) {
      navigation.navigate('PermanenceQuestion');
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
                  Quel genre d'expérience recherches-tu principalement ?
                </QuestionText>
              </View>
            </View>
            
            <View style={styles.optionsContainer}>
              <View style={styles.row}>
                <ChoiceButton
                  title="Plutôt authentique"
                  onPress={() => setSelectedExperience('authentic')}
                  selected={selectedExperience === 'authentic'}
                  style={styles.choiceButton}
                />
                <ChoiceButton
                  title="Plutôt touristique"
                  onPress={() => setSelectedExperience('touristic')}
                  selected={selectedExperience === 'touristic'}
                  style={styles.choiceButton}
                />
              </View>
              <ChoiceButton
                title="Peu importe"
                onPress={() => setSelectedExperience('indifferent')}
                selected={selectedExperience === 'indifferent'}
                style={styles.fullWidthButton}
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Suivant"
              onPress={handleNext}
              disabled={!selectedExperience}
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

export default ExperienceTypeQuestionScreen; 