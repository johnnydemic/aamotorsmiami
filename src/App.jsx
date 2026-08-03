import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Star, CheckCircle, Shield, Award, Clock, Wrench, Car, PaintBucket, Zap, Search, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const PORTFOLIO = [
  {
    before: "/gallery/Screenshot_2026-06-24_at_6.44.03_PM.png",
    after: "/gallery/Screenshot_2026-06-24_at_6.44.28_PM.png",
    label: "Nissan Frontier — Hood & Front End",
    type: "Collision Repair",
  },
  {
    before: "/gallery/Screenshot_2026-06-24_at_6.44.53_PM.png",
    after: "/gallery/Screenshot_2026-06-24_at_6.45.03_PM.png",
    label: "Ford Mustang — Front Collision",
    type: "Collision Repair",
  },
  {
    before: "/gallery/Screenshot_2026-06-24_at_6.46.36_PM.png",
    after: "/gallery/Screenshot_2026-06-24_at_6.46.58_PM.png",
    label: "Toyota Sienna — Rear Quarter Panel",
    type: "Body Work & Paint",
  },
  {
    before: "/gallery/Screenshot_2026-06-24_at_6.47.19_PM.png",
    after: "/gallery/Screenshot_2026-06-24_at_6.47.29_PM.png",
    label: "Black SUV — Door & Fender",
    type: "Dent Repair",
  },
];

const REVIEWS = [
  { name: "Carlos M.", stars: 5, text: "AA Motors did an incredible job on my car after a rear-end collision. The paint match was perfect and they had it done faster than the estimate. Highly recommend to anyone in Miami needing body work." },
  { name: "Melissa R.", stars: 5, text: "Brought my SUV in for collision repair and they took care of everything — insurance, rental coordination, the works. The car looks brand new. These guys are the real deal." },
  { name: "Diego P.", stars: 5, text: "Bought a used car from AA Motors and couldn't be happier. Fair price, no games, and the car was in great shape. They clearly know what they're doing on both the repair and sales side." },
  { name: "Amanda S.", stars: 5, text: "Best body shop in Miami. My car got hit in a parking lot and AA Motors made it look like it never happened. Fast, professional, and they kept me updated the whole time." },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, id, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} id={id} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function sanitize(str) {
  return str.replace(/[<>"'`]/g, "").trim().slice(0, 500);
}

export default function App() {
  const formRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", service: "", howSoon: "", vehicleType: "", honeypot: "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  useEffect(() => { const s = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  useEffect(() => { const t = setInterval(() => setCarouselIdx(i => (i + 1) % PORTFOLIO.length), 4500); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 5000); return () => clearInterval(t); }, []);

  const scrollToForm = (e) => { e?.preventDefault(); formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzBOiJSZhUYhr3j1dAKAfah5ZmQWsSe1VHIOzmsUItoS2FPbRLn4mj6bbW5XwI1lqw/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.warn(err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const navLinks = ["Services", "Portfolio", "Reviews", "About", "Contact"];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Manrope', sans-serif; color: #f0f0f0; background: #080808; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        button { font-family: 'Manrope', sans-serif; }
        select, input { font-family: 'Manrope', sans-serif; }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: ${scrolled ? "rgba(5,5,5,0.98)" : "transparent"}; box-shadow: ${scrolled ? "0 1px 0 rgba(0,212,212,0.15)" : "none"}; transition: background 0.3s, box-shadow 0.3s; }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 14px 48px; }
        .nav-logo img { height: 52px; width: auto; }
        .nav-links-wrap { display: flex; align-items: center; gap: 28px; }
        .nav-link { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.7); transition: color 0.2s; cursor: pointer; letter-spacing: 0.5px; }
        .nav-link:hover { color: #00D4D4; }
        .nav-phone { display: flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.7); }
        .nav-phone:hover { color: #00D4D4; }
        .nav-cta { background: transparent; color: #00D4D4; padding: 9px 22px; font-size: 13px; font-weight: 800; border: 1.5px solid #00D4D4; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
        .nav-cta:hover { background: #00D4D4; color: #000; }
        .hamburger { display: none; background: none; border: none; color: #fff; cursor: pointer; }

        .mobile-menu { position: fixed; top: 0; left: 0; right: 0; z-index: 199; background: #0a0a0a; border-bottom: 1px solid rgba(0,212,212,0.2); transform: translateY(-110%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); padding: 80px 24px 28px; display: flex; flex-direction: column; gap: 4px; }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu a, .mobile-menu button { font-size: 15px; font-weight: 700; color: #fff; background: none; border: none; cursor: pointer; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: left; }
        .mobile-menu a:hover { color: #00D4D4; }
        .menu-close { position: absolute; top: 18px; right: 18px; background: none; border: none; cursor: pointer; color: #fff; }
        .menu-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 198; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .menu-backdrop.open { opacity: 1; pointer-events: all; }

        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; background: #050505; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80&fit=crop') center/cover; opacity: 0.12; }
        .hero-glow-teal { position: absolute; top: -20%; left: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,212,212,0.07) 0%, transparent 70%); pointer-events: none; }
        .hero-glow-pink { position: absolute; bottom: -20%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 70%); pointer-events: none; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.5) 100%); }
        .hero-inner { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; width: 100%; padding: 140px 48px 80px; display: grid; grid-template-columns: 1fr 460px; gap: 64px; align-items: center; }
        .hero-left { color: #fff; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,212,212,0.08); border: 1px solid rgba(0,212,212,0.3); color: #00D4D4; font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; padding: 6px 14px; border-radius: 2px; margin-bottom: 24px; }
        .hero-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
        .hero-rating .stars { display: flex; gap: 2px; }
        .hero-rating span { font-size: 13px; color: rgba(255,255,255,0.45); font-weight: 600; }
        .hero-h1 { font-size: clamp(36px, 5vw, 62px); font-weight: 900; line-height: 1.0; letter-spacing: -2px; margin-bottom: 20px; color: #fff; }
        .hero-h1 .teal { color: #00D4D4; }
        .hero-h1 .pink { color: #FF2D78; }
        .hero-sub { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.5); margin-bottom: 28px; max-width: 500px; }
        .hero-checks { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 32px; }
        .hero-check { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.8); }
        .hero-check svg { color: #00D4D4; flex-shrink: 0; }
        .hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #00D4D4; color: #000; padding: 14px 32px; border: none; border-radius: 4px; font-size: 14px; font-weight: 900; cursor: pointer; transition: all 0.2s; font-family: 'Manrope', sans-serif; }
        .hero-btn-primary:hover { background: #00BBBB; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,212,0.3); }
        .hero-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff; padding: 13px 28px; border: 1.5px solid rgba(255,255,255,0.25); border-radius: 4px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Manrope', sans-serif; transition: all 0.2s; }
        .hero-btn-secondary:hover { border-color: #FF2D78; color: #FF2D78; }

        .form-card { background: #0f0f0f; border-radius: 8px; padding: 40px 36px; box-shadow: 0 32px 100px rgba(0,0,0,0.8); position: relative; overflow: hidden; border: 1px solid rgba(0,212,212,0.15); }
        .form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, #00D4D4, #FF2D78); }
        .form-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 4px; letter-spacing: -0.5px; }
        .form-subtitle { font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 22px; }
        .form-field { margin-bottom: 12px; }
        .form-label { display: block; font-size: 10px; font-weight: 800; letter-spacing: 1px; color: rgba(255,255,255,0.4); margin-bottom: 4px; text-transform: uppercase; }
        .form-input { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; font-size: 14px; font-weight: 500; color: #fff; background: rgba(255,255,255,0.05); outline: none; transition: border-color 0.2s; font-family: 'Manrope', sans-serif; }
        .form-input:focus { border-color: #00D4D4; box-shadow: 0 0 0 2px rgba(0,212,212,0.1); }
        .form-input::placeholder { color: rgba(255,255,255,0.2); font-weight: 400; }
        .form-select { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; font-size: 14px; font-weight: 500; color: #fff; background: #111; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2300D4D4' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; font-family: 'Manrope', sans-serif; }
        .form-select:focus { border-color: #00D4D4; }
        .form-select option { background: #111; color: #fff; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-submit { width: 100%; padding: 14px; background: #00D4D4; color: #000; border: none; border-radius: 4px; font-size: 14px; font-weight: 900; cursor: pointer; margin-top: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Manrope', sans-serif; }
        .form-submit:hover { background: #00BBBB; transform: translateY(-1px); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-success { text-align: center; padding: 40px 20px; }
        .form-success h3 { font-size: 20px; font-weight: 900; color: #00D4D4; margin-bottom: 10px; }
        .form-success p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 20px; line-height: 1.6; }
        .form-success a { display: inline-flex; align-items: center; gap: 8px; background: #00D4D4; color: #000; padding: 12px 28px; border-radius: 4px; font-size: 14px; font-weight: 900; text-decoration: none; }
        .form-trust { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
        .form-trust-item { display: flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.25); }
        .form-trust-item svg { color: #00D4D4; }

        @media (max-width: 768px) {
          .form-card { padding: 24px 18px; }
          .form-title { font-size: 17px; }
          .form-field { margin-bottom: 8px; }
          .form-input, .form-select { padding: 9px 12px; font-size: 16px; }
          .form-row { grid-template-columns: 1fr; gap: 8px; }
          .form-submit { padding: 13px; }
        }

        .services-strip { background: #0a0a0a; border-top: 1px solid rgba(0,212,212,0.1); border-bottom: 1px solid rgba(0,212,212,0.1); padding: 0 48px; }
        .services-strip-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; }
        .strip-item { display: flex; align-items: center; gap: 16px; padding: 28px 32px; }
        .strip-item:first-child { border-right: 1px solid rgba(0,212,212,0.08); }
        .strip-icon { width: 48px; height: 48px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .strip-icon.teal { background: rgba(0,212,212,0.08); border: 1px solid rgba(0,212,212,0.2); }
        .strip-icon.teal svg { color: #00D4D4; }
        .strip-icon.pink { background: rgba(255,45,120,0.08); border: 1px solid rgba(255,45,120,0.2); }
        .strip-icon.pink svg { color: #FF2D78; }
        .strip-item h4 { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 3px; }
        .strip-item p { font-size: 12px; color: rgba(255,255,255,0.35); font-weight: 600; }

        .section { padding: 96px 48px; }
        .section-inner { max-width: 1080px; margin: 0 auto; }
        .section-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #00D4D4; margin-bottom: 12px; }
        .section-title { font-size: clamp(28px, 3.5vw, 42px); font-weight: 900; letter-spacing: -1px; margin-bottom: 14px; color: #fff; }
        .section-sub { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.45); max-width: 600px; margin-bottom: 52px; }
        .section-rule { width: 48px; height: 2px; background: linear-gradient(to right, #00D4D4, #FF2D78); margin-bottom: 48px; }

        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(0,212,212,0.06); border: 1px solid rgba(0,212,212,0.1); border-radius: 6px; overflow: hidden; }
        .service-card { padding: 36px 28px; background: #0a0a0a; transition: background 0.3s; position: relative; overflow: hidden; }
        .service-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, #00D4D4, #FF2D78); transform: scaleX(0); transition: transform 0.3s; }
        .service-card:hover { background: #0f0f0f; }
        .service-card:hover::after { transform: scaleX(1); }
        .service-icon { width: 48px; height: 48px; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .service-icon.teal { background: rgba(0,212,212,0.08); border: 1px solid rgba(0,212,212,0.2); }
        .service-icon.teal svg { color: #00D4D4; }
        .service-icon.pink { background: rgba(255,45,120,0.08); border: 1px solid rgba(255,45,120,0.2); }
        .service-icon.pink svg { color: #FF2D78; }
        .service-card h3 { font-size: 16px; font-weight: 800; margin-bottom: 8px; color: #fff; }
        .service-card p { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.4); }

        .carousel-section { padding: 96px 0 0; background: #050505; }
        .carousel-header { max-width: 1080px; margin: 0 auto; padding: 0 48px; }
        .carousel-wrap { position: relative; width: 100%; overflow: hidden; margin-top: 48px; }
        .carousel-track { display: flex; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .carousel-slide { min-width: 100%; position: relative; overflow: hidden; }
        .before-after-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; background: #000; }
        .ba-panel { position: relative; overflow: hidden; aspect-ratio: 4/3; }
        .ba-panel img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ba-label { position: absolute; top: 14px; left: 14px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; padding: 5px 12px; border-radius: 2px; }
        .ba-label.before { background: rgba(255,45,120,0.9); color: #fff; }
        .ba-label.after { background: rgba(0,212,212,0.9); color: #000; }
        .carousel-caption { background: #0a0a0a; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,212,212,0.1); }
        .carousel-caption h4 { font-size: 16px; font-weight: 900; color: #fff; }
        .carousel-caption span { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #00D4D4; }
        .carousel-controls { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px 96px; max-width: 1080px; margin: 0 auto; }
        .carousel-dots { display: flex; gap: 8px; }
        .carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
        .carousel-dot.active { background: #00D4D4; transform: scale(1.5); }
        .carousel-arrows { display: flex; gap: 10px; }
        .carousel-arrow { width: 44px; height: 44px; border-radius: 4px; border: 1px solid rgba(0,212,212,0.3); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; color: #00D4D4; }
        .carousel-arrow:hover { background: #00D4D4; border-color: #00D4D4; color: #000; }
        .carousel-counter { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 1px; }

        @media (max-width: 600px) {
          .before-after-grid { grid-template-columns: 1fr; gap: 2px; }
          .ba-panel { aspect-ratio: 4/3; }
          .carousel-caption { padding: 14px 16px; }
          .carousel-caption h4 { font-size: 13px; }
        }

        .reviews-section { background: #050505; border-top: 1px solid rgba(255,45,120,0.1); }
        .review-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; background: rgba(255,45,120,0.06); border: 1px solid rgba(255,45,120,0.1); border-radius: 6px; overflow: hidden; margin-top: 48px; }
        .review-card { background: #0a0a0a; padding: 28px; transition: background 0.3s; }
        .review-card:hover { background: #0f0f0f; }
        .review-stars { display: flex; gap: 2px; margin-bottom: 14px; }
        .review-text { font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.6); font-style: italic; margin-bottom: 20px; }
        .review-footer { display: flex; align-items: center; gap: 12px; }
        .review-avatar { width: 38px; height: 38px; border-radius: 4px; background: linear-gradient(135deg, rgba(0,212,212,0.3), rgba(255,45,120,0.3)); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 900; color: #fff; flex-shrink: 0; border: 1px solid rgba(0,212,212,0.2); }
        .review-name { font-size: 13px; font-weight: 800; color: #00D4D4; }

        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .why-item { display: flex; gap: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; transition: border-color 0.2s, background 0.2s; }
        .why-item:hover { border-color: rgba(0,212,212,0.25); background: rgba(0,212,212,0.03); }
        .why-icon { width: 40px; height: 40px; background: rgba(0,212,212,0.08); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(0,212,212,0.2); }
        .why-icon svg { color: #00D4D4; }
        .why-item h4 { font-size: 14px; font-weight: 800; margin-bottom: 6px; color: #fff; }
        .why-item p { font-size: 13px; line-height: 1.65; color: rgba(255,255,255,0.4); }

        .inventory-cta { background: linear-gradient(135deg, rgba(0,212,212,0.06) 0%, rgba(255,45,120,0.06) 100%); border: 1px solid rgba(0,212,212,0.15); border-radius: 8px; padding: 48px; text-align: center; }
        .inventory-cta h3 { font-size: clamp(22px, 3vw, 32px); font-weight: 900; color: #fff; margin-bottom: 12px; }
        .inventory-cta p { font-size: 15px; color: rgba(255,255,255,0.45); margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .inventory-btn { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #FF2D78; padding: 13px 32px; border: 1.5px solid #FF2D78; border-radius: 4px; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.2s; font-family: 'Manrope', sans-serif; }
        .inventory-btn:hover { background: #FF2D78; color: #fff; box-shadow: 0 6px 20px rgba(255,45,120,0.3); }

        .contact-section { background: #080808; border-top: 1px solid rgba(255,255,255,0.05); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        .contact-left h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 900; letter-spacing: -1px; color: #fff; margin-bottom: 16px; }
        .contact-left p { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.4); margin-bottom: 32px; }
        .contact-info { display: flex; flex-direction: column; gap: 16px; }
        .contact-info-item { display: flex; align-items: center; gap: 12px; }
        .contact-icon { width: 42px; height: 42px; background: rgba(0,212,212,0.08); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(0,212,212,0.2); }
        .contact-icon svg { color: #00D4D4; }
        .contact-info-item strong { font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.4); display: block; letter-spacing: 1px; text-transform: uppercase; }
        .contact-info-item a { font-size: 16px; font-weight: 800; color: #00D4D4; }
        .contact-form-card { background: #0f0f0f; border-radius: 8px; padding: 36px; border: 1px solid rgba(0,212,212,0.12); position: relative; overflow: hidden; }
        .contact-form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, #00D4D4, #FF2D78); }
        .cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #00D4D4; color: #000; padding: 14px 32px; border: none; border-radius: 4px; font-size: 14px; font-weight: 900; cursor: pointer; transition: all 0.2s; font-family: 'Manrope', sans-serif; margin-top: 28px; }
        .cta-btn:hover { background: #00BBBB; transform: translateY(-1px); }

        footer { background: #030303; color: rgba(255,255,255,0.25); padding: 48px 48px 28px; border-top: 1px solid rgba(0,212,212,0.08); }
        .footer-inner { max-width: 1280px; margin: 0 auto; }
        .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
        .footer-logo img { height: 56px; width: auto; margin-bottom: 16px; }
        .footer-brand p { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.3); max-width: 260px; margin-bottom: 16px; }
        .footer-contact-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.35); margin-bottom: 8px; }
        .footer-contact-item a { color: rgba(255,255,255,0.35); transition: color 0.2s; }
        .footer-contact-item a:hover { color: #00D4D4; }
        .footer-contact-item svg { color: #00D4D4; flex-shrink: 0; }
        .footer-col h4 { font-size: 10px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
        .footer-col a { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.3); margin-bottom: 8px; transition: color 0.2s; }
        .footer-col a:hover { color: #00D4D4; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.04); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 11px; }

        .review-carousel { display: none; margin-top: 32px; }
        .review-carousel-track-wrap { overflow: hidden; }
        .review-carousel-track { display: flex; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .review-carousel-slide { min-width: 100%; }
        .review-carousel-controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px; }
        .review-carousel-dots { display: flex; gap: 8px; }
        .review-carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
        .review-carousel-dot.active { background: #FF2D78; transform: scale(1.5); }
        .review-carousel-arrow { width: 38px; height: 38px; border-radius: 4px; border: 1px solid rgba(255,45,120,0.3); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #FF2D78; transition: all 0.2s; }
        .review-carousel-arrow:hover { background: #FF2D78; color: #fff; }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .contact-grid { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr; gap: 32px; }
          .services-strip-inner { grid-template-columns: 1fr; }
          .strip-item:first-child { border-right: none; border-bottom: 1px solid rgba(0,212,212,0.08); }
        }
        @media (max-width: 900px) {
          .hero { min-height: auto; }
          .hero-inner { grid-template-columns: 1fr; padding: 88px 20px 36px; gap: 24px; }
          .hero-badge { margin-bottom: 12px; }
          .hero-rating { margin-bottom: 10px; }
          .hero-h1 { font-size: clamp(28px, 8vw, 40px); letter-spacing: -1px; margin-bottom: 12px; }
          .hero-sub { display: none; }
          .hero-checks { grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
          .hero-check { font-size: 12px; }
          .hero-cta-row { flex-direction: column; gap: 10px; }
          .hero-btn-primary, .hero-btn-secondary { padding: 13px 20px; font-size: 14px; justify-content: center; }
          .services-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .review-grid { display: none; }
          .review-carousel { display: block !important; }
          .nav-links-wrap { display: none; }
          .hamburger { display: block; }
          .nav-inner { padding: 14px 20px; }
          .section { padding: 64px 20px; }
          .carousel-controls { padding: 16px 20px 64px; }
          .carousel-header { padding: 0 20px; }
          .contact-form-card { padding: 24px 18px; }
          .services-strip { padding: 0 20px; }
          .inventory-cta { padding: 32px 24px; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo"><img src="/aamotors_miami_logo.png" alt="AA Motors Miami" /></div>
          <div className="nav-links-wrap">
            {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
            <a href="tel:3055873450" className="nav-phone" rel="noopener noreferrer"><Phone size={13} />305-587-3450</a>
            <button className="nav-cta" onClick={scrollToForm}>Get Estimate</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </nav>

      <div className={`menu-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}><X size={22} /></button>
        {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>)}
        <a href="tel:3055873450" onClick={() => setMenuOpen(false)} rel="noopener noreferrer">305-587-3450</a>
        <button style={{ background: "#00D4D4", color: "#000", padding: "13px 20px", borderRadius: 4, marginTop: 8, fontWeight: 900, fontSize: 14, border: "none", cursor: "pointer" }} onClick={() => { setMenuOpen(false); scrollToForm(); }}>Get Estimate</button>
      </div>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-glow-teal" />
        <div className="hero-glow-pink" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge"><MapPin size={10} /> Miami, Florida</div>
            <div className="hero-rating">
              <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#FF2D78" stroke="#FF2D78" />)}</div>
              <span>5.0 · Collision Repair + Used Car Sales</span>
            </div>
            <h1 className="hero-h1">Miami's Premier<br /><span className="teal">Collision</span> &amp; <span className="pink">Auto</span><br />Center.</h1>
            <p className="hero-sub">AA Motors Miami specializes in expert collision repair and quality used car sales. We restore your vehicle to factory condition — fast, precise, and built to Miami standards.</p>
            <div className="hero-checks">
              <div className="hero-check"><CheckCircle size={14} /> Expert collision repair</div>
              <div className="hero-check"><CheckCircle size={14} /> Used car sales</div>
              <div className="hero-check"><CheckCircle size={14} /> All insurance accepted</div>
              <div className="hero-check"><CheckCircle size={14} /> Free estimates</div>
            </div>
            <div className="hero-cta-row">
              <button className="hero-btn-primary" onClick={scrollToForm}><Wrench size={15} /> Get a Free Estimate</button>
              <a href="tel:3055873450" rel="noopener noreferrer" className="hero-btn-secondary"><Phone size={15} /> 305-587-3450</a>
            </div>
          </div>

          <div className="form-card" ref={formRef}>
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={52} color="#00D4D4" style={{ marginBottom: 16 }} />
                <h3>We Got Your Request!</h3>
                <p>Our team will get back to you soon. For faster service, call us directly.</p>
                <a href="tel:3055873450" rel="noopener noreferrer"><Phone size={15} /> 305-587-3450</a>
              </div>
            ) : (
              <>
                <div className="form-title">Get Your Free Estimate</div>
                <div className="form-subtitle">Collision repair or looking for a car — tell us what you need.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-field form-row">
                    <div><label className="form-label">First Name *</label><input className="form-input" type="text" placeholder="Jane" required value={form.firstName} onChange={set("firstName")} /></div>
                    <div><label className="form-label">Last Name *</label><input className="form-input" type="text" placeholder="Smith" required value={form.lastName} onChange={set("lastName")} /></div>
                  </div>
                  <div className="form-field"><label className="form-label">Phone *</label><input className="form-input" type="tel" placeholder="(305) 555-0100" required value={form.phone} onChange={set("phone")} /></div>
                  <div className="form-field"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="jane@email.com" value={form.email} onChange={set("email")} /></div>
                  <div className="form-field">
                    <label className="form-label">Service Needed</label>
                    <select className="form-select" value={form.service} onChange={set("service")}>
                      <option value="" disabled>Select...</option>
                      <option>Collision Repair</option>
                      <option>Body Work & Paint</option>
                      <option>Dent Removal</option>
                      <option>Frame Straightening</option>
                      <option>Bumper Repair / Replacement</option>
                      <option>Full Vehicle Restoration</option>
                      <option>Used Car Purchase</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-field form-row">
                    <div>
                      <label className="form-label">How Soon?</label>
                      <select className="form-select" value={form.howSoon} onChange={set("howSoon")}>
                        <option value="" disabled>Select...</option>
                        <option>ASAP</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Just Getting Quotes</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Vehicle Type</label>
                      <select className="form-select" value={form.vehicleType} onChange={set("vehicleType")}>
                        <option value="" disabled>Select...</option>
                        <option>Sedan</option>
                        <option>SUV / Truck</option>
                        <option>Sports Car</option>
                        <option>Luxury Vehicle</option>
                        <option>Van / Minivan</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={form.honeypot}
                    onChange={set("honeypot")}
                    style={{ display: "none", position: "absolute", left: "-9999px" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <button type="submit" className="form-submit" disabled={submitting}>
                    {submitting ? "Sending..." : <><Phone size={15} /> Get My Free Estimate</>}
                  </button>
                </form>
                <div className="form-trust">
                  <div className="form-trust-item"><Shield size={11} /> All Insurance</div>
                  <div className="form-trust-item"><CheckCircle size={11} /> No Obligation</div>
                  <div className="form-trust-item"><Clock size={11} /> Fast Response</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="services-strip">
        <div className="services-strip-inner">
          <div className="strip-item"><div className="strip-icon teal"><Wrench size={20} /></div><div><h4>Collision Repair</h4><p>Full body restoration · All makes & models · Insurance accepted</p></div></div>
          <div className="strip-item"><div className="strip-icon pink"><Car size={20} /></div><div><h4>Used Car Sales</h4><p>Quality pre-owned vehicles · Competitive pricing · Miami inventory</p></div></div>
        </div>
      </div>

      <div className="section" id="services" style={{ background: "#080808" }}>
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow">What We Do</div>
            <div className="section-title">Collision Repair & Auto Sales</div>
            <div className="section-sub">From fender benders to full frame restorations, AA Motors Miami handles it all. Expert technicians, quality parts, and a commitment to getting your car back to factory condition.</div>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon teal"><Wrench size={20} /></div><h3>Collision Repair</h3><p>Complete collision repair for all makes and models. Structural damage, panel replacement, and full vehicle restoration after accidents of any severity.</p></div>
              <div className="service-card"><div className="service-icon pink"><PaintBucket size={20} /></div><h3>Body Work & Paint</h3><p>Expert auto body work with precision color matching. From minor scratches to complete repaints — finished to Miami showroom standards.</p></div>
              <div className="service-card"><div className="service-icon teal"><Zap size={20} /></div><h3>Frame Straightening</h3><p>State-of-the-art frame straightening and structural repair. We restore your vehicle's alignment and safety to exact factory specifications.</p></div>
              <div className="service-card"><div className="service-icon pink"><Car size={20} /></div><h3>Bumper & Dent Repair</h3><p>Bumper repair and replacement, dent removal, and minor collision fixes. Fast turnaround so you're back on the road quickly.</p></div>
              <div className="service-card"><div className="service-icon teal"><Shield size={20} /></div><h3>Insurance Claims</h3><p>We work with all insurance companies. We handle the paperwork, communicate with adjusters, and make the claims process seamless.</p></div>
              <div className="service-card"><div className="service-icon pink"><Search size={20} /></div><h3>Used Car Sales</h3><p>Quality pre-owned vehicles at competitive prices. Browse our Miami inventory — every car is inspected and ready to drive.</p></div>
            </div>
          </Reveal>
        </div>
      </div>

      <div id="portfolio" className="carousel-section">
        <div className="carousel-header">
          <Reveal>
            <div className="section-eyebrow">Our Work</div>
            <div className="section-title">Recent Projects</div>
            <div className="section-rule" />
          </Reveal>
        </div>
        <div className="carousel-wrap">
          <div className="carousel-track" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
            {PORTFOLIO.map((item, i) => (
              <div className="carousel-slide" key={i}>
                <div className="before-after-grid">
                  <div className="ba-panel">
                    <img src={item.before} alt={`${item.label} before`} />
                    <div className="ba-label before">Before</div>
                  </div>
                  <div className="ba-panel">
                    <img src={item.after} alt={`${item.label} after`} />
                    <div className="ba-label after">After</div>
                  </div>
                </div>
                <div className="carousel-caption">
                  <h4>{item.label}</h4>
                  <span>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-controls">
          <div className="carousel-dots">{PORTFOLIO.map((_, i) => <button key={i} className={`carousel-dot ${i === carouselIdx ? "active" : ""}`} onClick={() => setCarouselIdx(i)} />)}</div>
          <div className="carousel-counter">{carouselIdx + 1} / {PORTFOLIO.length}</div>
          <div className="carousel-arrows">
            <button className="carousel-arrow" onClick={() => setCarouselIdx(i => (i - 1 + PORTFOLIO.length) % PORTFOLIO.length)}><ChevronLeft size={18} /></button>
            <button className="carousel-arrow" onClick={() => setCarouselIdx(i => (i + 1) % PORTFOLIO.length)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <div className="section reviews-section" id="reviews">
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow" style={{ color: "#FF2D78" }}>Reviews</div>
            <div className="section-title">What Miami Drivers Say</div>
            <div style={{ width: 48, height: 2, background: "linear-gradient(to right, #00D4D4, #FF2D78)", marginBottom: 0 }} />
          </Reveal>
          <div className="review-grid">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="review-card">
                  <div className="review-stars">{[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#FF2D78" stroke="#FF2D78" />)}</div>
                  <div className="review-text">"{r.text}"</div>
                  <div className="review-footer"><div className="review-avatar">{r.name[0]}</div><div><div className="review-name">{r.name}</div></div></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="review-carousel">
            <div className="review-carousel-track-wrap">
              <div className="review-carousel-track" style={{ transform: `translateX(-${reviewIdx * 100}%)` }}>
                {REVIEWS.map((r, i) => (
                  <div className="review-carousel-slide" key={i}>
                    <div className="review-card">
                      <div className="review-stars">{[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#FF2D78" stroke="#FF2D78" />)}</div>
                      <div className="review-text">"{r.text}"</div>
                      <div className="review-footer"><div className="review-avatar">{r.name[0]}</div><div><div className="review-name">{r.name}</div></div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="review-carousel-controls">
              <button className="review-carousel-arrow" onClick={() => setReviewIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length)}><ChevronLeft size={16} /></button>
              <div className="review-carousel-dots">
                {REVIEWS.map((_, i) => <button key={i} className={`review-carousel-dot ${i === reviewIdx ? "active" : ""}`} onClick={() => setReviewIdx(i)} />)}
              </div>
              <button className="review-carousel-arrow" onClick={() => setReviewIdx(i => (i + 1) % REVIEWS.length)}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="section" id="about" style={{ background: "#080808" }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-eyebrow">Why AA Motors</div>
              <div className="section-title">Built Different. Built Miami.</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 540, margin: "0 auto" }}>Expert technicians, premium materials, and a shop that takes pride in every vehicle that rolls out the door.</p>
            </div>
            <div className="why-grid">
              <div className="why-item"><div className="why-icon"><Shield size={17} /></div><div><h4>All Insurance Accepted</h4><p>We work directly with every major insurance company and handle the claims process for you.</p></div></div>
              <div className="why-item"><div className="why-icon"><Award size={17} /></div><div><h4>Expert Technicians</h4><p>Skilled auto body technicians with years of experience in collision repair for all makes and models.</p></div></div>
              <div className="why-item"><div className="why-icon"><Zap size={17} /></div><div><h4>Precision Color Match</h4><p>State-of-the-art paint matching technology ensures your vehicle's finish is indistinguishable from factory.</p></div></div>
              <div className="why-item"><div className="why-icon"><Clock size={17} /></div><div><h4>Fast Turnaround</h4><p>We work efficiently to get your vehicle back to you as fast as possible without cutting corners.</p></div></div>
              <div className="why-item"><div className="why-icon"><Car size={17} /></div><div><h4>Used Car Sales</h4><p>Quality pre-owned vehicles inspected and priced right. Two businesses in one — the best shop in Miami.</p></div></div>
              <div className="why-item"><div className="why-icon"><MapPin size={17} /></div><div><h4>Miami Based</h4><p>Local shop, local reputation. AA Motors Miami is a trusted name in the community.</p></div></div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="section" id="inventory" style={{ background: "#050505" }}>
        <div className="section-inner">
          <Reveal>
            <div className="inventory-cta">
              <h3>Looking for a Used Car?</h3>
              <p>Browse our Miami inventory of quality pre-owned vehicles. Every car is inspected and priced competitively. Call us or come in to see what we have available.</p>
              <button className="inventory-btn" onClick={scrollToForm}><Car size={16} /> Inquire About Inventory</button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="section contact-section" id="contact">
        <div className="section-inner">
          <Reveal>
            <div className="contact-grid">
              <div className="contact-left">
                <div className="section-eyebrow">Get in Touch</div>
                <h2>Ready to Get Your Car Fixed?</h2>
                <p>Call us or fill out the form. Free estimates on all collision repair.</p>
                <div className="contact-info">
                  <div className="contact-info-item"><div className="contact-icon"><Phone size={19} /></div><div><strong>Call or Text</strong><a href="tel:3055873450" rel="noopener noreferrer">305-587-3450</a></div></div>
                  <div className="contact-info-item"><div className="contact-icon"><MapPin size={19} /></div><div><strong>Location</strong><span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>Miami, Florida</span></div></div>
                  <div className="contact-info-item"><div className="contact-icon"><Car size={19} /></div><div><strong>Services</strong><span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>Collision Repair · Used Car Sales</span></div></div>
                </div>
                <button className="cta-btn" onClick={scrollToForm}><Wrench size={15} /> Get a Free Estimate</button>
              </div>
              <div className="contact-form-card">
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Send Us a Message</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>We'll get back to you fast.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-field"><label className="form-label">Name *</label><input className="form-input" type="text" placeholder="Your name" required value={form.firstName} onChange={set("firstName")} /></div>
                  <div className="form-field"><label className="form-label">Phone *</label><input className="form-input" type="tel" placeholder="(305) 555-0100" required value={form.phone} onChange={set("phone")} /></div>
                  <div className="form-field"><label className="form-label">What do you need?</label><input className="form-input" type="text" placeholder="Collision repair, used car, etc." value={form.email} onChange={set("email")} /></div>
                  <input type="text" name="website" value={form.honeypot} onChange={set("honeypot")} style={{ display: "none", position: "absolute", left: "-9999px" }} tabIndex={-1} autoComplete="off" />
                  <button type="submit" className="form-submit" style={{ marginTop: 8 }} disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><img src="/aa-logo.png" alt="AA Motors Miami" /></div>
              <p>Miami's collision repair and used car sales center. Expert bodywork, all insurance accepted, quality pre-owned inventory.</p>
              <div className="footer-contact-item"><Phone size={12} /><a href="tel:3055873450" rel="noopener noreferrer">305-587-3450</a></div>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              {["Collision Repair", "Body Work & Paint", "Frame Straightening", "Bumper & Dent Repair", "Insurance Claims", "Used Car Sales"].map(s => <a key={s} href="#services">{s}</a>)}
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#reviews">Reviews</a>
              <a href="#inventory">Inventory</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2026 AA Motors Miami. All rights reserved.</div>
            <div style={{ opacity: 0.4 }}>Collision Repair · Used Car Sales · Miami, FL · 305-587-3450</div>
          </div>
        </div>
      </footer>
    </>
  );
}
