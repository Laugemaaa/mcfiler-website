# mcfiler-website

Hjemmesiden til **MCFiler.dk**.

Dansk Minecraft-butik med Prison-filer i fokus, bygget med React, TypeScript og Vite. Hjemmesiden er statisk og kan hostes på Cloudflare Pages. Bestilling og betaling foregår via Discord; der er ingen betalingsgateway, kurv eller automatisk levering.

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

Siden har responsiv mobilmenu, tastaturbetjening, synlige fokusmarkeringer og en Discord-dialog, der kan lukkes med Escape. Det tegnede Prison-univers bruger syv originale illustrationer i optimeret WebP: koderværelse, betjent, fange, indendørs forgrund og tre kategorimotiver. Skrifttyperne Bungee og Nunito Sans hostes lokalt, så siden ikke afhænger af eksterne billed- eller skrifttjenester.

## Visuel identitet

Designet har tegnede konturer, cel-shading, mørk lilla/marineblå og gyldne/orange knapper. En betjent til venstre og en fange til højre indrammer logo og indhold. Baggrunden er et koderværelse med en person ved computeren, og forgrunden viser gulv, bøger og kabler i et separat lag. Samme tegnede formsprog går igen på produktoversigten, produktsiderne, om-siden og support.

Det aktuelle billedsæt er forenklet med firkantede hoveder, blokhænder, store farveflader og færre detaljer. Alle syv motiver følger denne retning. Billederne er AI-genereret som en stiltilnærmelse til brugerens reference og er ikke manuelt tegnede.

Effekterne omfatter muse- og scroll-parallax, svævende figurer, glødende partikler, klikgnister, scroll-animationer, en scroll-indikator og produktkort med 3D-vip og lysrefleks. Heroens pauseknap stopper baggrundsbevægelsen. Reduceret bevægelse respekteres automatisk; partikelloopet stopper uden for viewport og i en skjult fane.

Navigationen indeholder Forside, Produkter, Skripts, Plugins, Setups, Om os og Discord. Produktkort viser navn, beskrivelse, pris, Minecraft-versioner og links til produktside og Discord. Alle eksempelmarkeringer er bevaret.

Sideskift har en kort fade/slide-overgang via Reacts ViewTransition, og topmenuens gyldne markering glider til det aktive link. På mobil lukker menuen, så overgangen kan ses. Browsere uden View Transitions får en lettere indgangsanimation. Reduceret bevægelse slår overgangene fra.

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

Forsidetekster, virksomhedsbeskrivelse og supportindhold redigeres i `src/App.tsx`. Tilføj dine faktiske virksomhedsoplysninger og købsvilkår inden salg. Layout og responsive regler ligger i `src/styles.css`; den tegnede stil og effekterne ligger i `src/effects.css`.

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
  images/                  Syv originale tegnede illustrationer i to størrelser
  fonts/                   SIL Open Font License for de lokale skrifttyper
  _headers                 Sikkerhed og caching til Cloudflare Pages
  favicon.svg              MCFilers kubeikon
  robots.txt               Adgang for søgemaskiner
src/
  components/
    HeroScene.tsx          Lag, figurer, parallax, partikler og pause
    MotionEffects.tsx      Scroll-animationer, fremgang og 3D-kort
    NavIndicator.tsx       Glidende markering af aktivt menupunkt
    PageTransition.tsx     Sideskift, fallback og reduceret bevægelse
    Icon.tsx               Fælles SVG-ikoner
    ProductArt.tsx         Produktillustrationer
    WorldImage.tsx         Responsiv landskabsillustration
  data/products.ts         Typede eksempelprodukter og prisformatering
  App.tsx                  Sider, navigation, filtre og Discord-dialog
  config.ts                Discord-invitation og validering
  fonts.css                Lokalt hostede Bungee og Nunito Sans
  effects.css              Tegnet tema, bevægelse og reduceret bevægelse
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
