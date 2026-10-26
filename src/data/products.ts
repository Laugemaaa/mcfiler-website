export type Category = "Skripts" | "Plugins" | "Setups";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  details: string;
  features: string[];
  versions: string;
  requirements: string;
  includes: string;
  visual: "script" | "plugin" | "setup";
}

// Demonstrationsdata. Alle priser, funktioner og versioner er eksempler.
// Erstat indholdet med verificerede oplysninger inden butikkens lancering.
export const products: Product[] = [
  {
    slug: "essentials-skript",
    name: "Essentials Skript",
    category: "Skripts",
    price: 49,
    description:
      "De små detaljer, der gør en stor forskel. Saml serverens vigtigste kommandoer ét sted.",
    details:
      "Et eksempel på et overskueligt grundlag til din server. Essentials Skript samler praktiske spillerkommandoer og danske beskeder i en konfiguration, du kan tilpasse.",
    features: [
      "Kommandoer til spawn, hjem og teleportering",
      "Danske beskeder, der kan tilpasses",
      "Rettigheder til de enkelte kommandoer",
      "Overskuelig konfiguration med kommentarer",
    ],
    versions: "1.20 – 1.21.x",
    requirements:
      "Paper og Skript. Præcise udgaver og eventuelle tilføjelser aftales på Discord.",
    includes: "Eksempel på en .sk-fil og en dansk installationsvejledning.",
    visual: "script",
  },
  {
    slug: "jobs-plugin",
    name: "Jobs Plugin",
    category: "Plugins",
    price: 99,
    description:
      "Giv spillerne noget at arbejde hen imod med jobs, niveauer og belønninger.",
    details:
      "Et eksempel på et jobsystem, som giver hverdagen på din server mere retning. Spillere vælger et job, optjener erfaring og låser op for belønninger undervejs.",
    features: [
      "Jobs til blandt andet miner, skovhugger og farmer",
      "Erfaring og niveauer for hvert job",
      "Tilpasning af belønninger og beskeder",
      "Menu med overblik over spillerens fremskridt",
    ],
    versions: "1.20 – 1.21.x",
    requirements:
      "Paper. Økonomiunderstøttelse og præcise afhængigheder aftales på Discord.",
    includes:
      "Eksempel på en .jar-fil, konfiguration og en dansk installationsvejledning.",
    visual: "plugin",
  },
  {
    slug: "survival-setup",
    name: "Survival Setup",
    category: "Setups",
    price: 299,
    description:
      "Et gennemtænkt udgangspunkt til dit næste fællesskab. Fra første spawn til det store eventyr.",
    details:
      "Et eksempel på en samlet serveropsætning til en survival-server. Konfiguration, grundlæggende spillerfunktioner og danske tekster er samlet, så du har et udgangspunkt at bygge videre på.",
    features: [
      "Grundopsætning til en survival-server",
      "Eksempel på spawn og spillerintroduktion",
      "Konfigurerede rettigheder og spillergrupper",
      "Danske beskeder og vejledning til tilpasning",
    ],
    versions: "1.21.x",
    requirements:
      "Java og Paper til den aftalte Minecraft-version. Serverhosting er ikke inkluderet.",
    includes:
      "Eksempel på en mappe med serverkonfiguration og vejledning. Indhold og eventuelle tredjepartslicenser skal afklares før køb.",
    visual: "setup",
  },
];

export const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("da-DK").format(price)} kr.`;
