/**
 * Styles de typographie de l'application Where2
 */

import { StyleSheet } from 'react-native';
import colors from './colors';

const typography = StyleSheet.create({
  // Titres
  h1: {
    fontFamily: 'SF Pro',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.35,
  },
  h2: {
    fontFamily: 'SF Pro',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.33,
  },
  h3: {
    fontFamily: 'SF Pro',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.3,
  },
  
  // Corps de texte
  body: {
    fontFamily: 'SF Pro Text',
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.text,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.text,
    letterSpacing: 0.22,
  },
  
  // Boutons et CTA
  buttonLabel: {
    fontFamily: 'SF Pro',
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    letterSpacing: 0.25,
  },
  
  // Éléments secondaires
  caption: {
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.text,
    letterSpacing: 0.2,
  }
});

export default typography; 