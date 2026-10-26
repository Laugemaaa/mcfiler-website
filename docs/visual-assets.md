# Forenklet Minecraft-grafik og Prison-tema

Aktuel grafik til MCFiler.dk, opdateret 26. oktober 2026 efter brugerens nærbillede af Mineplex-figuren. Billedsættet er lavet med den indbyggede ImageGen-funktion. Det er en AI-genereret stiltilnærmelse; en identisk menneskelig tegnestreg er ikke garanteret, og billederne beskrives ikke som manuelt tegnede.

## Visuel ændring

Referencebilledet har firkantede ansigter, brede blokhænder, kantede hårtotter, store farveflader, tydelige mørke konturer og få skyggetoner. Det nye billedsæt lægger vægt på disse træk og reducerer ansigtsdetaljer, materialedetaljer, pynt og kraftige lyseffekter i selve illustrationerne.

Alle syv motiver er skiftet, så figurer, koderværelse, forgrund og kategoriillustrationer bruger samme enklere formsprog. Betjenten står til venstre, fangen til højre, og en person koder ved computeren i baggrunden. Prison-teksterne og de tydelige eksempelmarkeringer er bevaret.

Brugerens nærbillede var stilreference. Den første nye betjent blev derefter også brugt som stilanker for de øvrige motiver. Mineplex-figuren og billedfilerne fra referencen ligger ikke i hjemmesidens offentlige aktiver.

## Færdige billedfiler

Alle WebP-filer ligger i `public/images/`. PNG-originaler er gemt lokalt i `.qa/art-originals/`, som er Git-ignoreret. Ingen illustrationer mangler.

| Motiv        | WebP-filer                                                          | Originalstørrelse |
| ------------ | ------------------------------------------------------------------- | ----------------- |
| Betjent      | `block-officer-768.webp`, `block-officer-384.webp`                  | 961 × 1636, alpha |
| Fange        | `block-inmate-768.webp`, `block-inmate-384.webp`                    | 961 × 1637, alpha |
| Koderværelse | `block-coding-room-1672.webp`, `block-coding-room-960.webp`         | 1672 × 941        |
| Forgrund     | `block-room-foreground-1672.webp`, `block-room-foreground-960.webp` | 1672 × 941, alpha |
| Skripts      | `block-script-960.webp`, `block-script-480.webp`                    | 1254 × 1254       |
| Plugins      | `block-plugin-960.webp`, `block-plugin-480.webp`                    | 1254 × 1254       |
| Setups       | `block-setup-960.webp`, `block-setup-480.webp`                      | 1254 × 1254       |

Der er ikke kunstigt opskaleret. Sharp bruges kun til skalering og WebP-eksport. Alpha er kontrolleret og bevaret på figurer og forgrund. Figurernes HTML-dimensioner er opdateret til deres nye proportioner: 768 × 1307 og 768 × 1308. Baggrundens store fil er cirka 48 KiB; de små figurer er cirka 39 og 42 KiB. Den responsive indlæsning og prioriteringen af heroens baggrund er bevaret.

Bungee og Nunito Sans hostes lokalt. De fulde skrifttypelicenser findes i `public/fonts/OFL-Bungee.txt` og `public/fonts/OFL-NunitoSans.txt`.

## Navigation og effekter

Sideskift har fortsat fade/slide via `PageTransition.tsx` og React 19.3's ViewTransition. `NavIndicator.tsx` flytter den gyldne markering til aktivt menupunkt. Mobilmenu, direkte links og browserhistorik fungerer fortsat. Browsere uden View Transitions har en lettere indgangsanimation. Implementationen følger [Reacts vejledning](https://react.dev/reference/react/ViewTransition) og [React Routers vejledning](https://reactrouter.com/how-to/view-transitions).

Parallax, figursvæv, partikler, klikgnister, kortvip, scroll-animationer og pauseknap er bevaret. Reduceret bevægelse slår animationerne fra. Baggrundens partikelløb stopper uden for viewport og i en skjult fane. Ingen nye afhængigheder er installeret.

## Kontrol

Produktionsbuildet består. De nye billeder er visuelt kontrolleret på mobil og computer. Alle otte sidetyper er testet ved 320, 375, 390, 768, 1024, 1440 og 1920 px uden browserfejl eller vandret overløb. Navigation, produktsider, filtre, direkte links, historik, FAQ, Discord-dialog og tastaturbetjening består.

De målrettede tests bekræfter også native sideskift, menumarkering, fallback uden View Transitions, reduceret bevægelse, faktisk canvas-tegning, parallax, pause/genoptagelse og 3D-kort.

## Præcise ImageGen-prompter

Alle syv billeder bruger indbygget ImageGen uden CLI/API-fallback. For den første betjent er brugerens nærbillede eneste billedinput. For de øvrige er nærbilledet input 1, og den nye betjent er input 2 som stilanker. `transparent_background` er slået til for figurer og forgrund og fra for rum og kategorier.

### block-officer

```text
Create ONE original Minecraft prison officer in the EXACT SIMPLE DRAWING LANGUAGE of image 1. Image 1 is a style reference, not an edit target; make a new officer, do not recreate the blonde character. Main visual requirement: this must look like a quick, confident hand-drawn Minecraft website character with SIMPLE RECTANGULAR BLOCK ANATOMY, not a detailed fantasy illustration. Full body, three-quarter front view, cheerful running/stepping pose toward the RIGHT. The HEAD IS A FLAT RECTANGULAR CUBE with a square straight jaw, a flat face plane and a simple side plane; body, arms, forearms, hands and legs are chunky cuboids. Eyes are SMALL SIMPLE flat cyan/white marks, a little mouth shape and two eyebrow strokes, no detailed irises, no anime eyes. Short dark-brown hair drawn as a few large angular chunks; navy officer cap. Plain navy-blue officer shirt, a single small flat gold badge, simple belt with two block-shaped keys, matching plain trousers, square black shoes. One cuboid hand held forward in a friendly pointing gesture; the other holds a very simple rectangular clipboard. Do not draw realistic individual fingers; hands should look like the broad blocky Minecraft hands in image 1. Confident slightly irregular DARK PURPLE CONTOUR LINES. FLAT solid color fills, only ONE broad shadow shape per material and occasional single flat highlight. Tiny palette, about 14 colors total, muted violet shadows. Hard simple shapes, angular hair and clothes, very few folds, no tiny decorative details. Match the reference's square face, understated facial features, naive hand-painted charm, restrained shading and low detail density. It should remain readable and attractive as a 300-pixel-tall website cutout. No gradients, no airbrush, no glossy surfaces, no rim lighting, no bloom, no reflections, no texture rendering, no anime aesthetic, no detailed fantasy armor, no realistic anatomy, no 3D render. Entire character and shoes inside portrait frame. TRUE TRANSPARENT ALPHA background; no colored rectangle, no backdrop, no shadow on ground, no glow. No text, no watermark, no logos.
```

### block-inmate

```text
Create ONE ORIGINAL Minecraft Prison INMATE website character in the SAME SIMPLE HAND-DRAWN LANGUAGE as image 1, with the simple cube anatomy and low detail level of image 2. The images are only STYLE REFERENCES, not characters to copy. Full body, three-quarter front view, stepping toward the LEFT with one chunky cuboid hand extended left toward the webpage center. A young adult with short chestnut hair drawn as a few angular chunks, a truly RECTANGULAR CUBE HEAD with square straight jaw, a flat face and one flat side face, small simple white-and-blue rectangular eye marks, two eyebrow strokes and a small cheerful open mouth, no detailed irises or anime facial features. Plain bright orange prison shirt and trousers, one small flat cream rectangle as ID patch with NO lettering, simple dark square shoes. Holds a SIMPLE BLOCKY TURQUOISE PICKAXE in the outer RIGHT hand, with a brown rectangular shaft and a pixel-step-shaped head, not a shiny crystal fantasy weapon. Arms and legs are CHUNKY RECTANGULAR BLOCKS. Hands are broad Minecraft block hands with no realistic individual fingers or knuckles. Few solid colors, flat painted fills, ONE simple hard-edged violet shadow per material; plain clothes with only 2-3 large folds total. Confident slightly irregular dark-purple hand-drawn contour lines matching image 1, not overly perfect vector edges. Looks like a charming manually inked Minecraft server website illustration, readable at 300 pixels tall. No airbrush, no smooth gradients, no glossy surfaces, no bloom, no rim-light halos, no fine texture, no detailed rendered materials, no realistic anatomy, no 3D render, no anime. True TRANSPARENT ALPHA background with no backdrop or ground shadow, entire character and pickaxe and shoes inside portrait frame, no text, no logo, no watermark.
```

### block-coding-room

```text
Draw an original wide 16:9 Minecraft Prison developer's CODING ROOM in the VERY SIMPLE FLAT 2D WEB-GAME DRAWING STYLE of image 1. Image 2 gives the desired simplified chunky block anatomy and restricted shading. These are style references only. The room must be drawn with FEW BROAD FLAT SHAPES, a limited muted plum/gray/navy palette, simple dark-purple ink lines and just one hard-edged shadow per object. Composition: quiet empty dark plum upper-middle wall, roughly upper 55%, for a website logo and text. At lower center a SMALL BLOCKY MINECRAFT CHARACTER with a cube head and cuboid torso sits sideways at a simple rectangular wooden desk and types on a keyboard, facing right. The character wears a plain muted teal shirt, has hair represented by 4-5 big angular shapes, simple face marks, and block hands, no realistic fingers. Two flat rectangular monitors show a handful of mint horizontal code bars without readable text. Simple cuboid chair, one mug, one little amber desk lamp. Left and right sides: a very simple barred window, 3-4 oversized books, a few dark server-box rectangles with small flat cyan squares. The wall is mostly untextured broad color with only a FEW wide seams, NOT hundreds of bricks. Foreground floor is broad low-contrast slate planes. Match the style reference's understated hand-painted charm, economical shapes and low detail density. Ordinary broad brush fills and slightly irregular ink edges, not glossy vector perfection. Muted background saturation; the foreground website figures will be brighter. No gradients or airbrushing, no volumetric light, no bloom, no intricate details, no textures, no reflections, no dramatic fantasy rendering, no realistic proportions, no 3D. No large characters on the sides, no text, no logos, no UI, no watermark.
```

### block-room-foreground

```text
Draw a wide 16:9 original TRANSPARENT FOREGROUND STRIP for a simple hand-drawn Minecraft coding room website. Use the VERY SIMPLE FLAT style of image 1 and the chunky rectangular forms and low detail density of image 2. Upper 80% of canvas is entirely TRUE ALPHA TRANSPARENCY. Along the bottom only, a low dark navy/plum floor border made of 4-6 broad flat slab shapes, a small plain cuboid wooden crate and TWO rectangular books at lower left, a simple curved black cable, and a SINGLE flat gold block-shaped key at lower right. Spare shapes and limited palette, slightly irregular dark-purple ink outlines, solid muted fills and only one broad hard-edged shadow per object. No texture, no fine details, no rendering, no gradients, no gloss, no glow, no realistic lighting, no ornate objects, no plants, no characters. The very bottom edge blends into solid midnight-navy #1c2546. Keep the middle exceptionally low so the desk and coder behind it stay visible. No words, no logos, no watermark. Real alpha transparency above and around the few props.
```

### block-script

```text
Draw a SIMPLE original Minecraft SCRIPT category illustration: one chunky dark green closed book, cream block-shaped page edges, a single gold square clasp and a cream angular quill beside it. Book floats slightly above one plain low slate cuboid slab, with 3 tiny mint diamond marks nearby. Do not decorate every corner, no runes, no shiny gems, no extra props. Green and cream and muted gold against dark plum. Use image 1 ONLY as the reference for economical hand-drawn Minecraft web-game shapes and dark-purple contour lines. Image 2 is the simplified graphic style anchor. ORIGINAL subject, not a copy. Extremely LOW DETAIL DENSITY, simple angular BLOCK FORMS, slightly irregular ink edges, broad flat color fills with ONE hard-edged shadow per material, tiny color palette. This should be a charming, straightforward hand-inked game website illustration, fully readable at thumbnail size. No glossy surfaces, no detailed material rendering, no tiny ornamental details, no glow or bloom, no airbrushing, no soft gradients, no cinematic lighting, no 3D render, no photography, no elaborate fantasy art. No characters, no letters, no words, no logos, no watermark, no interface. Square composition with generous breathing room and a quiet flat muted plum background; no busy landscape.
```

### block-plugin

```text
Draw a SIMPLE original Minecraft PLUGIN category illustration: one chunky violet cube seen in three-quarter view, only three broad colored faces, a flat lilac square inset on the front, and a small simple golden cog shape beside it. Cube floats above one plain dark slate rectangular block. Very clean silhouette and uncomplicated blocky geometry. No crystal shards, no many gears, no glowing magic, no ornamental gold clasps. Violet/lilac, dark blue and one muted gold accent. Use image 1 ONLY as the reference for economical hand-drawn Minecraft web-game shapes and dark-purple contour lines. Image 2 is the simplified graphic style anchor. ORIGINAL subject, not a copy. Extremely LOW DETAIL DENSITY, simple angular BLOCK FORMS, slightly irregular ink edges, broad flat color fills with ONE hard-edged shadow per material, tiny color palette. This should be a charming, straightforward hand-inked game website illustration, fully readable at thumbnail size. No glossy surfaces, no detailed material rendering, no tiny ornamental details, no glow or bloom, no airbrushing, no soft gradients, no cinematic lighting, no 3D render, no photography, no elaborate fantasy art. No characters, no letters, no words, no logos, no watermark, no interface. Square composition with generous breathing room and a quiet flat muted plum background; no busy landscape.
```

### block-setup

```text
Draw a SIMPLE original Minecraft SERVER SETUP category illustration: one small floating square grass-and-stone platform with a plain blocky wooden cottage, teal triangular roof, one warm square window and a tiny chunky square-leaf tree. One simple turquoise water strip down the side. Only large readable Minecraft-like block shapes. No huge cascading waterfalls, no lanterns everywhere, no flowers, no tiny planks or brick texture, no elaborate scenery. Muted greens, teal, brown, slate and small warm yellow window. Use image 1 ONLY as the reference for economical hand-drawn Minecraft web-game shapes and dark-purple contour lines. Image 2 is the simplified graphic style anchor. ORIGINAL subject, not a copy. Extremely LOW DETAIL DENSITY, simple angular BLOCK FORMS, slightly irregular ink edges, broad flat color fills with ONE hard-edged shadow per material, tiny color palette. This should be a charming, straightforward hand-inked game website illustration, fully readable at thumbnail size. No glossy surfaces, no detailed material rendering, no tiny ornamental details, no glow or bloom, no airbrushing, no soft gradients, no cinematic lighting, no 3D render, no photography, no elaborate fantasy art. No characters, no letters, no words, no logos, no watermark, no interface. Square composition with generous breathing room and a quiet flat muted plum background; no busy landscape.
```
