// APK'nın açacağı adresi (GitHub Pages) ayarlar. GitHub Actions bunu otomatik çalıştırır.
const fs = require('fs');
const url = process.env.APP_URL;
if (!url) { console.error('APP_URL tanımlı değil'); process.exit(1); }
const cfg = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));
cfg.server.url = url;
fs.writeFileSync('capacitor.config.json', JSON.stringify(cfg, null, 2));
for (const f of ['www/offline.html', 'www/index.html']) {
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').split('__APP_URL__').join(url));
}
console.log('Uygulama adresi:', url);
