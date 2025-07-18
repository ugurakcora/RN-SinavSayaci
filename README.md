# 🎓 Sınav Sayacı

Türkiye'deki tüm önemli sınavlara kalan süreyi gösteren React Native uygulaması.

**Desteklenen Sınavlar**: TYT, AYT, DGS, KPSS, ALES, YDS, AGS

## 🚀 Özellikler

- 📅 **Çoklu Sınav Desteği**: TYT, AYT, DGS, KPSS, ALES, YDS, AGS
- ⏰ **Gerçek Zamanlı Geri Sayım**: Gün, saat, dakika ve saniye olarak
- 🎯 **Sınav Seçimi**: Kendi sınavlarınızı seçip takip edin
- 💾 **Kalıcı Saklama**: Seçimleriniz kaydedilir
- 🎨 **Animasyonlu Splash Screen**: Profesyonel açılış ekranı
- 💪 **Motivasyon Mesajları**: Günlük değişen ilham verici mesajlar
- 🎯 **Akıllı Mesaj Sistemi**: Sınav tarihine göre kategorilere ayrılmış mesajlar
- 🎨 **Modern UI**: Gradient arkaplan ve şık tasarım
- 📊 **Detaylı Sınav Bilgileri**: Her sınav için süre ve soru sayısı
- 🔄 **Otomatik Güncelleme**: Her saniye otomatik güncellenir
- 📱 **Responsive**: Tüm ekran boyutlarında uyumlu
- 🎬 **Smooth Animasyonlar**: Motivasyon mesajları için geçiş efektleri

## 🛠️ Teknolojiler

- **React Native** with **TypeScript**
- **Expo SDK 52**
- **Context API** (State Management)
- **AsyncStorage** (Data Persistence)
- **Expo Linear Gradient**
- **Animated API** (Animations)
- **Custom Hook Pattern**

## 📦 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/ugurakcora/RN-SinavSayaci.git

# Proje dizinine gidin
cd RN-SinavSayaci

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

### 📚 Sınav Seçimi

- **İlk Açılış**: Hangi sınavları takip edeceğinizi seçin
- **Çoklu Seçim**: Birden fazla sınav seçebilirsiniz
- **Ayarlar**: İstediğiniz zaman sınav seçimlerinizi değiştirebilirsiniz
- **Otomatik Kayıt**: Seçimleriniz otomatik olarak kaydedilir

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
│   │   ├── CountdownTimer.tsx       # Tekil geri sayım komponenti
│   │   ├── MultiExamCountdown.tsx   # Çoklu sınav gösterim ekranı
│   │   ├── ExamSelection.tsx        # Sınav seçim ekranı
│   │   └── SplashScreen.tsx         # Animasyonlu açılış ekranı
│   ├── context/
│   │   └── CountdownContext.tsx     # State management
│   ├── types/
│   │   └── index.ts                 # TypeScript tipleri
│   └── utils/
│       ├── dateUtils.ts             # Tarih hesaplama fonksiyonları
│       ├── examData.ts              # Sınav bilgileri ve tarihleri
│       ├── motivationMessages.ts    # Motivasyon mesajları sistemi
│       └── storage.ts               # AsyncStorage utility'leri
├── App.tsx                          # Ana uygulama
├── app.json                         # Expo konfigürasyonu
└── package.json                     # Dependencies
```

## 🎨 Tasarım

- **Ana Renk**: Mor-Mavi Gradient (#667eea → #764ba2)
- **Metin**: Beyaz ve açık gri tonları
- **Kartlar**: Transparan arka plan ve soft shadow
- **Animasyonlar**: Smooth fade ve scale efektleri
- **Responsive**: Tüm ekran boyutlarında uyumlu
- **Motivasyon**: Özel tasarımlanmış mesaj kutusu
- **Sınav Kartları**: Her sınav için özel renk ve ikon

## 📚 Sınav Bilgileri

### 🎓 TYT (Temel Yeterlilik Testi)

- 📅 Tarih: 20 Haziran 2026
- ⏰ Süre: 165 dakika
- 📝 Soru Sayısı: 120 adet
- 📖 Dersler: Türkçe, Matematik, Fen Bilimleri, Sosyal Bilimler

### 🎯 AYT (Alan Yeterlilik Testi)

- 📅 Tarih: 21 Haziran 2026
- ⏰ Süre: 180 dakika
- 📝 Soru Sayısı: 80 adet
- 📖 Dersler: Matematik, Fen Bilimleri, Sosyal Bilimler

### 📊 DGS (Dikey Geçiş Sınavı)

- 📅 Tarih: 6 Temmuz 2026
- ⏰ Süre: 150 dakika
- 📝 Soru Sayısı: 120 adet
- 📖 Dersler: Sayısal, Sözel

### 🏛️ KPSS (Kamu Personeli Seçme Sınavı)

- 📅 Tarih: 13 Temmuz 2026
- ⏰ Süre: 135 dakika
- 📝 Soru Sayısı: 120 adet
- 📖 Dersler: Genel Yetenek, Genel Kültür

### 🎓 ALES (Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı)

- 📅 Tarih: 12 Nisan 2026
- ⏰ Süre: 150 dakika
- 📝 Soru Sayısı: 80 adet
- 📖 Dersler: Sayısal, Sözel

### 🌍 YDS (Yabancı Dil Sınavı)

- 📅 Tarih: 19 Nisan 2026
- ⏰ Süre: 180 dakika
- 📝 Soru Sayısı: 80 adet
- 📖 Dersler: İngilizce, Almanca, Fransızca, Arapça

### 🎖️ AGS (Akademi Giriş Sınavı)

- 📅 Tarih: 15 Eylül 2026 (Henüz Kesin Değil)
- ⏰ Süre: 110 dakika
- 📝 Soru Sayısı: 80 adet
- 📖 Dersler: Türkçe, Matematik, Tarih, Coğrafya, Eğitim Bilimleri, Mevzuat

## 💪 Motivasyon Mesajları

Uygulama **20 özel motivasyon mesajı** içerir:

> "Hayallerinize giden yolda her adım önemlidir. Sınavlar bu yolculuğun başlangıcı!"

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

- 🏠 **Çoklu Geri Sayım**: Seçilen tüm sınavların gösterimi
- 💪 **Motivasyon**: İnteraktif mesaj sistemi
- 📊 **Detaylı Bilgiler**: Her sınav için özel bilgiler
- ⚙️ **Sınav Ayarları**: Kolay sınav seçimi

### Özellikler

- 🎬 **Splash Screen**: Profesyonel açılış animasyonu
- 🔄 **Gerçek Zamanlı**: Her saniye güncellenen sayaçlar
- 💫 **Animasyonlar**: Smooth geçiş efektleri
- 🎯 **Sınav Seçimi**: Kullanıcı dostu seçim ekranı

## 🎯 Gelecek Özellikler

- [x] **Çoklu Sınav Desteği**: TYT, AYT, DGS, KPSS, ALES, YDS, AGS ✅
- [ ] **Bildirim Sistemi**: Sınav yaklaştığında uyarı
- [ ] **Konu Programı**: Günlük çalışma planı
- [ ] **İstatistikler**: Çalışma istatistikleri
- [ ] **Karanlık Tema**: Dark mode desteği
- [ ] **Sesli Bildirim**: Saat başı sesli hatırlatma
- [ ] **Özel Mesajlar**: Kullanıcı tanımlı motivasyon mesajları
- [ ] **Sınav Notları**: Hedef puan ve strateji notları

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

> "Hayallerinize giden yolda her adım önemlidir. Hangi sınavı seçerseniz seçin, başarılar!"
