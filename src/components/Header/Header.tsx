import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

/**
 * Composant Header réutilisable avec bouton de retour optionnel
 */
const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    width: '100%',
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text,
  },
  title: {
    ...typography.h3,
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Pour compenser le bouton retour et centrer le titre
  },
});

export default Header; 