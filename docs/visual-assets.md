# Prison-tema, illustrationer og sideskift

Aktuel visuel identitet for MCFiler.dk, opdateret 26. oktober 2026. Butikken sælger primært Minecraft Prison-filer. Udtrykket bruger tegnede konturer, cel-shading, mørk lilla/marineblå og varm gul/orange. Det bygger videre på den tidligere godkendte grafikstil.

## Komposition og indhold

Heroens baggrund er et originalt koderværelse med stenvægge, serverudstyr, skrivebord, skærme og en person, der sidder og koder. Den øvre midte giver plads til logo og indhold, mens koderen er synlig nedenunder. Til venstre står en betjent med blå uniform, nøgler og clipboard; til højre en fange i orange dragt med en Minecraft-inspireret hakke. Figurerne er redigeret fra MCFilers egne illustrationer med bevaret ansigt og positur. Forgrunden viser gulv, bøger, kabler og nøgler i et separat transparent lag.

Forside, virksomhedsbeskrivelse, metadata og sidetitel fremhæver nu Prison. Eksempelprodukterne er stadig tydeligt markeret som eksempler; der er ikke tilføjet udokumenterede produktfunktioner eller salgstal. Bestilling og kontakt foregår fortsat på Discord.

## Færdige billedaktiver

Alle aktiver ligger i `public/images/`. De fire Prison-motiver er lavet med den indbyggede ImageGen-funktion. De tre kategorimotiver er bevaret fra den foregående version. PNG-originaler ligger lokalt i `.qa/art-originals/` og er ikke i Git. Ingen illustrationer mangler.

| Motiv               | WebP-filer                                                            | Original           |
| ------------------- | --------------------------------------------------------------------- | ------------------ |
| Koderværelse        | `prison-coding-room-1672.webp`, `prison-coding-room-960.webp`         | 1672 × 941         |
| Betjent til venstre | `prison-officer-768.webp`, `prison-officer-384.webp`                  | 1024 × 1536, alpha |
| Fange til højre     | `prison-inmate-768.webp`, `prison-inmate-384.webp`                    | 1024 × 1536, alpha |
| Gulv/forgrund       | `coding-room-foreground-1672.webp`, `coding-room-foreground-960.webp` | 1672 × 941, alpha  |
| Skripts             | `drawn-script-960.webp`, `drawn-script-480.webp`                      | 1254 × 1254        |
| Plugins             | `drawn-plugin-960.webp`, `drawn-plugin-480.webp`                      | 1254 × 1254        |
| Setups              | `drawn-setup-960.webp`, `drawn-setup-480.webp`                        | 1254 × 1254        |

Sharp bruges til skalering og WebP-eksport, uden kunstig opskalering. Alpha er kontrolleret og bevaret på figurer og forgrund. Stor baggrund er cirka 179 KiB; de små figurer er cirka 49 og 55 KiB. Heroen har prioriteret indlæsning, responsive billedstørrelser og større baggrund på høje mobilvisninger.

Bungee og Nunito Sans hostes lokalt via Fontsource. SIL Open Font License ligger i `public/fonts/OFL-Bungee.txt` og `public/fonts/OFL-NunitoSans.txt`.

## Sideskift og navigation

`PageTransition.tsx` bruger React 19.3's indbyggede ViewTransition rundt om hovedindholdet. Navigation via topmenuen og kategorier får en kort fade/slide-overgang. Headeren ligger uden for indholdsgrænsen. Det følger [Reacts ViewTransition-vejledning](https://react.dev/reference/react/ViewTransition) og [React Routers vejledning](https://reactrouter.com/how-to/view-transitions).

`NavIndicator.tsx` måler det aktive link og flytter den gyldne menumarkering med en kort overgang. Den tilpasses også ved ændrede skriftmål og skærmbredder. Mobilmenuen lukker ved valg af et link, så indholdets sideskift kan ses. Browserhistorik og almindelige links bevares.

Browsere uden View Transitions API får en lettere indgangsanimation via Web Animations API. Reduceret bevægelse slår både native overgang, fallback og menumarkeringens bevægelse fra. Sidetitel opdateres samtidig med indholdet. Indhold, der allerede er synligt, skjules ikke bagefter af scroll-reveal.

## Øvrige effekter

- Muse- og scroll-parallax med separat bevægelse af rum, figurer og forgrund.
- Let figursvæv, glødende partikler, klikgnister og bevægelig scroll-pil.
- Produktkort med musestyret 3D-vip og lysrefleks.
- Scroll-reveal, scroll-indikator og lysstribe på knapper.
- Pause/genoptagelse af heroens baggrundseffekter.
- Partikelløbet stopper uden for viewport og i skjult fane; reduceret bevægelse understøttes.

Ingen nye afhængigheder eller animationsbiblioteker er installeret.

## Validering

Produktionsbuild og formatering består. Alle otte sidetyper er kontrolleret ved 320, 375, 390, 768, 1024, 1440 og 1920 px. Navigation, produktsider, filtre, direkte links, historik, mobilmenu, FAQ og Discord-dialog består uden browserfejl eller vandret overløb.

Målrettede browsertests har bekræftet faktiske native fade/slide-animationer, kategori-skift, aktiv menumarkering både ved første indlæsning og efter navigation, mobilmenu, reduceret bevægelse og fallback uden View Transitions. De eksisterende parallax-, partikel-, pause- og 3D-korteffekter er også kontrolleret.

## Præcise ImageGen-prompter

Der er brugt indbygget ImageGen, uden CLI/API-fallback. For betjent og fange er billedinput 1 MCFilers egen tidligere figur, og billedinput 2 brugerens skærmbillede af hjemmesiden som stilkontekst. For rum og forgrund er skærmbilledet kun stilreference. For kategoriillustrationerne blev det tidligere Mineplex-skærmbillede brugt som stilreference. Billedfiler fra Mineplex bruges ikke i hjemmesiden.

`transparent_background` er slået til for betjent, fange og forgrund og fra for øvrige motiver.

### prison-coding-room

```text
Use case: illustration-story. Asset: wide panoramic 16:9 illustrated website hero BACKGROUND for MCFiler.dk, a Danish Minecraft Prison-file store. Image 1 is a STYLE REFERENCE ONLY for the current website's bold dark-navy outlines, cel-shaded hand-painted 2D Minecraft-inspired cartoon artwork and violet/golden palette. Create a NEW interior environment. A cozy block-inspired prison-server developer's coding room at night: slate-blue stone walls, chunky timber beams, a small barred window with moonlight at the far left, shelves with books and a few keys, an amber wall lamp and subtle server cabinets along the room edges. IMPORTANT COMPOSITION: the upper central 55% is a quiet dark indigo/plum wall with soft broad shadow and no busy objects, deliberately open for website logo and text. In the LOWER CENTER of the image, clearly visible below the future text, an original adult programmer is seated at a wooden desk in a gaming chair, in a readable three-quarter SIDE PROFILE, wearing a dark teal hoodie, actively typing on a keyboard. Two angled computer monitors show luminous mint/turquoise abstract code lines without readable words; a warm desk lamp, a notebook and a mug. Make the coder, chair, desk and glowing screens recognizably visible as the focal environmental story, mainly in the lower half around 55-80% image height. Rich illustrated depth, wide room perspective, floorboards or stone tiles in the bottom strip, furniture pushed toward outer edges leaving central logo area quiet. Bold confident ink outlines, broad clean painterly cel-shaded forms, expressive drawn shapes, professionally art-directed 2D game promo illustration consistent with the reference. Colors midnight navy, violet shadows, golden amber lighting and mint screen light. No large foreground characters: those will be separate layers. No plants or forest landscape in the room. No logos, no text, no watermark, no interface. NOT photorealistic, NOT 3D rendered, not densely voxel-textured.
```

### prison-officer

```text
Use case: precise-object-edit. Image 1 is the EDIT TARGET: the original left-side MCFiler character. Image 2 is only webpage style/context reference. Transform this same friendly original character into a Minecraft PRISON OFFICER. Preserve their short dark teal hair, tan skin, green eyes, joyful face, original illustration quality, full-body three-quarter stance and open hand gesturing toward the RIGHT into the webpage center. Replace the green cloak, cream fantasy tunic and plum trousers with a crisp dark navy prison-officer uniform: matching navy shirt and trousers, light-blue shoulder panels, simple gold shield-shaped badge with no insignia or lettering, utility belt with a visible ring of keys and a small radio, practical black boots, and a simple dark-blue officer cap with a gold band. Replace the spellbook in their left hand with a brown clipboard and cream paper; no readable writing. Remove all magic, runes, scroll tubes and cloak. Keep energetic welcoming body language and a strong friendly game-character silhouette. Retain bold dark navy ink contours, hand-drawn 2D cel-shading, clean broad painted forms, warm amber rim light and violet shadows. Keep entire body, all hands, clipboard, cap and boots visible with transparent margins, portrait 2:3. TRUE TRANSPARENT ALPHA background; preserve transparency, do not add a scenery or colored rectangle. No weapons, no logos, no real police insignia, no watermark, no text. This is a playful original Minecraft Prison game character, not a photoreal person or 3D model.
```

### prison-inmate

```text
Use case: precise-object-edit. Image 1 is the EDIT TARGET: the original right-side MCFiler character. Image 2 is only webpage style/context reference. Transform this same friendly original character into a Minecraft PRISON INMATE character for a prison-mining server. Preserve their warm brown skin, short dark auburn hair, amber eyes, big confident smile, full-body original three-quarter pose, hand gesturing toward the LEFT into the webpage center, and the original turquoise crystal mining pickaxe in the outer right hand. Replace the yellow work jacket, navy apron and utility straps with a clearly recognizable bright ORANGE prison jumpsuit, simple pale rectangular ID patch with NO readable text, dark ankle cuffs and sturdy dark gray work boots. Remove the forehead goggles, tool belt, rolled scrolls and apron so the orange prison uniform is unmistakable. Keep playful energetic gamer body language, all hands and feet and entire pickaxe fully visible inside portrait 2:3 frame with transparent margins. Same bold dark navy linework, sharp expressive angular Minecraft-inspired cartoon shapes, clean broad painterly 2D cel-shading, amber rim light and soft violet shadows as the original. TRUE TRANSPARENT ALPHA background, preserve transparency. No scenery, no colored rectangle, no chains or restraints, no branding, no watermark, no lettering. Original approachable Minecraft Prison game illustration, NOT photographic or a 3D render.
```

### coding-room-foreground

```text
Use case: illustration-story. Asset: original wide 16:9 TRUE TRANSPARENT foreground overlay for a hand-drawn Minecraft-style CODING ROOM website hero. Image 1 is a STYLE REFERENCE ONLY for bold dark navy contours and painted cel-shading. Replace outdoor vegetation with a sparse indoor floor border: a continuous very dark midnight-navy (#1c2546) stone-tile floor strip at the very bottom, a small wooden crate and a couple of blocky books at the lower left corner, a coiled computer cable, a small brass keyring near the lower right corner and a few loose sheets of paper. All objects stay in the BOTTOM 15-20% with slightly higher corner stacks, leave the entire upper 75-80% as empty real alpha transparency. Keep the central bottom edge especially low and unobtrusive so a background desk and seated programmer remain visible. Broad confident dark outlines, angular drawn forms, minimal two-tone indigo shading and subtle amber highlights, harmonious with a violet nighttime room. No plants, no grass, no landscape, no characters, no walls, no text, no letters, no logo, no watermark, no UI. Bottommost edge blends into solid dark midnight navy; everything above the floor and props has genuine transparent alpha.
```

### drawn-script

```text
Use case: illustration-story. Asset: square original product illustration for the SKRIPTS category of MCFiler.dk. Image 1 is ONLY a stylistic reference for its hand-painted 2D game artwork, dark expressive ink outlines, broad clean cel-shaded shapes and warm fantasy atmosphere. Create an original enchanted book hovering above a small mossy stone altar, green square rune without letters, a cream quill, rolled parchment, little glowing mint motes. Draw it with bold navy outlines, clear large cartoon shapes, painted color fills, cheerful magical feeling. Background an illustrated violet twilight woodland with broad angular clouds and simplified trees, warm lantern on one side. Book is center focus with beautiful golden leather clasps, cream pages, green gem on its cover. Colors emerald, mint, parchment cream, gold, midnight navy and muted violet. Square frame, object fully composed with breathing room, graphic rich visual hierarchy, no typography, no letters, no logo, no watermarks, no interface. Not a 3D render, not photorealistic, not densely voxel-textured. No copied Mineplex objects or characters. This must read as a drawn commercial fantasy-game illustration, consistent with thick-outline cel-shaded character art.
```

### drawn-plugin

```text
Use case: illustration-story. Asset: square original product illustration for PLUGINS on MCFiler.dk. Image 1 is ONLY a style reference for bold dark ink contour lines, broad painterly cel-shaded 2D fantasy-game promo artwork. Create an original magical mechanical cube with violet crystal panels, warm brass corners and little chunky gears orbiting it, floating over an ancient slate stone pedestal with scattered amethyst shards. Background is a hand-painted dark navy/purple cavern and broad simplified silhouettes, magical violet light and tiny golden sparks. Graphic angular cartoon geometry, expressive dark outlines, broad clean shapes, painted highlights, charming crafted details. Colors amethyst, lilac, indigo, gold, slate gray. Centered focal object fills the square while retaining breathing room and a coherent full silhouette. No text, no letters, no logos, no watermark, no interface. No Mineplex copied assets. NOT a 3D render, NOT photographic, NOT highly detailed voxel texture. Premium 2D illustration in the same hand-drawn commercial fantasy-game language as the reference.
```

### drawn-setup

```text
Use case: illustration-story. Asset: square original product illustration for SETUPS on MCFiler.dk. Image 1 is only a reference for its hand-drawn outlined 2D fantasy-game web artwork and cel-shaded painterly color fills. Create a beautiful ORIGINAL miniature floating island: a cozy angular timber cottage with amber windows and a teal roof, a little stout oak tree with golden lanterns, a tiny stone bridge across a turquoise stream that spills down one side of the floating island, chunky grass blocks and slate rock underside. Background deep midnight blue with violet painted clouds and a few distant simplified floating islands, softly lit by warm golden dusk. Bold dark navy ink outlines, broad clear cartoon forms, hand-painted shading, lively golden highlights and cute crafted details. Full island visible within square composition with breathing room; slightly isometric illustrative perspective. Palette honey gold, moss green, teal water, midnight blue, warm stone. No text, no letters, no logos, no watermark, no interface. NOT a 3D render, NOT photorealistic, NOT densely voxel-textured. No copied Mineplex assets. Match the DRAWN 2D promotional art language of the reference while making all subjects original.
```
