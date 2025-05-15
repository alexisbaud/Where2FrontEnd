# Documentation du flux de questions Where2

Ce document présente toutes les questions posées par l'application Where2 et les possibilités de réponses associées.

## Flux de questions

L'application pose une série de questions à l'utilisateur pour générer des suggestions d'activités personnalisées après l'annulation d'une activité prévue.

### 1. Activité annulée

**Question :** Quelle activité devais-tu faire ?

**Possibilités de réponse :**
- Champ de texte libre où l'utilisateur peut saisir n'importe quelle activité
- Exemples : "Concert", "Cinéma", "Restaurant avec des amis", "Musée", "Match de foot", etc.
- L'utilisateur peut saisir manuellement ou utiliser l'icône de microphone (fonctionnalité actuellement désactivée)

**Comportement :**
- Le bouton "Suivant" est désactivé tant que le champ est vide
- Pas de limite de caractères, mais l'idéal est une description concise

### 2. Type d'activité

**Question :** Souhaites-tu faire le même type d'activité ?

**Possibilités de réponse :**
- Choix binaire : "Oui" ou "Non"
- Sélection exclusive (un seul choix possible)

**Comportement :**
- Le bouton "Suivant" est désactivé tant qu'aucun choix n'est fait
- La sélection est indiquée visuellement (bouton orange avec texte blanc)

### 3. Budget

**Question :** Combien veux-tu dépenser pour cette nouvelle activité ?

**Possibilités de réponse :**
- Slider continu allant de 0€ à 100€
- Valeurs spéciales :
  - 0€ : "Pas de budget"
  - 100€ : "Peu importe"
  - Valeurs intermédiaires : affichées en "X€ max"

**Comportement :**
- Valeur par défaut : 50€
- Le bouton "Suivant" est toujours actif (une valeur est toujours sélectionnée)

### 4. Transport

**Question :** Quel est le temps maximum de transport que tu veux faire ?

**Possibilités de réponse :**
- Slider continu allant de 5 minutes à 1 heure
- Affichage adaptatif :
  - 5 min : "5 minutes"
  - 60 min : "1 heure"
  - Valeurs intermédiaires : "X minutes"

**Comportement :**
- Valeur par défaut : 20 minutes
- Le bouton "Suivant" est toujours actif (une valeur est toujours sélectionnée)

### 5. Niveau d'énergie

**Question :** As-tu de l'énergie pour ta nouvelle superbe activité ?

**Possibilités de réponse :**
- Slider discret avec 7 niveaux d'énergie :
  1. "Je vais faire un malaise"
  2. "Je suis épuisé(e)"
  3. "Je manque d'énergie"
  4. "Ça peut aller"
  5. "Je me sens bien"
  6. "J'ai la pêche"
  7. "Je suis en pleine forme"

**Comportement :**
- Valeur par défaut : "Ça peut aller" (niveau 4)
- Indicateurs visuels (points) montrant les 7 niveaux possibles
- Le bouton "Suivant" est toujours actif (une valeur est toujours sélectionnée)

## Traitement des réponses

Une fois toutes les questions répondues, l'application génère des suggestions personnalisées en tenant compte :
- De l'activité annulée
- De la préférence pour le même type d'activité ou non
- Du budget maximum
- Du temps de transport acceptable
- Du niveau d'énergie de l'utilisateur

Ces informations sont envoyées à un modèle d'IA qui propose des activités alternatives pertinentes adaptées aux préférences de l'utilisateur.

## Format des données collectées

Les données sont structurées comme suit pour les requêtes à l'API :

```typescript
interface UserPreferences {
  canceledActivity: string;         // Texte saisi par l'utilisateur
  sameActivityType: boolean;        // Oui (true) ou Non (false)
  budget: number;                   // Valeur de 0 à 100
  transportTime: number;            // Valeur de 5 à 60 minutes
  energyLevel: string;              // Un des 7 niveaux d'énergie (texte)
}
``` 