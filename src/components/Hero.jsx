import React from 'react';
import { Calendar, Compass, Sparkles, Cpu, Layers } from 'lucide-react';

export default function Hero({ onBookClick, onQuizClick }) {
  return (
    <section className="section hero-sec" id="hero" style={{ padding: '160px 0 100px 0', overflow: 'hidden' }}>
      <div className="glow-bg-orb" style={{ top: '-150px', right: '-150px' }}></div>
      <div className="glow-bg-orb" style={{ bottom: '-150px', left: '-150px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(79,172,254,0) 70%)' }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span className="section-tag">
              <Sparkles size={14} color="var(--primary)" />
              Next-Gen Invisible Orthodontics
            </span>
            
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.15, fontFamily: 'var(--font-headings)' }}>
              The Future of Smiles. <br />
              <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Sculpted in 3D.
              </span>
            </h1>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '580px' }}>
              Experience dental biomechanics engineered for the digital age. We utilize AI-powered simulation, ultra-precise 3D intraoral scans, and in-house robotic printing to design clear aligners that straighten your teeth up to 2x faster.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
              <button 
                className="btn-primary" 
                onClick={onBookClick}
                id="hero-book-btn"
              >
                <Calendar size={18} />
                Schedule 3D Scan
              </button>
              <button 
                className="btn-secondary" 
                onClick={onQuizClick}
                id="hero-quiz-btn"
              >
                <Compass size={18} />
                Am I A Candidate?
              </button>
            </div>
            
            {/* Hero Stats */}
            <div style={{ display: 'flex', gap: '40px', marginTop: '30px', borderTop: '1px solid var(--border-muted)', paddingTop: '30px' }}>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-headings)' }}>12k+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Aligners Printed</div>
              </div>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-headings)' }}>99.7%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Perfect Occlusion</div>
              </div>
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-headings)' }}>2 Weeks</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average Lead Time</div>
              </div>
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '400px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, rgba(16, 22, 42, 0.7) 0%, rgba(7, 10, 19, 0.9) 100%)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                boxShadow: 'var(--shadow-lg), var(--glow-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Pulsing visual core */}
              <div 
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)',
                  animation: 'pulseGlow 6s infinite ease-in-out'
                }}
              ></div>

              {/* Graphic Wireframe Teeth SVG */}
              <div style={{ zIndex: 2, textAlign: 'center' }}>
                <svg width="220" height="220" viewBox="0 0 100 100">
                  {/* Outer Scanning Ring */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 242, 254, 0.1)" strokeWidth="1" strokeDasharray="3, 3" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0, 242, 254, 0.25)" strokeWidth="1" />
                  
                  {/* Glowing 3D Grid mesh overlay */}
                  <path d="M 15 50 Q 50 30 85 50" fill="none" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="2" strokeDasharray="1, 2" />
                  <path d="M 15 50 Q 50 20 85 50" fill="none" stroke="rgba(79, 172, 254, 0.2)" strokeWidth="1.5" />
                  
                  {/* 3D Tooth / Smile curve vector */}
                  <path d="M 20 65 Q 50 90 80 65" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                  
                  {/* Scanner laser horizontal line representation */}
                  <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 3px var(--accent))' }} />
                  
                  {/* Laser dots */}
                  <circle cx="50" cy="50" r="2" fill="var(--accent)" />
                  <circle cx="30" cy="45" r="1.5" fill="var(--primary)" />
                  <circle cx="70" cy="55" r="1.5" fill="var(--primary)" />
                </svg>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  3D SMILE BUILDER
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  AI CALIBRATION ACTIVE
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div 
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: '-20px',
                  backgroundColor: 'rgba(7, 10, 19, 0.9)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 3
                }}
              >
                <Cpu size={14} color="var(--primary)" />
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600 }}>AI Path Planning</h4>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>0.01mm Precision</span>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '-20px',
                  backgroundColor: 'rgba(7, 10, 19, 0.9)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 3
                }}
              >
                <Layers size={14} color="var(--accent)" />
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600 }}>In-House 3D Print</h4>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Same-Day Pick Up</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
