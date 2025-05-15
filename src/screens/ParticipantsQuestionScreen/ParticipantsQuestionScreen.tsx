import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Mascot from '../../components/Mascot';
import Header from '../../components/Header';
import { PrimaryButton } from '../../components/Button';
import { RootStackParamList } from '../../navigation/types';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import QuestionText from '../../components/QuestionText/QuestionText';

type ParticipantsQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ParticipantsQuestion'
>;

const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 5;

const ParticipantsQuestionScreen: React.FC = () => {
  const [participantsCount, setParticipantsCount] = useState<number>(1);
  const [sliderValue, setSliderValue] = useState<number>(1);
  const navigation = useNavigation<ParticipantsQuestionScreenNavigationProp>();

  // Effet pour s'assurer que le slider s'accroche aux valeurs discrètes
  useEffect(() => {
    const roundedValue = Math.round(sliderValue);
    if (roundedValue !== sliderValue) {
      setSliderValue(roundedValue);
    }
    setParticipantsCount(roundedValue);
  }, [sliderValue]);

  const handleNext = () => {
    navigation.navigate('EnvironmentQuestion');
  };

  // Formater l'affichage du nombre de participants
  const formatParticipants = (value: number): string => {
    if (value === 1) return "1 personne";
    if (value === 5) return "5 personnes";
    return `${value} personnes`;
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
                Combien de personnes participeront à cette activité (toi inclus) ?
              </QuestionText>
              
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabelsContainer}>
                  <Text style={styles.sliderMinLabel}>Je suis seul</Text>
                  <Text style={styles.sliderMaxLabel}>5+ personnes</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={MIN_PARTICIPANTS}
                  maximumValue={MAX_PARTICIPANTS}
                  step={1}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                
                <Text style={styles.valueText}>
                  {formatParticipants(participantsCount)}
                </Text>
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
  valueText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    fontSize: 24,
    textAlign: 'center',
    marginTop: spacing.md,
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
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default ParticipantsQuestionScreen; 