import React, { forwardRef, ForwardedRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface TextInputWithIconProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: React.ReactNode;
  onIconPress?: () => void;
  multiline?: boolean;
  autoFocus?: boolean;
  inputRef?: ForwardedRef<TextInput>;
}

/**
 * Composant de champ de texte avec icône à droite
 */
const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  icon,
  onIconPress,
  multiline = false,
  autoFocus = false,
  inputRef
}) => {
  // Icône circulaire simple
  const defaultIcon = (
    <View style={styles.microphoneIcon}>
      <View style={styles.microphoneInner} />
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.inactive}
        multiline={multiline}
        autoFocus={autoFocus}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={false}
        clearButtonMode="while-editing"
        enablesReturnKeyAutomatically
        editable
      />
      {(icon || onIconPress) && (
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={onIconPress}
          disabled={!onIconPress}
          activeOpacity={onIconPress ? 0.7 : 1}
        >
          {icon || defaultIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingRight: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  iconContainer: {
    padding: spacing.xs,
  },
  microphoneIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    backgroundColor: '#F5F5F5',
  },
});

export default TextInputWithIcon; 