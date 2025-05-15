import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/Button';
import Mascot from '../../components/Mascot';
import MessageBubble from '../../components/MessageBubble';
import ChoiceButtons from '../../components/ChoiceButtons';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import { RootStackParamList } from '../../navigation/types';

type QuestionDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QuestionDetails'
>;

type QuestionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'QuestionDetails'
>;

/**
 * Écran pour la question "Même type d'activité?"
 */
const QuestionSameTypeScreen: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<string | undefined>();
  const navigation = useNavigation<QuestionDetailsScreenNavigationProp>();
  const route = useRoute<QuestionDetailsScreenRouteProp>();
  
  const choices = [
    { id: 'yes', label: 'Oui' },
    { id: 'no', label: 'Non' },
    { id: 'any', label: 'Peu importe' },
  ];
  
  const handleSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };
  
  const handleNext = () => {
    if (selectedChoice) {
      // Pour l'instant, nous simulons simplement la navigation
      // navigation.navigate('QuestionDetails', { questionId: 'q3_budget' });
      console.log('Navigation vers la prochaine question (à implémenter)');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mascotContainer}>
          <Mascot size="medium" expression="thinking" />
          <View style={styles.bubbleContainer}>
            <MessageBubble 
              message="Souhaites-tu faire le même type d'activité ?" 
              type="mascot" 
            />
          </View>
        </View>
        
        <View style={styles.choicesContainer}>
          <ChoiceButtons
            choices={choices}
            selectedChoiceId={selectedChoice}
            onSelect={handleSelect}
          />
        </View>
        
        <View style={styles.footer}>
          <Button 
            title="Continuer" 
            onPress={handleNext}
            disabled={!selectedChoice}
            style={styles.button} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.screenPadding,
    justifyContent: 'space-between',
  },
  mascotContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  bubbleContainer: {
    width: '100%', 
    marginTop: spacing.md,
  },
  choicesContainer: {
    marginTop: spacing.xl,
  },
  footer: {
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});

export default QuestionSameTypeScreen; 