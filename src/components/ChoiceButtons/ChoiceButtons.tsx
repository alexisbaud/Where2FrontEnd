import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface Choice {
  id: string;
  label: string;
}

interface ChoiceButtonsProps {
  choices: Choice[];
  selectedChoiceId?: string;
  onSelect: (choiceId: string) => void;
  style?: ViewStyle;
}

/**
 * Composant pour afficher des boutons de choix horizontaux ou verticaux
 */
const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  choices,
  selectedChoiceId,
  onSelect,
  style,
}) => {
  const isHorizontal = choices.length <= 3;
  
  return (
    <View 
      style={[
        styles.container, 
        isHorizontal ? styles.horizontal : styles.vertical,
        style
      ]}
    >
      {choices.map((choice) => {
        const isSelected = choice.id === selectedChoiceId;
        
        return (
          <TouchableOpacity
            key={choice.id}
            style={[
              styles.button,
              isHorizontal ? styles.horizontalButton : styles.verticalButton,
              isSelected && styles.selectedButton,
            ]}
            onPress={() => onSelect(choice.id)}
            activeOpacity={0.7}
          >
            <Text 
              style={[
                styles.label,
                isSelected && styles.selectedLabel
              ]}
            >
              {choice.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vertical: {
    flexDirection: 'column',
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  verticalButton: {
    marginBottom: spacing.sm,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    ...typography.body,
    textAlign: 'center',
  },
  selectedLabel: {
    color: colors.background,
    fontWeight: '600',
  },
});

export default ChoiceButtons;