# 🎓 TYT Sınav Sayacı

**20 Haziran 2026** TYT sınavına kalan süreyi gösteren React Native uygulaması.

## 🚀 Özellikler

- 📅 **Gerçek Zamanlı Geri Sayım**: Gün, saat, dakika ve saniye olarak
- 🎨 **Animasyonlu Splash Screen**: Profesyonel açılış ekranı
- 💪 **Motivasyon Mesajları**: Günlük değişen ilham verici mesajlar
- 🎯 **Akıllı Mesaj Sistemi**: Sınav tarihine göre kategorilere ayrılmış mesajlar
- 🎨 **Modern UI**: Gradient arkaplan ve şık tasarım
- 📊 **Sınav Bilgileri**: TYT süresi ve soru sayısı bilgileri
- 🔄 **Otomatik Güncelleme**: Her saniye otomatik güncellenir
- 📱 **Responsive**: Tüm ekran boyutlarında uyumlu
- 🎬 **Smooth Animasyonlar**: Motivasyon mesajları için geçiş efektleri

## 🛠️ Teknolojiler

- **React Native** with **TypeScript**
- **Expo SDK 52**
- **Context API** (State Management)
- **Expo Linear Gradient**
- **Animated API** (Animations)
- **Custom Hook Pattern**

## 📦 Kurulum

```bash
# Projeyi klonlayın
git clone <repo-url>

# Proje dizinine gidin
cd sinav-sayaci

# Bağımlılıkları yükleyin
npm install

# Uygulamayı çalıştırın
npx expo start
```

## 🎯 Kullanım

### Mobil Uygulama

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### 💪 Motivasyon Mesajları

- **Günlük Otomatik**: Her gün farklı bir mesaj
- **Kategorili Sistem**: Sınav tarihine göre uygun mesajlar
- **Dokunmatik Yenileme**: Yeni mesaj için dokunun
- **Göster/Gizle**: Motivasyon bölümünü minimize edebilirsiniz

#### Mesaj Kategorileri:

- 🎯 **Başarı**: Sınav yaklaştığında
- 💪 **Kararlılık**: Uzun vadeli motivasyon
- 🧠 **Bilgelik**: Çalışma stratejileri
- 💖 **Cesaret**: Moral verici mesajlar
- 🎯 **Odaklanma**: Konsantrasyon artırıcı

## 📁 Proje Yapısı

```
sinav-sayaci/
├── src/
│   ├── components/
│   │   ├── CountdownTimer.tsx    # Ana geri sayım ekranı
│   │   └── SplashScreen.tsx      # Animasyonlu açılış ekranı
│   ├── context/
│   │   └── CountdownContext.tsx  # State management
│   ├── types/
│   │   └── index.ts              # TypeScript tipleri
│   └── utils/
│       ├── dateUtils.ts          # Tarih hesaplama fonksiyonları
│       └── motivationMessages.ts # Motivasyon mesajları sistemi
├── App.tsx                       # Ana uygulama
├── app.json                      # Expo konfigürasyonu
└── package.json                  # Dependencies
```

## 🎨 Tasarım

- **Ana Renk**: Mor-Mavi Gradient (#667eea → #764ba2)
- **Metin**: Beyaz ve açık gri tonları
- **Kartlar**: Transparan arka plan ve soft shadow
- **Animasyonlar**: Smooth fade ve scale efektleri
- **Responsive**: Tüm ekran boyutlarında uyumlu
- **Motivasyon**: Özel tasarımlanmış mesaj kutusu

## 📚 Sınav Bilgileri

**TYT (Temel Yeterlilik Testi)**

- 📅 Tarih: 20 Haziran 2026
- ⏰ Süre: 165 dakika
- 📝 Soru Sayısı: 120 adet
- 📖 Dersler: Türkçe, Matematik, Fen Bilimleri, Sosyal Bilimler

## 💪 Motivasyon Mesajları

Uygulama **20 özel motivasyon mesajı** içerir:

> "Hayallerinize giden yolda her adım önemlidir. TYT bu yolculuğun başlangıcı!"

> "Başarı tesadüf değildir. Hazırlık, sıkı çalışma ve hatalardan öğrenmektir."

> "Her gün biraz daha ileriye. Süreklilik başarının anahtarıdır."

_Ve daha fazlası..._

## 🔧 Geliştirme

```bash
# Geliştirme modunda çalıştır
npx expo start --dev-client

# Typescript kontrol
npx tsc --noEmit

# Lint kontrol
npx eslint src/
```

## 📱 Ekran Görüntüleri

### Ana Ekran

- 🏠 **Geri Sayım**: Büyük ve net gösterim
- 💪 **Motivasyon**: İnteraktif mesaj sistemi
- 📊 **Bilgiler**: TYT detayları

### Özellikler

- 🎬 **Splash Screen**: Profesyonel açılış animasyonu
- 🔄 **Gerçek Zamanlı**: Her saniye güncellenen sayaç
- 💫 **Animasyonlar**: Smooth geçiş efektleri

## 🎯 Gelecek Özellikler

- [ ] **Çoklu Sınav Desteği**: AYT, DGS, KPSS vb.
- [ ] **Bildirim Sistemi**: Sınav yaklaştığında uyarı
- [ ] **Konu Programı**: Günlük çalışma planı
- [ ] **İstatistikler**: Çalışma istatistikleri
- [ ] **Karanlık Tema**: Dark mode desteği
- [ ] **Sesli Bildirim**: Saat başı sesli hatırlatma
- [ ] **Özel Mesajlar**: Kullanıcı tanımlı motivasyon mesajları

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- **Expo Team** - Harika geliştirme deneyimi için
- **React Native** - Cross-platform framework için
- **TypeScript** - Type safety için

---

**Başarılar dileriz! 🎓📚**

> "Hayallerinize giden yolda her adım önemlidir. TYT sınavında başarılar!"
