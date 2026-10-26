# Tegnet Minecraft-univers og effekter

Aktuel visuel retning for MCFiler.dk, 26. oktober 2026, efter brugerens Mineplex-skærmbillede. [Mineplex](https://mineplex.com/) og det vedhæftede skærmbillede er brugt som stilreference. Alle figurer, landskaber og produktmotiver er nygenereret med den indbyggede ImageGen-funktion.

## Grafisk formsprog

Referencen viser tegnet, todimensionel spilgrafik: mørke markante konturer, store malede farveflader, cel-shading, kantede Minecraft-inspirerede former og udtryksfulde figurer. Det centrale logo og indhold indrammes af figurer på siderne samt vegetation i forgrunden. Mørk lilla og marineblå giver plads til orange/gule fokuspunkter. Store overskrifter og knapper har synlig dybde.

MCFiler bruger nu dette tegnede formsprog i en original verden: et månebelyst landskab, svævende øer, et lanternebelyst træ og en lille stenbro. En runekyndig med grøn kappe og en bygmester med arbejdsforklæde indrammer heroen. De tre kategorier har tegnet bog, ametystkube og serverø. Landskab, figurer og forgrund er separate lag. Logoet er MCFilers typografiske udformning med guldfarve, let hældning og mørk ekstrudering.

Referencebilledet blev givet til ImageGen som **stilreference**. Mineplex-logo, eksisterende figurer og billedfiler bruges ikke på hjemmesiden. De tidligere 3D-prægede illustrationer er erstattet. PNG-originalerne opbevares lokalt i den Git-ignorerede mappe `.qa/art-originals/`.

## Palet og skrifter

| Rolle         | Farve                       |
| ------------- | --------------------------- |
| Baggrund      | `#1c2546`                   |
| Navigation    | `#211b30`                   |
| Indholdsflade | `#252e50`                   |
| Primær accent | gul/orange, cirka `#ffb622` |
| Skripts       | grøn/mint                   |
| Plugins       | ametyst/lilla               |
| Setups        | rav/guld                    |

Bungee bruges til logo, korte overskrifter og priser; Nunito Sans til almindelig tekst. Begge hostes lokalt via Fontsource. SIL Open Font License 1.1 findes i `public/fonts/OFL-Bungee.txt` og `public/fonts/OFL-NunitoSans.txt`.

## Færdige billedaktiver

Alle WebP-filer ligger i `public/images/`. Ingen nødvendige illustrationer mangler.

| Motiv      | Filer                                                       | Kildeformat        |
| ---------- | ----------------------------------------------------------- | ------------------ |
| Landskab   | `storybook-world-1672.webp`, `storybook-world-960.webp`     | 1672 × 941         |
| Runekyndig | `adventurer-left-768.webp`, `adventurer-left-384.webp`      | 1024 × 1536, alpha |
| Bygmester  | `adventurer-right-768.webp`, `adventurer-right-384.webp`    | 1024 × 1536, alpha |
| Forgrund   | `forest-foreground-1672.webp`, `forest-foreground-960.webp` | 1672 × 941, alpha  |
| Skripts    | `drawn-script-960.webp`, `drawn-script-480.webp`            | 1254 × 1254        |
| Plugins    | `drawn-plugin-960.webp`, `drawn-plugin-480.webp`            | 1254 × 1254        |
| Setups     | `drawn-setup-960.webp`, `drawn-setup-480.webp`              | 1254 × 1254        |

Der er ikke kunstigt opskaleret. Sharp bruges til skalering og WebP-eksport; billedindholdet er fremstillet med ImageGen. Alpha er kontrolleret på figurer og forgrund og bevaret ved eksport. Landskabets store fil er cirka 222 KiB. Mobilfigurerne er cirka 59–60 KiB hver. Den store baggrund vælges også på smalle skærme, hvor højden og beskæringen kræver flere kildepixels. Øvrige billeder bruger responsive `srcset` og indlæses efter behov.

## Implementerede effekter

- Muse- og scroll-parallax med forskellig dybde for landskab, figurer og forgrund. Musebevægelser dæmpes.
- Let svæven af figurer samt en bevægelig scroll-pil.
- Gyldne/mintfarvede glødende canvas-partikler og korte gnister ved klik på heroens handlingsknapper.
- Produktkort vipper med en præcis mus og har en lysrefleks, der følger markøren. Touch får ikke fastlåst hover.
- Sektioner, kategorier og kort kommer ind med korte scroll-animationer. Nyt indhold fra filtre registreres også.
- Knapper har dybde, trykreaktion og en lysstribe ved hover.
- En tynd gylden linje viser scroll-fremgang.
- **Pause effekter** stopper baggrundens løbende bevægelse og partikler. **Afspil effekter** genoptager dem.
- `prefers-reduced-motion` slår automatisk bevægelse, kortvip, partikler og indgangsanimationer fra og viser alt indhold straks.
- Partiklernes loop stopper, når heroen er uden for viewport, og når fanen er skjult. Figursvæv sættes på pause uden for viewport. Canvas har et partikelloft, begrænset pixeltæthed og cirka 30 tegninger pr. sekund. Lag flyttes med transform.

`HeroScene.tsx` styrer hero og pause. `MotionEffects.tsx` styrer scroll-reveal, scroll-fremgang og kortvip. `effects.css` indeholder den tegnede stil og animationer. Ingen ekstra animationsbiblioteker er installeret.

## Validering

Produktionsbuildet består. Alle otte sidetyper er kontrolleret ved 320, 375, 390, 768, 1024, 1440 og 1920 px. Kategorier, produktsider, direkte links, historik, mobilmenu, FAQ, Discord-dialog og tastaturfokus er testet. Målrettede browsertests har bekræftet faktisk canvas-tegning, muse- og scroll-parallax, pause/genoptagelse, stop uden for viewport, scroll-reveal, kortvip og nulstilling samt reduceret bevægelse.

## Præcise ImageGen-prompter

Alle aktiver bruger det indbyggede ImageGen-værktøj, uden CLI/API-fallback. Brugerens skærmbillede var billedinput som stilreference. `transparent_background` var slået til for begge figurer og forgrunden og fra for de øvrige motiver.

### storybook-world

```text
Use case: stylized-concept. Asset: panoramic 16:9 BACKGROUND ONLY for the Danish Minecraft marketplace MCFiler.dk. Image 1 is a STYLE REFERENCE ONLY: match its hand-drawn 2D game-website illustration language, broad painterly color fills, visible dark ink outlines, angular block-inspired forms and friendly fantasy cartoon atmosphere. Create a completely NEW original scene, not an edit or recreation of the reference. An enchanted Minecraft-inspired woodland valley at twilight: angular grassy cliffs, blocky distant mountains, layered rolling blue-purple hills and clouds, a little winding stone path and stone bridge in the middle distance, a magical ancient oak with hanging golden lanterns on the far right, small timber huts glowing warmly on the far left, a few floating enchanted stone fragments. A pale golden moon in the upper-left side partly behind clouds. Center upper 60% should be quiet open dark plum twilight sky and broad low-contrast distant landscape for website logo and readable text; detailed scenery frames the outer sides and lower third. Dark inked outlines, soft cel-shading, two-dimensional hand-painted concept illustration with simplified broad shapes, lush warm amber highlights, deep purple shadows, midnight blue and muted teal, rich navy foreground. Genuinely drawn artwork with confident linework and graphic shapes. NOT a 3D render, NOT realistic, NOT densely textured voxels, NOT photorealistic. No characters, no text, no letters, no Mineplex logo, no crown, no existing brand characters, no interface, no cards, no watermark. This is an original environment artwork only.
```

### adventurer-left

```text
Use case: illustration-story. Asset: SINGLE ORIGINAL CHARACTER CUTOUT on true transparent background, for the LEFT edge of a Minecraft-inspired fantasy website. Image 1 is solely a reference for the visual language: bold hand-drawn dark navy outlines, expressive block-inspired human anatomy, flat painterly cel shading, playful action pose. Do not reproduce either reference character. Our original character: an enthusiastic young adult Danish Minecraft-style rune scholar with short wavy DARK TEAL hair, warm tan skin, round green eyes, a forest-green hooded cloak over a cream tunic, dark plum trousers and sturdy brown leather boots. A golden belt with tiny paper scrolls. They hold an open glowing mint spellbook in one hand, the other hand gestures towards the RIGHT, into the center of the webpage. Dynamic three-quarter stance stepping toward the viewer, friendly confident joyful expression. Entire full body and all hands, boots, cloak and book visible, generous transparent margin around the entire character. The face and hands use original stylized angular blocky shapes, illustrated rather than exact game models. Strong readable silhouette, warm golden rim lighting, graphic soft shading, beautiful hand-inked commercial game promotional artwork. Portrait composition about 2:3. No lettering, no logo, no background, no ground plane, no UI, no watermark, no crown. Do not copy hair, face, outfit, colors or pose from either Mineplex character. NOT 3D, NOT photographic, NOT realistic block render. Transparent alpha background.
```

### adventurer-right

```text
Use case: illustration-story. Asset: SINGLE ORIGINAL CHARACTER CUTOUT on true transparent background, for the RIGHT edge of a Minecraft-inspired fantasy website. Image 1 is a visual style reference ONLY: match the confident hand-drawn dark navy contours, expressive angular block-inspired human anatomy, warm painterly cel shading and fun action energy. Do not copy either character. Our original character: a joyful young adult Minecraft-inspired master builder with deep brown skin, short dark auburn hair, bright amber eyes, brass goggles pushed up on the forehead. Wears a mustard-yellow work jacket, a dark blue carpenter apron with leather straps and utility pockets, charcoal trousers, rugged boots. Holds a chunky original enchanted pickaxe with a turquoise crystal head and brown handle angled upward on their outer RIGHT side, while extending their left open hand towards the LEFT, into the center of the webpage, welcoming the visitor. Dynamic three-quarter full-body pose with one foot forward, huge confident smile, lively but natural anatomy. Strong readable silhouette, all feet, hands, hair, tool fully within frame with generous transparent margins. Original drawn Minecraft-ish angular character, premium game-website promo illustration, crisp dark ink outlines and broad flat shaded planes, golden rim light and subtle lilac shadow tones. Portrait composition about 2:3. True transparent alpha background. No backdrop, no ground plane, no logos, no letters, no interface, no watermark, no crown. NOT a 3D render, NOT photorealistic, no copying Mineplex faces, outfits or characters.
```

### forest-foreground

```text
Use case: illustration-story. Asset: wide panoramic 16:9 original decorative FOREGROUND OVERLAY for a hand-drawn Minecraft-inspired fantasy website. Image 1 is a STYLE REFERENCE ONLY, especially its dark inked foliage foreground, not a source to trace. Create an original border of thick dark midnight-navy (#1c2647) hand-drawn fantasy woodland vegetation rising from the BOTTOM EDGE: expressive broad fern leaves, angular grass tufts, small crooked shrubs, a few mossy blocklike rocks, and larger irregular leaves at the lower left and lower right corners. About 65-75% of the entire upper canvas MUST be empty TRUE TRANSPARENCY; vegetation occupies the lower strip and slightly higher side corners. Bottommost edge must be a continuous solid dark midnight-navy silhouette so it blends seamlessly into the page background. Broad clean cartoon shapes, subtle two-tone blue-purple shading, confident thick dark outlines, hand-painted 2D style, not dense detail. No text, no logo, no characters, no moon, no entire landscape, no interface, no watermark. NOT photorealistic, NOT 3D, no existing Mineplex assets. Real transparent alpha background around and above the plants.
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
