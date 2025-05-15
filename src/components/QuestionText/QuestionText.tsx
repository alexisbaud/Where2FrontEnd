import React from 'react';
import { Text, StyleSheet } from 'react-native';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

interface QuestionTextProps {
  children: React.ReactNode;
  style?: any;
}

/**
 * Composant pour afficher le texte des questions avec un style cohérent
 */
const QuestionText: React.FC<QuestionTextProps> = ({ children, style }) => {
  return (
    <Text style={[styles.question, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  question: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'left',
    fontSize: 24, // Taille réduite par rapport à h2
    fontWeight: '600', // Moins gras que 'bold'
    lineHeight: 30, // Ajout d'un line-height approprié pour le texte
  },
});

export default QuestionText; 