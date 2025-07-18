export interface ExamCountdownData {
  targetDate: Date;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isExpired: boolean;
}

export interface ExamInfo {
  name: string;
  date: string;
  duration: number; // dakika cinsinden
  questionCount: number;
  subjects: string[];
}

export interface MotivationMessage {
  id: string;
  message: string;
  author?: string;
  category: "success" | "determination" | "wisdom" | "encouragement" | "focus";
}

export interface CountdownContextType {
  examData: ExamCountdownData;
  examInfo: ExamInfo;
  currentMotivationMessage: MotivationMessage;
  updateCountdown: () => void;
  resetCountdown: () => void;
  getNewMotivationMessage: () => void;
}
