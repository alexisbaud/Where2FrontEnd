import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Types pour la navigation principale
export type RootStackParamList = {
  Onboarding: undefined;
  Questions: undefined;
  QuestionChoice: { canceledActivity: string };
  QuestionBudget: { canceledActivity: string; sameActivityType: boolean };
  QuestionTransport: { canceledActivity: string; sameActivityType: boolean; budget: number };
  QuestionEnergy: { canceledActivity: string; sameActivityType: boolean; budget: number; transportTime: number };
  QuestionDetails: { questionId: string };
  Recommendations: undefined;
  ActivityDetails: { activityId: string };
  RefinementQuestions: undefined;
};

// Types pour les propriétés des écrans
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>; 