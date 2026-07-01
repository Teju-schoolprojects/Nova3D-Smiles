import React, { useState } from 'react';
import { Sparkles, Calendar, RotateCcw, Award, Check } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'concern',
    title: 'What is your primary teeth alignment concern?',
    options: [
      { text: 'Crowded or overlapping teeth', value: 'crowding', desc: 'Teeth overlap due to narrow jaw space.' },
      { text: 'Noticeable spaces or gaps', value: 'gaps', desc: 'Unwanted gaps between adjacent teeth.' },
      { text: 'Bite misalignment (Overbite/Underbite)', value: 'bite', desc: 'Upper and lower teeth do not meet correctly.' },
      { text: 'Slightly crooked front teeth', value: 'minor', desc: 'Minor aesthetic rotations in the smile zone.' }
    ]
  },
  {
    id: 'history',
    title: 'Have you undergone orthodontic treatment before?',
    options: [
      { text: 'Yes, but my teeth have since shifted', value: 'shifted', desc: 'Relapsed alignment due to missing retainer wear.' },
      { text: 'No, this is my first orthodontic treatment', value: 'first_time', desc: 'Starting a fresh alignment journey.' },
      { text: 'Currently wearing metal braces or brackets', value: 'active', desc: 'Looking to transition to invisible clear aligners.' }
    ]
  },
  {
    id: 'commitment',
    title: 'Aligners must be worn 22 hours a day. How committed are you?',
    options: [
      { text: 'Highly committed (only remove to eat & brush)', value: 'high', desc: 'Ideal for maximum movement speed.' },
      { text: 'Moderately committed (might leave them out on weekends)', value: 'medium', desc: 'Requires slightly longer treatment schedules.' },
      { text: 'Concerned about discipline (prefer fixed solutions)', value: 'low', desc: 'Suggests a digital check-up first.' }
    ]
  }
];

export default function AlignerQuiz({ onBookAppointment }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 250);
    } else {
      setTimeout(() => {
        setQuizFinished(true);
      }, 350);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  const calculateCandidacy = () => {
    const concern = answers.concern?.value;
    const commitment = answers.commitment?.value;

    let percentage = 75; // Baseline
    let recommendation = '';
    let category = 'Excellent Candidate';

    if (commitment === 'high') {
      percentage += 15;
    } else if (commitment === 'low') {
      percentage -= 25;
    }

    if (concern === 'minor') {
      percentage += 10;
    } else if (concern === 'bite') {
      percentage -= 10; // Bite cases can be complex
    }

    if (percentage >= 85) {
      category = 'Ideal Candidate';
      recommendation = 'Your alignment goals and commitment score match Nova3D clear aligners perfectly. We can print your starting trays immediately following your initial 3D scan.';
    } else if (percentage >= 60) {
      category = 'Good Candidate';
      recommendation = 'You are a strong match for Nova3D aligners. During your 3D scan, we will check your bite patterns to see if custom attachment points are needed to support complex rotations.';
    } else {
      category = 'Consultation Required';
      recommendation = 'Because of orthodontic complexity or daily discipline concerns, a 3D diagnostic scan is highly recommended first. Our orthodontists will design a custom track that matches your schedule.';
    }

    return { percentage, category, recommendation };
  };

  const progressPercentage = ((currentStep) / QUESTIONS.length) * 100;
  const result = quizFinished ? calculateCandidacy() : null;

  return (
    <section className="section" id="quiz" style={{ backgroundColor: 'rgba(7, 10, 19, 0.98)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Sparkles size={14} />
            Aligner Candidacy
          </span>
          <h2 className="section-title">Am I an <span>Aligner Candidate</span>?</h2>
          <p className="section-desc">
            Complete this brief 3-step digital assessment to check if clear aligners fit your lifestyle, budget, and orthodontic alignment goals.
          </p>
        </div>

        <div 
          style={{
            maxWidth: '650px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)'
          }}
          id="quiz-main-container"
        >
          {!quizFinished ? (
            <>
              {/* Progress Line */}
              <div 
                style={{ 
                  height: '4px', 
                  backgroundColor: 'var(--border-muted)', 
                  borderRadius: 'var(--radius-full)', 
                  marginBottom: '30px', 
                  overflow: 'hidden' 
                }}
              >
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${progressPercentage || 12}%`, 
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>

              {/* Quiz Header */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '4px', fontFamily: 'var(--font-headings)' }}>
                  {QUESTIONS[currentStep].title}
                </h3>
              </div>

              {/* Options Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {QUESTIONS[currentStep].options.map((option, idx) => {
                  const isSelected = answers[QUESTIONS[currentStep].id]?.value === option.value;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(QUESTIONS[currentStep].id, option)}
                      style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        background: isSelected ? 'rgba(0, 242, 254, 0.05)' : 'rgba(7, 10, 19, 0.4)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-muted)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                        transition: 'var(--transition-fast)',
                        boxShadow: isSelected ? 'var(--glow-cyan)' : 'none'
                      }}
                      id={`quiz-opt-${QUESTIONS[currentStep].id}-${idx}`}
                    >
                      <h4 style={{ fontSize: '1.05rem', color: isSelected ? 'var(--primary)' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {option.text}
                        {isSelected && <Check size={16} color="var(--primary)" />}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {option.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    marginTop: '20px',
                    textDecoration: 'underline'
                  }}
                >
                  Go Back
                </button>
              )}
            </>
          ) : (
            /* Quiz Outcomes */
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div 
                style={{ 
                  width: '72px', 
                  height: '72px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--accent)',
                  margin: '0 auto',
                  boxShadow: 'var(--glow-emerald)'
                }}
              >
                <Award size={36} />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  Candidacy Match Score
                </span>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-light)', marginTop: '4px', fontFamily: 'var(--font-headings)' }}>
                  {result.percentage}% Match
                </h3>
                <span 
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--accent-light)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-full)',
                    marginTop: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {result.category}
                </span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
                {result.recommendation}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => onBookAppointment('Aligner consultation')}
                  id="quiz-book-scan-btn"
                >
                  <Calendar size={18} />
                  Book Free 3D Scan
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={handleReset}
                  id="quiz-retake-btn"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <RotateCcw size={16} />
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
