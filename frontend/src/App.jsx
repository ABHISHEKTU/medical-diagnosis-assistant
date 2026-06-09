import { useState, useEffect } from "react"
import axios from "axios"

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --teal: #0d9488;
  --teal-light: #ccfbf1;
  --teal-mid: #5eead4;
  --blue: #0284c7;
  --blue-light: #e0f2fe;
  --red: #dc2626;
  --green: #16a34a;
  --white: #ffffff;
  --off: #f8fafc;
  --border: #e2e8f0;
  --text: #0f172a;
  --muted: #64748b;
  --soft: #94a3b8;
}

html { scroll-behavior: smooth; }

body {
  background: var(--off);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  width: 100%;
}

/* ── TOPBAR ── */
.topbar {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f3460 100%);
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0,0,0,0.2);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #0d9488, #0284c7);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(13,148,136,0.4);
  flex-shrink: 0;
}

.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.brand-name span { color: #5eead4; }

.topbar-pills {
  display: flex;
  gap: 6px;
}

.topbar-pill {
  font-size: 9px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #94a3b8;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.topbar-pill.active {
  color: #5eead4;
  background: rgba(13,148,136,0.15);
  border-color: rgba(94,234,212,0.3);
}

/* hide some pills on mobile */
@media (max-width: 480px) {
  .topbar-pill:nth-child(3),
  .topbar-pill:nth-child(4) { display: none; }
  .topbar-pill { font-size: 8px; padding: 3px 8px; }
}

/* ── HERO ── */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%);
  padding: 32px 20px 0;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
  overflow: hidden;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: -60px; right: 180px;
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(13,148,136,0.13) 0%, transparent 70%);
  pointer-events: none;
}

.hero-text { padding-bottom: 32px; }

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5eead4;
  background: rgba(13,148,136,0.15);
  border: 1px solid rgba(94,234,212,0.25);
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.hero-tag::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #5eead4;
  animation: pdot 2s ease-in-out infinite;
}

@keyframes pdot {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.4; transform:scale(0.7); }
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 4vw, 38px);
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.4px;
  margin-bottom: 10px;
}

.hero-title em { font-style: italic; color: #5eead4; }

.hero-sub {
  font-size: clamp(11px, 1.5vw, 13px);
  color: #94a3b8;
  line-height: 1.7;
  max-width: 460px;
}

.hero-stats {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.hero-stat-val {
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 700;
  color: #5eead4;
  line-height: 1;
}

.hero-stat-lbl {
  font-size: 9px;
  color: #64748b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 4px;
}

.hero-visual {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding-bottom: 0;
}

.hero-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px 14px 0 0;
  padding: 16px;
  width: 140px;
  backdrop-filter: blur(10px);
}

.hero-card-icon { font-size: 22px; margin-bottom: 6px; }
.hero-card-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
.hero-card-val { font-size: 15px; font-weight: 700; color: #ffffff; }

.hero-card.accent {
  background: linear-gradient(135deg, rgba(13,148,136,0.3), rgba(2,132,199,0.2));
  border-color: rgba(94,234,212,0.3);
  padding-bottom: 24px;
}

@media (max-width: 640px) {
  .hero { grid-template-columns: 1fr; padding: 24px 16px 0; }
  .hero-visual { display: none; }
  .hero-text { padding-bottom: 24px; }
}

/* ── LAYOUT ── */
.layout {
  display: grid;
  grid-template-columns: 360px 1fr;
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}

/* ── SIDEBAR ── */
.sidebar {
  background: var(--white);
  border-right: 1px solid var(--border);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

@media (max-width: 900px) {
  .sidebar { border-right: none; border-bottom: 1px solid var(--border); padding: 20px 16px; }
}

.sec-label {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--soft);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sec-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* Upload */
.upload-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  padding: 28px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  background: #f8faff;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.upload-zone::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(13,148,136,0.04), rgba(2,132,199,0.04));
  opacity: 0;
  transition: opacity 0.25s;
}

.upload-zone:hover, .upload-zone:active { border-color: var(--teal); }
.upload-zone:hover::before { opacity: 1; }

.upload-zone.has-file {
  padding: 14px;
  border-style: solid;
  border-color: var(--teal);
  background: #f0fdfa;
}

.file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2; width: 100%; height: 100%; }

.upload-icon-wrap {
  width: 52px; height: 52px;
  background: linear-gradient(135deg, #ccfbf1, #e0f2fe);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
  font-size: 22px;
  transition: transform 0.25s;
}

.upload-zone:hover .upload-icon-wrap { transform: scale(1.08) rotate(-5deg); }

.upload-label { font-size: 13px; font-weight: 500; color: #334155; margin-bottom: 4px; }
.upload-sub { font-size: 11px; color: var(--soft); }

.preview-wrap { position: relative; margin-bottom: 10px; }
.preview-img {
  width: 100%; max-height: 200px; object-fit: contain;
  border-radius: 10px; border: 1px solid #99f6e4; display: block;
}

.preview-badge {
  position: absolute; top: 8px; right: 8px;
  background: var(--teal); color: white;
  font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 20px;
}

.filename { font-size: 10px; color: var(--teal); font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Button */
.btn-analyze {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #0d9488, #0284c7);
  color: white; border: none;
  border-radius: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  position: relative; overflow: hidden;
  box-shadow: 0 4px 16px rgba(13,148,136,0.3);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.btn-analyze::before {
  content: '';
  position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: left 0.4s ease;
}

.btn-analyze:hover:not(:disabled)::before { left: 100%; }
.btn-analyze:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(13,148,136,0.4); }
.btn-analyze:active:not(:disabled) { transform: translateY(0); }
.btn-analyze:disabled { background: #e2e8f0; color: var(--soft); cursor: not-allowed; box-shadow: none; transform: none; }

/* Loading */
.loading-wrap { margin-top: 10px; }
.loading-track { height: 4px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
.loading-fill {
  height: 100%;
  background: linear-gradient(90deg, #0d9488, #5eead4, #0284c7, #0d9488);
  background-size: 300%;
  animation: flow 1.8s linear infinite;
  border-radius: 4px;
}
@keyframes flow { 0% { background-position: 0% 0; } 100% { background-position: 300% 0; } }

.loading-steps { display: flex; justify-content: space-between; margin-top: 10px; gap: 4px; }
.loading-step {
  font-size: 9px; letter-spacing: 0.07em; text-transform: uppercase;
  color: var(--soft); display: flex; align-items: center; gap: 4px;
}
.loading-step.active { color: var(--teal); }
.loading-step-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.loading-step.active .loading-step-dot { animation: pdot 1s ease-in-out infinite; }

.error-box {
  font-size: 11px; color: var(--red); text-align: center;
  margin-top: 10px; padding: 10px 14px;
  background: #fff1f2; border-radius: 8px; border: 1px solid #fecaca;
}

/* Model info */
.model-info {
  background: linear-gradient(135deg, #f0fdfa, #f0f9ff);
  border: 1px solid #99f6e4; border-radius: 12px; padding: 16px;
}

.model-info-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }

.model-info-icon {
  width: 30px; height: 30px;
  background: linear-gradient(135deg, var(--teal), var(--blue));
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: white; flex-shrink: 0;
}

.model-info-title { font-size: 12px; font-weight: 600; color: #0f766e; }
.model-info-sub { font-size: 10px; color: #0d9488; }

.model-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.model-stat {
  background: white; border-radius: 8px; padding: 10px 12px; border: 1px solid #ccfbf1;
}
.model-stat-val { font-size: 16px; font-weight: 700; color: var(--teal); line-height: 1; }
.model-stat-lbl { font-size: 9px; color: var(--soft); letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }

/* ── MAIN ── */
.main { padding: 24px 20px; background: var(--off); }

@media (max-width: 480px) { .main { padding: 16px; } }

.main-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 320px; gap: 14px;
}

.empty-pulse {
  width: 90px; height: 90px; border-radius: 50%;
  border: 2px solid #cbd5e1;
  display: flex; align-items: center; justify-content: center;
  font-size: 34px; color: #cbd5e1;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.empty-pulse::before {
  content: '';
  position: absolute; inset: -8px;
  border-radius: 50%; border: 1px dashed #e2e8f0;
  animation: spin-slow 12s linear infinite;
}

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.empty-label { font-size: 14px; font-weight: 500; color: #94a3b8; }
.empty-sub { font-size: 12px; color: #cbd5e1; text-align: center; }

/* Results */
.result-wrap { animation: fadeUp 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

.result-sec-label {
  font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--soft); margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
.result-sec-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* Diagnosis banner */
.dx-banner {
  border-radius: 16px; padding: 20px 20px; margin-bottom: 20px;
  display: flex; align-items: center; justify-content: space-between;
  border: 1.5px solid; position: relative; overflow: hidden;
  gap: 16px;
  animation: slideIn 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }

.dx-banner.pneumonia { background: linear-gradient(135deg,#fff1f2,#fff5f5); border-color: #fca5a5; box-shadow: 0 4px 24px rgba(220,38,38,0.08); }
.dx-banner.normal { background: linear-gradient(135deg,#f0fdf4,#f0fdfa); border-color: #86efac; box-shadow: 0 4px 24px rgba(22,163,74,0.08); }

.dx-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 8px; padding: 3px 10px; border-radius: 20px;
}
.dx-tag.pneumonia { color: #b91c1c; background: #fee2e2; }
.dx-tag.normal { color: #15803d; background: #dcfce7; }

.dx-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 600; letter-spacing: -0.4px; line-height: 1; margin-bottom: 8px;
}
.dx-name.pneumonia { color: #b91c1c; }
.dx-name.normal { color: #15803d; }

.dx-sub { font-size: 11px; color: var(--muted); line-height: 1.5; }

/* Confidence ring */
.conf-ring { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
.conf-ring svg { transform: rotate(-90deg); }
.conf-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.conf-pct { font-size: 15px; font-weight: 700; color: var(--text); line-height: 1; }
.conf-lbl { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--soft); margin-top: 2px; }

/* Metrics */
.metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }

@media (max-width: 640px) { .metrics-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 340px) { .metrics-row { grid-template-columns: 1fr 1fr; } }

.met-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px 12px; text-align: center;
  transition: transform 0.2s, box-shadow 0.2s; cursor: default;
}
.met-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }

.met-icon { font-size: 18px; margin-bottom: 6px; }
.met-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--soft); margin-bottom: 5px; }
.met-value { font-size: 18px; font-weight: 700; background: linear-gradient(135deg,var(--teal),var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
.met-desc { font-size: 9px; color: var(--soft); margin-top: 3px; }

/* Images */
.images-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }

@media (max-width: 600px) { .images-grid { grid-template-columns: 1fr; } }
@media (min-width: 601px) and (max-width: 800px) { .images-grid { grid-template-columns: 1fr 1fr; } }

.img-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}
.img-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }

.img-card-top {
  padding: 9px 12px; border-bottom: 1px solid #f1f5f9;
  display: flex; align-items: center; gap: 7px;
  background: linear-gradient(to right, #f8fafc, #ffffff);
}

.img-dot { width: 7px; height: 7px; border-radius: 50%; }
.img-dot.original { background: #0284c7; }
.img-dot.heatmap { background: #dc2626; }
.img-dot.overlay { background: #0d9488; }

.img-lbl { font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
.img-card img { width: 100%; display: block; }

/* Clinical note */
.clinical-note {
  background: var(--white); border-radius: 14px; border: 1px solid var(--border);
  padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

@media (max-width: 480px) { .clinical-note { flex-direction: column; gap: 10px; } }

.clinical-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #ccfbf1, #e0f2fe);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}

.clinical-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.clinical-text { font-size: 12px; color: var(--muted); line-height: 1.8; }

.disclaimer {
  margin-top: 10px; padding: 9px 12px;
  background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;
  font-size: 11px; color: #92400e;
  display: flex; gap: 7px; align-items: flex-start; line-height: 1.5;
}
`

export default function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadStep, setLoadStep] = useState(0)
  const [error, setError] = useState(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    setLoadStep(1)
    setError(null)
    try {
      setTimeout(() => setLoadStep(2), 900)
      setTimeout(() => setLoadStep(3), 1800)
      const form = new FormData()
      form.append("file", file)
      const res = await axios.post("http://127.0.0.1:8000/analyze", form)
      setResult(res.data)
    } catch {
      setError("Connection failed — ensure backend is running on port 8000.")
    }
    setLoading(false)
    setLoadStep(0)
  }

  const isPneu = result?.prediction === "PNEUMONIA"
  const conf = result?.confidence ?? 0
  const R = 30
  const C = 2 * Math.PI * R
  const dash = (conf / 100) * C

  return (
    <>
      <style>{styles}</style>

      {/* Topbar */}
      <div className="topbar">
        <div className="brand">
          <div className="brand-icon">🫁</div>
          <div className="brand-name">Medix<span>AI</span></div>
        </div>
        <div className="topbar-pills">
          <div className="topbar-pill active">ResNet-50</div>
          <div className="topbar-pill active">Grad-CAM</div>
          <div className="topbar-pill">RAG</div>
          <div className="topbar-pill">FastAPI</div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        <div className="hero-text">
          <div className="hero-tag">AI-Powered Radiology</div>
          <h1 className="hero-title">Chest X-Ray<br /><em>Diagnosis Assistant</em></h1>
          <p className="hero-sub">Upload a chest X-ray and get instant AI-powered pneumonia detection with explainable Grad-CAM heatmaps.</p>
          <div className="hero-stats">
            {[["85.9%","Val Accuracy"],["0.94","AUC-ROC"],["99%","Recall"]].map(([v,l])=>(
              <div className="hero-stat" key={l}>
                <div className="hero-stat-val">{v}</div>
                <div className="hero-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-icon">🧠</div>
            <div className="hero-card-label">Model</div>
            <div className="hero-card-val">ResNet-50</div>
          </div>
          <div className="hero-card accent">
            <div className="hero-card-icon">🔬</div>
            <div className="hero-card-label">XAI</div>
            <div className="hero-card-val">Grad-CAM</div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="layout">

        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <p className="sec-label">Upload scan</p>
            <div className={`upload-zone${file ? " has-file" : ""}`}>
              <input type="file" accept="image/*" onChange={handleFile} className="file-input" />
              {!file ? (
                <>
                  <div className="upload-icon-wrap">🩻</div>
                  <p className="upload-label">Drop chest X-ray here</p>
                  <p className="upload-sub">or tap to browse · JPEG · PNG</p>
                </>
              ) : (
                <>
                  <div className="preview-wrap">
                    <img src={preview} alt="preview" className="preview-img" />
                    <div className="preview-badge">Ready</div>
                  </div>
                  <p className="filename">{file.name}</p>
                </>
              )}
            </div>
          </div>

          <button className="btn-analyze" onClick={handleAnalyze} disabled={!file || loading}>
            {loading ? "⚙ Analyzing..." : "🔍 Run AI Diagnosis"}
          </button>

          {loading && (
            <div className="loading-wrap">
              <div className="loading-track"><div className="loading-fill" /></div>
              <div className="loading-steps">
                {["CNN inference","Grad-CAM","RAG report"].map((s,i)=>(
                  <div key={s} className={`loading-step${loadStep > i ? " active" : ""}`}>
                    <div className="loading-step-dot" />{s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <div className="error-box">⚠ {error}</div>}

          <div>
            <p className="sec-label">Model specs</p>
            <div className="model-info">
              <div className="model-info-header">
                <div className="model-info-icon">🤖</div>
                <div>
                  <div className="model-info-title">ResNet-50 Fine-tuned</div>
                  <div className="model-info-sub">Kermany Chest X-Ray Dataset</div>
                </div>
              </div>
              <div className="model-grid">
                {[["85.9%","Val Acc"],["0.94","AUC-ROC"],["99%","Recall"],["80%","Precision"]].map(([v,l])=>(
                  <div className="model-stat" key={l}>
                    <div className="model-stat-val">{v}</div>
                    <div className="model-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="main">
          {!result ? (
            <div className="main-empty">
              <div className="empty-pulse">🩻</div>
              <p className="empty-label">Ready for diagnosis</p>
              <p className="empty-sub">Upload a chest X-ray to begin AI analysis</p>
            </div>
          ) : (
            <div className="result-wrap">

              <p className="result-sec-label">Diagnosis result</p>

              <div className={`dx-banner ${isPneu ? "pneumonia" : "normal"}`}>
                <div>
                  <div className={`dx-tag ${isPneu ? "pneumonia" : "normal"}`}>
                    {isPneu ? "⚠ Pathology Detected" : "✓ No Pathology Detected"}
                  </div>
                  <p className={`dx-name ${isPneu ? "pneumonia" : "normal"}`}>
                    {isPneu ? "Pneumonia" : "Normal"}
                  </p>
                  <p className="dx-sub">
                    {isPneu
                      ? "Consolidation or infiltrate pattern identified in lung parenchyma"
                      : "Clear lung fields — no significant radiographic abnormality detected"}
                  </p>
                </div>
                <div className="conf-ring">
                  <svg width="80" height="80" viewBox="0 0 76 76">
                    <circle cx="38" cy="38" r={R} fill="none" stroke="#e2e8f0" strokeWidth="6" />
                    <circle
                      cx="38" cy="38" r={R} fill="none"
                      stroke={isPneu ? "#dc2626" : "#16a34a"}
                      strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${dash} ${C}`}
                      style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
                    />
                  </svg>
                  <div className="conf-inner">
                    <span className="conf-pct">{conf}%</span>
                    <span className="conf-lbl">conf</span>
                  </div>
                </div>
              </div>

              <p className="result-sec-label">Performance metrics</p>
              <div className="metrics-row">
                {[
                  ["📊","Accuracy","85.9%","validation set"],
                  ["📈","AUC-ROC","0.94","discrimination"],
                  ["🎯","Recall","99%","pneumonia class"],
                  ["⚡","Precision","80%","pneumonia class"],
                ].map(([icon,l,v,d])=>(
                  <div className="met-card" key={l}>
                    <div className="met-icon">{icon}</div>
                    <p className="met-label">{l}</p>
                    <p className="met-value">{v}</p>
                    <p className="met-desc">{d}</p>
                  </div>
                ))}
              </div>

              <p className="result-sec-label">Visual analysis</p>
              <div className="images-grid">
                {[
                  { label: "Original scan", key: "original", dot: "original" },
                  { label: "Grad-CAM heatmap", key: "heatmap", dot: "heatmap" },
                  { label: "Attention overlay", key: "overlay", dot: "overlay" },
                ].map(({ label, key, dot }) => (
                  <div className="img-card" key={key}>
                    <div className="img-card-top">
                      <div className={`img-dot ${dot}`} />
                      <span className="img-lbl">{label}</span>
                    </div>
                    <img src={`data:image/png;base64,${result[key]}`} alt={label} />
                  </div>
                ))}
              </div>

              <p className="result-sec-label">Clinical interpretation</p>
              <div className="clinical-note">
                <div className="clinical-icon">🩺</div>
                <div>
                  <p className="clinical-title">AI Diagnostic Summary</p>
                  <p className="clinical-text">
                    {isPneu
                      ? "The model has identified radiographic patterns consistent with pneumonia. The Grad-CAM heatmap highlights regions of consolidation or ground-glass opacity — red/yellow zones indicate highest model attention and typically correspond to areas of increased lung density."
                      : "The model identifies no significant pathological pattern in this chest radiograph. Lung fields appear clear with normal parenchymal markings and no focal consolidation or infiltrate. The Grad-CAM overlay shows distributed, low-level attention without focal abnormality."}
                  </p>
                  <div className="disclaimer">
                    <span>⚠</span>
                    <span>This AI result is for research purposes only. Always consult a qualified radiologist before any clinical decision.</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}