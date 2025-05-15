import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import colors from '../../styles/colors';

// Import de l'image de la mascotte
const mascotImage = require('../../assets/mascot.png');

interface MascotProps {
  style?: ViewStyle;
  expression?: 'normal' | 'happy' | 'thinking' | 'confused';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Composant Mascotte - Élément central de l'interface utilisateur
 * Affiche la mascotte avec différentes tailles
 */
const Mascot: React.FC<MascotProps> = ({
  style,
  expression = 'normal',
  size = 'medium',
}) => {
  // Définition des tailles de mascotte
  const mascotSize = {
    small: 110,
    medium: 160,
    large: 240,
  };

  const actualSize = mascotSize[size];

  return (
    <View style={[styles.container, style]}>
      <Image
        source={mascotImage}
        style={{
          width: actualSize,
          height: actualSize,
          resizeMode: 'contain',
        }}
        accessibilityLabel="Mascotte Where2"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Mascot; 