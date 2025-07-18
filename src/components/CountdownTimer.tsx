import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCountdown } from "../context/CountdownContext";
import { formatTimeUnit } from "../utils/dateUtils";

const { width, height } = Dimensions.get("window");

export const CountdownTimer: React.FC = () => {
  const {
    examData,
    examInfo,
    currentMotivationMessage,
    getNewMotivationMessage,
  } = useCountdown();
  const [motivationVisible, setMotivationVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleMotivationPress = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      getNewMotivationMessage();
    }, 300);
  };

  const toggleMotivationVisibility = () => {
    setMotivationVisible(!motivationVisible);
  };

  if (examData.isExpired) {
    return (
      <LinearGradient colors={["#ff6b6b", "#ee5a52"]} style={styles.container}>
        <View style={styles.expiredContainer}>
          <Text style={styles.expiredTitle}>🎉 Sınav Günü Geldi! 🎉</Text>
          <Text style={styles.expiredMessage}>
            {examInfo.name} sınavı bugün!
          </Text>
          <Text style={styles.expiredMotivation}>
            Şimdi tüm hazırlığınızı ortaya koyma zamanı!
          </Text>
        </View>
      </LinearGradient>
    );
  }

  const { timeRemaining } = examData;

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.examTitle}>{examInfo.name}</Text>
        <Text style={styles.examDate}>{examInfo.date}</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timeUnitsContainer}>
          <TimeUnit value={timeRemaining.days} label="GÜN" />
          <TimeUnit value={timeRemaining.hours} label="SAAT" />
          <TimeUnit value={timeRemaining.minutes} label="DAKİKA" />
          <TimeUnit value={timeRemaining.seconds} label="SANİYE" />
        </View>
      </View>

      <View style={styles.examInfo}>
        <InfoItem label="Süre" value={`${examInfo.duration} dk`} />
        <InfoItem label="Soru Sayısı" value={`${examInfo.questionCount}`} />
      </View>

      {motivationVisible && (
        <Animated.View
          style={[styles.motivationContainer, { opacity: fadeAnim }]}
        >
          <View style={styles.motivationHeader}>
            <Text style={styles.motivationTitle}>💪 Günün Motivasyonu</Text>
            <Pressable
              onPress={toggleMotivationVisibility}
              style={styles.minimizeButton}
            >
              <Text style={styles.minimizeButtonText}>−</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={handleMotivationPress}
            style={styles.motivationMessageContainer}
          >
            <Text style={styles.motivationMessage}>
              "{currentMotivationMessage.message}"
            </Text>
            <Text style={styles.motivationHint}>
              💡 Yeni mesaj için dokunun
            </Text>
          </Pressable>
        </Animated.View>
      )}

      {!motivationVisible && (
        <Pressable
          onPress={toggleMotivationVisibility}
          style={styles.motivationToggle}
        >
          <Text style={styles.motivationToggleText}>💪 Motivasyon Mesajı</Text>
        </Pressable>
      )}
    </LinearGradient>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <View style={styles.timeUnit}>
    <View style={styles.timeValueContainer}>
      <Text style={styles.timeValue}>{formatTimeUnit(value)}</Text>
    </View>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  examTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  examDate: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
  },
  timerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  timeUnitsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  timeUnit: {
    alignItems: "center",
    minWidth: 70,
  },
  timeValueContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  examInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#e0e0e0",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  motivationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 20,
  },
  motivationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  minimizeButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  minimizeButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  motivationMessageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  motivationMessage: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 8,
    fontStyle: "italic",
  },
  motivationHint: {
    fontSize: 12,
    color: "#d0d0d0",
    textAlign: "center",
    opacity: 0.8,
  },
  motivationToggle: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
  },
  motivationToggleText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  expiredContainer: {
    alignItems: "center",
    padding: 40,
  },
  expiredTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  expiredMessage: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  expiredMotivation: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontStyle: "italic",
  },
});
