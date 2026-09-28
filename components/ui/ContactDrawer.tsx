'use client';

import React from 'react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! Akshay S will get back to you shortly.');
    onClose();
  };

  return (
    <div className={`contact-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h3>Let's Connect</h3>
        <button className="drawer-close" onClick={onClose}>&times;</button>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" placeholder="john@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Project Details</label>
          <textarea id="message" rows={4} placeholder="Tell me about your project..."></textarea>
        </div>
        <button type="submit" className="submit-btn">Send Message 🚀</button>
      </form>
    </div>
  );
};

export default ContactDrawer;
