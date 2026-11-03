# COP31 Akıllı Kampüs — etkileşimli sunum

Yozgat Bozok Üniversitesi COP31 Akıllı Kampüs sunumunun tek sayfalık web uyarlaması. Merkezdeki kampüs Three.js ile gerçek 3D olarak çizilir; diğer bilgi panelleri 2D, ikonlar katmanlı 2.5D görünümündedir.

## Çalıştırma

Node.js 20.19+ veya 22.12+ gerekir.

```powershell
npm install
npm run dev -- --port 4173
```

Tarayıcıda `http://localhost:4173/` adresini açın. Üretim derlemesi için `npm run build` komutunu kullanın; çıktı `dist/` klasörüne yazılır.

## Etkileşimler

- Kampüsü sürükleyerek döndürün, fare tekerleğiyle yakınlaştırın ve binaları seçin.
- Binalara bağlı bilgi kartlarını seçerek ilgili kaynağın örnek değerini panelde açın.
- Sol panelden veya üstteki 2.5D ikonlardan kaynak türünü seçin.
- Sağ panelde enerji için bugün, bu hafta ve bu ay grafiklerini; diğer kaynaklar için kendi yayımlanmış dağılımlarını inceleyin.
- Teknoloji bölümündeki 3D su sayacı ve ESP32-CAM modellerini sürükleyerek inceleyin.
- Modül kartları, sistem akışı, teknoloji ve hedefler bölümleri tek sayfada gezinilebilir.
- Sağ üstteki 🇹🇷 TR / 🇬🇧 EN düğmeleri bütün sunumu Türkçe veya İngilizce gösterir. Seçim tarayıcıda saklanır; İngilizce görünüm `?lang=en` ile paylaşılabilir.

## Veri notu

Mevcut kampüs etiketleri, sağ gösterge paneli ve kaynak grafiklerindeki değerler [yayınlanan Akıllı Kampüs sitesindeki](https://ruwqersia.is-a.dev/akilli-kampus/) 19 Ekim 2026 tarihli gösterim verilerinden 29 Ekim 2026'da alınmıştır. Kaynak sitenin incelenen istemci kodunda herkese açık veri API'si görünmediği için değerler otomatik güncellenmez. Gerçek sensör veya Power BI bağlantısı yapılandırılmamıştır. Sunumdaki hedefler gerçekleşmiş performans olarak gösterilmez.

3D sahne Boğazlıyan MYO'nun [resmî tanıtımında](https://bozok.edu.tr/Dosya/65b2aae1-0.pdf) belirtilen üç katlı ana bina, laboratuvarlar ve yeşil alanlardan esinlenen kavramsal bir gösterimdir. Gerçek yerleşkenin ölçülü mimari modeli değildir; çatı panelleri, sensörler ve ayrıştırma noktaları proje önerisini anlatır.
"# cop31sites" 
