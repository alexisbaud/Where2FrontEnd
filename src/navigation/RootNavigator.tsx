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
        
        {/* Les autres écrans seront ajoutés au fur et à mesure du développement */}
        {/* 
        <Stack.Screen name="QuestionDetails" component={QuestionDetailsScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
        <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
        <Stack.Screen name="RefinementQuestions" component={RefinementQuestionsScreen} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 