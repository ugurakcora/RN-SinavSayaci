import { ExamInfo } from "../types";

export interface ExamData extends ExamInfo {
  id: string;
  shortName: string;
  targetDate: Date;
  color: {
    primary: string;
    secondary: string;
  };
  icon: string;
  description: string;
}

export const EXAM_DATA: ExamData[] = [
  {
    id: "tyt",
    shortName: "TYT",
    name: "TYT (Temel Yeterlilik Testi)",
    targetDate: new Date("2026-06-20T10:00:00"),
    date: "20 Haziran 2026",
    duration: 165,
    questionCount: 120,
    subjects: ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilimler"],
    color: {
      primary: "#667eea",
      secondary: "#764ba2",
    },
    icon: "🎓",
    description: "Üniversite giriş sınavının ilk aşaması",
  },
  {
    id: "ayt",
    shortName: "AYT",
    name: "AYT (Alan Yeterlilik Testi)",
    targetDate: new Date("2026-06-21T10:00:00"),
    date: "21 Haziran 2026",
    duration: 180,
    questionCount: 80,
    subjects: [
      "Matematik",
      "Fen Bilimleri",
      "Sosyal Bilimler",
      "Türk Dili ve Edebiyatı",
    ],
    color: {
      primary: "#ff6b6b",
      secondary: "#ee5a52",
    },
    icon: "📚",
    description: "Üniversite giriş sınavının alan testi",
  },
  {
    id: "dgs",
    shortName: "DGS",
    name: "DGS (Dikey Geçiş Sınavı)",
    targetDate: new Date("2026-07-13T10:00:00"),
    date: "13 Temmuz 2026",
    duration: 150,
    questionCount: 120,
    subjects: ["Sayısal", "Sözel"],
    color: {
      primary: "#4ecdc4",
      secondary: "#44a08d",
    },
    icon: "🎯",
    description: "Önlisans mezunları için dikey geçiş sınavı",
  },
  {
    id: "kpss",
    shortName: "KPSS",
    name: "KPSS (Kamu Personeli Seçme Sınavı)",
    targetDate: new Date("2026-07-26T10:00:00"),
    date: "26 Temmuz 2026",
    duration: 180,
    questionCount: 120,
    subjects: [
      "Genel Kültür",
      "Genel Yetenek",
      "Eğitim Bilimleri",
      "Alan Bilgisi",
    ],
    color: {
      primary: "#a8e6cf",
      secondary: "#7fcdcd",
    },
    icon: "🏛️",
    description: "Kamu kurum ve kuruluşlarında çalışmak için",
  },
  {
    id: "ales",
    shortName: "ALES",
    name: "ALES (Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı)",
    targetDate: new Date("2026-04-26T10:00:00"),
    date: "26 Nisan 2026",
    duration: 180,
    questionCount: 80,
    subjects: ["Sayısal", "Sözel", "Eşit Ağırlık"],
    color: {
      primary: "#ffd93d",
      secondary: "#ff9a9e",
    },
    icon: "🎓",
    description: "Lisansüstü eğitim ve akademik personel için",
  },
  {
    id: "yds",
    shortName: "YDS",
    name: "YDS (Yabancı Dil Sınavı)",
    targetDate: new Date("2026-04-12T10:00:00"),
    date: "12 Nisan 2026",
    duration: 180,
    questionCount: 80,
    subjects: ["İngilizce", "Almanca", "Fransızca", "Rusça", "Arapça"],
    color: {
      primary: "#a8c8ec",
      secondary: "#7d5fff",
    },
    icon: "🌍",
    description: "Yabancı dil yeterlilik belgelendirme sınavı",
  },
];

export const getExamById = (id: string): ExamData | undefined => {
  return EXAM_DATA.find((exam) => exam.id === id);
};

export const getExamsByIds = (ids: string[]): ExamData[] => {
  return EXAM_DATA.filter((exam) => ids.includes(exam.id));
};

export const getUpcomingExams = (): ExamData[] => {
  const now = new Date();
  return EXAM_DATA.filter((exam) => exam.targetDate > now).sort(
    (a, b) => a.targetDate.getTime() - b.targetDate.getTime()
  );
};

export const getExamCountdown = (examId: string) => {
  const exam = getExamById(examId);
  if (!exam) return null;

  const now = new Date();
  const difference = exam.targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
};
