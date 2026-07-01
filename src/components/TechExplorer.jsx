import React, { useState } from 'react';
import { Camera, Cpu, Layers, Info, Check, X } from 'lucide-react';

const TECH_ITEMS = [
  {
    id: 'itero',
    title: 'iTero Element 5D Intraoral Scan',
    tagline: 'Goo-Free, Ultra-Low Radiation 3D Mapping',
    shortDesc: 'Say goodbye to messy dental molds. We capture a complete, millimeter-precise model of your teeth in under 60 seconds.',
    longDesc: 'The iTero Element 5D captures 6,000 high-resolution color images per second to construct a full 3D interactive model of your jaw structure. It checks for hidden cavities, enamel density, and displays a real-time simulation of your final post-aligner teeth alignment right in the chair.',
    icon: Camera,
    stats: [
      { label: 'Capture Speed', val: '6,000 images/sec' },
      { label: 'Scan Time', val: '60 Seconds' },
      { label: 'Radiation Level', val: '0% (Optical)' }
    ],
    features: [
      'Interactive visual simulation',
      'Accurate gap and crowding assessment',
      'No uncomfortable silicone trays',
      'Color-mapped decay diagnostics'
    ]
  },
  {
    id: 'aialign',
    title: 'AI Align Suite Orthodontic Modeling',
    tagline: 'Deep-Learning Assisted Tooth Movement Trajectory',
    shortDesc: 'AI algorithms calculate precise forces required to move each tooth along the most efficient physical path.',
    longDesc: 'Our AI engine analyzes thousands of successful aligner cases to plan your treatment. It maps out customized micro-movements (0.01mm shifts) to minimize discomfort, avoid biological root stress, and reduce overall alignment treatment times by up to 40%.',
    icon: Cpu,
    stats: [
      { label: 'Trajectory Safety', val: '100% Calculated' },
      { label: 'Shift Increments', val: '0.01mm micro-steps' },
      { label: 'Treatment Speedup', val: 'Up to 40% Faster' }
    ],
    features: [
      'Interactive week-by-week timeline',
      'Accurate duration predictions',
      'Targeted bio-force calculations',
      'Consistent clinical oversight'
    ]
  },
  {
    id: 'bioprint',
    title: 'Robotic 3D Aligner Printing',
    tagline: 'Medical-Grade Biocompatible Fabrication',
    shortDesc: 'We print clear aligners in-house using high-clarity polyurethanes, offering rapid turnaround and same-day replacements.',
    longDesc: 'Using advanced stereolithography (SLA) 3D printers, we manufacture your customized aligners locally. This clinical setup allows us to deliver your starting aligner batch within days instead of weeks, and print instant replacement aligners in 2 hours if you lose one.',
    icon: Layers,
    stats: [
      { label: 'Fabrication Time', val: '120 mins per tray' },
      { label: 'Material Clarity', val: '99.9% Transparent' },
      { label: 'Turnaround Time', val: 'Same-day replacements' }
    ],
    features: [
      'BPA-free medical polyurethane',
      'Laser-trimmed custom borders',
      'Seamless replacements printed locally',
      'Durable, break-resistant structure'
    ]
  }
];

export default function TechExplorer({ onBookClick }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="section" id="tech" style={{ backgroundColor: 'rgba(7, 10, 19, 0.95)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Cpu size={14} />
            Digital Infrastructure
          </span>
          <h2 className="section-title">Engineered <span>3D Technology</span></h2>
          <p className="section-desc">
            Explore the high-precision hardware and software backing your Nova3D alignment. Click on any system card to view detailed clinical specifications.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {TECH_ITEMS.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id}
                className="glass-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => setActiveItem(item)}
                id={`tech-card-${item.id}`}
              >
                <div 
                  style={{
                    backgroundColor: 'rgba(0, 242, 254, 0.08)',
                    border: '1px solid rgba(0, 242, 254, 0.2)',
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    boxShadow: 'var(--glow-cyan)'
                  }}
                >
                  <IconComp size={28} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>{item.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                    {item.tagline}
                  </span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {item.shortDesc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: 'auto', paddingTop: '10px' }}>
                  <Info size={14} />
                  View Clinical Specs
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Spec Modal */}
      {activeItem && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(7, 10, 19, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveItem(null)}
          id="tech-modal"
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '650px',
              backgroundColor: '#0f172a',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg), var(--glow-cyan)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              style={{
                padding: '24px 30px',
                borderBottom: '1px solid var(--border-muted)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 242, 254, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--primary)' }}>
                  {React.createElement(activeItem.icon, { size: 24 })}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>{activeItem.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clinical Tech Specs</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {activeItem.longDesc}
              </p>

              {/* Stats Bar */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  backgroundColor: 'rgba(7, 10, 19, 0.4)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-muted)'
                }}
              >
                {activeItem.stats.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      {stat.label}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Functional Advancements
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {activeItem.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <div 
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent)',
                          flexShrink: 0
                        }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span style={{ color: 'var(--text-main)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div 
              style={{
                padding: '20px 30px',
                borderTop: '1px solid var(--border-muted)',
                backgroundColor: 'rgba(7, 10, 19, 0.2)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}
            >
              <button 
                className="btn-secondary"
                onClick={() => setActiveItem(null)}
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Close Details
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setActiveItem(null);
                  onBookClick();
                }}
                style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                id="tech-modal-book-btn"
              >
                Book 3D Scan Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
