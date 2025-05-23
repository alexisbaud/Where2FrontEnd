import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import des écrans
import OnboardingScreen from '../screens/OnboardingScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import QuestionChoiceScreen from '../screens/QuestionChoiceScreen/QuestionChoiceScreen';
import QuestionBudgetScreen from '../screens/QuestionBudgetScreen/QuestionBudgetScreen';
import QuestionTransportScreen from '../screens/QuestionTransportScreen/QuestionTransportScreen';
import QuestionEnergyScreen from '../screens/QuestionEnergyScreen/QuestionEnergyScreen';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import ShortlistScreen from '../screens/ShortlistScreen/ShortlistScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen/ActivityDetailScreen';

// Import des écrans de raffinement
import RefinementQuestionsScreen from '../screens/RefinementQuestionsScreen/RefinementQuestionsScreen';
import ParticipantsQuestionScreen from '../screens/ParticipantsQuestionScreen/ParticipantsQuestionScreen';
import EnvironmentQuestionScreen from '../screens/EnvironmentQuestionScreen/EnvironmentQuestionScreen';
import ExperienceTypeQuestionScreen from '../screens/ExperienceTypeQuestionScreen/ExperienceTypeQuestionScreen';
import PermanenceQuestionScreen from '../screens/PermanenceQuestionScreen/PermanenceQuestionScreen';
import RefinementLoadingScreen from '../screens/RefinementLoadingScreen';

// Création du stack navigator
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Navigateur principal de l'application
 * Ne contient pas de SafeAreaProvider pour éviter les erreurs sur certains émulateurs
 */
const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' }
        }}
      >
        {/* Écrans d'onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        
        {/* Écrans de questions */}
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="QuestionChoice" component={QuestionChoiceScreen} />
        <Stack.Screen 
          name="QuestionBudget" 
          component={QuestionBudgetScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuestionTransport" 
          component={QuestionTransportScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="QuestionEnergy" 
          component={QuestionEnergyScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Écrans de résultats */}
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen} 
          options={{ headerShown: false, gestureEnabled: false }} 
        />
        <Stack.Screen 
          name="Shortlist" 
          component={ShortlistScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ActivityDetail"
          component={ActivityDetailScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Écrans de raffinement */}
        <Stack.Screen
          name="RefinementQuestions"
          component={RefinementQuestionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ParticipantsQuestion"
          component={ParticipantsQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnvironmentQuestion"
          component={EnvironmentQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExperienceTypeQuestion"
          component={ExperienceTypeQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermanenceQuestion"
          component={PermanenceQuestionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RefinementLoading"
          component={RefinementLoadingScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        
        {/* Les autres écrans seront ajoutés au fur et à mesure du développement */}
        {/* 
        <Stack.Screen name="QuestionDetails" component={QuestionDetailsScreen} />
        <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
        <Stack.Screen name="RefinementQuestions" component={RefinementQuestionsScreen} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 