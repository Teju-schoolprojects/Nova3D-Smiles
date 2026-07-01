import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, User, Check, Clock, ShieldCheck } from 'lucide-react';

const SERVICES = [
  { id: 'aligner', title: 'Aligner Consultation', desc: 'iTero 5D scan and 3D preview', duration: '45 mins' },
  { id: 'restore', title: 'Same-Day 3D Printed Crown', desc: 'CAD print and placement session', duration: '90 mins' },
  { id: 'implants', title: 'Guided Implant Mapping', desc: 'Millimeter jaw mapping scan', duration: '120 mins' },
  { id: 'hygiene', title: 'Digital Oral Hygiene', desc: 'Cavity detection and cleaning', duration: '60 mins' }
];

const DOCTORS = [
  { id: 'sato', name: 'Dr. Kenji Sato', specialty: 'Orthodontics & AI Planning', exp: '14 yrs' },
  { id: 'lin', name: 'Dr. Sarah Lin', specialty: '3D Restoration & Implants', exp: '11 yrs' },
  { id: 'vance', name: 'Dr. Marcus Vance', specialty: 'Biomaterial Calibrations', exp: '8 yrs' }
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:15 AM',
  '11:30 AM',
  '01:30 PM',
  '02:45 PM',
  '04:00 PM'
];

export default function Scheduler({ preselectedService }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [formErrors, setFormErrors] = useState({});
  const [bookingCode, setBookingCode] = useState('');

  // Handle preselected service from AlignerQuiz
  useEffect(() => {
    if (preselectedService) {
      const matched = SERVICES.find(s => s.title.toLowerCase().includes(preselectedService.toLowerCase()) || 
                                           preselectedService.toLowerCase().includes(s.title.toLowerCase()));
      if (matched) {
        setSelectedService(matched);
      } else {
        setSelectedService(SERVICES[0]);
      }
      setStep(1); // Reset
    }
  }, [preselectedService]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    if (!date) return;
    if (date.getDay() === 0) return; // Sunday Closed
    
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) return;

    setSelectedDate(date);
    setSelectedTime(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Enter a valid phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDoctor) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    if (step === 4) {
      if (!validateForm()) return;
      
      const code = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);

      const existingBookings = JSON.parse(localStorage.getItem('nova_bookings') || '[]');
      const newBooking = {
        code,
        service: selectedService.title,
        doctor: selectedDoctor.name,
        date: selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        time: selectedTime,
        patientName: formData.name,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('nova_bookings', JSON.stringify([...existingBookings, newBooking]));
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetScheduler = () => {
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setBookingCode('');
    setStep(1);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <section className="section" id="booking" style={{ backgroundColor: 'rgba(7, 10, 19, 0.96)' }}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">
            <Calendar size={14} />
            Reservation Center
          </span>
          <h2 className="section-title">Schedule Your <span>3D Diagnosis</span></h2>
          <p className="section-desc">
            Use our interactive scheduler to select a clinical service, choose your orthodontist, pick a time slot, and confirm your visit.
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '260px 1fr', 
            gap: '40px', 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="scheduler-container"
        >
          {/* Sidebar Step Indicators */}
          <div 
            style={{ 
              borderRight: '1px solid var(--border-muted)', 
              paddingRight: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '30px' 
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-headings)' }}>Reservation</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3D Scan Wizard</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { s: 1, label: 'Service' },
                { s: 2, label: 'Specialist' },
                { s: 3, label: 'Date & Time' },
                { s: 4, label: 'Patient Info' }
              ].map((item) => (
                <div 
                  key={item.s} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    opacity: step === item.s ? 1 : step > item.s ? 0.8 : 0.4 
                  }}
                >
                  <div 
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: step > item.s ? 'var(--accent)' : step === item.s ? 'var(--primary)' : 'transparent',
                      border: step >= item.s ? 'none' : '1px solid var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step >= item.s ? 'var(--bg-dark)' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}
                  >
                    {step > item.s ? <Check size={14} strokeWidth={3} /> : item.s}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: step === item.s ? '700' : '500', color: step === item.s ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Wizard Panels */}
          <div style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', fontFamily: 'var(--font-headings)' }}>Select Treatment Service</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Choose the digital service or consultation track you need.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {SERVICES.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      style={{
                        padding: '20px',
                        background: selectedService?.id === s.id ? 'rgba(0, 242, 254, 0.05)' : 'rgba(7, 10, 19, 0.3)',
                        border: selectedService?.id === s.id ? '1px solid var(--primary)' : '1px solid var(--border-muted)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        boxShadow: selectedService?.id === s.id ? 'var(--glow-cyan)' : 'none'
                      }}
                      id={`scheduler-service-${s.id}`}
                    >
                      <h4 style={{ fontSize: '1.1rem', color: selectedService?.id === s.id ? 'var(--primary)' : 'var(--text-light)' }}>{s.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.desc}</p>
                      <span style={{ display: 'inline-block', fontSize: '0.7rem', color: 'var(--primary)', marginTop: '8px', fontWeight: 600 }}>
                        {s.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', fontFamily: 'var(--font-headings)' }}>Choose Clinical Specialist</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Select the specialist to review your 3D digital records.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {DOCTORS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        background: selectedDoctor?.id === doc.id ? 'rgba(0, 242, 254, 0.05)' : 'rgba(7, 10, 19, 0.3)',
                        border: selectedDoctor?.id === doc.id ? '1px solid var(--primary)' : '1px solid var(--border-muted)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        boxShadow: selectedDoctor?.id === doc.id ? 'var(--glow-cyan)' : 'none'
                      }}
                      id={`scheduler-doctor-${doc.id}`}
                    >
                      <div 
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          margin: '0 auto 12px auto',
                          color: selectedDoctor?.id === doc.id ? 'var(--primary)' : 'var(--text-muted)'
                        }}
                      >
                        <User size={24} />
                      </div>
                      <h4 style={{ fontSize: '1rem', color: selectedDoctor?.id === doc.id ? 'var(--primary)' : 'var(--text-light)' }}>{doc.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{doc.specialty}</p>
                      <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                        Exp: {doc.exp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', fontFamily: 'var(--font-headings)' }}>Select Date & Time</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Sundays are closed. Past dates are blocked.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
                  {/* Calendar Mock */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={handlePrevMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-muted)', color: 'var(--text-light)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                        <button onClick={handleNextMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-muted)', color: 'var(--text-light)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                      {days.map((date, idx) => {
                        if (!date) return <div key={idx}></div>;
                        const isSunday = date.getDay() === 0;
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const isPast = date < today;
                        const isDisabled = isSunday || isPast;

                        return (
                          <button
                            key={idx}
                            disabled={isDisabled}
                            onClick={() => handleDateClick(date)}
                            style={{
                              padding: '8px 0',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: isSelected ? 'var(--primary)' : 'rgba(7, 10, 19, 0.4)',
                              color: isSelected ? 'var(--bg-dark)' : isDisabled ? 'rgba(255,255,255,0.1)' : 'var(--text-light)',
                              cursor: isDisabled ? 'default' : 'pointer',
                              fontWeight: isSelected ? 700 : 500,
                              fontSize: '0.8rem'
                            }}
                            type="button"
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '12px' }}>Available Slots</h4>
                    {selectedDate ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            style={{
                              padding: '10px 0',
                              background: selectedTime === time ? 'rgba(0, 242, 254, 0.1)' : 'rgba(7, 10, 19, 0.4)',
                              border: selectedTime === time ? '1px solid var(--primary)' : '1px solid var(--border-muted)',
                              borderRadius: '4px',
                              color: selectedTime === time ? 'var(--primary)' : 'var(--text-muted)',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                            type="button"
                          >
                            <Clock size={12} />
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ border: '1px dashed var(--border-muted)', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderRadius: 'var(--radius-md)' }}>
                        Select a date to view slots
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', fontFamily: 'var(--font-headings)' }}>Enter Patient Details</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Fill out your contact details to lock in your booking.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="name" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name} 
                      onChange={handleFormChange}
                      placeholder="John Doe"
                      style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }}
                    />
                    {formErrors.name && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.name}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email} 
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }}
                    />
                    {formErrors.email && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.email}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: 'span 2' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      value={formData.phone} 
                      onChange={handleFormChange}
                      placeholder="+1 (555) 012-3456"
                      style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }}
                    />
                    {formErrors.phone && <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{formErrors.phone}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: 'span 2' }}>
                    <label htmlFor="notes" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Special Requests or Notes (Optional)</label>
                    <textarea 
                      name="notes" 
                      id="notes" 
                      value={formData.notes} 
                      onChange={handleFormChange}
                      rows="2"
                      placeholder="Let us know about aligner history, dental anxiety, or scheduling details..."
                      style={{ padding: '12px', background: 'rgba(7, 10, 19, 0.4)', border: '1px solid var(--border-muted)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none', resize: 'none' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--accent)',
                    margin: '0 auto 16px auto',
                    boxShadow: 'var(--glow-emerald)'
                  }}
                >
                  <ShieldCheck size={32} />
                </div>
                
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: 'var(--font-headings)' }}>Reservation Confirmed!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 24px auto' }}>
                  Your digital 3D Scan consultation is locked in. We have sent a calendar invite and confirmation copy to your email.
                </p>

                {/* Receipt Card */}
                <div 
                  style={{
                    backgroundColor: 'rgba(7, 10, 19, 0.4)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    maxWidth: '400px',
                    margin: '0 auto 24px auto',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Reference Code</span>
                    <strong style={{ color: 'var(--primary)' }}>{bookingCode}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Service Requested</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{selectedService?.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Practitioner Assigned</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{selectedDoctor?.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Scheduled Time</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>
                      {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Patient Name</span>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{formData.name}</span>
                  </div>
                </div>

                <button className="btn-primary" onClick={resetScheduler} id="success-done-btn">
                  Book Another Session
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 5 && (
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  borderTop: '1px solid var(--border-muted)', 
                  paddingTop: '20px', 
                  marginTop: '30px' 
                }}
              >
                <button
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="btn-secondary"
                  style={{ padding: '10px 24px', fontSize: '0.85rem', opacity: step === 1 ? 0.3 : 1 }}
                  type="button"
                >
                  Back
                </button>
                
                <button
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && !selectedDoctor) ||
                    (step === 3 && (!selectedDate || !selectedTime))
                  }
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                  type="button"
                  id="scheduler-next-btn"
                >
                  {step === 4 ? 'Confirm Reservation' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
