# MCFilers selvstændige visuelle identitet

Opdateret 17. november 2026.

MCSETUPS bruges som inspiration til butikselementer: kategorier, produktvisning, kontakt om særlige behov og Discord-bestilling. Layoutet er MCFilers eget: todelt introduktion, en mørk kategoribjælke, et samlet produktområde, et separat bestillingsforløb og to indgange til information og support.

Mineplex-reference: https://mineplex.com/support/ og https://mineplex.com/stats/ samt brugerens skærmbilleder. Inspirationen er turkis malet himmel, cremefarvede indholdsflader, orange knapper med tydelig bundkant, karakteristisk displaytypografi og flade tegnede skygger. Ingen grafik eller logoer er hentet fra referencesiderne.

Grafikken er ny og AI-genereret med den indbyggede ImageGen-funktion. Den er en stiltilnærmelse, ikke en garanti for samme tegnestreg eller manuelt udført illustration. Produktillustrationerne fra det tidligere billedsæt er bevaret. Ingen kundeanmeldelser, salgstal eller popularitetsrangeringer er tilføjet.

## Nye aktiver

- `public/images/prison-workshop-1440.webp` og `prison-workshop-800.webp`: originalt Prison-værksted i to responsive opløsninger.
- `public/images/painted-sky-1672.webp` og `painted-sky-960.webp`: malet himmel til sidens baggrund.

PNG-originalerne er bevaret i Codex' generated_images-mappe. WebP er eksporteret med Sharp uden opskalering. Ingen af de tidligere figurer eller baggrundsscener indlæses.

## Bevægelse

Sektioner glider ind én gang ved scroll. En smal læseindikator følger sidens fremdrift. Knapper og kategorilinks har en kort klikbølge, produktkort har en diskret musestyret hældning på højst 1,5 grad, og billeder zoomer let ved hover. Filtrering, sideskift, mobilmenu, spørgsmål/svar og Discord-dialogen har korte overgange. Touch bruger klikrespons uden musestyret hældning.

Skybaggrunden bevæger sig langsomt frem og tilbage med en CSS-transform (48 sekunder pr. retning). Den stopper uden for skærmen, i en skjult fane og ved reduceret bevægelse. Skyerne bruger de eksisterende billedaktiver; kun baggrundslaget flyttes. Implementationen ligger i `src/components/CloudBackground.tsx` og `src/clouds.css`. Der er ingen parallax eller partikler. Scroll- og pointerarbejde samles med requestAnimationFrame; scroll-reveal bruger IntersectionObserver. Animationer og eventlyttere ryddes op. Reduceret bevægelse slår effekterne fra og viser straks alt indhold, også når indstillingen ændres under besøget. Tastaturfokus og navigation bevares.

Produktionsbuild og browserkontroller dækker konkrete animationer, filtre, klikbølgens oprydning, mobilmenu, dialoger, sideskift og statisk/dynamisk reduceret bevægelse.

## Præcise billedprompter

### Malet himmel

Original wide 16:9 2D hand painted game website sky background. Large broad angular turquoise and cyan brush strokes in upper sky, soft ivory and pale mint chunky cumulus clouds along lower quarter, low simple mint hills on very bottom edge. Center has ample quiet cyan space for website content overlay. Flat cel shading, crisp stylized painterly edges, intentionally few large shapes and restrained detail. Palette cyan #3caacb, pale aqua #bdeee7, warm ivory white. Match a cheerful block-building game illustrated website aesthetic. Absolutely no text, logo, UI, people, castles, buildings, objects, gradients of realistic photography, lens effects, 3D rendering, or particles. This will sit behind white content panels, so it must be calm and readable.

### Prison-værksted

Use case: illustration-story. Create an original landscape website illustration for a Danish Minecraft prison server files shop. Wide 16:9 composition. Hand drawn 2D game website artwork with broad angular brush shapes, clean dark blue contours on objects, simple cel shaded flat colors, charming carefully drawn blocky architecture. Bright turquoise blue sky occupying upper 55 percent with sweeping chunky painted sky strokes and large ivory/mint clouds. Bottom right: a small welcoming block-built prison workshop tower of blue slate stone, warm orange banners, barred windows, wooden coding workbench with small teal screen visible through an open arch, small minecart and golden crystals. Bottom left and center: simple low grassy ledges and pale clouds, lots of quiet sky space. Saturated harmonious cyan, mint, leaf green, warm golden orange, dark indigo. Professional 2D hand-painted videogame promotional background, restrained detail and strong readable silhouettes. No text, logos, letters, watermark, UI, people, stock photorealism, 3D rendering, realistic textures, excessive tiny details or glowing particles. This is original art, do not recreate an existing branded scene.
