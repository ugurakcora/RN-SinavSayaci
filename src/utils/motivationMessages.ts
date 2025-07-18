export interface MotivationMessage {
  id: string;
  message: string;
  author?: string;
  category: "success" | "determination" | "wisdom" | "encouragement" | "focus";
}

export const motivationMessages: MotivationMessage[] = [
  {
    id: "tyt-1",
    message:
      "Hayallerinize giden yolda her adım önemlidir. TYT bu yolculuğun başlangıcı!",
    category: "encouragement",
  },
  {
    id: "tyt-2",
    message:
      "Başarı tesadüf değildir. Hazırlık, sıkı çalışma ve hatalardan öğrenmektir.",
    category: "wisdom",
  },
  {
    id: "tyt-3",
    message: "Her gün biraz daha ileriye. Süreklilik başarının anahtarıdır.",
    category: "determination",
  },
  {
    id: "tyt-4",
    message:
      "Zorluklarla karşılaştığınızda hatırlayın: Elmas da basınç altında oluşur.",
    category: "encouragement",
  },
  {
    id: "tyt-5",
    message:
      "Matematik, Türkçe, Fen ve Sosyal... Her ders geleceğinizin bir tuğlası.",
    category: "focus",
  },
  {
    id: "tyt-6",
    message:
      "Kendinize inanın. Eğer rüya kurabiliyorsanız, başarabilirsiniz de.",
    category: "success",
  },
  {
    id: "tyt-7",
    message:
      "TYT sadece bir sınav değil, disiplin ve kararlılığınızın göstergesi.",
    category: "wisdom",
  },
  {
    id: "tyt-8",
    message: "Her soru çözdüğünüzde, hedefinize bir adım daha yaklaşıyorsunuz.",
    category: "determination",
  },
  {
    id: "tyt-9",
    message: "Şüphe ettiğiniz anlarda, buraya kadar geldiğinizi hatırlayın.",
    category: "encouragement",
  },
  {
    id: "tyt-10",
    message: "Konsantre olun, hedefinizi görün ve asla pes etmeyin!",
    category: "focus",
  },
  {
    id: "tyt-11",
    message: "Bugün yapamadığınız şey, yarın yapabileceğiniz şey olabilir.",
    category: "encouragement",
  },
  {
    id: "tyt-12",
    message: "Bilgi güçtür, çalışmak ise bu gücü elde etmenin yoludur.",
    category: "wisdom",
  },
  {
    id: "tyt-13",
    message: "Her yanlış yanıt, doğru yanıta giden yoldaki bir adımdır.",
    category: "determination",
  },
  {
    id: "tyt-14",
    message: "Zaman değerlidir, ama doğru kullanıldığında çok daha değerlidir.",
    category: "focus",
  },
  {
    id: "tyt-15",
    message: "Büyük başarılar, küçük adımlarla başlar. Bugün atın o adımı!",
    category: "success",
  },
  {
    id: "tyt-16",
    message: "TYT size sınır koymaz, siz kendinize sınır koyuyorsunuz.",
    category: "wisdom",
  },
  {
    id: "tyt-17",
    message:
      "Motivasyonunuz sizi başlatır, alışkanlıklarınız sizi devam ettirir.",
    category: "determination",
  },
  {
    id: "tyt-18",
    message: "Her çalışma seansı, geleceğinizin inşa taşlarından biridir.",
    category: "focus",
  },
  {
    id: "tyt-19",
    message: "İmkansız olan şey, henüz denenmemiş olan şeydir.",
    category: "encouragement",
  },
  {
    id: "tyt-20",
    message: "Başarı, hazırlık fırsatla buluştuğunda ortaya çıkar.",
    category: "success",
  },
];

export const getRandomMotivationMessage = (): MotivationMessage => {
  const randomIndex = Math.floor(Math.random() * motivationMessages.length);
  return motivationMessages[randomIndex];
};

export const getDailyMotivationMessage = (): MotivationMessage => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const messageIndex = dayOfYear % motivationMessages.length;
  return motivationMessages[messageIndex];
};

export const getMotivationMessageByCategory = (
  category: MotivationMessage["category"]
): MotivationMessage => {
  const categoryMessages = motivationMessages.filter(
    (msg) => msg.category === category
  );
  const randomIndex = Math.floor(Math.random() * categoryMessages.length);
  return categoryMessages[randomIndex];
};

export const getMotivationMessageByTimeLeft = (
  daysLeft: number
): MotivationMessage => {
  if (daysLeft > 365) {
    return getMotivationMessageByCategory("determination");
  } else if (daysLeft > 180) {
    return getMotivationMessageByCategory("focus");
  } else if (daysLeft > 90) {
    return getMotivationMessageByCategory("encouragement");
  } else if (daysLeft > 30) {
    return getMotivationMessageByCategory("wisdom");
  } else {
    return getMotivationMessageByCategory("success");
  }
};
