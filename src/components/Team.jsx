import React from 'react';
import { Award, ShieldCheck, GraduationCap, Cpu } from 'lucide-react';

const DOCTORS = [
  {
    id: 'sato',
    name: 'Dr. Kenji Sato, DDS, PhD',
    title: 'Chief of Digital Orthodontics',
    bio: 'Dr. Sato completed his Orthodontic Fellowship at Harvard School of Dental Medicine. He holds a PhD in Biomechanics and pioneered virtual tooth-movement algorithms used in digital alignment systems.',
    education: 'Harvard School of Dental Medicine',
    exp: '14 Years',
    badge: 'Orthodontics & AI Planning',
    awards: 'Top Digital Innovator Award 2025'
  },
  {
    id: 'lin',
    name: 'Dr. Sarah Lin, DDS',
    title: 'Lead 3D Restorative Surgeon',
    bio: 'Dr. Lin specializes in computer-guided implant dentistry and in-house 3D printing of zirconia restorations. She coordinates clinical trials for next-gen biocompatible dental materials.',
    education: 'Columbia University School of Dental Medicine',
    exp: '11 Years',
    badge: '3D Restoration & Implants',
    awards: 'Restorative Excellence Fellowship'
  },
  {
    id: 'vance',
    name: 'Dr. Marcus Vance, DDS, MS',
    title: 'Orthodontic Biomaterials Lead',
    bio: 'Dr. Vance focuses on custom polyurethane formulations for invisible orthodontic trays. He ensures that aligner force curves are consistent and optimized for pain-free shifting.',
    education: 'University of Pennsylvania Dental Medicine',
    exp: '8 Years',
    badge: 'Biomaterial Calibrations',
    awards: 'International Orthodontic Society Award'
  }
];

export default function Team({ onBookClick }) {
  return (
    <section className="section" id="team" style={{ backgroundColor: 'rgba(7, 10, 19, 0.94)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Cpu size={14} />
            Digital Artisans
          </span>
          <h2 className="section-title">Clinical <span>Specialists</span></h2>
          <p className="section-desc">
            Our clinicians combine doctoral dentistry, computer engineering, and advanced materials science to sculpt your smile safely and efficiently.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {DOCTORS.map((doc) => (
            <div 
              key={doc.id} 
              className="glass-card" 
              style={{ 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column' 
              }}
              id={`doctor-card-${doc.id}`}
            >
              {/* Image Block Fallback with modern cyber decoration */}
              <div 
                style={{
                  height: '220px',
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(7, 10, 19, 0.9) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderBottom: '1px solid var(--border-glow)'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Award size={48} color="var(--primary)" style={{ filter: 'drop-shadow(var(--glow-cyan))', opacity: 0.8 }} />
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginTop: '8px' }}>
                    {doc.name.split(',')[0]}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nova3D Clinical Lead</p>
                </div>
                <span 
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(7, 10, 19, 0.8)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    color: 'var(--primary)',
                    padding: '4px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase'
                  }}
                >
                  {doc.badge}
                </span>
              </div>

              {/* Doctor details */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-light)' }}>{doc.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{doc.title}</span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {doc.bio}
                </p>

                {/* Info block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', borderTop: '1px solid var(--border-muted)', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={16} color="var(--primary)" />
                    <span style={{ color: 'var(--text-muted)' }}>{doc.education}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color="var(--accent-light)" />
                    <span style={{ color: 'var(--text-muted)' }}>Experience: <strong>{doc.exp}</strong></span>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  onClick={onBookClick}
                  style={{ width: '100%', padding: '12px 0', fontSize: '0.85rem', marginTop: '10px' }}
                  id={`btn-book-${doc.id}`}
                >
                  Consult Specialists
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
