import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Mascot from '../../components/Mascot';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';
import { RootStackParamList } from '../../navigation/types';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

/**
 * Écran d'onboarding qui présente l'application et la mascotte
 */
const OnboardingScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  
  // Contenu des étapes d'onboarding
  const slides = [
    {
      title: "Bienvenue sur\nWhere2",
      description: "L'app qui t'aide à rebondir\nquand une activité est annulée,\nsans stress ni galère.",
    },
    {
      title: "Ton compagnon\nmalin",
      description: "Je te pose juste quelques\nquestions, et tu repars avec une\nalternative à ton activité",
    },
    {
      title: "Des propositions\nrien que pour toi",
      description: "Tes réponses suffisent pour te\nproposer des idées qui collent à\nton humeur et ton budget.",
    }
  ];
  
  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true
      });
    } else {
      // Naviguer vers le premier écran de questions
      navigation.navigate('Questions');
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / cardWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };
  
  const renderSlide = ({ item }: { item: typeof slides[0], index: number }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.mascotContainer}>
            <Mascot size="large" expression="happy" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          
          <View style={styles.dotsContainer}>
            {slides.map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.dot, 
                  idx === activeIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.cardButtonContainer}>
          <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderSlide}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={true}
            contentContainerStyle={styles.flatListContent}
          />
          
          <View style={styles.buttonContainer}>
            {activeIndex < 2 ? (
              <TouchableOpacity 
                style={styles.linkButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.linkButtonText}>Aide-moi à trouver mon plan B !</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Aide-moi à trouver mon plan B !</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flatListContent: {
    alignItems: 'center',
  },
  cardContainer: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mascotContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  linkButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: 'transparent',
  },
  linkButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 50,
    width: width - 64,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: '600',
  },
});

export default OnboardingScreen; 