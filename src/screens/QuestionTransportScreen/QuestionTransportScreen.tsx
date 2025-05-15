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

type QuestionTransportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionTransport'>;
type QuestionTransportScreenRouteProp = RouteProp<RootStackParamList, 'QuestionTransport'>;

/**
 * Quatrième écran du flow de questions qui demande le temps de transport maximum que l'utilisateur souhaite faire
 */
const QuestionTransportScreen: React.FC = () => {
  const [transportTime, setTransportTime] = useState<number>(20);
  const navigation = useNavigation<QuestionTransportScreenNavigationProp>();
  const route = useRoute<QuestionTransportScreenRouteProp>();
  const { canceledActivity, sameActivityType, budget } = route.params;
  
  const handleNext = () => {
    // Navigation vers l'écran d'énergie
    navigation.navigate('QuestionEnergy', { 
      canceledActivity, 
      sameActivityType,
      budget,
      transportTime
    });
    console.log('Navigation vers l\'écran d\'énergie avec:', {
      canceledActivity,
      sameActivityType,
      budget,
      transportTime
    });
  };

  // Fonction pour afficher le texte du temps de transport en fonction de la valeur du slider
  const getTransportTimeText = (value: number) => {
    if (value === 5) return "5 minutes";
    if (value === 60) return "1 heure";
    return `${value} minutes`;
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
                Quel est le temps maximum de transport que tu veux faire ?
              </QuestionText>
              
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabelsContainer}>
                  <Text style={styles.sliderMinLabel}>5 min</Text>
                  <Text style={styles.sliderMaxLabel}>1 heure</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={5}
                  maximumValue={60}
                  step={1}
                  value={transportTime}
                  onValueChange={setTransportTime}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Text style={styles.transportTimeLabel}>{getTransportTimeText(transportTime)}</Text>
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
  transportTimeLabel: {
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

export default QuestionTransportScreen; 