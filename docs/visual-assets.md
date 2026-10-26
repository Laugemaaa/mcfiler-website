# Visuel identitet og billedaktiver

Redesign til MCFiler.dk. Reference undersøgt 26. oktober 2026: [Mineplex' aktuelle hjemmeside](https://mineplex.com/), både på computer og mobil. Referencen blev undersøgt i browseren, med skærmbilleder og kontrol af sidens lag, skrifter og farver.

## Referenceanalyse

Mineplex viser i øjeblikket et sæsonpræget Halloween-univers. En mørk violet nattehimmel og et stort månelyst træ danner scenen. Separate lag til himmel, skyer, bjerge, bakker og lys giver dybde. Store tegnede figurer flankerer indholdet og indrammer det centrale logo. Forgrunden glider over i indholdssektionerne med vegetation og mørke silhuetter.

Navigationen er kompakt og vandret med kraftige bogstaver, varme orange markeringer og knapper med synlig dybde. Et stort ekstruderet logo bærer identiteten. Nyhedskort ligger centralt i heroen, mens mørke marineblå flader giver ro længere nede. Overskrifter er kraftige og ofte versale; nyhedsoverskrifter bruger Oswald, og brødteksten bruger en almindelig sans serif. Grafik, gule/orange fokuspunkter og gentagne lysdetaljer binder kompositionen sammen.

Det overførte princip er en sammenhængende illustreret verden omkring indholdet, tydelig typografisk rangorden og konsekvente interaktionsdetaljer. Layout, karakterer, logo, farvekombination og filer er ikke kopieret. Ingen Mineplex-billedfil bruges i MCFiler.dk.

## MCFilers retning

MCFiler får en original dal ved skumring med skovklædte blokbjerge, vandfald, værksteder, lanterner og dybde i billedets naturlige forgrund, mellemgrund og baggrund. Store landskabsformer holdes uden for tekstens centrale fokus. Siden bruger ikke scrollstyret parallax, ekstra animationsbiblioteker eller separate tunge baggrundslag. Et optimeret billede og en rolig overgang til baggrunden giver atmosfæren uden løbende JavaScript-animation.

| Rolle                           | Farve                 |
| ------------------------------- | --------------------- |
| Grundflade                      | `#0c2429` mørk petrol |
| Indholdsflade                   | `#142f35`             |
| Primær knap og små fokuspunkter | `#f4bd60` varm gylden |
| Skripts                         | `#a2e3ae` grøn        |
| Plugins                         | `#cbb2ff` ametyst     |
| Setups                          | `#efc47b` rav         |
| Brødtekst                       | `#b1c4c3`             |

Bungee bruges i logo, korte overskrifter og priser. Nunito Sans bruges i beskrivelser, navigation og knapper. Begge hostes lokalt via Fontsource og er licenseret under SIL Open Font License 1.1. De fulde licenser er kopieret til `public/fonts/OFL-Bungee.txt` og `public/fonts/OFL-NunitoSans.txt`. Det oprindelige kubeikon er videreudviklet som SVG med den nye palet; illustrerede baggrunde og produktbilleder er rigtige rasteraktiver.

## Færdige aktiver

Alle fire illustrationer er nygenereret til projektet med den indbyggede ImageGen-funktion. Der er ikke brugt API-/CLI-fallback, stockbilleder eller kopier fra referencen. Der mangler ingen illustrationer til det aktuelle redesign.

| Aktiv       | Filer i `public/images/`                               | Brug                                                |
| ----------- | ------------------------------------------------------ | --------------------------------------------------- |
| Landskab    | `hero-world-1672.webp`, `hero-world-960.webp`          | Hero og diskret baggrund på undersider              |
| Skript-bog  | `category-script-960.webp`, `category-script-480.webp` | Skripts, eksempelprodukt og præsentation            |
| Plugin-kube | `category-plugin-960.webp`, `category-plugin-480.webp` | Plugins og eksempelprodukt                          |
| Serverø     | `category-setup-960.webp`, `category-setup-480.webp`   | Setups, eksempelprodukt, om-side og Discord-sektion |

Heroens originale opløsning er 1672 × 941 px; kategori-originalerne er 1254 × 1254 px. Filnavne og `srcset` angiver de faktiske eksportbredder. Der er ikke kunstigt opskaleret. WebP-versionerne er genereret med Sharp til to størrelser pr. motiv. Heroens største fil er cirka 291 KiB; kategori-illustrationernes små udgaver er cirka 47–58 KiB. Heroen indlæses med høj prioritet. Produkt- og kategoriillustrationer indlæses normalt efter behov; hovedillustrationen på produktsiden indlæses straks.

De genererede PNG-originaler ligger desuden lokalt i `.qa/art-originals/`, som er ignoreret af Git. Siden refererer udelukkende til de færdige WebP-filer i projektet. Ved billedudskiftning skal begge størrelser, dimensioner og dokumentationen opdateres.

## Præcise genereringsprompter

Prompterne er på engelsk for billedværktøjet; alle besøgendes tekster på hjemmesiden er på dansk.

### Hero

```text
Use case: stylized-concept. Asset type: original premium Minecraft-inspired website hero background for the Danish Minecraft marketplace MCFiler.dk. Create a very wide panoramic 16:9 high-resolution digital environment illustration, ideally 3072x1728 or larger. A lush enchanting voxel-built fantasy valley at blue hour, sweeping blocky mountains in the distance fading through blue atmospheric perspective, a winding river descending into a luminous emerald waterfall in the right third, small original timber-and-stone houses with warm amber lantern windows nestled into terraced grass hills, beautifully detailed cubic conifer trees framing the left and right edges. Far-right foreground a handsome original little blocky workshop on a rocky grass promontory, illuminated by golden lanterns, with a subtle glowing mint-green square doorway. Sky deep teal-blue shading naturally to gentle peach on the low horizon, wispy stylized clouds. Landscape composition feels expansive and expertly art-directed with distinct distant, midground and close layers, crisp voxel geometry and lush pixel-texture surfaces, cinematic ambient light, painterly-polished 3D illustration rather than a raw gameplay screenshot. Keep the upper center and central left area relatively open with quiet deep teal sky and atmospheric valley, suitable for large light-colored website text overlay; detailed architecture mostly along sides and lower half. Rich forest greens, dark petrol teal, stone blue, mint accents, warm honey lighting. The lower edge should become dark forest-teal terrain to blend into the website sections. No characters, no text, no letters, no logos, no interface, no badges, no watermark. Completely original artwork: do not imitate or reproduce Mineplex artwork, characters, logo or layout; no existing brand assets.
```

### Skripts

```text
Use case: stylized-concept. Asset type: original square premium Minecraft-inspired digital product/category illustration for MCFiler.dk, matching an atmospheric voxel fantasy world of emerald forests, blue twilight and golden lanterns. Primary subject: an exquisitely detailed floating open parchment spellbook, a glowing mint-green square rune without letters hovering above its pages, a small original pixel-styled quill and a few tiny luminous cubic particles. The objects float above a mossy block-built stone pedestal, a small grass-and-stone island with delicate ferns and tiny mushrooms. Composition: centered cohesive three-dimensional object, complete silhouette with generous breathing room on all sides; three-quarter front view. Style: professionally art-directed 3D voxel game key art, crisp cubic geometry, carefully textured stone, warm leather and paper, beautiful soft ambient lighting, subtle green magical light. Background: quiet deep dark petrol green (#102a29), softly lit by a gentle emerald glow, with only a subtle hint of blocky forest silhouettes. Rich emerald and mint accents, warm cream paper. High resolution 1024x1024. No text, no letters, no logos, no frame, no UI, no watermark, no characters. Original artwork, no borrowed Mineplex or Mojang assets.
```

### Plugins

```text
Use case: stylized-concept. Asset type: original square premium Minecraft-inspired digital product/category illustration for MCFiler.dk, visually consistent with an atmospheric voxel fantasy world. Primary subject: an intricately crafted enchanted amethyst mechanical cube with polished deep stone edges and luminous lavender crystal squares inset on each face, two small original cubic gears and a few floating violet crystal shards around it. A modular magical machine that evokes new abilities and server plugins. It hovers above a small block-built stone-and-crystal pedestal with violet geodes. Composition: centered cohesive three-dimensional object, complete silhouette with generous breathing room on all sides; three-quarter front view. Style: professionally art-directed 3D voxel game key art, crisp block geometry, beautiful pixel-scale texture, premium cinematic ambient lighting, restrained soft purple magical illumination. Background: quiet dark midnight petrol (#11232d) with a gentle violet haze and faint rock silhouettes, no busy scene. Palette: amethyst purple, lavender, slate teal, tiny warm gold details. High resolution 1024x1024. No text, no letters, no logos, no frame, no UI, no watermark, no characters. Completely original artwork; do not use Mineplex or Mojang brand assets.
```

### Setups

```text
Use case: stylized-concept. Asset type: original square premium Minecraft-inspired digital product/category illustration for MCFiler.dk, consistent with an atmospheric voxel world of emerald forests and golden lanterns. Primary subject: a beautiful floating miniature voxel island with a detailed little timber-and-stone cottage, a warm glowing doorway, a handsome blocky evergreen tree, winding stone steps, tiny golden lanterns, mossy grass terraces, a small flowing turquoise waterfall, and a rocky underside with visible stone blocks. A complete little server world ready to explore. Composition: centered cohesive island, complete silhouette with generous breathing room on all sides; three-quarter isometric front view. Style: professionally art-directed 3D voxel game key art, crisp cubic geometry, rich pixel-scale material detail, soft cinematic ambient light, cozy golden windows and amber accents. Background: quiet dark petrol teal (#11292b) with a subtle warm golden atmospheric haze and faint distant island silhouettes, no busy scene. Palette: forest green, turquoise water, warm amber and honey, slate rock. High resolution 1024x1024. No text, no letters, no logos, no frame, no UI, no watermark, no characters. Completely original artwork; no Mineplex or Mojang brand assets.
```
