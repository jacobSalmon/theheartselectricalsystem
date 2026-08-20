# The Heart's Electrical System — website

Statisk website. Almindelig HTML, CSS og en enkelt lille JavaScript-fil.
Ingen React, ingen JSX, ingen Babel, ingen frameworks og ingen byggeafhængigheder.

**Se sitet:** https://jacobsalmon.github.io/theheartselectricalsystem/

## Filstruktur

```
build.js                 byggescriptet — én kommando, ingen afhængigheder
src/
  content.cjs            alt indhold og alle tekster, dansk og engelsk
  render.cjs             layoutet: data ind, HTML ud
  styles.css             hele stilarket
  app.js                 menu, videokilder, koncertvælger, Spotify
docs/                    ← det færdige site. Dette er det, der udgives.
  index.html             forside (dansk)
  musik.html  video.html  om.html  epk.html  shop.html  kontakt.html
  en/index.html          forside (engelsk)
  en/music.html  en/video.html  en/about.html  en/epk.html
  en/shop.html   en/contact.html
  404.html  sitemap.xml  robots.txt  favicon.svg
  styles.css  app.js
  assets/                fotos, videoer, PDF'er
  assets/press/          pressemateriale i fuld opløsning
```

Fjorten sider: syv danske i roden, syv engelske under `/en/`. Hver side har sin
egen permanente URL, sin egen `<title>`, meta description, canonical, Open
Graph-data og hreflang-henvisning til den anden sprogversion.

## Sådan opdaterer du sitet

1. Ret teksten i `src/content.cjs` eller layoutet i `src/render.cjs`.
2. Kør `node build.js` i projektmappen. Den skriver alle 14 sider til `docs/`.
3. Commit og push. GitHub Pages udgiver automatisk.

Ret aldrig filerne i `docs/` direkte — de bliver overskrevet ved næste bygning.
Undtagelsen er `docs/assets/`, som byggescriptet ikke rører.

Kræver Node 14 eller nyere. Intet `npm install`.

## Sådan publiceres sitet

GitHub → Settings → Pages → Source: *Deploy from a branch* → `main` og mappen
`/docs`. Så udgives indholdet af `docs/`, mens kilderne bliver liggende i
repoet uden at blive serveret.

## Hvordan videoerne indlæses

Ingen video hentes ved sideindlæsning. Hvert videofelt viser et poster-billede,
og filen hentes først når den skal bruges:

- **Hero'en** på forsiden starter selv, dæmpet. På skærme under 760 px indlæses
  en højformat-udgave (3,6 MB) i stedet for den brede (4,7 MB) — kun én af dem
  hentes nogensinde.
- **Livevideoerne** på Video-siden hentes først når man trykker play.
- **Spotify-afspilleren** indlæses først ved klik, så Spotifys kode ikke kører
  på siden før man vil høre musik.

Alle videoer er kodet med `faststart`, så de begynder at spille før hele filen
er hentet.

## Uden JavaScript

Alt indhold, al navigation og alle links virker uden JavaScript. Menuen på
mobil åbner via CSS. Videofelterne viser deres poster-billede og et direkte link
til videofilen. JavaScript bruges kun til at lukke menuen med Escape, vælge
videokilde, betjene afspilningen, skifte koncert på forsiden og indlæse Spotify.

## Sådan giver du feedback

Åbn linket og skriv din feedback som et **issue** (fanen Issues → New issue).
Skriv gerne hvilken side og hvilket afsnit det handler om, fx
"Kontakt — fotogitteret".
