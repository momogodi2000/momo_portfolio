// scripts/create-icons.js - Créer des icônes PWA temporaires
const fs = require('fs');
const path = require('path');

const createSVGIcon = (size, text) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0284c7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" rx="20"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/4}" 
        font-weight="bold" fill="white" text-anchor="middle" 
        dominant-baseline="central">${text}</text>
</svg>`;

const createHTMLFile = (svgContent, size) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 20px; background: #f0f0f0; }
        .icon { width: ${size}px; height: ${size}px; }
    </style>
</head>
<body>
    <div class="icon">${svgContent}</div>
    <script>
        // Auto-download as PNG (requires manual save)
        const svg = document.querySelector('svg');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.height = ${size};
        
        const data = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const link = document.createElement('a');
            link.download = 'pwa-${size}x${size}.png';
            link.href = canvas.toDataURL();
            document.body.appendChild(link);
            console.log('Clic droit sur l\\'image -> Enregistrer sous... pwa-${size}x${size}.png');
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(data);
        document.body.appendChild(img);
    </script>
</body>
</html>`;

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Créer les fichiers HTML temporaires pour générer les icônes
const sizes = [192, 512];
const initials = 'MY'; // MOMO YVAN

sizes.forEach(size => {
    const svgContent = createSVGIcon(size, initials);
    const htmlContent = createHTMLFile(svgContent, size);
    const filename = `generate-icon-${size}.html`;
    
    fs.writeFileSync(path.join(publicDir, filename), htmlContent);
    console.log(`✅ Créé: public/${filename}`);
});

// Créer un fichier SVG de base pour favicon
const faviconSVG = createSVGIcon(32, 'MY');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG);

console.log(`
🎯 Instructions pour créer les icônes PWA:

1. Ouvrez votre navigateur
2. Naviguez vers http://localhost:5173/generate-icon-192.html
3. Clic droit sur l'image -> "Enregistrer l'image sous..."
4. Sauvegardez comme "pwa-192x192.png" dans le dossier public/
5. Répétez pour http://localhost:5173/generate-icon-512.html
6. Sauvegardez comme "pwa-512x512.png"
7. Copiez pwa-192x192.png et renommez en "apple-touch-icon.png"

Ou utilisez cette commande pour lancer le script:
node scripts/create-icons.js
`);

module.exports = { createSVGIcon };