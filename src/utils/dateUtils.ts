import { ExamCountdownData } from "../types";

export const TYT_EXAM_DATE = new Date("2026-06-20T10:00:00");

export const calculateTimeRemaining = (targetDate: Date): ExamCountdownData => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      targetDate,
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
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
    targetDate,
    timeRemaining: {
      days,
      hours,
      minutes,
      seconds,
    },
    isExpired: false,
  };
};

export const formatTimeUnit = (value: number): string => {
  return value.toString().padStart(2, "0");
};

export const getTurkishDate = (date: Date): string => {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
