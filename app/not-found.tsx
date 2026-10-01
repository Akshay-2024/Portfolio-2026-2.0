'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer1 from '../components/ui/footer-section-1';
import NinjaRunner from '../components/ui/NinjaRunner';
import ContactDrawer from '../components/ui/ContactDrawer';

export default function NotFound() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0D', color: '#FFFFFF' }}>
      <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px 24px', maxWidth: '900px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 800, 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase', 
            color: '#FF3B30', 
            background: 'rgba(255, 59, 48, 0.12)',
            border: '1px solid rgba(255, 59, 48, 0.3)',
            padding: '6px 16px',
            borderRadius: '100px'
          }}>
            ERROR 404 — HIDDEN TALENT
          </span>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 56px)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            marginTop: '16px', 
            marginBottom: '12px',
            lineHeight: 1.1,
            color: '#FFFFFF'
          }}>
            Page Slipped into the Shadows
          </h1>
          <p style={{ 
            color: '#A1A1AA', 
            fontSize: 'clamp(15px, 2vw, 18px)', 
            maxWidth: '540px', 
            margin: '0 auto',
            lineHeight: 1.5 
          }}>
            You discovered the secret 404 route! Play the interactive Ninja Runner game below while finding your way back.
          </p>
        </div>

        {/* Ninja Runner Game Container */}
        <div style={{ 
          width: '100%', 
          height: '240px', 
          background: '#141419', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          margin: '20px 0 36px 0',
          position: 'relative'
        }}>
          <NinjaRunner 
            backgroundColor="#141419"
            groundColor="#FF3B30"
            groundY={780}
            dinoC1="#FFFFFF"
            obstacleC1="#FF3B30"
            showScore={true}
            scoreColor="#FFFFFF"
            startText="Press Space, Enter or Click to Play 🥷"
            gameOverText="404 NINJA DOWN!"
            restartText=""
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link 
            href="/" 
            style={{ 
              backgroundColor: '#FF3B30', 
              color: '#FFFFFF', 
              padding: '14px 28px', 
              borderRadius: '100px', 
              fontWeight: 600, 
              fontSize: '15px', 
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(255, 59, 48, 0.3)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Return to Home
          </Link>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            style={{ 
              backgroundColor: 'transparent', 
              color: '#FFFFFF', 
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              padding: '14px 28px', 
              borderRadius: '100px', 
              fontWeight: 600, 
              fontSize: '15px', 
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            Contact Support 🚀
          </button>
        </div>
      </main>

      <Footer1 />

      <ContactDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}
