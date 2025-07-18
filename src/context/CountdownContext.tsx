import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  CountdownContextType,
  ExamCountdownData,
  ExamInfo,
  MotivationMessage,
} from "../types";
import {
  calculateTimeRemaining,
  TYT_EXAM_DATE,
  getTurkishDate,
} from "../utils/dateUtils";
import {
  getDailyMotivationMessage,
  getMotivationMessageByTimeLeft,
} from "../utils/motivationMessages";

const CountdownContext = createContext<CountdownContextType | undefined>(
  undefined
);

const TYT_EXAM_INFO: ExamInfo = {
  name: "TYT (Temel Yeterlilik Testi)",
  date: getTurkishDate(TYT_EXAM_DATE),
  duration: 165, // 165 dakika
  questionCount: 120,
  subjects: ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilimler"],
};

interface CountdownProviderProps {
  children: React.ReactNode;
}

export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children,
}) => {
  const [examData, setExamData] = useState<ExamCountdownData>(() =>
    calculateTimeRemaining(TYT_EXAM_DATE)
  );

  const [currentMotivationMessage, setCurrentMotivationMessage] =
    useState<MotivationMessage>(() => getDailyMotivationMessage());

  const updateCountdown = useCallback(() => {
    const newData = calculateTimeRemaining(TYT_EXAM_DATE);
    setExamData(newData);
  }, []);

  const resetCountdown = useCallback(() => {
    setExamData(calculateTimeRemaining(TYT_EXAM_DATE));
  }, []);

  const getNewMotivationMessage = useCallback(() => {
    const newData = calculateTimeRemaining(TYT_EXAM_DATE);
    const newMessage = getMotivationMessageByTimeLeft(
      newData.timeRemaining.days
    );
    setCurrentMotivationMessage(newMessage);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  // Her 30 dakikada bir motivasyon mesajını güncelle
  useEffect(() => {
    const motivationInterval = setInterval(
      getNewMotivationMessage,
      30 * 60 * 1000
    );
    return () => clearInterval(motivationInterval);
  }, [getNewMotivationMessage]);

  const value: CountdownContextType = {
    examData,
    examInfo: TYT_EXAM_INFO,
    currentMotivationMessage,
    updateCountdown,
    resetCountdown,
    getNewMotivationMessage,
  };

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = (): CountdownContextType => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};
