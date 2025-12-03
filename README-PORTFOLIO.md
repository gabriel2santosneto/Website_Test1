# Portfolio Image Management

## Automatsko Učitavanje Slika iz Portfolio Foldera

Ovaj projekat sada automatski učitava sve slike iz `Porfolio` foldera umesto ručnog navođenja u kodu.

### Kako Funkcioniše

1. **generate-portfolio-list.js** - Node.js skripta koja skenira `Porfolio` folder i generiše JSON fajl sa svim slikama
2. **portfolio-images.json** - Automatski generisan fajl koji sadrži listu svih slika
3. **script.js** - Učitava slike dinamički iz JSON fajla

### Dodavanje Novih Slika

Kada želite da dodate nove slike u portfolio:

1. Jednostavno kopirajte slike u `Porfolio` folder
2. Pokrenite komandu za regenerisanje liste:
   ```bash
   npm run generate-images
   ```
   ili direktno:
   ```bash
   node generate-portfolio-list.js
   ```
3. Osvežite website u browseru - nove slike će automatski biti dostupne!

### Podržani Formati Slika

- JPG/JPEG
- PNG
- GIF
- WebP
- SVG

### Napomene

- Trenutno u folderu ima **101 slika**
- Slike se sortiraju alfabetski
- Ako dodate ili obrišete slike, obavezno ponovo pokrenite `npm run generate-images`
- JSON fajl se automatski generiše i ne treba ga ručno menjati

### Originalni Kod (Pre Izmene)

Pre ove izmene, slike su bile hardkodirane u script.js:
```javascript
const portfolioImages = [
  "Porfolio/robot1.png",
  "Porfolio/robot2.png",
  "Porfolio/image.png",
  "Porfolio/image copy.png",
  "Porfolio/name doesnt matter.png"
];
```

Sada se sve slike automatski učitavaju iz foldera! 🎉
