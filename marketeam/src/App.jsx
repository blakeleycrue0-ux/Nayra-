import { useEffect, useRef, useState } from "react";

const LOGO_URL =
  "https://polo-pecan-73837341.figma.site/_assets/v11/17ae538989a509947a8de3892c644664895e69b1.png";

const HEADING_TEXT =
  "Unlock Top Marketing Talent You Thought Was Out of Reach — Now Just One Click Away!";
const DARK_CHARS = 67;
const TYPE_SPEED = 35;
const TYPE_DELAY = 400;

const AVATARS = [
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png",
    orbit: 1, angle: 270, radius: 177, size: 58, shape: "square20", glow: "purple", delay: 0.6,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png",
    orbit: 2, angle: 60, radius: 251, size: 58, shape: "round", glow: "yellow", delay: 0.8,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png",
    orbit: 2, angle: 180, radius: 251, size: 78, shape: "round", glow: "pink", delay: 1.0,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png",
    orbit: 2, angle: 300, radius: 251, size: 58, shape: "square20", glow: "blue", delay: 1.2,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png",
    orbit: 3, angle: 130, radius: 325, size: 88, shape: "round", glow: "pink", delay: 1.4,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png",
    orbit: 4, angle: 30, radius: 399, size: 58, shape: "round", glow: "purple", delay: 1.6,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png",
    orbit: 4, angle: 95, radius: 399, size: 88, shape: "square24", glow: "orange", delay: 1.85,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png",
    orbit: 4, angle: 220, radius: 399, size: 88, shape: "square24", glow: "pink", delay: 2.1,
  },
  {
    src: "https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png",
    orbit: 4, angle: 320, radius: 399, size: 58, shape: "round", glow: "purple", delay: 2.3,
  },
];

const TICKER_LOGOS = [
  "https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg",
  "https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg",
];

/* Animates 0 -> target over `duration` ms with easeOutCubic, after `delay` ms */
function useCountUp(target, duration = 2000, delay = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    let start = null;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, delay]);

  return value;
}

function TypewriterHeading({ text, darkChars, speed = TYPE_SPEED, delay = TYPE_DELAY }) {
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    let interval;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  const typed = text.slice(0, count);
  const dark = typed.slice(0, darkChars);
  const light = typed.slice(darkChars);

  return (
    <h1 className="hero-heading">
      <span className="heading-dark">{dark}</span>
      <span className="heading-light">{light}</span>
      {!done && <span className="type-cursor" />}
    </h1>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PointerCursor() {
  return (
    <div className="cursor-tag">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 3.5 20 10l-7 2.2L10.2 20 4 3.5Z"
          fill="#A068FF"
          stroke="#A068FF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="cursor-name">David</span>
    </div>
  );
}

function Circles() {
  const specialists = useCountUp(20);
  return (
    <div className="circles" aria-hidden="true">
      {[4, 3, 2].map((n) => (
        <div key={n} className={`orbit orbit-${n}`}>
          {AVATARS.filter((a) => a.orbit === n).map((a) => (
            <Avatar key={a.src + a.angle} {...a} />
          ))}
        </div>
      ))}
      <div className="orbit orbit-1">
        {AVATARS.filter((a) => a.orbit === 1).map((a) => (
          <Avatar key={a.src + a.angle} {...a} />
        ))}
        <div className="center-stat">
          <span className="stat-number">{specialists}k+</span>
          <span className="stat-label">Specialists</span>
        </div>
      </div>
    </div>
  );
}

function Avatar({ src, angle, radius, size, shape, glow, delay }) {
  return (
    <div
      className="avatar-pos"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
      }}
    >
      <img
        src={src}
        alt=""
        className={`avatar avatar-${shape} glow-${glow}`}
        style={{ width: size, height: size, animationDelay: `${delay}s` }}
      />
    </div>
  );
}

function LogoTicker() {
  const strip = [...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {strip.map((src, i) => (
          <img key={i} src={src} alt="" className="ticker-logo" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <img src={LOGO_URL} alt="Marketeam" className="logo" />
          <nav className="nav">
            <a href="#team" className="nav-link">Your Team</a>
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </nav>
        </div>
        <div className="header-right">
          <a href="#login" className="login-link">Log In</a>
          <div className="btn-border-wrap">
            <button className="btn btn-join">Join Now</button>
          </div>
        </div>
      </header>

      <main className="hero">
        <div className="hero-left">
          <TypewriterHeading text={HEADING_TEXT} darkChars={DARK_CHARS} />
          <div className="btn-border-wrap start-wrap">
            <button className="btn btn-start">
              Start Project
              <ArrowIcon />
            </button>
          </div>
          <PointerCursor />
        </div>

        <div className="hero-right">
          <Circles />
        </div>
      </main>

      <section className="logos">
        <LogoTicker />
      </section>
    </div>
  );
}
