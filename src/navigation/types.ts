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
  Loading: { 
    canceledActivity: string; 
    sameActivityType: boolean; 
    budget: number; 
    transportTime: number;
    energyLevel: number;
  };
  Shortlist: { activities: Activity[] };
  ActivityDetail: { activity: Activity };
  QuestionDetails: { questionId: string };
  Recommendations: undefined;
  ActivityDetails: { activityId: string };
  RefinementQuestions: undefined;
  ParticipantsQuestion: undefined;
  EnvironmentQuestion: undefined;
  ExperienceTypeQuestion: undefined;
  PermanenceQuestion: undefined;
  RefinementLoading: {
    canceledActivity: string;
    sameActivityType: boolean;
    budget: number;
    transportTime: number;
    energyLevel: number;
    numberOfParticipants: number;
    environmentPreference: 'indoor' | 'outdoor' | 'indifferent';
    experienceType: 'authentic' | 'touristic' | 'indifferent';
    eventPermanence: 'ephemeral' | 'permanent' | 'indifferent';
  };
};

// Types pour les propriétés des écrans
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

// Types pour les données d'API
export interface Activity {
  id: string;
  title: string;
  description: string;
  price_eur: number;
  duration_min: number;
  duration_max: number;
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  distance_m: number;
  estimated_travel_time: number;
  travel_type: number; // 1 = marche, 2 = vélo, 3 = transport en commun, 4 = voiture
  indoor: boolean;
  authentic: boolean;
  temporary: boolean;
  tags: string[];
  rating_google?: number;
  reviews_count?: number;
  image_url: string | null;
  external_url?: string;
  is_free: boolean;
  is_student_free?: boolean;
  language?: string;
  open_hours?: {
    day: string;
    open: string;
    close: string;
  }[];
  date_special?: string | null;
  organizer?: string | null;
}

export interface ApiResponse {
  activities: Activity[];
  note: number;
  note_reasons: string;
} 