'use client';

import React, { useState } from 'react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMsg('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setResponseMsg('An unexpected error occurred. Please try again later.');
    }
  };

  const handleClose = () => {
    if (status === 'success') {
      setStatus('idle');
      setResponseMsg('');
    }
    onClose();
  };

  return (
    <div className={`contact-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h3>Let's Connect</h3>
        <button className="drawer-close" onClick={handleClose}>&times;</button>
      </div>

      {status === 'success' ? (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Thank You!</h4>
          <p style={{ color: '#55555C', marginBottom: '20px' }}>{responseMsg}</p>
          <button 
            type="button" 
            className="submit-btn" 
            onClick={() => {
              setStatus('idle');
              setResponseMsg('');
            }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          {status === 'error' && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              ⚠️ {responseMsg}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Elon Musk" 
              required 
              disabled={status === 'submitting'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="elon@musk.com" 
              required 
              disabled={status === 'submitting'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Details</label>
            <textarea 
              id="message" 
              rows={4} 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Tell me about your project..." 
              required
              disabled={status === 'submitting'}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message 🚀'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactDrawer;
