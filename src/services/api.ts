import { ApiResponse } from '../navigation/types';

const API_URL = 'https://where2-backend-production.up.railway.app';

/**
 * Service de communication avec l'API Where2
 */
export const suggestActivities = async (preferences: {
  canceledActivity: string;
  sameActivityType: boolean;
  budget: number;
  transportTime: number;
  energyLevel: number;
}): Promise<ApiResponse> => {
  try {
    // Convertir le niveau d'énergie de l'index (0-6) au niveau correspondant (1-7)
    const energyLevelAdjusted = preferences.energyLevel + 1;
    
    // Récupérer la position de l'utilisateur (pour le MVP, utiliser Paris)
    // Dans une version finale, utiliser Geolocation de React Native
    const userLocation = {
      lat: 48.8566,
      lng: 2.3522
    };

    // Convertir le booléen sameActivityType en valeur d'énumération
    const sameTypeValue = preferences.sameActivityType === true 
      ? 'yes' 
      : preferences.sameActivityType === false 
        ? 'no' 
        : 'indifferent';

    const response = await fetch(`${API_URL}/suggest-o3`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: {
          canceled_activity: preferences.canceledActivity,
          same_type: sameTypeValue,
          budget: preferences.budget,
          travel_time: preferences.transportTime,
          energy_level: energyLevelAdjusted,
        },
        location: userLocation,
        datetime: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API:', errorData);
      throw new Error('Erreur lors de la récupération des suggestions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error);
    throw error;
  }
};

/**
 * Service pour obtenir des suggestions raffinées avec des paramètres supplémentaires
 */
export const suggestRefinedActivities = async (preferences: {
  canceledActivity: string;
  sameActivityType: boolean;
  budget: number;
  transportTime: number;
  energyLevel: number;
  numberOfParticipants: number;
  environmentPreference: 'indoor' | 'outdoor' | 'indifferent';
  experienceType: 'authentic' | 'touristic' | 'indifferent';
  eventPermanence: 'ephemeral' | 'permanent' | 'indifferent';
}): Promise<ApiResponse> => {
  try {
    // Convertir le niveau d'énergie de l'index (0-6) au niveau correspondant (1-7)
    const energyLevelAdjusted = preferences.energyLevel + 1;
    
    // Récupérer la position de l'utilisateur (pour le MVP, utiliser Paris)
    const userLocation = {
      lat: 48.8566,
      lng: 2.3522
    };

    // Convertir le booléen sameActivityType en valeur d'énumération
    const sameTypeValue = preferences.sameActivityType === true 
      ? 'yes' 
      : preferences.sameActivityType === false 
        ? 'no' 
        : 'indifferent';

    const response = await fetch(`${API_URL}/suggest-o3`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: {
          canceled_activity: preferences.canceledActivity,
          same_type: sameTypeValue,
          budget: preferences.budget,
          travel_time: preferences.transportTime,
          energy_level: energyLevelAdjusted,
          // Paramètres supplémentaires de raffinement
          participants_count: preferences.numberOfParticipants,
          indoor_preference: preferences.environmentPreference,
          authentic_preference: preferences.experienceType,
          temporary_preference: preferences.eventPermanence,
        },
        location: userLocation,
        datetime: new Date().toISOString(),
        refine: true // Indicateur pour l'API que c'est une requête de raffinement
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API (raffinée):', errorData);
      throw new Error('Erreur lors de la récupération des suggestions raffinées');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API (raffinée):', error);
    throw error;
  }
};

/**
 * Vérification de l'état du serveur
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/healthz`);
    return response.ok;
  } catch (error) {
    console.error('Erreur de connexion au serveur:', error);
    return false;
  }
}; 