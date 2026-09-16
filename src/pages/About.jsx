import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

import {
  ArrowRight,
  Award,
  Bike,
  Compass,
  Flame,
  HandHeart,
  Heart,
  Home,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Sprout,
  TrendingUp,
  User,
  Utensils,
} from "lucide-react";

const img = (path) => `${import.meta.env.BASE_URL}${path}`

import aboutHeroImage from "../assets/image.jpeg";
import "../styles/About.scss";

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// CORE PHILOSOPHY
// ─────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Sprout,
    title: "Farm-to-table freshness",
    text:
      "Sourced direct from farmers, fishermen, and mills — freshness intact.",
    accent: "var(--color-primary)",
    iconBg: "rgba(20, 108, 54, 0.12)",
    cardBg: "#ffffff",
    border: "var(--color-primary)",
  },
  {
    icon: Leaf,
    title: "Nothing artificial",
    text:
      "No shortcuts or artificial flavours — just ingredients you can trust.",
    accent: "#996111",
    iconBg: "rgba(255, 153, 51, 0.14)",
    cardBg: "#fffdf8",
    border: "var(--color-secondary)",
  },
  {
    icon: HandHeart,
    title: "Fair to every hand",
    text:
      "A shorter supply chain means better pay and greater respect.",
    accent: "var(--color-primary)",
    iconBg: "rgba(20, 108, 54, 0.12)",
    cardBg: "#ffffff",
    border: "var(--color-primary)",
  },
  {
    icon: Utensils,
    title: "Made your way",
    text:
      "Every menu shaped around your family, taste, and occasion.",
    accent: "#996111",
    iconBg: "rgba(255, 153, 51, 0.14)",
    cardBg: "#fffdf8",
    border: "var(--color-secondary)",
  },
];

// ─────────────────────────────────────────────────────────────
// VISION FEATURES
// ─────────────────────────────────────────────────────────────

const visionFeatures = [
  {
    icon: Leaf,
    label: "Fresh Ingredients",
  },
  {
    icon: HandHeart,
    label: "Trusted By Families",
  },
  {
    icon: ShieldCheck,
    label: "100% Transparent",
  },
];

// ─────────────────────────────────────────────────────────────
// MISSION FEATURES
// ─────────────────────────────────────────────────────────────

const missionFeatures = [
  {
    icon: HandHeart,
    label: "Support Local Livelihoods",
  },
  {
    icon: Sprout,
    label: "Chemical-Free Food",
  },
  {
    icon: Heart,
    label: "Community First",
  },
];

// ─────────────────────────────────────────────────────────────
// JOURNEY
// ─────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "2014",
    title: "A Small Kitchen, A Big Dream",
    text:
      "Qatind began with honest, home-style cooking and ingredients at the centre of every meal.",
    icon: Home,
    dot: "top",
  },
  {
    year: "2017",
    title: "Stepping Into Corporate",
    text:
      "We started catering to corporate offices and events, bringing the same standards to bigger orders.",
    icon: TrendingUp,
    dot: "bottom",
  },
  {
    year: "2020",
    title: "Sealed For Safety",
    text:
      "We introduced tamper-proof sealing and rigorous checks without losing the touch of homemade prep.",
    icon: ShieldCheck,
    dot: "top",
  },
  {
    year: "2023",
    title: "10,000 Meals Delivered",
    text:
      "A milestone built on trust, consistency, and families choosing us again and again.",
    icon: Bike,
    dot: "bottom",
  },
];

// ─────────────────────────────────────────────────────────────
// PARTNERS
// ─────────────────────────────────────────────────────────────
// Drop your real logo files into /public/About/partners/ using the
// filenames below (transparent PNG/SVG, ~200px wide works best).

const partners = [
  { name: "Aptiv", logo: "../aptiv.png" },
  { name: "DLF", logo: "../DLF.jpg" },
  { name: "Keppel corporation", logo: "../Keppel.png" },
  { name: "L&T", logo: "../L&T.jpg" },
  { name: "RMZ", logo: "../RMZ.png" },
  { name: "propel", logo: "../propel.png" },
];

export default function AboutPage() {
  const heroRef = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 90]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <div className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="about-hero"
      >
        <motion.div
          className="about-hero__content"
          style={{
            y: heroTextY,
            opacity: heroOpacity,
          }}
        >
          <Reveal>
            <span className="section-kicker">
              The people behind Qatind
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1>About us.</h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="about-hero__text">
              Real food, real farmers, and honest flavours —
              crafted the way home-cooked meals are meant to be
              shared.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="about-hero__actions">
              <button
                type="button"
                className="primary-button"
              >
                Learn more
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="secondary-button"
              >
                Contact us
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="about-hero__meta">
              <div>
                <strong>500+</strong>
                <span>families served</span>
              </div>

              <div>
                <strong>50+</strong>
                <span>trusted vendors</span>
              </div>

              <div>
                <strong>92%</strong>
                <span>repeat orders</span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <Reveal delay={0.18}>
          <div className="about-hero__visual">
            <motion.div
              className="about-blob"
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src= "./public/About/about-hero.jpg"
                alt="Curated Indian dining platter"
              />
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="about-story section-shell">
        <Reveal>
          <div className="story-copy">
            <span className="section-kicker accent">
              Our story
            </span>

            <h2>
              From honest ingredients to memorable meals.
            </h2>

            <p>
              Qatind began with a simple question: why should
              great food lose its soul while moving from the
              field to the family table? By buying directly
              from farmers, fishermen and mills, we keep the
              journey short and the flavour vibrant.
            </p>

            <p>
              Every recipe is shaped by the same values we'd
              bring to our own family kitchen: fresh ingredients,
              mindful preparation, and food that brings people
              together.
            </p>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          MANAGING DIRECTOR
      ===================================================== */}

      <section className="about-director section-shell">
        <Reveal>
          <div className="director-panel">

            <div className="director-panel__portrait">
              <motion.div
                className="director-panel__portrait-frame"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <User
                  size={64}
                  strokeWidth={1.3}
                />
              </motion.div>
            </div>

            <div className="director-panel__content">
              <span className="section-kicker accent">
                Leadership
              </span>

              <h2>
                A word from our Managing Director
              </h2>

              <Quote
                className="director-panel__quote-mark"
                aria-hidden="true"
              />

              <p className="director-panel__quote">
                The passionate home chef and creative force behind Qatind Restaurant.

With years of culinary expertise and an endless love for delicious food, she has turned every dish into a beautiful celebration of taste, tradition, and creativity.

From the first bite to the last, Qatind promises a flavor experience that delights your senses and keeps you craving for more! ❤️🔥 
              </p>

              <div className="director-panel__signature">
                <strong>
                  [Rosalind Sathya Kumar]
                </strong>

                <span>
                  Managing Director, Qatind
                </span>
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* =====================================================
          PREMIUM VISION & MISSION
      ===================================================== */}

      <section className="about-values section-shell light-shell">

        <div className="values-heading">

          <Reveal>
            <span className="values-eyebrow">
              <Leaf size={14} />
              What drives us
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2>
              Vision
              <span>&amp;</span>
              Mission
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="values-intro">
              Rooted in purpose. Driven by people. Building a
              better food future, one homemade meal at a time.
            </p>
          </Reveal>

        </div>

        <Reveal delay={0.12}>
          <div className="values-cards">

            {/* ===============================
                VISION
            =============================== */}

            <motion.article
              className="values-card values-card--vision"
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >

              <div
                className="values-card__pattern"
                aria-hidden="true"
              >
                <Leaf size={170} />
              </div>

              <div className="values-card__top">

                <div className="values-card__icon">
                  <MapPin size={23} />
                </div>

                <span className="values-card__label">
                  Where we're headed
                </span>

              </div>

              <div className="values-card__content">

                <h3 className="vision">Vision</h3>

                <div
                  className="values-card__line"
                  aria-hidden="true"
                >
                  <span />
                </div>

                <p>
                  To become the kitchen Indian families trust
                  most — where fresh, local, and transparent
                  food creates a better table for everyone.
                </p>

              </div>

              <div className="values-card__features">

                {visionFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      className="values-feature"
                      key={feature.label}
                    >
                      <div className="values-feature__icon">
                        <Icon size={17} />
                      </div>

                      <span>
                        {feature.label}
                      </span>
                    </div>
                  );
                })}

              </div>

            </motion.article>

            {/* ===============================
                CENTER BADGE
            =============================== */}

            <div
              className="values-center-badge"
              aria-hidden="true"
            >
              <div className="values-center-badge__inner">
                <Home size={30} />
              </div>
            </div>

            {/* ===============================
                MISSION
            =============================== */}

            <motion.article
              className="values-card values-card--mission"
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >

              <div
                className="values-card__food-image"
                aria-hidden="true"
              >
                <img
                  src={aboutHeroImage}
                  alt=""
                />
              </div>

              <div className="values-card__overlay" />

              <div className="values-card__top">

                <div className="values-card__icon">
                  <Flame size={23} />
                </div>

                <span className="values-card__label">
                  How we get there
                </span>

              </div>

              <div className="values-card__content">

                <h3 className="Mission">Mission</h3>

                <div
                  className="values-card__line"
                  aria-hidden="true"
                >
                  <span />
                </div>

                <p>
                  To serve homemade, chemical-free meals that
                  support fair livelihoods for the farmers,
                  makers, and communities behind every dish.
                </p>

              </div>

              <div className="values-card__features">

                {missionFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      className="values-feature"
                      key={feature.label}
                    >
                      <div className="values-feature__icon">
                        <Icon size={17} />
                      </div>

                      <span>
                        {feature.label}
                      </span>
                    </div>
                  );
                })}

              </div>

            </motion.article>

          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="values-bottom-message">
            <Leaf size={16} />

            <span>
              Good food. Honest sourcing. Happier families.
            </span>

            <Heart size={15} />
          </div>
        </Reveal>

      </section>

      {/* =====================================================
          FOUR PILLARS
      ===================================================== */}

      <section className="about-pillars section-shell">

        <div className="section-header">

          <Reveal>
            <span className="section-kicker">
              Our core philosophy
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>
              The four pillars we never bend on
            </h2>
          </Reveal>

        </div>

        <div className="diamonds-row">

          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={index * 0.1}
              >
                <div className="diamond-wrapper">

                  <div
                    className="diamond-card"
                    style={{
                      background: item.cardBg,
                      borderColor: item.border,
                    }}
                  >

                    <div className="diamond-card__inner">

                      <div
                        className="diamond-card__icon"
                        style={{
                          background: item.iconBg,
                          color: item.accent,
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <h3
                        style={{
                          color: item.accent,
                        }}
                      >
                        {item.title}
                      </h3>

                      <p>
                        {item.text}
                      </p>

                    </div>

                  </div>

                </div>
              </Reveal>
            );
          })}

        </div>
      </section>

      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <section className="about-milestones section-shell light-shell">

        <div className="section-header">

          <Reveal>
            <span className="section-kicker accent">
              How we got here
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>Our journey</h2>
          </Reveal>

        </div>

        <div className="timeline-row">

          {milestones.map((item, index) => {
            const Icon = item.icon;

            const connector = (
              <div
                className={`timeline-connector timeline-connector--${item.dot}`}
              >
                <span className="timeline-connector__dot" />
                <span className="timeline-connector__line" />
              </div>
            );

            return (
              <Reveal
                key={item.year}
                delay={index * 0.1}
                className="timeline-col"
              >
                <div className="timeline-item">

                  {item.dot === "top" && connector}

                  <div className="timeline-card">

                    <motion.div
                      className="timeline-card__icon"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={22} />
                    </motion.div>

                    <span className="timeline-card__year">
                      {item.year}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                  {item.dot === "bottom" && connector}

                </div>
              </Reveal>
            );
          })}

        </div>
      </section>

      {/* =====================================================
          OUR PARTNERS
      ===================================================== */}

      <section className="about-partners section-shell">

        <div className="section-header">

          <Reveal>
            <span className="section-kicker accent">
              Who we work with
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>Our partners</h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="partners-intro">
              The farms, mills, and makers we've built lasting
              relationships with along the way.
            </p>
          </Reveal>

        </div>

        <div className="partners-strip">

          {partners.map((partner, index) => (
            <React.Fragment key={partner.name}>

              <motion.div
                className="partner-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  src={`./public/About/partners/${partner.logo}`}
                  alt={partner.name}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.4 + (index % 3) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.25,
                  }}
                  whileHover={{ scale: 1.08 }}
                />
              </motion.div>

              {index < partners.length - 1 && (
                <span
                  className="partner-divider"
                  aria-hidden="true"
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </section>

      {/* =====================================================
          BRAND PROMISE
      ===================================================== */}

      <section className="about-brand section-shell">

        <div className="brand-panel">

          <div className="brand-panel__content">

            <span className="section-kicker accent">
              The Qatind promise
            </span>

            <h2>
              Fresh flavours. Thoughtful sourcing. A table
              built around trust.
            </h2>

            <p>
              We believe food tastes better when it is honest,
              personal, and made with care — from the very
              first ingredient to the last plate served.
            </p>

            <div className="brand-panel__stats">

              <div>
                <Award size={18} />
                <span>
                  Home-crafted quality
                </span>
              </div>

              <div>
                <Compass size={18} />
                <span>
                  Fresh from trusted sources
                </span>
              </div>

            </div>

          </div>

          <div
            className="brand-panel__visual"
            aria-label="Premium food styling"
          />

        </div>
      </section>

    </div>
  );
}