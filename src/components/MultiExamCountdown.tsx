import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCountdown } from "../context/CountdownContext";
import { formatTimeUnit } from "../utils/dateUtils";
import { getExamCountdown } from "../utils/examData";
import { ExamData } from "../utils/examData";

const { width } = Dimensions.get("window");

interface MultiExamCountdownProps {
  selectedExams: ExamData[];
  onExamSelectionPress: () => void;
}

export const MultiExamCountdown: React.FC<MultiExamCountdownProps> = React.memo(
  ({ selectedExams, onExamSelectionPress }) => {
    const { currentMotivationMessage, getNewMotivationMessage } =
      useCountdown();
    const [motivationVisible, setMotivationVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Gerçek zamanlı güncellemeler için optimize edilmiş
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const handleMotivationPress = useCallback(() => {
      getNewMotivationMessage();
    }, [getNewMotivationMessage]);

    const toggleMotivationVisibility = useCallback(() => {
      setMotivationVisible((prev) => !prev);
    }, []);

    const { upcomingExams, expiredExams } = useMemo(() => {
      const upcoming = selectedExams
        .filter((exam) => {
          const countdown = getExamCountdown(exam.id);
          return countdown && !countdown.isExpired;
        })
        .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

      const expired = selectedExams.filter((exam) => {
        const countdown = getExamCountdown(exam.id);
        return countdown && countdown.isExpired;
      });

      return { upcomingExams: upcoming, expiredExams: expired };
    }, [selectedExams]);

    if (selectedExams.length === 0) {
      return (
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyIcon}>🎓</Text>
          <Text style={styles.emptyTitle}>Henüz sınav seçmediniz</Text>
          <Text style={styles.emptyText}>
            Takip etmek istediğiniz sınavları seçmek için aşağıdaki butona
            tıklayın
          </Text>
          <Pressable style={styles.selectButton} onPress={onExamSelectionPress}>
            <Text style={styles.selectButtonText}>📚 Sınav Seç</Text>
          </Pressable>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Sınav Takip Sistemi</Text>
          <Pressable style={styles.editButton} onPress={onExamSelectionPress}>
            <Text style={styles.editButtonText}>⚙️ Düzenle</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {upcomingExams.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                🔥 Yaklaşan Sınavlar ({upcomingExams.length})
              </Text>
              {upcomingExams.map((exam) => (
                <MemoizedExamCountdownCard key={exam.id} exam={exam} />
              ))}
            </View>
          )}

          {expiredExams.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                ✅ Geçmiş Sınavlar ({expiredExams.length})
              </Text>
              {expiredExams.map((exam) => (
                <MemoizedExpiredExamCard key={exam.id} exam={exam} />
              ))}
            </View>
          )}

          {motivationVisible && (
            <View style={styles.motivationContainer}>
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
            </View>
          )}

          {!motivationVisible && (
            <Pressable
              onPress={toggleMotivationVisibility}
              style={styles.motivationToggle}
            >
              <Text style={styles.motivationToggleText}>
                💪 Motivasyon Mesajı
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </LinearGradient>
    );
  }
);

interface ExamCountdownCardProps {
  exam: ExamData;
}

const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({ exam }) => {
  const countdown = getExamCountdown(exam.id);

  if (!countdown || countdown.isExpired) {
    return null;
  }

  const { days, hours, minutes, seconds } = countdown;

  return (
    <View style={styles.examCard}>
      <LinearGradient
        colors={[exam.color.primary, exam.color.secondary]}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.examIcon}>{exam.icon}</Text>
          <View style={styles.examInfo}>
            <Text style={styles.examName}>{exam.shortName}</Text>
            <Text style={styles.examDate}>{exam.date}</Text>
          </View>
        </View>

        <View style={styles.countdownContainer}>
          <View style={styles.timeUnits}>
            <TimeUnit value={days} label="GÜN" />
            <TimeUnit value={hours} label="SAAT" />
            <TimeUnit value={minutes} label="DK" />
            <TimeUnit value={seconds} label="SN" />
          </View>
        </View>

        <View style={styles.examStats}>
          <Text style={styles.stat}>⏱️ {exam.duration} dk</Text>
          <Text style={styles.stat}>📝 {exam.questionCount} soru</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const MemoizedExamCountdownCard = React.memo(ExamCountdownCard);

interface ExpiredExamCardProps {
  exam: ExamData;
}

const ExpiredExamCard: React.FC<ExpiredExamCardProps> = ({ exam }) => {
  return (
    <View style={styles.expiredCard}>
      <View style={styles.expiredHeader}>
        <Text style={styles.expiredIcon}>{exam.icon}</Text>
        <View style={styles.expiredInfo}>
          <Text style={styles.expiredName}>{exam.shortName}</Text>
          <Text style={styles.expiredDate}>{exam.date}</Text>
        </View>
        <View style={styles.expiredBadge}>
          <Text style={styles.expiredBadgeText}>Tamamlandı</Text>
        </View>
      </View>
    </View>
  );
};

const MemoizedExpiredExamCard = React.memo(ExpiredExamCard);

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = React.memo(({ value, label }) => (
  <View style={styles.timeUnit}>
    <Text style={styles.timeValue}>{formatTimeUnit(value)}</Text>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  selectButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectButtonText: {
    color: "#667eea",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  examCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  examIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  examInfo: {
    flex: 1,
  },
  examName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  examDate: {
    fontSize: 14,
    color: "#f0f0f0",
  },
  countdownContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  timeUnits: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeUnit: {
    alignItems: "center",
  },
  timeValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: "#f0f0f0",
    fontWeight: "600",
  },
  examStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    fontSize: 14,
    color: "#f0f0f0",
    fontWeight: "500",
  },
  expiredCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  expiredHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiredIcon: {
    fontSize: 24,
    marginRight: 12,
    opacity: 0.7,
  },
  expiredInfo: {
    flex: 1,
  },
  expiredName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  expiredDate: {
    fontSize: 14,
    color: "#d0d0d0",
  },
  expiredBadge: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expiredBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  motivationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 20,
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
});
