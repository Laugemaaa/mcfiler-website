import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { discordUrl } from "./config";
import {
  products,
  formatPrice,
  type Category,
  type Product,
} from "./data/products";
import { Icon, type IconName } from "./components/Icon";
import { ProductArt, CategoryIllustration } from "./components/ProductArt";
import { HeroScene } from "./components/HeroScene";
import { MotionEffects, tiltCard, resetCard } from "./components/MotionEffects";

const DiscordContext = createContext<(product?: string) => void>(() => {});

function DiscordButton({
  children,
  product,
  className = "button button-discord",
}: {
  children?: ReactNode;
  product?: string;
  className?: string;
}) {
  const openDiscord = useContext(DiscordContext);
  return discordUrl ? (
    <a
      className={className}
      href={discordUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="discord" size={19} />
      {children ?? "Åbn Discord"}
      <Icon name="diagonal" size={16} />
    </a>
  ) : (
    <button
      type="button"
      className={className}
      onClick={() => openDiscord(product)}
    >
      <Icon name="discord" size={19} />
      {children ?? "Åbn Discord"}
      <Icon name="diagonal" size={16} />
    </button>
  );
}

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="MCFiler.dk, forside">
      <svg viewBox="0 0 40 44" width="36" height="39" aria-hidden="true">
        <path d="m20 2 18 10-18 10L2 12Z" fill="#a9edb0" />
        <path d="m2 12 18 10v20L2 32Z" fill="#4eae86" />
        <path d="m20 22 18-10v20L20 42Z" fill="#256e63" />
        <path
          d="m8 15 12 7 12-7M20 22v13"
          stroke="#e2ffe8"
          strokeOpacity=".35"
        />
        <path d="m20 6 9 5-9 5-9-5Z" fill="#e1f9a8" />
      </svg>
      <span>
        MC<span className="brand-filer">Filer</span>
        <span className="brand-domain">.dk</span>
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const selectedCategory = new URLSearchParams(location.search).get("kategori");
  useEffect(
    () => setMenuOpen(false),
    [location.pathname, location.search, location.hash],
  );
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const navigation = (
    <>
      <NavLink to="/" end>
        Forside
      </NavLink>
      <NavLink
        to="/produkter"
        className={({ isActive }) =>
          isActive && !selectedCategory ? "active" : undefined
        }
      >
        Produkter
      </NavLink>
      {categories.map((category) => (
        <Link
          key={category.name}
          className={
            location.pathname === "/produkter" &&
            selectedCategory === category.name
              ? "active"
              : undefined
          }
          aria-current={
            location.pathname === "/produkter" &&
            selectedCategory === category.name
              ? "page"
              : undefined
          }
          to={`/produkter?kategori=${category.name}`}
        >
          {category.name}
        </Link>
      ))}
      <NavLink to="/om-os">Om os</NavLink>
    </>
  );
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container">
          <span>SMÅ FILER. STORE MULIGHEDER.</span>
          <Link to="/support">
            <span className="utility-dot" />
            Bestilling & support på Discord
            <Icon name="diagonal" size={12} />
          </Link>
        </div>
      </div>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Hovedmenu">
          {navigation}
        </nav>
        <div className="header-actions">
          <DiscordButton className="button header-discord">
            Discord
          </DiscordButton>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <button
            className="menu-backdrop"
            type="button"
            aria-label="Luk navigationsmenu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
          <nav id="mobile-menu" className="mobile-nav" aria-label="Mobilmenu">
            <span className="eyebrow">DIT NÆSTE SERVERPROJEKT</span>
            {navigation}
            <NavLink to="/support">Kontakt & support</NavLink>
            <DiscordButton className="button button-primary">
              Besøg Discord
            </DiscordButton>
          </nav>
        </>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Brand />
            <p>
              Danske byggeklodser til din næste Minecraft-verden.
              <br />
              Skabt til dig, der har mere at bygge.
            </p>
          </div>
          <nav aria-label="Produkter i sidefod">
            <span className="footer-label">BYG VIDERE</span>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/produkter?kategori=${category.name}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <nav aria-label="Information i sidefod">
            <span className="footer-label">MCFILER</span>
            <Link to="/om-os">Om os</Link>
            <Link to="/support">Kontakt & support</Link>
            <Link to="/produkter">Alle produkter</Link>
          </nav>
          <div className="footer-community">
            <span className="footer-label">SKAL VI TALE MINECRAFT?</span>
            <DiscordButton className="button footer-discord">
              Besøg Discord
            </DiscordButton>
            <span className="danish-label">
              Dansk butik. Personlig kontakt.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MCFiler.dk</span>
          <span>Ikke tilknyttet eller godkendt af Mojang eller Microsoft.</span>
          <span>Byg noget, der er dit eget.</span>
        </div>
      </div>
    </footer>
  );
}

const categories: {
  name: Category;
  icon: IconName;
  description: string;
  index: string;
}[] = [
  {
    name: "Skripts",
    icon: "code",
    description: "Små filer med stor effekt.",
    index: "01",
  },
  {
    name: "Plugins",
    icon: "cube",
    description: "Nye muligheder til din server.",
    index: "02",
  },
  {
    name: "Setups",
    icon: "layers",
    description: "Et samlet sted at starte.",
    index: "03",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className={`product-card product-${product.visual}`}
      onPointerMove={tiltCard}
      onPointerLeave={resetCard}
      onPointerCancel={resetCard}
    >
      <Link
        to={`/produkter/${product.slug}`}
        className="product-art-link"
        aria-label={`Se ${product.name}`}
      >
        <ProductArt type={product.visual} />
        <span className="art-open">
          <Icon name="diagonal" size={20} />
        </span>
      </Link>
      <div className="product-card-content">
        <div className="product-meta">
          <span className="category-badge">
            <Icon
              name={
                product.visual === "script"
                  ? "code"
                  : product.visual === "plugin"
                    ? "cube"
                    : "layers"
              }
              size={13}
            />
            {product.category}
          </span>
          <span className="example-tag">Eksempel</span>
        </div>
        <Link className="product-title" to={`/produkter/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <div className="card-versions">
          <span className="version-dot" />
          <span>Minecraft {product.versions}</span>
          <span className="version-example">Eksempel</span>
        </div>
        <div className="product-card-bottom">
          <div className="price">
            {formatPrice(product.price)}
            <small>Eksempelpris</small>
          </div>
          <Link
            className="button button-card"
            to={`/produkter/${product.slug}`}
          >
            Se produkt
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <DiscordButton product={product.name} className="product-discord">
          Køb via Discord
        </DiscordButton>
      </div>
    </article>
  );
}

function ProductGrid({ selected = "Alle" }: { selected?: Category | "Alle" }) {
  const filtered = products.filter(
    (product) => selected === "Alle" || product.category === selected,
  );
  return (
    <div className="product-grid">
      {filtered.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

function FilterButtons({
  value,
  onChange,
}: {
  value: Category | "Alle";
  onChange: (value: Category | "Alle") => void;
}) {
  return (
    <div
      className="filter-buttons"
      role="group"
      aria-label="Filtrér produkter efter kategori"
    >
      {(["Alle", "Skripts", "Plugins", "Setups"] as const).map((category) => (
        <button
          type="button"
          className={value === category ? "filter active" : "filter"}
          key={category}
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {category === "Alle" ? "Alle produkter" : category}
          <span>
            {category === "Alle"
              ? products.length
              : products.filter((product) => product.category === category)
                  .length}
          </span>
        </button>
      ))}
    </div>
  );
}

function SupportBanner() {
  return (
    <section className="support-banner">
      <div className="support-banner-art" aria-hidden="true">
        <CategoryIllustration type="setup" />
      </div>
      <div className="support-banner-content">
        <span className="eyebrow">SAMMEN OM DIN NÆSTE VERDEN</span>
        <h2>
          En god idé starter
          <br />
          med en samtale.
        </h2>
        <p>
          Spørg ind til et produkt, få hjælp til din server,
          <br className="desktop-break" /> eller fortæl os, hvad du drømmer om
          at bygge.
        </p>
        <DiscordButton className="button button-primary">
          Besøg Discord
        </DiscordButton>
      </div>
      <span className="banner-coordinate" aria-hidden="true">
        NÆSTE STOP: DIN SERVER
      </span>
    </section>
  );
}

function Home() {
  const [category, setCategory] = useState<Category | "Alle">("Alle");
  return (
    <>
      <section className="hero">
        <HeroScene />
        <div className="hero-copy container">
          <div className="hero-kicker">
            <span />
            DIN DANSKE MINECRAFT-BUTIK
            <span />
          </div>
          <h1 className="hero-wordmark">
            <span className="hero-logo-letters">MCFILER</span>
            <small>.DK</small>
          </h1>
          <h2 className="hero-tagline">
            Små filer. <span>Store eventyr.</span>
          </h2>
          <p>
            Giv din server liv med Skripts, Plugins og komplette Setups.
            <br className="desktop-break" /> Du har idéerne. Vi har dine næste
            byggeklodser.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/produkter">
              <Icon name="cube" size={20} />
              Udforsk produkter
              <Icon name="arrow" size={18} />
            </Link>
            <DiscordButton className="button button-secondary">
              Besøg Discord
            </DiscordButton>
          </div>
          <div className="hero-note">
            <Icon name="chat" size={15} />
            Bestilling og personlig kontakt via Discord
          </div>
        </div>
        <a
          className="hero-scroll"
          href="#kategorier"
          aria-label="Se vores produktkategorier"
        >
          <span>DIT NÆSTE EVENTYR STARTER HER</span>
          <Icon name="chevron" size={21} />
        </a>
      </section>
      <section
        className="category-section container"
        id="kategorier"
        aria-label="Produktkategorier"
      >
        <div className="category-strip">
          {categories.map((category, index) => (
            <Link
              to={`/produkter?kategori=${category.name}`}
              className={`category-item category-${["script", "plugin", "setup"][index]}`}
              key={category.name}
            >
              <div className="category-copy">
                <span className="category-overline">
                  {category.index} / BYG VIDERE
                </span>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <span className="category-link">
                  Udforsk
                  <Icon name="arrow" size={16} />
                </span>
              </div>
              <CategoryIllustration
                type={(["script", "plugin", "setup"] as const)[index]}
                className="category-illustration"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="section container" id="produkter">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KLAR TIL DIN NÆSTE IDÉ?</span>
            <h2>
              Find dine <span>byggeklodser.</span>
            </h2>
            <p>
              Små forbedringer eller en helt ny begyndelse. Her starter det.
            </p>
          </div>
          <Link to="/produkter" className="text-link">
            Se alle produkter
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="catalogue-toolbar">
          <FilterButtons value={category} onChange={setCategory} />
          <span className="catalogue-note">
            <span className="notice-dot" />
            Butikken er under opbygning
          </span>
        </div>
        <ProductGrid selected={category} />
        <div className="demo-notice">
          <Icon name="chat" size={15} />
          <p>
            Et kig ind i den kommende butik. Alle produkter, priser, funktioner
            og versionsangivelser er midlertidige eksempler.
          </p>
        </div>
      </section>
      <section className="how-section">
        <div className="container">
          <div className="how-intro">
            <span className="eyebrow">FRA FØRSTE IDÉ TIL DIN SERVER</span>
            <h2>
              Tre skridt.
              <br />
              <span>Uendelige muligheder.</span>
            </h2>
            <p>
              Vi holder det enkelt og samler samtalen på Discord, så du kan
              fokusere på det, du vil bygge.
            </p>
            <Link className="text-link" to="/support">
              Sådan foregår det
              <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="steps">
            {[
              {
                title: "Find din byggeklods",
                text: "Udforsk produkterne, og find funktionerne, din server mangler.",
                icon: "cube",
              },
              {
                title: "Tag snakken med os",
                text: "På Discord afklarer vi indhold, kompatibilitet og pris før bestilling.",
                icon: "chat",
              },
              {
                title: "Byg dit næste eventyr",
                text: "Bestilling, betaling og aftale om levering foregår direkte på Discord.",
                icon: "layers",
              },
            ].map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-top">
                  <span>0{i + 1}</span>
                  <div className="step-icon">
                    <Icon name={step.icon as IconName} size={24} />
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="about-teaser container">
        <div className="teaser-art">
          <CategoryIllustration type="script" />
        </div>
        <div className="teaser-copy">
          <span className="eyebrow">MINECRAFT ER BEDRE MED GODE IDÉER</span>
          <h2>
            Til dem, der altid
            <br />
            <span>bygger videre.</span>
          </h2>
          <p>
            En ny funktion. Et nyt fællesskab. En helt ny verden. MCFiler er en
            dansk butik for dig, der vil gøre mere med din Minecraft-server.
          </p>
          <Link className="text-link" to="/om-os">
            Lær MCFiler at kende
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
      <div className="container support-section">
        <SupportBanner />
      </div>
    </>
  );
}

function Products() {
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get("kategori");
  const category = categories.some((item) => item.name === rawCategory)
    ? (rawCategory as Category)
    : "Alle";
  return (
    <div className="container page-content">
      <div className="page-intro">
        <span className="eyebrow">PRODUKTER FRA MCFILER</span>
        <h1>
          Giv din server
          <br />
          <span className="muted-heading">nye muligheder.</span>
        </h1>
        <p>
          Fra den lille forbedring til en helt ny begyndelse.
          <br />
          Find et udgangspunkt til det, du vil skabe.
        </p>
      </div>
      <div className="catalogue-toolbar">
        <FilterButtons
          value={category}
          onChange={(value) =>
            setParams(value === "Alle" ? {} : { kategori: value })
          }
        />
        <span className="catalogue-note">
          {
            products.filter(
              (product) => category === "Alle" || product.category === category,
            ).length
          }{" "}
          eksempel{category === "Alle" ? "produkter" : "produkt"}
        </span>
      </div>
      <div className="demo-notice">
        <span className="notice-dot" />
        <p>
          Butikken er under opbygning. Alle produkter, priser, funktioner og
          versioner er midlertidige eksempler.
        </p>
      </div>
      <ProductGrid selected={category} />
      <SupportBanner />
    </div>
  );
}

function ProductPage() {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean).at(-1);
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFound />;
  return (
    <div className="container page-content product-page">
      <nav className="breadcrumbs" aria-label="Brødkrummesti">
        <Link to="/">Forside</Link>
        <Icon name="chevron" size={12} />
        <Link to="/produkter">Produkter</Link>
        <Icon name="chevron" size={12} />
        <span>{product.name}</span>
      </nav>
      <div className="product-detail-grid">
        <div className="detail-art">
          <ProductArt type={product.visual} priority />
          <p>
            <Icon name="cube" size={16} /> Illustration af et eksempelprodukt
          </p>
        </div>
        <div className="product-summary">
          <div className="product-meta">
            <Link to={`/produkter?kategori=${product.category}`}>
              {product.category}
            </Link>
            <span className="example-tag">Eksempelprodukt</span>
          </div>
          <h1>{product.name}</h1>
          <p className="product-lead">{product.description}</p>
          <div className="detail-price">
            {formatPrice(product.price)}
            <span>Eksempelpris · ikke et aktuelt tilbud</span>
          </div>
          <DiscordButton
            className="button button-primary detail-buy"
            product={product.name}
          >
            Køb via Discord
          </DiscordButton>
          <p className="purchase-note">
            Bestilling og betaling aftales på Discord. Der gennemføres ingen
            betaling på hjemmesiden.
          </p>
          <div className="version-chip">
            <Icon name="layers" size={17} />
            <span>
              Minecraft {product.versions}
              <small>Eksempel på understøttede versioner</small>
            </span>
          </div>
        </div>
      </div>
      <div className="demo-notice detail-notice">
        <span className="notice-dot" />
        <p>
          Dette er et eksempelprodukt. Pris, funktioner, indhold og versionskrav
          skal bekræftes og erstattes inden lancering.
        </p>
      </div>
      <div className="detail-information">
        <section>
          <span className="eyebrow">OM PRODUKTET</span>
          <h2>En byggeklods til din server.</h2>
          <p>{product.details}</p>
          <h3>Eksempler på funktioner</h3>
          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={18} />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <aside className="specification">
          <h3>Godt at vide</h3>
          <dl>
            <dt>Minecraft-versioner</dt>
            <dd>{product.versions} (eksempel)</dd>
            <dt>Forudsætninger</dt>
            <dd>{product.requirements}</dd>
            <dt>Eksempel på indhold</dt>
            <dd>{product.includes}</dd>
            <dt>Bestilling & support</dt>
            <dd>Via MCFilers Discord, når serverlinket er tilføjet.</dd>
          </dl>
        </aside>
      </div>
      <div className="section-heading related-heading">
        <div>
          <span className="eyebrow">UDFORSK MERE</span>
          <h2>Andre byggeklodser.</h2>
        </div>
        <Link className="text-link" to="/produkter">
          Alle produkter
          <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="product-grid related-grid">
        {products
          .filter((item) => item.slug !== product.slug)
          .map((item) => (
            <ProductCard product={item} key={item.slug} />
          ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <span className="eyebrow">OM MCFILER</span>
        <h1>
          Bygget til dem,
          <br />
          <span className="muted-heading">der bygger videre.</span>
        </h1>
        <p>
          MCFiler er en dansk Minecraft-butik med fokus på
          <br className="desktop-break" /> Skripts, Plugins og komplette
          serveropsætninger.
        </p>
      </div>
      <div className="about-layout">
        <section className="about-copy">
          <h2>En god server begynder med en idé.</h2>
          <p>
            Måske vil du give spillerne et nyt mål. Måske mangler serveren en
            praktisk funktion. Eller måske er du ved at starte et helt nyt
            fællesskab.
          </p>
          <p>
            MCFiler samler digitale byggeklodser til Minecraft-servere, så du
            kan finde et udgangspunkt og gøre det til dit eget. Fra en enkelt
            Skript-fil til en samlet opsætning.
          </p>
          <p>
            Her på siden kan du udforske produkterne. Den personlige dialog,
            bestilling og betaling foregår på Discord, hvor vi kan afklare dine
            spørgsmål og serverens behov.
          </p>
          <div className="about-note">
            <span className="eyebrow">VI ER VED AT BYGGE OP</span>
            <p>
              Hjemmesiden er butikkens første grundstruktur. De viste produkter
              og priser er eksempler, og Discord-linket tilføjes inden åbning.
            </p>
          </div>
        </section>
        <div className="about-art">
          <ProductArt type="setup" priority />
          <span>SMÅ FILER. STORE MULIGHEDER.</span>
        </div>
      </div>
      <div className="principles">
        {[
          {
            icon: "globe",
            title: "På dansk",
            text: "Produktbeskrivelser og dialog med udgangspunkt i det danske Minecraft-fællesskab.",
          },
          {
            icon: "code",
            title: "Plads til dine idéer",
            text: "Skripts, Plugins og Setups som udgangspunkt for den server, du gerne vil skabe.",
          },
          {
            icon: "chat",
            title: "Direkte kontakt",
            text: "Spørgsmål, aftaler og support samlet på Discord, så samtalen hænger sammen.",
          },
        ].map((item) => (
          <section key={item.title}>
            <Icon name={item.icon as IconName} size={25} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </section>
        ))}
      </div>
      <SupportBanner />
    </div>
  );
}

const faqs = [
  {
    question: "Hvordan køber jeg et produkt?",
    answer:
      "Vælg et produkt, og tryk på “Køb via Discord”. Når Discord-serveren er tilføjet, fører knappen dig til serveren. Her aftaler vi indhold, kompatibilitet, pris, betaling og levering. De nuværende produkter er kun eksempler og kan ikke bestilles endnu.",
  },
  {
    question: "Hvilke Minecraft-versioner understøttes?",
    answer:
      "Det afhænger af det enkelte produkt. Se versionsfeltet på produktsiden, og få den præcise version samt afhængigheder bekræftet på Discord før køb. De viste versioner er foreløbige eksempler.",
  },
  {
    question: "Hvordan bliver filerne leveret?",
    answer:
      "Leveringsform og tidspunkt aftales på Discord før bestilling. Hjemmesiden har ikke automatiske downloads eller en betalingsløsning.",
  },
  {
    question: "Kan jeg få hjælp til installation?",
    answer:
      "Kontakt os på Discord med produktnavn, serverversion og en beskrivelse af det, du har brug for hjælp til. Hvilken installationshjælp der indgår, afklares inden køb.",
  },
  {
    question: "Hvorfor er produkterne markeret som eksempler?",
    answer:
      "MCFiler.dk er under opbygning. Eksempelprodukterne viser, hvordan den kommende butik er indrettet. Navne, priser, funktioner og versioner bliver erstattet med de faktiske produktoplysninger inden lancering.",
  },
];

function Support() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <span className="eyebrow">KONTAKT & SUPPORT</span>
        <h1>
          Lad os finde
          <br />
          <span className="muted-heading">en løsning sammen.</span>
        </h1>
        <p>
          Spørgsmål til et produkt eller en idé til din server?
          <br />
          Samtalen starter på Discord.
        </p>
      </div>
      <div className="support-layout">
        <section className="contact-panel">
          <div className="contact-icon">
            <Icon name="discord" size={42} />
          </div>
          <h2>Vi mødes på Discord.</h2>
          <p>
            Her samler vi produktspørgsmål, bestillinger og support. Skriv gerne
            produktnavn og Minecraft-version, så har vi et godt sted at starte.
          </p>
          <DiscordButton className="button button-primary">
            Åbn vores Discord
          </DiscordButton>
          <div className="contact-status">
            <span className="notice-dot" />
            {discordUrl
              ? "Bestilling og betaling aftales direkte på Discord."
              : "Discord-serveren tilføjes inden butikkens åbning."}
          </div>
        </section>
        <section className="faq-section">
          <span className="eyebrow">GODT AT VIDE</span>
          <h2>Måske ligger svaret her.</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Icon name="chevron" size={18} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <div className="support-footnote">
        <Icon name="chat" size={22} />
        <p>
          Der er ingen automatisk bestilling på siden. Vi afklarer altid
          produkt, pris og levering i samtalen på Discord.
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">404 · HER ER DER IKKE BYGGET ENDNU</span>
      <h1>
        Den byggeklods
        <br />
        kunne vi ikke finde.
      </h1>
      <p>Siden findes ikke, eller linket er blevet ændret.</p>
      <Link className="button button-primary" to="/produkter">
        Tilbage til produkterne
        <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}

function DiscordDialog({
  product,
  returnFocusTo,
  onClose,
}: {
  product: string | undefined;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (returnFocusTo?.isConnected) {
        returnFocusTo.focus({ preventScroll: true });
      }
    };
  }, [returnFocusTo]);
  return (
    <dialog
      className="discord-dialog"
      ref={ref}
      aria-labelledby="discord-title"
      aria-describedby="discord-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="dialog-close"
        aria-label="Luk besked"
        onClick={onClose}
        autoFocus
      >
        <Icon name="close" />
      </button>
      <div className="contact-icon">
        <Icon name="discord" size={36} />
      </div>
      <span className="eyebrow">VI ER SNART KLAR</span>
      <h2 id="discord-title">Vi bygger stadig.</h2>
      <p id="discord-description">
        Discord-serveren er endnu ikke tilføjet. Når butikken åbner, kan du
        kontakte os og aftale køb direkte på Discord.
      </p>
      {product && (
        <div className="dialog-product">
          <span>Du kigger på</span>
          <strong>{product}</strong>
          <small>Eksempelprodukt · kan ikke bestilles endnu</small>
        </div>
      )}
      <p className="dialog-note">
        Alle viste produkter og priser er midlertidige eksempler.
      </p>
      <button type="button" className="button button-primary" onClick={onClose}>
        Forstået
        <Icon name="check" size={18} />
      </button>
    </dialog>
  );
}

function PageEffects() {
  const { pathname, search } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const product = products.find(
      (item) => pathname === `/produkter/${item.slug}`,
    );
    const titles: Record<string, string> = {
      "/": "Mere liv i din Minecraft-server",
      "/produkter": "Skripts, Plugins & Setups",
      "/om-os": "Om MCFiler",
      "/support": "Kontakt & support",
    };
    document.title = `${product?.name ?? titles[pathname] ?? "Siden blev ikke fundet"} — MCFiler.dk`;
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, search]);
  return null;
}

export default function App() {
  const [dialog, setDialog] = useState<{
    product?: string;
    trigger: HTMLElement | null;
  } | null>(null);
  return (
    <DiscordContext.Provider
      value={(product) =>
        setDialog({
          product,
          trigger:
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null,
        })
      }
    >
      <a className="skip-link" href="#main-content">
        Spring til indhold
      </a>
      <PageEffects />
      <MotionEffects />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produkter" element={<Products />} />
          <Route path="/produkter/:slug" element={<ProductPage />} />
          <Route path="/om-os" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {dialog && (
        <DiscordDialog
          product={dialog.product}
          returnFocusTo={dialog.trigger}
          onClose={() => setDialog(null)}
        />
      )}
    </DiscordContext.Provider>
  );
}
