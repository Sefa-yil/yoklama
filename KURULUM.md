# Yoklama uygulaması: kurulum rehberi

Bu klasör; Android uygulamasını (APK), uygulamanın internet sürümünü ve veritabanı kurallarını içerir.
Toplam kurulum yaklaşık 30 dakika sürer ve bilgisayardan yapılır. Hiçbir program kurmanız gerekmez.

## Nasıl çalışıyor

- **Firebase** (Google, ücretsiz): Dersler, binalar, bölümler, hocalar ve yoklamalar burada durur. Giriş ve şifre kontrolünü de Firebase yapar.
- **GitHub** (ücretsiz): Uygulamanın ekranlarını internette yayınlar ve APK dosyasını sizin yerinize üretir.
- **APK**: Telefona kurulan uygulama, açıldığında ekranları GitHub'dan, verileri Firebase'den çeker.

Güncellemeler:
- Ders, bina, bölüm, hoca değişiklikleri: uygulamanın Yönetim sekmesinden yaparsınız, herkeste **anında** görünür.
- Ekran ve tasarım değişiklikleri: `web/` klasöründeki dosyayı GitHub'da güncellersiniz, 1–2 dakika içinde **herkesin telefonunda** yenilenir. APK'yı yeniden kurmak gerekmez.

---

## 1. Firebase kurulumu

1. https://console.firebase.google.com adresine Google hesabınızla girin, **Proje ekle** deyin. Google Analytics'i kapatabilirsiniz.
2. Sol menü **Build > Authentication > Başlayın**. **E-posta/Şifre** yöntemini etkinleştirin.
3. **Users** sekmesinde **Kullanıcı ekle** ile kendi e-posta adresinizi ve şifrenizi girin. Listede görünen **Kullanıcı UID** değerini kopyalayın.
4. Sol menü **Build > Firestore Database > Veritabanı oluştur**. Konum olarak `eur3 (Europe)` seçin, **üretim modunda** başlatın.
5. Firestore'da **Kurallar (Rules)** sekmesini açın, bu klasördeki `firestore.rules` dosyasının içeriğini olduğu gibi yapıştırın ve **Yayınla** deyin.
6. **Veri (Data)** sekmesinde **Koleksiyon başlat**:
   - Koleksiyon kimliği: `roller`
   - Belge kimliği: 3. adımda kopyaladığınız UID
   - Alan: `rol`, tür: string, değer: `yonetici`
7. Sol üstte dişli simgesi > **Proje ayarları > Genel > Uygulamalarınız** bölümünde web simgesine (`</>`) tıklayın, bir ad verip kaydedin. Ekranda çıkan `firebaseConfig` değerlerini bir kenara kopyalayın.

## 2. GitHub kurulumu

1. https://github.com adresinde ücretsiz hesap açın.
2. Sağ üstte **+ > New repository**. Ad: `yoklama`, görünürlük: **Public**, **Create repository**.
3. Açılan sayfada **uploading an existing file** bağlantısına tıklayın. Bu klasördeki **tüm dosya ve klasörleri** sürükleyip bırakın, **Commit changes** deyin.
   - `.github` klasörü gizli olabilir. Mac'te Finder'da `Cmd + Shift + .` ile görünür yapın. Bu klasör olmadan APK üretilmez.
4. GitHub'da `web/firebase-config.js` dosyasını açın, kalem simgesiyle düzenleyin, Firebase'den kopyaladığınız değerleri yazın, **Commit changes** deyin.
5. **Settings > Pages** sayfasında **Source** olarak **GitHub Actions** seçin.
6. **Actions** sekmesine gidin. Soldan **Uygulamayı yayınla (web)** seçip **Run workflow** deyin. Ardından **APK oluştur** için de **Run workflow** deyin. İkisi yeşil tik alınca hazırsınız (APK yaklaşık 5 dakika sürer).

## 3. APK'yı indirme ve paylaşma

- Depo sayfasının sağındaki **Releases** bölümünde `yoklama.apk` dosyası bulunur.
- Herkesle paylaşacağınız kalıcı bağlantı: `https://github.com/KULLANICI-ADINIZ/yoklama/releases/latest`
- Telefonda dosyayı indirip açın. Android "bilinmeyen kaynaklardan yükleme" izni isterse verin.

İlk açılışta **Giriş** sekmesinden kendi hesabınızla girin. Yönetim sekmesi görünür; veritabanı boşsa **Örnek verileri yükle** ile deneme verisi ekleyebilir, sonra kendi bölüm, bina ve derslerinizi girebilirsiniz.

## 4. Kim ne görür

| Kişi | Giriş | Görebildikleri |
|---|---|---|
| Öğrenci / misafir | Gerekmez | Hocalar (kim nerede derste), bölüm programları |
| Hoca | E-posta + şifre | Yukarıdakiler + öğrenci listeleri ve yoklama alma |
| Yönetici (siz) | E-posta + şifre | Hepsi + ders, bina, bölüm, hoca düzenleme |

**Hoca hesabı açmak:** Firebase > Authentication > Kullanıcı ekle ile hocanın e-postasını ve geçici şifresini girin. UID'sini kopyalayın, Firestore'da `roller` koleksiyonuna o UID ile bir belge ekleyip `rol` = `hoca` yazın. Hoca uygulamada "Şifremi unuttum" ile kendi şifresini belirleyebilir.

Öğrenci listeleri ve yoklamalar sadece hoca ve yöneticilere açıktır; bu kural Firebase sunucusunda uygulanır.

## 5. Güncelleme

- **Veri:** Uygulamada Yönetim sekmesinden. Herkeste anında değişir.
- **Ekranlar:** GitHub'da `web/index.html` dosyasını düzenleyin. Kaydettiğinizde otomatik yayınlanır, telefonlar uygulamayı bir sonraki açışta yeni hali gösterir.
- **APK'nın kendisi** (uygulama adı, paket bilgisi) çok nadiren değişir. Değiştiğinde **APK oluştur** yeniden çalışır; bu durumda telefonlardaki eski uygulamayı silip yenisini kurmak gerekir.

## Notlar

- `firebase-config.js` içindeki bilgiler gizli değildir; Firebase bunları herkese açık olacak şekilde tasarlamıştır. Güvenliği `firestore.rules` sağlar.
- Firebase'in ücretsiz planı (günde 50.000 okuma, 20.000 yazma) bir okul için genellikle yeterlidir.
- İleride Google Play'de yayınlamak isterseniz imzalı sürüm (release) ayarı eklenebilir.
