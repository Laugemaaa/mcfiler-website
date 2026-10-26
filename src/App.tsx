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
import { ProductArt } from "./components/ProductArt";
import { VoxelScene } from "./components/VoxelScene";

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
      <svg viewBox="0 0 36 40" width="31" height="34" aria-hidden="true">
        <path d="m18 2 17 9-17 9L1 11Z" fill="#b5e878" />
        <path d="m1 11 17 9v18L1 29Z" fill="#759a4c" />
        <path d="m18 20 17-9v18l-17 9Z" fill="#4e6c36" />
      </svg>
      <span>
        MCFiler<span className="brand-domain">.dk</span>
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Hovedmenu">
          <NavLink to="/" end>
            Forside
          </NavLink>
          <NavLink to="/produkter">Produkter</NavLink>
          <NavLink to="/om-os">Om MCFiler</NavLink>
          <NavLink to="/support">Support</NavLink>
        </nav>
        <div className="header-actions">
          <DiscordButton className="button header-discord">
            Vores Discord
          </DiscordButton>
          <button
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
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobilmenu">
          <NavLink to="/" end>
            Forside
          </NavLink>
          <NavLink to="/produkter">Produkter</NavLink>
          <NavLink to="/om-os">Om MCFiler</NavLink>
          <NavLink to="/support">Support</NavLink>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Små filer. Store muligheder.</p>
          </div>
          <nav aria-label="Sidefod">
            <Link to="/produkter">Produkter</Link>
            <Link to="/om-os">Om MCFiler</Link>
            <Link to="/support">Kontakt & support</Link>
          </nav>
          <DiscordButton className="footer-discord">
            Vi ses på Discord
          </DiscordButton>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MCFiler.dk</span>
          <span>
            En uafhængig butik. Ikke tilknyttet Mojang eller Microsoft.
          </span>
          <span className="danish-label">
            <span aria-hidden="true">🇩🇰</span> På dansk, selvfølgelig.
          </span>
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
    <article className="product-card">
      <Link
        to={`/produkter/${product.slug}`}
        className="product-art-link"
        aria-label={`Se ${product.name}`}
      >
        <ProductArt type={product.visual} />
      </Link>
      <div className="product-card-content">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="example-tag">Eksempel</span>
        </div>
        <Link className="product-title" to={`/produkter/${product.slug}`}>
          <h3>{product.name}</h3>
          <Icon name="diagonal" size={19} />
        </Link>
        <p>{product.description}</p>
        <div className="product-card-bottom">
          <div className="price">
            {formatPrice(product.price)}
            <small>Eksempelpris</small>
          </div>
          <DiscordButton product={product.name} className="button button-buy">
            Køb via Discord
          </DiscordButton>
        </div>
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
      <div className="support-symbol">
        <Icon name="discord" size={34} />
      </div>
      <div>
        <span className="eyebrow">LAD OS TALE MINECRAFT</span>
        <h2>Din næste idé starter med en samtale.</h2>
        <p>
          Spørg ind til et produkt, eller få hjælp til at finde det rigtige til
          din server.
        </p>
      </div>
      <DiscordButton className="button button-light">
        Find os på Discord
      </DiscordButton>
    </section>
  );
}

function Home() {
  const [category, setCategory] = useState<Category | "Alle">("Alle");
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span /> DIN DANSKE MINECRAFT-BUTIK
          </div>
          <h1>
            Din server.
            <br />
            Dine idéer.
            <br />
            <span>Vores byggeklodser.</span>
          </h1>
          <p>
            Skripts, Plugins og komplette serveropsætninger.
            <br className="desktop-break" /> Til dig, der vil skabe noget,
            spillerne vender tilbage til.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/produkter">
              Udforsk produkterne
              <Icon name="arrow" size={18} />
            </Link>
            <Link className="text-link" to="/om-os">
              Lær MCFiler at kende
              <Icon name="diagonal" size={16} />
            </Link>
          </div>
          <div className="hero-note">
            <Icon name="chat" size={15} /> Bestilling og personlig kontakt via
            Discord
          </div>
        </div>
        <div className="hero-visual">
          <div className="scene-topline">
            <span>EN VERDEN AF MULIGHEDER</span>
            <span>MC / DK</span>
          </div>
          <VoxelScene />
          <div className="scene-bottomline">
            <span className="tiny-cross">+</span>
            <span>Det hele begynder med en byggeklods.</span>
            <span className="tiny-cross">+</span>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="category-strip" aria-label="Produktkategorier">
          {categories.map((category) => (
            <Link
              to={`/produkter?kategori=${category.name}`}
              className="category-item"
              key={category.name}
            >
              <div className="category-icon">
                <Icon name={category.icon} size={24} />
              </div>
              <div>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
              </div>
              <Icon name="diagonal" className="category-arrow" size={19} />
            </Link>
          ))}
        </section>
      </div>
      <section className="section container" id="produkter">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BYG VIDERE PÅ DIN SERVER</span>
            <h2>
              Find din næste byggeklods<span className="green-dot">.</span>
            </h2>
          </div>
          <Link to="/produkter" className="text-link">
            Se alle produkter
            <Icon name="arrow" size={17} />
          </Link>
        </div>
        <div className="catalogue-toolbar">
          <FilterButtons value={category} onChange={setCategory} />
          <span className="catalogue-note">Et indblik i det, der kommer.</span>
        </div>
        <div className="demo-notice">
          <span className="notice-dot" />
          <p>
            Butikken er under opbygning. Produkter, priser og versionsangivelser
            nedenfor er eksempler.
          </p>
        </div>
        <ProductGrid selected={category} />
      </section>
      <section className="how-section">
        <div className="container">
          <div className="how-intro">
            <span className="eyebrow">FRA IDÉ TIL SERVER</span>
            <h2>Enkelt hele vejen.</h2>
            <p>
              Vi samler dialogen ét sted.
              <br />
              Så der er plads til det, du gerne vil bygge.
            </p>
            <Link className="text-link" to="/support">
              Sådan foregår det
              <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="steps">
            {[
              {
                title: "Find det, du mangler",
                text: "Udforsk produkterne, og læs om funktioner og krav til din server.",
                icon: "cube",
              },
              {
                title: "Tag snakken på Discord",
                text: "Vi afklarer kompatibilitet, indhold og pris, før du bestiller.",
                icon: "chat",
              },
              {
                title: "Gør det til dit eget",
                text: "Bestilling, betaling og aftale om levering foregår direkte på Discord.",
                icon: "download",
              },
            ].map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-top">
                  <span>0{i + 1}</span>
                  <Icon name={step.icon as IconName} size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
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
          <ProductArt type={product.visual} />
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
          <VoxelScene compact />
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
  onClose,
}: {
  product: string | undefined;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      className="discord-dialog"
      ref={ref}
      aria-labelledby="discord-title"
      aria-describedby="discord-description"
      onCancel={onClose}
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
  const [dialog, setDialog] = useState<{ product?: string } | null>(null);
  return (
    <DiscordContext.Provider value={(product) => setDialog({ product })}>
      <a className="skip-link" href="#main-content">
        Spring til indhold
      </a>
      <PageEffects />
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
          onClose={() => setDialog(null)}
        />
      )}
    </DiscordContext.Provider>
  );
}
