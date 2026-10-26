# mcfiler-website

Hjemmesiden til **MCFiler.dk**.

Dansk Minecraft-butik bygget med React, TypeScript og Vite. Hjemmesiden er statisk og kan hostes på Cloudflare Pages. Bestilling og betaling foregår via Discord; der er ingen betalingsgateway, kurv eller automatisk levering.

## Kom i gang

Installer Node.js 24 LTS med npm, og kør følgende i projektmappen:

```sh
npm install
npm run dev
```

Åbn den lokale adresse, Vite skriver i terminalen. Produktionsbuild og lokal kontrol:

```sh
npm run build
npm run preview
```

`build` kontrollerer TypeScript og bygger siden til `dist/`. `package-lock.json` fastholder de installerede versioner. Ved automatiske installationer kan `npm ci` bruges i stedet for `npm install`.

## Sider og funktioner

- `/`: Forside med introduktion, kategorier, eksempelprodukter og bestillingsforløb.
- `/produkter`: Produktoversigt med kategorifiltre. Filteret kan deles, eksempelvis `/produkter?kategori=Plugins`.
- `/produkter/essentials-skript`, `/produkter/jobs-plugin` og `/produkter/survival-setup`: Produktsider med funktioner, eksempelpris, Minecraft-versioner og krav.
- `/om-os`: Information om MCFiler.
- `/support`: Discord-kontakt og spørgsmål/svar.
- Ukendte adresser viser en dansk fejlside med et link tilbage til produkterne.

Siden har responsiv mobilmenu, tastaturbetjening, synlige fokusmarkeringer og en Discord-dialog, der kan lukkes med Escape. Det grafiske redesign bruger fire originale, genererede Minecraft-inspirerede illustrationer i optimeret WebP samt et videreudviklet SVG-logo. Skrifttyperne Bungee og Nunito Sans hostes lokalt, så siden ikke afhænger af eksterne billed- eller skrifttjenester.

## Visuel identitet

Designet bruger mørk petrol, skovgrønt, en varm gylden knapfarve og en særskilt accent til hver kategori. Forsiden har en illustreret Minecraft-verden med bjerge, skov, vandfald og oplyste værksteder. Samme grafik og farver går igen på produktoversigten, produktsiderne, om-siden og support.

Navigationen indeholder Forside, Produkter, Skripts, Plugins, Setups, Om os og Discord. Produktkort viser navn, beskrivelse, pris, Minecraft-versioner og links til produktside og Discord. Alle eksempelmarkeringer er bevaret.

Se [grafik- og designdokumentationen](docs/visual-assets.md) for referenceanalyse, farver, billedfiler, opløsninger, præcise billedprompter og skrifttypelicenser. Alle nødvendige illustrationer er leveret i `public/images/`.

## Tilføj Discord-serveren

Opret en lokal fil med navnet `.env` i projektets rodmappe, og indsæt en rigtig Discord-invitation:

```dotenv
VITE_DISCORD_URL=https://discord.gg/DIT_INVITATIONSLINK
```

Genstart udviklingsserveren, eller byg siden igen. Uden et gyldigt link åbner købsknapperne en forklaring om, at butikken er under opbygning. Med et gyldigt link åbner knapperne Discord i en ny fane. Der oprettes ikke automatisk en ordre eller en support-ticket.

På Cloudflare Pages sættes `VITE_DISCORD_URL` som miljøvariabel til buildet. Variablen er offentlig og må ikke indeholde en token eller andre hemmeligheder. `src/config.ts` godkender HTTPS-invitationer på `discord.gg` og `discord.com/invite/`.

## Erstat eksempelprodukterne

Rediger `src/data/products.ts`. Hvert produkt har en unik `slug`, kategori, navn, pris i kroner, beskrivelse, detaljer, funktioner, Minecraft-versioner, forudsætninger, leveringsindhold og illustrationstype.

**Alle nuværende produkter, priser, funktioner og versionsangivelser er demonstrationsdata.** Eksempelmarkeringerne er synlige på kortene og produktsiderne. Inden åbning skal du verificere produktindhold, priser, versionsstøtte, afhængigheder og eventuelle tredjepartslicenser. Opdater derefter eksempelmarkeringerne og teksterne om, at butikken er under opbygning. Der er ingen opdigtede anmeldelser, salgstal eller kundetal.

Forsidetekster, virksomhedsbeskrivelse og supportindhold redigeres i `src/App.tsx`. Tilføj dine faktiske virksomhedsoplysninger og købsvilkår inden salg. Design og responsive regler ligger i `src/styles.css`.

## GitHub

Projektets repository er [Laugemaaa/mcfiler-website](https://github.com/Laugemaaa/mcfiler-website). Den lokale `main`-gren følger `origin/main` og bygger videre på repositoryets oprindelige historik.

Hvis du henter projektet på en anden computer, brug Git frem for ZIP:

```sh
git clone https://github.com/Laugemaaa/mcfiler-website.git
cd mcfiler-website
npm install
```

`.gitignore` udelader afhængigheder, build, alle `.env`-filer og den lokale testmappe. `package-lock.json` skal med i Git. Upload aldrig adgangskoder eller tokens.

Efterfølgende ændringer sendes med:

```sh
git add .
git commit -m "Beskriv ændringen"
git push origin main
```

## Cloudflare Pages

Forbind dit GitHub-repository med et nyt **Pages**-projekt i Cloudflare, og brug:

| Indstilling                         | Værdi                    |
| ----------------------------------- | ------------------------ |
| Produktionsgren                     | `main`                   |
| Projektets rodmappe                 | Repositoryets rod        |
| Build command                       | `npm run build`          |
| Build output directory              | `dist`                   |
| Node.js                             | `24` via `.node-version` |
| Miljøvariabel, når serveren er klar | `VITE_DISCORD_URL`       |

Projektet kræver ingen database, Workers-funktion eller betalt backend. Efter opsætning bygger Cloudflare Pages automatisk ved nye pushes. Tilføj MCFiler.dk som eget domæne i Cloudflare, når du er klar.

Cloudflare Pages understøtter automatisk Reacts klientruter, når der ikke ligger en topniveau-`404.html` i buildet. Opret derfor ikke en sådan fil; fejlsiden håndteres af React. Det betyder, at direkte links og genindlæsning på `/produkter/survival-setup` fortsat åbner appen. Der er ikke brug for en `_redirects`-regel, som kan skabe en redirect-løkke.

`public/_headers` kopieres til buildet og giver sikkerhedsheaders samt lang cachetid på Vites versionsopdelte assets. Udviklingsserveren bruger ikke disse Cloudflare-specifikke headers.

Se [Cloudflares officielle React-guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) for hostingindstillinger og [Vites vejledning](https://vite.dev/guide/) for lokal udvikling.

## Projektfiler

Ved oprettelsen er installation og produktionsbuild gennemført med npm. Det byggede `dist/` er kontrolleret i Chrome: navigation, direkte indlæsning af produktsider, kategorifiltre, browserhistorik, Discord-dialog, mobilmenu og spørgsmål/svar. Alle otte sidetyper er kontrolleret ved 320, 375, 390, 768, 1024, 1440 og 1920 px uden vandret overløb eller browserfejl. Cloudflare-deployment er ikke udført.

```text
public/
  images/                  Fire originale illustrationer i to WebP-størrelser
  fonts/                   SIL Open Font License for de lokale skrifttyper
  _headers                 Sikkerhed og caching til Cloudflare Pages
  favicon.svg              MCFilers kubeikon
  robots.txt               Adgang for søgemaskiner
src/
  components/
    Icon.tsx               Fælles SVG-ikoner
    ProductArt.tsx         Produktillustrationer
    WorldImage.tsx         Responsiv landskabsillustration
  data/products.ts         Typede eksempelprodukter og prisformatering
  App.tsx                  Sider, navigation, filtre og Discord-dialog
  config.ts                Discord-invitation og validering
  fonts.css                Lokalt hostede Bungee og Nunito Sans
  main.tsx                 React-opstart og router
  styles.css               Design og responsive layouts
.gitignore                 Filer, der ikke skal på GitHub
.node-version              Node.js-version til hosting
index.html                 Dansk grunddokument og metadata
package.json               Afhængigheder og npm-kommandoer
package-lock.json          Fastlåste pakkeversioner
tsconfig.json              TypeScript-konfiguration
vite.config.ts             Vite-konfiguration
README.md                  Denne vejledning
docs/visual-assets.md      Referenceanalyse, grafisk identitet og billedprompter
```
