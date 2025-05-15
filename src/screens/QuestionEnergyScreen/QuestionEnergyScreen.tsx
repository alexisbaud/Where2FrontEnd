import React, { useState, useEffect } from 'react';
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

type QuestionEnergyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionEnergy'>;
type QuestionEnergyScreenRouteProp = RouteProp<RootStackParamList, 'QuestionEnergy'>;

// Définition des niveaux d'énergie
const ENERGY_LEVELS = [
  "Je vais faire un malaise",
  "Je suis épuisé(e)",
  "Je manque d'énergie",
  "Ça peut aller",
  "Je me sens bien",
  "J'ai la pêche",
  "Je suis en pleine forme"
];

const MIN_VALUE = 0;
const MAX_VALUE = ENERGY_LEVELS.length - 1;
const STEPS = 1;

/**
 * Cinquième écran du flow de questions qui demande le niveau d'énergie de l'utilisateur
 */
const QuestionEnergyScreen: React.FC = () => {
  const [energyLevel, setEnergyLevel] = useState<number>(3); // Valeur intermédiaire par défaut
  const [sliderValue, setSliderValue] = useState<number>(3);
  const navigation = useNavigation<QuestionEnergyScreenNavigationProp>();
  const route = useRoute<QuestionEnergyScreenRouteProp>();
  const { canceledActivity, sameActivityType, budget, transportTime } = route.params;
  
  // Effet pour s'assurer que le slider s'accroche aux valeurs discrètes
  useEffect(() => {
    const roundedValue = Math.round(sliderValue);
    if (roundedValue !== sliderValue) {
      setSliderValue(roundedValue);
    }
    setEnergyLevel(roundedValue);
  }, [sliderValue]);

  const handleNext = () => {
    // Navigation vers l'écran de chargement des résultats
    navigation.navigate('Loading', {
      canceledActivity,
      sameActivityType,
      budget,
      transportTime,
      energyLevel
    });
    console.log('Navigation vers l\'écran de chargement avec:', {
      canceledActivity,
      sameActivityType,
      budget,
      transportTime,
      energyLevel
    });
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
                As-tu de l'énergie pour ta nouvelle superbe activité ?
              </QuestionText>
              
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabelsContainer}>
                  <Text style={styles.sliderMinLabel}>{ENERGY_LEVELS[0]}</Text>
                  <Text style={styles.sliderMaxLabel}>{ENERGY_LEVELS[ENERGY_LEVELS.length - 1]}</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={MIN_VALUE}
                  maximumValue={MAX_VALUE}
                  step={STEPS}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <View style={styles.ticksContainer}>
                  {ENERGY_LEVELS.map((_, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.tick,
                        index <= energyLevel ? styles.activeTick : {}
                      ]} 
                    />
                  ))}
                </View>
                <Text style={styles.energyLabel}>{ENERGY_LEVELS[energyLevel]}</Text>
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
  ticksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: -15,
  },
  tick: {
    width: 4,
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  activeTick: {
    backgroundColor: colors.primary,
  },
  energyLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default QuestionEnergyScreen; 