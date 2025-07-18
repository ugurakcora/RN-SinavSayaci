import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EXAM_DATA, ExamData } from "../utils/examData";

interface ExamSelectionProps {
  selectedExams: string[];
  onExamSelectionChange: (selectedExams: string[]) => void;
  onClose: () => void;
}

export const ExamSelection: React.FC<ExamSelectionProps> = React.memo(
  ({ selectedExams, onExamSelectionChange, onClose }) => {
    const [tempSelectedExams, setTempSelectedExams] =
      useState<string[]>(selectedExams);

    const handleExamToggle = useCallback((examId: string) => {
      setTempSelectedExams((prev) => {
        if (prev.includes(examId)) {
          return prev.filter((id) => id !== examId);
        } else {
          return [...prev, examId];
        }
      });
    }, []);

    const handleSave = useCallback(() => {
      if (tempSelectedExams.length === 0) {
        Alert.alert("Uyarı", "En az bir sınav seçmelisiniz!", [
          { text: "Tamam", style: "default" },
        ]);
        return;
      }

      onExamSelectionChange(tempSelectedExams);
      onClose();
    }, [tempSelectedExams, onExamSelectionChange, onClose]);

    const handleSelectAll = useCallback(() => {
      const allExamIds = EXAM_DATA.map((exam) => exam.id);
      setTempSelectedExams(allExamIds);
    }, []);

    const handleDeselectAll = useCallback(() => {
      setTempSelectedExams([]);
    }, []);

    const examCards = useMemo(() => {
      return EXAM_DATA.map((exam) => (
        <MemoizedExamCard
          key={exam.id}
          exam={exam}
          isSelected={tempSelectedExams.includes(exam.id)}
          onToggle={() => handleExamToggle(exam.id)}
        />
      ));
    }, [tempSelectedExams, handleExamToggle]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sınav Seçimi</Text>
          <Text style={styles.subtitle}>
            Takip etmek istediğiniz sınavları seçin
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton} onPress={handleSelectAll}>
            <Text style={styles.actionButtonText}>Tümünü Seç</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleDeselectAll}>
            <Text style={styles.actionButtonText}>Tümünü Kaldır</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.examList}
          showsVerticalScrollIndicator={false}
        >
          {examCards}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>İptal</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              Kaydet ({tempSelectedExams.length} sınav)
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
);

interface ExamCardProps {
  exam: ExamData;
  isSelected: boolean;
  onToggle: () => void;
}

const ExamCard: React.FC<ExamCardProps> = React.memo(
  ({ exam, isSelected, onToggle }) => {
    const now = new Date();
    const isExpired = exam.targetDate < now;

    const cardContent = (
      <>
        <View style={styles.cardHeader}>
          <View style={styles.examInfo}>
            <Text style={styles.examIcon}>{exam.icon}</Text>
            <View style={styles.examDetails}>
              <Text
                style={[styles.examName, isSelected && styles.selectedText]}
              >
                {exam.shortName}
              </Text>
              <Text
                style={[styles.examFullName, isSelected && styles.selectedText]}
              >
                {exam.name}
              </Text>
            </View>
          </View>
          <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={[styles.examDate, isSelected && styles.selectedText]}>
            📅 {exam.date}
          </Text>
          <Text
            style={[styles.examDescription, isSelected && styles.selectedText]}
          >
            {exam.description}
          </Text>

          <View style={styles.examStats}>
            <Text style={[styles.stat, isSelected && styles.selectedText]}>
              ⏱️ {exam.duration} dk
            </Text>
            <Text style={[styles.stat, isSelected && styles.selectedText]}>
              📝 {exam.questionCount} soru
            </Text>
          </View>

          {isExpired && (
            <View style={styles.expiredBadge}>
              <Text style={styles.expiredText}>Süresi Dolmuş</Text>
            </View>
          )}
        </View>
      </>
    );

    return (
      <Pressable
        style={[styles.examCard, isSelected && styles.selectedCard]}
        onPress={onToggle}
      >
        {isSelected ? (
          <LinearGradient
            colors={[exam.color.primary, exam.color.secondary]}
            style={styles.cardGradient}
          >
            {cardContent}
          </LinearGradient>
        ) : (
          <View style={[styles.cardGradient, styles.unselectedCard]}>
            {cardContent}
          </View>
        )}
      </Pressable>
    );
  }
);

const MemoizedExamCard = React.memo(ExamCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  actionButton: {
    backgroundColor: "#667eea",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  examList: {
    flex: 1,
    padding: 16,
  },
  examCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCard: {
    transform: [{ scale: 1.02 }],
  },
  cardGradient: {
    padding: 16,
  },
  unselectedCard: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  examInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  examIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  examDetails: {
    flex: 1,
  },
  examName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  examFullName: {
    fontSize: 14,
    color: "#666",
  },
  selectedText: {
    color: "#fff",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  checkmark: {
    color: "#667eea",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContent: {
    gap: 8,
  },
  examDate: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  examDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  examStats: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  stat: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  expiredBadge: {
    backgroundColor: "#ff6b6b",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  expiredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6c757d",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 2,
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
