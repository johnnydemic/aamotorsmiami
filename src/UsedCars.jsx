import { useState } from "react";
import { Phone, ChevronLeft, Car, CheckCircle } from "lucide-react";

export default function UsedCars() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", budget: "", type: "", notes: "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzBOiJSZhUYhr3j1dAKAfah5ZmQWsSe1VHIOzmsUItoS2FPbRLn4mj6bbW5XwI1lqw/exec", {
        method: "POST", mode: "no-cors", body: JSON.stringify({ ...form, page: "used-cars" })
      });
    } catch (err) { console.warn(err); }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Manrope', sans-serif; background: #080808; color: #fff; -webkit-font-smoothing: antialiased; min-height: 100vh; }
        a { text-decoration: none; color: inherit; }
        button { font-family: 'Manrope', sans-serif; }
        select, input, textarea { font-family: 'Manrope', sans-serif; }
        .header { background: #050505; border-bottom: 1px solid rgba(0,212,212,0.15); padding: 16px 48px; display: flex; align-items: center; justify-content: space-between; }
        .back { display: inline-flex; align-items: center; gap: 6px; color: #00D4D4; font-size: 13px; font-weight: 700; }
        .back:hover { opacity: 0.8; }
        .logo { font-size: 16px; font-weight: 900; color: #fff; }
        .logo span { color: #00D4D4; }
        .ph { display: flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.6); }
        .page { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 57px); padding: 48px 24px; }
        .card { background: #0f0f0f; border: 1px solid rgba(0,212,212,0.15); border-radius: 12px; padding: 48px 44px; max-width: 520px; width: 100%; position: relative; overflow: hidden; }
        .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, #00D4D4, #FF2D78); }
        .eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #00D4D4; margin-bottom: 10px; }
        .title { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #fff; margin-bottom: 8px; }
        .title span { color: #FF2D78; }
        .sub { font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 32px; line-height: 1.6; }
        .field { margin-bottom: 14px; }
        .label { display: block; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 5px; }
        .input { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 14px; color: #fff; background: rgba(255,255,255,0.05); outline: none; transition: border-color 0.2s; }
        .input:focus { border-color: #00D4D4; }
        .input::placeholder { color: rgba(255,255,255,0.2); }
        .select { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 14px; color: #fff; background: #111; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2300D4D4' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
        .select:focus { border-color: #00D4D4; }
        .select option { background: #111; }
        .textarea { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 14px; color: #fff; background: rgba(255,255,255,0.05); outline: none; resize: vertical; min-height: 80px; transition: border-color 0.2s; }
        .textarea:focus { border-color: #00D4D4; }
        .textarea::placeholder { color: rgba(255,255,255,0.2); }
        .btn { width: 100%; padding: 14px; background: #00D4D4; color: #000; border: none; border-radius: 6px; font-size: 14px; font-weight: 900; cursor: pointer; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; }
        .btn:hover { background: #00BBBB; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .success { text-align: center; padding: 20px 0; }
        .success h3 { font-size: 20px; font-weight: 900; color: #00D4D4; margin: 12px 0 8px; }
        .success p { font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 20px; line-height: 1.6; }
        .success a { display: inline-flex; align-items: center; gap: 7px; background: #FF2D78; color: #fff; padding: 12px 28px; border-radius: 4px; font-size: 14px; font-weight: 900; }
        @media (max-width: 600px) {
          .header { padding: 14px 20px; }
          .card { padding: 32px 20px; }
        }
      `}</style>

      <div className="header">
        <a href="/" className="back"><ChevronLeft size={15} /> Back</a>
        <div className="logo">AA <span>MOTORS</span> MIAMI</div>
        <a href="tel:3055873450" className="ph"><Phone size={13} />305-587-3450</a>
      </div>

      <div className="page">
        <div className="card">
          {submitted ? (
            <div className="success">
              <CheckCircle size={52} color="#00D4D4" />
              <h3>We'll Be in Touch!</h3>
              <p>Our team will reach out soon with available inventory that matches what you're looking for.</p>
              <a href="tel:3055873450"><Phone size={14} /> 305-587-3450</a>
            </div>
          ) : (
            <>
              <div className="eyebrow"><Car size={11} style={{display:"inline",marginRight:6}}/>Used Cars</div>
              <h1 className="title">Find Your Next <span>Car</span></h1>
              <p className="sub">Tell us what you're looking for and we'll reach out with available inventory. No pressure, no games.</p>
              <form onSubmit={handleSubmit}>
                <div className="field"><label className="label">Your Name *</label><input className="input" type="text" placeholder="Jane Smith" required value={form.name} onChange={set("name")} /></div>
                <div className="field"><label className="label">Phone *</label><input className="input" type="tel" placeholder="(305) 555-0100" required value={form.phone} onChange={set("phone")} /></div>
                <div className="field">
                  <label className="label">Vehicle Type</label>
                  <select className="select" value={form.type} onChange={set("type")}>
                    <option value="" disabled>What are you looking for?</option>
                    <option>Sedan</option>
                    <option>SUV / Crossover</option>
                    <option>Truck</option>
                    <option>Sports Car</option>
                    <option>Luxury Vehicle</option>
                    <option>Van / Minivan</option>
                    <option>Open to Anything</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Budget</label>
                  <select className="select" value={form.budget} onChange={set("budget")}>
                    <option value="" disabled>Select a range</option>
                    <option>Under $10,000</option>
                    <option>$10,000 – $15,000</option>
                    <option>$15,000 – $20,000</option>
                    <option>$20,000 – $30,000</option>
                    <option>$30,000+</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div className="field"><label className="label">Anything Specific?</label><textarea className="textarea" placeholder="Year range, make, model, color, features..." value={form.notes} onChange={set("notes")} /></div>
                <button type="submit" className="btn" disabled={submitting}>{submitting ? "Sending..." : <><Car size={14} /> Submit Inquiry</>}</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
