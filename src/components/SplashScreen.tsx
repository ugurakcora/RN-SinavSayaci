import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete();
  }, [onAnimationComplete]);

  useEffect(() => {
    // Animasyon sequence'i başlat
    Animated.sequence([
      // Fade in ve scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Progress bar animasyonu
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      // Küçük bir bekleme
      Animated.delay(300),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      handleAnimationComplete();
    });
  }, [fadeAnim, scaleAnim, progressAnim, handleAnimationComplete]);

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🎓</Text>
          <Text style={styles.logoText}>Sınav</Text>
          <Text style={styles.logoSubtext}>Sayacı</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.dateText}>Tüm Sınavlar</Text>
          <Text style={styles.motivationText}>Hayallerinize giden yol...</Text>
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#667eea",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 20,
    color: "#e0e0e0",
    fontWeight: "300",
    letterSpacing: 1,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 16,
    color: "#d0d0d0",
    fontStyle: "italic",
    textAlign: "center",
  },
  loadingContainer: {
    position: "absolute",
    bottom: 80,
    alignItems: "center",
    width: "100%",
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 16,
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: "#e0e0e0",
    fontWeight: "500",
  },
});
