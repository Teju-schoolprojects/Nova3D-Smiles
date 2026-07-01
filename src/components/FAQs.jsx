import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS_DATA = [
  {
    q: 'How does Nova3D differ from mail-order aligner kits?',
    a: 'Mail-order aligner kits rely on manual teeth molds taken at home, which have high margins of error and no direct clinical checkups. Nova3D requires a professional iTero 5D intraoral scan. Your plan is designed and supervised by local doctors, utilizing AI stress mapping and in-house 3D printing for clinical precision.'
  },
  {
    q: 'How long does the entire alignment treatment take?',
    a: 'Most mild-to-moderate alignment cases are completed within 5 to 10 months. Extremely complex cases can take up to 15 months. The exact timeframe is calculated during your initial 3D scan diagnostic session.'
  },
  {
    q: 'Is wearing custom clear aligners painful?',
    a: 'You will feel mild pressure for the first 24-48 hours after switching to a new tray. This is normal and indicates your teeth are shifting correctly. Because our AI maps movement in micro-increments of 0.01mm, sudden force spikes are eliminated, making Nova3D significantly more comfortable than traditional metal brackets.'
  },
  {
    q: 'What happens if I lose or break an aligner tray?',
    a: 'Because we print all clear aligners locally in our studio, we can fabricate a replacement tray from your digital file in under 2 hours. Simply notify our desk team, and you can pick up your replacement tray on the same day.'
  },
  {
    q: 'Do you accept HSA, FSA, or dental insurance?',
    a: 'Yes, clear aligners are orthodontic treatments eligible for HSA and FSA funding. We accept all major dental insurance plans and are preferred providers for major carriers. Our administrative team handles the paperwork directly to claim your orthodontic benefits.'
  }
];

export default function FAQs() {
  const [activeIdx, setActiveIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section className="section" id="faq" style={{ backgroundColor: 'rgba(7, 10, 19, 0.95)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <HelpCircle size={14} />
            Information Hub
          </span>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-desc">
            Explore detailed information on digital orthodontic scans, aligner maintenance, costs, and clinic operations.
          </p>
        </div>

        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div 
                key={idx}
                className="glass-card"
                style={{
                  border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-muted)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--glow-cyan)' : 'none'
                }}
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-light)'
                  }}
                  id={`faq-btn-${idx}`}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-body)' }}>
                    <span style={{ color: 'var(--primary)' }}>?</span>
                    {faq.q}
                  </h3>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--primary)',
                      flexShrink: 0
                    }} 
                  />
                </button>

                <div 
                  style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(0, 1, 0, 1)'
                  }}
                >
                  <div 
                    style={{ 
                      padding: '0 24px 24px 40px', 
                      color: 'var(--text-muted)', 
                      fontSize: '0.9rem', 
                      lineHeight: '1.6', 
                      borderTop: '1px solid var(--border-muted)' 
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
