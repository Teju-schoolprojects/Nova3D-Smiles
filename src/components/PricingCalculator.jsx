import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';

const COMPLEXITY_LEVELS = [
  {
    level: 1,
    name: 'Mild Alignment',
    desc: 'Minor spacing issues, front teeth rotations, or quick relapses from childhood braces.',
    duration: '3 - 6 Months',
    novaCost: 1850,
    metalCost: 3500,
    monthly: 69
  },
  {
    level: 2,
    name: 'Moderate Case',
    desc: 'Noticeable crowding, standard teeth gaps, and minor bite alignment adjustments.',
    duration: '6 - 12 Months',
    novaCost: 2950,
    metalCost: 5200,
    monthly: 99
  },
  {
    level: 3,
    name: 'Complex Severity',
    desc: 'Significant crowding, severe teeth rotations, and skeletal bite corrections.',
    duration: '12 - 18 Months',
    novaCost: 4300,
    metalCost: 7200,
    monthly: 149
  }
];

export default function PricingCalculator({ onBookClick }) {
  const [sliderVal, setSliderVal] = useState(1); // 1 = Mild, 2 = Moderate, 3 = Complex
  
  const currentData = COMPLEXITY_LEVELS.find(c => c.level === Number(sliderVal)) || COMPLEXITY_LEVELS[0];
  const savings = currentData.metalCost - currentData.novaCost;

  return (
    <section className="section" id="calculator" style={{ backgroundColor: 'rgba(7, 10, 19, 0.96)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Info size={14} />
            Pricing Transparency
          </span>
          <h2 className="section-title">Cost & <span>Savings Estimator</span></h2>
          <p className="section-desc">
            Use our interactive pricing slider to select your smile complexity level and view predicted alignment costs and monthly financing options.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '50px', alignItems: 'stretch' }}>
          
          {/* Slider and selections panel */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '40px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '30px' 
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: 'var(--font-headings)' }}>
                1. Select Complexity Level
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                Move the slider to estimate severity. Actual complexity is verified during your free 3D scan.
              </p>

              {/* Slider Input */}
              <div style={{ padding: '20px 0', position: 'relative' }}>
                <input 
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(e.target.value)}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--border-muted)',
                    outline: 'none',
                    cursor: 'pointer',
                    WebkitAppearance: 'none'
                  }}
                  id="complexity-slider"
                />
                
                {/* Tick Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: sliderVal === '1' ? '700' : '500', color: sliderVal === '1' ? 'var(--primary)' : 'var(--text-muted)' }}>
                    Mild Case
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: sliderVal === '2' ? '700' : '500', color: sliderVal === '2' ? 'var(--primary)' : 'var(--text-muted)' }}>
                    Moderate Case
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: sliderVal === '3' ? '700' : '500', color: sliderVal === '3' ? 'var(--primary)' : 'var(--text-muted)' }}>
                    Complex Severity
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Level Card details */}
            <div 
              style={{
                backgroundColor: 'rgba(7, 10, 19, 0.4)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-muted)'
              }}
            >
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '8px' }}>
                {currentData.name} Details
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '14px' }}>
                {currentData.desc}
              </p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', borderTop: '1px solid var(--border-muted)', paddingTop: '14px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Est. Term</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-light)' }}>{currentData.duration}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Scanning required</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-light)' }}>1 Visit (60 sec)</span>
                </div>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                What is included in the package?
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {['100% Custom Aligner Trays', 'Free 3D Scan ($250 val)', '3D Simulation Preview', 'Retainer Set ($300 val)', 'Digital Aligner Case', 'AI Check-ins via App'].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Check size={12} color="var(--primary)" strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing display panel */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.04) 0%, rgba(16, 22, 42, 0.9) 100%)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg), var(--glow-cyan)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                Nova3D Smiles Complete Cost
              </span>
              <h3 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-light)', marginTop: '4px', fontFamily: 'var(--font-headings)' }}>
                ${currentData.novaCost.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>
                Interest-Free Financing: ${currentData.monthly}/mo (0% APR, 24 mos)
              </p>
            </div>

            {/* Comparatives section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(7, 10, 19, 0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Traditional Braces (Avg)</span>
                <span style={{ color: '#ef4444', textDecoration: 'line-through', fontWeight: 600 }}>
                  ${currentData.metalCost.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '0.85rem' }}>Total Savings</span>
                <span style={{ color: 'var(--accent-light)', fontWeight: 700 }}>
                  -${savings.toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn-primary" 
                onClick={onBookClick}
                style={{ width: '100%' }}
                id="calc-book-btn"
              >
                Book Free 3D Diagnostic Scan
              </button>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                *No insurance required. HSA/FSA accepted.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
