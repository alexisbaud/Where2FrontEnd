import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle,
  TextStyle
} from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface ChoiceButtonProps {
  title: string;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Bouton de choix pour les questions binaires (Oui/Non)
 */
const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  title,
  onPress,
  selected = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected && styles.selectedButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.text, 
          selected && styles.selectedText,
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.background,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
    minHeight: 120,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 0,
    borderColor: colors.border,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    borderColor: colors.primary,
  },
  text: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.background,
    fontWeight: '500',
  },
});

export default ChoiceButton; 