# TODO — thehearts.dk

1. **Mobil og web version — test og feedback.** Layout og funktioner er lavet.
   Mangler: afprøvning på rigtige telefoner (iPhone og Android, Safari og
   Chrome) og i almindelige desktop-browsere, og en runde feedback på begge.

~~2. **Browser-optimering.** ✔ Lavet. React, ReactDOM, JSX og Babel er væk.
   Sitet er nu almindelig HTML, CSS og én lille JavaScript-fil, bygget én gang
   med `node build.js`. Ingen afhængigheder, intet CDN at være afhængig af.~~

3. **Domænenavn, .dk og .com.** Opret fire A-records (185.199.108–111.153) på
   roddomænet og en CNAME `www` → `jacobsalmon.github.io.` hos DanDomain. Sæt
   domænet ind under GitHub → Settings → Pages → Custom domain, og slå
   `Enforce HTTPS` til når det er verificeret. Sæt .com til at videresende til
   .dk. **Husk derefter at rette `SITE` i toppen af `src/content.cjs` til det
   rigtige domæne og køre `node build.js` igen** — den ene linje styrer alle
   canonical-, hreflang-, sitemap- og Open Graph-adresser.

4. **Nyhedsbrev-service.** Formularerne peger stadig på `mailto:` og virker kun
   hvis besøgende har et mailprogram opsat. Der skal vælges en rigtig tjeneste
   (MailerLite, Mailchimp, Buttondown eller lignende), så tilmeldinger samles i
   en liste. Husk samtykke og en afmeldingsmulighed, jf. GDPR.

5. **Sikkerhed.**
   - Favicon ✔ lavet (`docs/favicon.svg`).
   - Mixed content: formularerne peger fortsat på `mailto:`. Løses sammen med
     punkt 4.
   - E-mailadressen står i klartekst på sitet og vil blive høstet af
     spam-robotter.
   - `Enforce HTTPS` slås til når domænet er på plads (punkt 3).
   - [CHECK] Fotokreditering mangler på livebillederne på Kontakt-siden.

## Nyt siden omskrivningen

- **Feedback-runden** er stadig næste skridt. Oplægget ligger i
  `feedback-oplaeg.md`. Sitet virker nu også på mobil, så invitationen behøver
  ikke længere bede folk om at åbne det på computer.
- **`site/`-mappen er forældet.** Den gamle React-udgave ligger der stadig. Kan
  slettes når du er tryg ved den nye.
- **Publiceringskilden skal ændres** i GitHub → Settings → Pages fra `/ (root)`
  til `/docs`, ellers udgives det gamle site.
