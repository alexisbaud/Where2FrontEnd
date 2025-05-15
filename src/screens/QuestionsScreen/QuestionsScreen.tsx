import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  TextInput,
  findNodeHandle
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-community/voice';
import Mascot from '../../components/Mascot';
import TextInputWithIcon from '../../components/TextInputWithIcon';
import Header from '../../components/Header';
import { PrimaryButton } from '../../components/Button';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { RootStackParamList } from '../../navigation/types';
import QuestionText from '../../components/QuestionText/QuestionText';

type QuestionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Questions'>;

/**
 * Premier écran du flow de questions qui demande l'activité annulée
 */
const QuestionsScreen: React.FC = () => {
  const [canceledActivity, setCanceledActivity] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigation = useNavigation<QuestionsScreenNavigationProp>();
  const inputRef = useRef<TextInput>(null);
  
  // Forcer l'ouverture du clavier après le rendu
  useEffect(() => {
    // Attendre un court délai pour s'assurer que le composant est complètement monté
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        
        // Hack supplémentaire pour forcer le clavier à s'ouvrir
        const inputHandle = findNodeHandle(inputRef.current);
        if (inputHandle) {
          Platform.OS === 'ios' 
            ? Keyboard.dismiss() // Sur iOS, parfois il faut d'abord fermer puis ouvrir
            : null;
            
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 100);
        }
      }
    }, 500); // Un délai plus long
    
    return () => clearTimeout(timer);
  }, []);

  // Reconnaissance vocale désactivée temporairement
  /*
  useEffect(() => {
    // Configuration des listeners de Voice
    const onSpeechStart = () => {
      console.log('Speech started');
    };

    const onSpeechEnd = () => {
      setIsListening(false);
      console.log('Speech ended');
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        setCanceledActivity(e.value[0]);
      }
      console.log('Speech results:', e.value);
    };

    const onSpeechError = (e: SpeechErrorEvent) => {
      console.error('Speech error:', e);
      setIsListening(false);
      Alert.alert('Erreur', 'Impossible de reconnaître votre voix. Veuillez réessayer.');
    };

    // Ajout des listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      // Nettoyage des listeners au démontage du composant
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
        console.log('Voice listeners removed');
      });
    };
  }, []);
  */

  const handleNext = () => {
    if (canceledActivity.trim().length > 0) {
      // Fermer le clavier avant la navigation
      Keyboard.dismiss();
      // Navigation vers l'écran de choix
      navigation.navigate('QuestionChoice', { canceledActivity });
      console.log('Navigation vers la question de choix avec activité:', canceledActivity);
    }
  };

  const handleMicPress = async () => {
    // Fermer le clavier lorsqu'on utilise le micro
    Keyboard.dismiss();
    // Fonctionnalité désactivée temporairement
    Alert.alert('Information', 'La reconnaissance vocale n\'est pas disponible pour le moment.');
    
    /*
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        setIsListening(true);
        await Voice.start('fr-FR');
      }
    } catch (error) {
      console.error('Erreur avec la reconnaissance vocale:', error);
      setIsListening(false);
    }
    */
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <View style={styles.inner}>
          <Header />
          
          <View style={styles.content} onTouchStart={() => inputRef.current?.focus()}>
            <View style={styles.mascotContainer}>
              <Mascot size="large" expression="normal" />
            </View>
            
            <View style={styles.questionContainer}>
              <QuestionText>
                Quelle activité devais-tu faire ?
              </QuestionText>
              <TextInputWithIcon
                value={canceledActivity}
                onChangeText={setCanceledActivity}
                placeholder="Rentre ton activité"
                onIconPress={handleMicPress}
                style={styles.inputContainer}
                autoFocus={true}
                inputRef={inputRef}
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Suivant"
              onPress={handleNext}
              disabled={canceledActivity.trim().length === 0}
              style={styles.button}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  keyboardAvoidingView: {
    flex: 1,
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
  inputContainer: {
    width: '100%',
    marginTop: spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default QuestionsScreen; 