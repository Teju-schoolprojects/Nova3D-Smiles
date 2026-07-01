import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRightLeft } from 'lucide-react';

const SIMULATIONS = [
  {
    id: 'aligner',
    title: 'Severe Crowding Correction',
    tech: 'AI Align Suite Trajectory Planner',
    timeframe: '7 Months (14 Aligners)',
    description: 'Patient presented with severe rotational crowding of upper central incisors and narrow dental arch width.',
    beforeAlign: 'rotate(-10deg) translateX(-4px)',
    afterAlign: 'rotate(0deg) translateX(0)',
    beforeSpacing: '0px',
    afterSpacing: '0px',
    beforeToothColor: '#c5b89a', // dull yellow-brown
    afterToothColor: '#a5f3fc'  // glowing bright cyan teeth
  },
  {
    id: 'gap',
    title: 'Diastema (Gap) Closure',
    tech: 'Robotic 3D Custom Print Aligners',
    timeframe: '5 Months (10 Aligners)',
    description: 'Patient presented with a 4.5mm midline diastema (gap) and secondary spacing in lateral incisors.',
    beforeAlign: 'rotate(0deg)',
    afterAlign: 'rotate(0deg)',
    beforeSpacing: '12px', // Gap space
    afterSpacing: '0px', // Closed
    beforeToothColor: '#cbd5e1',
    afterToothColor: '#a5f3fc'
  },
  {
    id: 'implant',
    title: '3D Guided Implant & Restorative Crown',
    tech: '3D Bio-Print Zirconia Crown Placement',
    timeframe: '2 Visits (Same-Day Restoration)',
    description: 'Patient presented with a fractured upper lateral incisor. Replaced using immediate guided implant navigation.',
    beforeAlign: 'scaleY(0)', // Missing tooth simulation
    afterAlign: 'scaleY(1)',  // Restored
    beforeSpacing: '32px',
    afterSpacing: '0px',
    beforeToothColor: '#1e293b',
    afterToothColor: '#a5f3fc'
  }
];

export default function SmileSimulator({ onBookClick }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const currentSim = SIMULATIONS[activeIdx];

  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  return (
    <section className="section" id="simulator" style={{ backgroundColor: 'rgba(7, 10, 19, 0.93)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Sparkles size={14} />
            3D Smile Engine
          </span>
          <h2 className="section-title">Interactive <span>Smile Simulator</span></h2>
          <p className="section-desc">
            Toggle between our clinical smile cases and drag the vertical slider left or right to compare initial states and final simulated alignments.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {SIMULATIONS.map((sim, idx) => (
            <button
              key={sim.id}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPosition(50);
              }}
              style={{
                backgroundColor: activeIdx === idx ? 'var(--primary)' : 'rgba(16, 22, 42, 0.6)',
                color: activeIdx === idx ? 'var(--bg-dark)' : 'var(--text-main)',
                border: '1px solid rgba(0, 242, 254, 0.15)',
                padding: '12px 24px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: activeIdx === idx ? 'var(--glow-cyan)' : 'none'
              }}
              id={`sim-tab-${sim.id}`}
            >
              {sim.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
          {/* Draggable Slider Wrapper */}
          <div 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            style={{
              position: 'relative',
              height: '350px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'ew-resize',
              userSelect: 'none',
              touchAction: 'none',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              backgroundColor: '#0a0f1d'
            }}
            id="sim-slider-box"
          >
            {/* Layer 1: AFTER state (right side) */}
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                top: 0, 
                left: 0,
                background: 'radial-gradient(circle, #0e2030 0%, #070a13 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <svg width="240" height="130" viewBox="0 0 240 130">
                  <path d="M40,30 Q120,10 200,30" fill="none" stroke="rgba(0, 242, 254, 0.1)" strokeWidth="8" strokeLinecap="round" />
                  {/* Teeth Group */}
                  <g transform={currentSim.afterAlign}>
                    {/* Aligned glowing teeth */}
                    <rect x="55" y="38" width="16" height="24" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                    <rect x="75" y="38" width="20" height="26" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                    <rect x="99" y="38" width="22" height="28" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                    <rect x="123" y="38" width="22" height="28" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                    <rect x="149" y="38" width="20" height="26" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                    <rect x="171" y="38" width="16" height="24" rx="4" fill={currentSim.afterToothColor} stroke="#070a13" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                  </g>
                  {/* Aligned perfect curve */}
                  <path d="M40,85 Q120,115 200,85" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginTop: '10px' }}>
                  POST-ALIGNMENT MODEL
                </div>
              </div>
            </div>

            {/* Layer 2: BEFORE state (clipped on the left) */}
            <div 
              style={{
                width: `${sliderPosition}%`,
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                borderRight: '1px solid var(--primary)',
                transition: isDragging.current ? 'none' : 'width 0.15s ease'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  minWidth: '500px', // Prevents squeezing
                  background: 'radial-gradient(circle, #251815 0%, #070a13 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <svg width="240" height="130" viewBox="0 0 240 130">
                    <path d="M40,30 Q120,10 200,30" fill="none" stroke="rgba(245, 158, 11, 0.05)" strokeWidth="8" strokeLinecap="round" />
                    {/* Teeth Group before - showing misalignment or gaps */}
                    <g transform={currentSim.beforeAlign}>
                      <rect x="55" y="38" width="16" height="24" rx="4" fill={currentSim.beforeToothColor} stroke="#070a13" strokeWidth="1.5" />
                      <rect x="75" y="38" width="20" height="26" rx="4" fill={currentSim.beforeToothColor} stroke="#070a13" strokeWidth="1.5" />
                      
                      {/* Gap/Implant condition rendering check */}
                      {currentSim.id !== 'implant' && (
                        <rect 
                          x={currentSim.id === 'gap' ? "95" : "99"} 
                          y="38" 
                          width="22" 
                          height="28" 
                          rx="4" 
                          fill={currentSim.beforeToothColor} 
                          stroke="#070a13" 
                          strokeWidth="1.5" 
                        />
                      )}
                      
                      <rect 
                        x={currentSim.id === 'gap' ? "127" : "123"} 
                        y="38" 
                        width="22" 
                        height="28" 
                        rx="4" 
                        fill={currentSim.beforeToothColor} 
                        stroke="#070a13" 
                        strokeWidth="1.5" 
                      />
                      <rect x="149" y="38" width="20" height="26" rx="4" fill={currentSim.beforeToothColor} stroke="#070a13" strokeWidth="1.5" />
                      <rect x="171" y="38" width="16" height="24" rx="4" fill={currentSim.beforeToothColor} stroke="#070a13" strokeWidth="1.5" />
                    </g>
                    {/* Uneven curve before */}
                    <path 
                      d={currentSim.id === 'aligner' ? "M40,87 Q115,95 200,90" : "M40,85 Q120,115 200,85"} 
                      fill="none" 
                      stroke="#854d0e" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginTop: '10px' }}>
                    INITIAL CLINICAL STATE
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable divider handle bar */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                width: '2px',
                backgroundColor: 'var(--primary)',
                cursor: 'ew-resize',
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(0, 242, 254, 0.8)'
              }}
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--bg-dark)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.5)'
                }}
              >
                <ArrowRightLeft size={14} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Clinical Simulation Info Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}>
              {currentSim.tech}
            </span>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-headings)' }}>{currentSim.title}</h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {currentSim.description}
            </p>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px', 
                backgroundColor: 'var(--bg-card)', 
                padding: '20px', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border-muted)' 
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                  Treatment Term
                </span>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-light)' }}>
                  {currentSim.timeframe}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                  Target Shift Accuracy
                </span>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-light)' }}>
                  0.01mm Deviation
                </span>
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={onBookClick}
              style={{ marginTop: '10px' }}
              id="sim-cta-btn"
            >
              Get My 3D Design Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
