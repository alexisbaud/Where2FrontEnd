import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface MessageBubbleProps {
  message: string;
  type?: 'mascot' | 'user';
  style?: ViewStyle;
}

/**
 * Composant bulle de message pour les interactions avec la mascotte
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  type = 'mascot',
  style,
}) => {
  const textColor = type === 'mascot' ? colors.background : colors.text;
  
  return (
    <View
      style={[
        styles.container,
        type === 'mascot' ? styles.mascotBubble : styles.userBubble,
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.borderRadius * 2,
    padding: spacing.md,
    maxWidth: '80%',
    marginVertical: spacing.sm,
  },
  mascotBubble: {
    backgroundColor: colors.mascotPrimary,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: spacing.xs,
  },
  userBubble: {
    backgroundColor: colors.backgroundSecondary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: spacing.xs,
  },
  text: {
    ...typography.body,
  },
});

export default MessageBubble; 