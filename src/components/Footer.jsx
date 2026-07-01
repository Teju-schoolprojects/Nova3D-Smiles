import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, Cpu } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setFormErrors({});

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  return (
    <footer className="footer" id="contact" style={{ backgroundColor: '#05070e', borderTop: '1px solid var(--border-glow)', padding: '80px 0 30px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '60px' }}>
          
          {/* Brand Info & Location Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontFamily: 'var(--font-headings)' }}>
                <Cpu size={24} color="var(--primary)" style={{ filter: 'drop-shadow(var(--glow-cyan))' }} />
                <span>Nova3D</span> Smiles
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.6' }}>
                Next-generation orthodontic design utilizing 3D intraoral scans, automated shift pathways, and robotic aligner printing.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  400 Digital Plaza Suite, Fifth Floor<br />
                  Beverly Hills, CA 90210
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Phone size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-muted)' }}>(310) 555-3030</p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Mail size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-muted)' }}>tech@nova3dsmiles.com</p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Clock size={18} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  Mon - Fri: 8:00 AM - 7:00 PM<br />
                  Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Closed (AI Support Available)
                </p>
              </div>
            </div>

            {/* Custom SVG Location Map */}
            <div 
              style={{ 
                width: '100%', 
                height: '130px', 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden', 
                border: '1px solid rgba(0, 242, 254, 0.15)',
                position: 'relative' 
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 400 130" style={{ backgroundColor: '#070a13' }}>
                {/* Simulated Roads */}
                <line x1="0" y1="35" x2="400" y2="35" stroke="rgba(0, 242, 254, 0.08)" strokeWidth="6" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(0, 242, 254, 0.08)" strokeWidth="6" />
                <line x1="140" y1="0" x2="140" y2="130" stroke="rgba(0, 242, 254, 0.08)" strokeWidth="6" />
                <line x1="280" y1="0" x2="280" y2="130" stroke="rgba(0, 242, 254, 0.08)" strokeWidth="6" />
                
                {/* Scanning Circle effect */}
                <circle cx="280" cy="55" r="22" fill="none" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />
                <circle cx="280" cy="55" r="10" fill="rgba(0, 242, 254, 0.15)" />
                <circle cx="280" cy="55" r="4" fill="var(--primary)" style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }} />
                
                {/* Title */}
                <text x="200" y="24" fill="var(--text-muted)" fontSize="8" letterSpacing="0.1em" fontFamily="sans-serif">DIGITAL PLAZA ROAD</text>
                <text x="296" y="60" fill="var(--primary)" fontSize="10" fontWeight="bold" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 0 2px var(--primary))' }}>Nova3D Smiles</text>
              </svg>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontFamily: 'var(--font-headings)' }}>Send a Tech Inquiry</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Have questions about materials, scan files or aligner options? Send our technicians a message.</p>
            </div>

            {formSuccess && (
              <div 
                style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)', 
                  color: 'var(--accent-light)', 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.85rem' 
                }}
                id="form-success-msg"
              >
                ✓ Message received! A digital lab representative will respond within 4 hours.
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} id="contact-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label htmlFor="footer-name" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Name *</label>
                <input
                  type="text"
                  id="footer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }}
                />
                {formErrors.name && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.name}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label htmlFor="footer-email" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address *</label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }}
                />
                {formErrors.email && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.email}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label htmlFor="footer-message" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Message *</label>
                <textarea
                  id="footer-message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter details of your inquiry..."
                  style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none', resize: 'none' }}
                ></textarea>
                {formErrors.message && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.message}</span>}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }} id="contact-submit-btn">
                <Send size={16} />
                Send Inquiry
              </button>
            </form>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border-muted)', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} Nova3D Smiles LLC. All Rights Reserved. Private & Confidential Ortho Diagnostics.</p>
        </div>
      </div>
    </footer>
  );
}
