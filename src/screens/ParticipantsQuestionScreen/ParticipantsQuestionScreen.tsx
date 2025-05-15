import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigation/types';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

type ParticipantsQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ParticipantsQuestion'
>;

const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 5;

const ParticipantsQuestionScreen: React.FC = () => {
  const [participantsCount, setParticipantsCount] = useState<number>(1);
  const navigation = useNavigation<ParticipantsQuestionScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('EnvironmentQuestion');
  };

  // Formater l'affichage du nombre de participants
  const formatParticipants = (value: number): string => {
    if (value >= MAX_PARTICIPANTS) return "5+";
    return value.toString();
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
            Combien de personnes participeront à cette activité (toi inclus) ?
          </Text>
        </View>

        {/* Valeur actuelle du slider */}
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>
            {formatParticipants(participantsCount)} {participantsCount === 1 ? 'personne' : 'personnes'}
          </Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Text style={styles.rangeLabel}>1</Text>
          <Slider
            style={styles.slider}
            minimumValue={MIN_PARTICIPANTS}
            maximumValue={MAX_PARTICIPANTS}
            step={1}
            value={participantsCount}
            onValueChange={setParticipantsCount}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor={colors.primary}
          />
          <Text style={styles.rangeLabel}>5+</Text>
        </View>

        {/* Bouton Suivant */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
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
    marginBottom: spacing.md,
  },
  questionText: {
    ...typography.h3,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  valueContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  valueText: {
    ...typography.h1,
    fontWeight: 'bold',
    color: colors.text,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.md,
    flex: 1,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: spacing.md,
  },
  rangeLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  buttonContainer: {
    padding: spacing.screenPadding,
    marginTop: 'auto',
    marginBottom: spacing.md,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.borderRadius,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  nextButtonText: {
    ...typography.buttonLabel,
    color: colors.background,
  },
});

export default ParticipantsQuestionScreen; 