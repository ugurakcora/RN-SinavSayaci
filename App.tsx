import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Modal } from "react-native";
import { CountdownProvider } from "./src/context/CountdownContext";
import { SplashScreen } from "./src/components/SplashScreen";
import { MultiExamCountdown } from "./src/components/MultiExamCountdown";
import { ExamSelection } from "./src/components/ExamSelection";
import {
  getSelectedExams,
  saveSelectedExams,
  isFirstLaunch,
  setFirstLaunchCompleted,
} from "./src/utils/storage";
import { getExamsByIds } from "./src/utils/examData";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);
  const [isExamSelectionVisible, setIsExamSelectionVisible] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Minimum splash time için başlangıç zamanını kaydet
        const startTime = Date.now();

        // İlk açılış kontrolü
        const firstLaunch = await isFirstLaunch();
        setIsFirstTime(firstLaunch);

        // Kaydedilen sınav seçimlerini yükle
        const savedExams = await getSelectedExams();
        setSelectedExamIds(savedExams);

        // İlk açılış tamamlandı olarak işaretle
        if (firstLaunch) {
          await setFirstLaunchCompleted();
        }

        // Minimum 2 saniye splash screen göster
        const elapsedTime = Date.now() - startTime;
        const minSplashTime = 2000; // 2 saniye

        if (elapsedTime < minSplashTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minSplashTime - elapsedTime)
          );
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        // Hata durumunda varsayılan değerler
        setSelectedExamIds(["tyt"]);

        // Hata durumunda da minimum süre bekle
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        // Uygulama hazır olduğunu işaretle
        setIsAppInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  // Hem app initialize hem de splash complete olana kadar loading göster
  useEffect(() => {
    if (isAppInitialized && splashComplete) {
      setTimeout(() => {
        setIsLoading(false);
        // İlk açılışta sınav seçim ekranını göster
        if (isFirstTime) {
          setTimeout(() => {
            setIsExamSelectionVisible(true);
          }, 500);
        }
      }, 300);
    }
  }, [isAppInitialized, splashComplete, isFirstTime]);

  const handleExamSelectionChange = async (newSelectedExams: string[]) => {
    setSelectedExamIds(newSelectedExams);
    await saveSelectedExams(newSelectedExams);
  };

  const handleExamSelectionClose = () => {
    setIsExamSelectionVisible(false);
  };

  const handleExamSelectionPress = () => {
    setIsExamSelectionVisible(true);
  };

  // Loading state: Uygulama hazır değilse veya splash tamamlanmadıysa
  if (!isAppInitialized || isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      </View>
    );
  }

  const selectedExams = getExamsByIds(selectedExamIds);

  return (
    <CountdownProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <MultiExamCountdown
          selectedExams={selectedExams}
          onExamSelectionPress={handleExamSelectionPress}
        />

        <Modal
          visible={isExamSelectionVisible}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <ExamSelection
            selectedExams={selectedExamIds}
            onExamSelectionChange={handleExamSelectionChange}
            onClose={handleExamSelectionClose}
          />
        </Modal>
      </View>
    </CountdownProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
  },
});
