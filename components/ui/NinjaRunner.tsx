'use client';

import React, { useRef, useEffect, useState, useCallback, memo } from 'react';

const DINO_WIDTH = 44;
const DINO_HEIGHT = 47;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 40;
const BUILDING_WIDTH = 32;
const BUILDING_HEIGHT = 48;
const BIRD_WIDTH = 32;
const BIRD_HEIGHT = 20;
const GAME_HEIGHT = 180;
const GAME_WIDTH = 600;
const GRAVITY = 0.6;
const JUMP_VELOCITY = -10.5;
const INITIAL_SPEED = 6;
const SPEED_INCREMENT = 0.002;
const OBSTACLE_INTERVAL = 1200;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBgCss(type: string, c1: string, c2?: string, c3?: string, c4?: string) {
  if (type === 'Solid') return c1;
  if (type === 'Linear') return `linear-gradient(135deg, ${c1}, ${c2})`;
  if (type === 'Radial') return `radial-gradient(circle, ${c1}, ${c2})`;
  if (type === 'Conical') return `conic-gradient(from 0deg at 50% 50%, ${c1}, ${c2}, ${c3}, ${c4}, ${c1})`;
  if (type === 'Mesh') {
    return `
      radial-gradient(circle at 15% 15%, ${c1} 0%, transparent 70%),
      radial-gradient(circle at 85% 15%, ${c2} 0%, transparent 70%),
      radial-gradient(circle at 85% 85%, ${c3} 0%, transparent 70%),
      radial-gradient(circle at 15% 85%, ${c4} 0%, transparent 70%),
      ${c1}
    `;
  }
  return c1;
}

export interface NinjaRunnerProps {
  backgroundColor?: string;
  groundColor?: string;
  groundY?: number;
  dinoFillType?: string;
  dinoC1?: string;
  obstacleFillType?: string;
  obstacleC1?: string;
  soundJump?: boolean;
  soundScore?: boolean;
  soundGameOver?: boolean;
  showScore?: boolean;
  scoreColor?: string;
  scoreSize?: number;
  scoreX?: number;
  scoreY?: number;
  inputType?: string;
  globalClickTracker?: boolean;
  startText?: string;
  startColor?: string;
  startSize?: number;
  startX?: number;
  startY?: number;
  showGameOverState?: boolean;
  gameOverText?: string;
  gameOverColor?: string;
  gameOverSize?: number;
  gameOverX?: number;
  gameOverY?: number;
  restartText?: string;
  restartColor?: string;
  restartSize?: number;
  restartX?: number;
  restartY?: number;
  style?: React.CSSProperties;
}

export default function NinjaRunner({
  backgroundColor = 'transparent',
  groundColor = '#FF3B30',
  groundY = 750,
  dinoFillType = 'Solid',
  dinoC1 = '#0F0F11',
  obstacleFillType = 'Solid',
  obstacleC1 = '#FF3B30',
  soundJump = true,
  soundScore = true,
  soundGameOver = true,
  showScore = true,
  scoreColor = '#0F0F11',
  scoreSize = 20,
  scoreX = 900,
  scoreY = 120,
  inputType = 'Both',
  globalClickTracker = true,
  startText = 'Press Enter / Space or Click to Jump',
  startColor = '#55555C',
  startSize = 16,
  startX = 500,
  startY = 420,
  showGameOverState = true,
  gameOverText = 'NINJA DOWN! (404)',
  gameOverColor = '#FF3B30',
  gameOverSize = 30,
  gameOverX = 500,
  gameOverY = 380,
  restartText = 'Click or Press Enter to Try Again 🥷',
  restartColor = '#55555C',
  restartSize = 15,
  restartX = 500,
  restartY = 500,
  style = {},
}: NinjaRunnerProps) {
  const [dinoY, setDinoY] = useState(0);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);

  const state = useRef({
    dinoY: 0,
    dinoV: 0,
    jumping: false,
    running: false,
    gameOver: false,
    obstacles: [] as any[],
    score: 0,
    speed: INITIAL_SPEED,
    gameWidth: GAME_WIDTH,
    gameHeight: GAME_HEIGHT,
  });

  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;
    const obs = new ResizeObserver((entries) => {
      state.current.gameWidth = entries[0].contentRect.width;
      state.current.gameHeight = entries[0].contentRect.height;
    });
    obs.observe(gameRef.current);
    return () => obs.disconnect();
  }, []);

  const lastObstacle = useRef(Date.now());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastScoreSound = useRef(0);

  const dinoBg = getBgCss(dinoFillType, dinoC1);
  const obstacleBg = getBgCss(obstacleFillType, obstacleC1);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
  };

  const playSound = useCallback(
    (freq: number, type: OscillatorType, duration: number) => {
      if (!audioCtxRef.current) return;
      try {
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    },
    []
  );

  const reset = useCallback(() => {
    const s = state.current;
    s.running = true;
    s.dinoY = 0;
    s.dinoV = JUMP_VELOCITY;
    s.obstacles = [];
    s.score = 0;
    s.speed = INITIAL_SPEED;
    s.gameOver = false;
    s.jumping = true;

    setRunning(true);
    setGameOver(false);
    setDinoY(0);
    setObstacles([]);
    setScore(0);

    lastObstacle.current = Date.now();
    lastScoreSound.current = 0;
    if (soundJump) playSound(420, 'square', 0.1);
  }, [soundJump, playSound]);

  const jump = useCallback(() => {
    const s = state.current;
    if (!s.jumping && !s.gameOver && s.running) {
      s.jumping = true;
      s.dinoV = JUMP_VELOCITY;
      if (soundJump) playSound(420, 'square', 0.1);
    }
  }, [soundJump, playSound]);

  const handleAction = useCallback(
    (e?: any, type?: string) => {
      if (inputType === 'Click Only' && type === 'key') return;
      if (inputType === 'Enter Only' && type === 'click') return;
      if (e && e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }
      initAudio();
      const s = state.current;
      if (s.gameOver || !s.running) {
        reset();
      } else {
        jump();
      }
    },
    [jump, reset, inputType]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Enter' || e.key === 'Enter' || e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        handleAction(e, 'key');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleAction]);

  useEffect(() => {
    if (!globalClickTracker) return;
    function onPointerDown(e: PointerEvent) {
      if (
        e.target &&
        typeof (e.target as HTMLElement).closest === 'function' &&
        (e.target as HTMLElement).closest('button, a, input, select, textarea, [role="button"]')
      ) {
        return;
      }
      if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          handleAction(e, 'click');
        }
      }
    }
    window.addEventListener('pointerdown', onPointerDown, true);
    return () => window.removeEventListener('pointerdown', onPointerDown, true);
  }, [handleAction, globalClickTracker]);

  useEffect(() => {
    let anim: number;
    let lastTime = performance.now();

    function loop(now: number) {
      const dt = Math.min(1, (now - lastTime) / 16.67);
      lastTime = now;
      const s = state.current;

      if (!s.running) {
        anim = requestAnimationFrame(loop);
        return;
      }

      let newY = s.dinoY + s.dinoV * dt;
      let newV = s.dinoV + GRAVITY * dt;

      if (newY >= 0 && newV > 0) {
        newY = 0;
        newV = 0;
        s.jumping = false;
      }

      s.dinoY = newY;
      s.dinoV = newV;

      s.obstacles = s.obstacles
        .filter((o) => o.x + OBSTACLE_WIDTH > -50)
        .map((o) => {
          let currentSpeed = s.speed;
          if (o.type === 'bird') {
            currentSpeed = s.speed * 1.6;
          }
          return { ...o, x: o.x - currentSpeed * dt };
        });

      if (Date.now() - lastObstacle.current > OBSTACLE_INTERVAL + getRandomInt(-400, 400)) {
        const r = Math.random();
        let type = 'double';
        if (r < 0.2) type = 'torii';
        else if (r < 0.4) type = 'kite';
        else if (r < 0.6) type = 'bird';
        else if (r < 0.8) type = 'single';

        let y = 0;
        if (type === 'bird') y = getRandomInt(10, 45);
        if (type === 'kite') y = getRandomInt(80, 100);

        const currentWidth = s.gameWidth || GAME_WIDTH;
        s.obstacles.push({ id: Math.random(), x: currentWidth, y, type });
        lastObstacle.current = Date.now();
      }

      s.score += s.speed * dt * 0.1;
      s.speed += SPEED_INCREMENT * dt;

      if (
        soundScore &&
        Math.floor(s.score / 100) > lastScoreSound.current &&
        Math.floor(s.score) > 0
      ) {
        lastScoreSound.current = Math.floor(s.score / 100);
        playSound(600, 'sine', 0.1);
      }

      const groundY_px = (s.gameHeight || GAME_HEIGHT) * (groundY / 1000);
      let dinoContainerY = groundY_px + 13 - DINO_HEIGHT + s.dinoY;

      let dinoBoxes = [
        { x: 20 + 16, y: dinoContainerY + 3, w: 14, h: 12 },
        { x: 20 + 10, y: dinoContainerY + 15, w: 24, h: 27 },
      ];

      if (s.jumping) {
        dinoBoxes = [
          { x: 20 + 16, y: dinoContainerY, w: 14, h: 14 },
          { x: 20 + 12, y: dinoContainerY + 14, w: 22, h: 22 },
        ];
      }

      let hit = false;
      for (let o of s.obstacles) {
        let oBox = { x: o.x + 4, y: groundY_px - 2 - OBSTACLE_HEIGHT + 4, w: 12, h: OBSTACLE_HEIGHT - 8 };
        if (o.type === 'single') {
          oBox = { x: o.x + 4, y: groundY_px - 2 - OBSTACLE_HEIGHT + 4, w: 12, h: OBSTACLE_HEIGHT - 8 };
        }
        if (o.type === 'double') {
          let baseY = groundY_px - 2 - OBSTACLE_HEIGHT;
          oBox = { x: o.x + 6, y: baseY + 4, w: 24, h: OBSTACLE_HEIGHT - 8 };
        }
        if (o.type === 'torii' || o.type === 'building') {
          oBox = { x: o.x + 4, y: groundY_px - 2 - 24 + 4, w: 24, h: 16 };
        }
        if (o.type === 'bird') {
          let containerY = groundY_px - 2 - (o.y || 0) - BIRD_HEIGHT;
          const isSpinning = Math.floor((o.id || 1) * 10) % 2 !== 0;
          if (isSpinning) {
            oBox = { x: o.x + 8, y: containerY + 2, w: 16, h: 16 };
          } else {
            oBox = { x: o.x + 6, y: containerY + 6, w: 20, h: 8 };
          }
        }
        if (o.type === 'kite') {
          let containerY = groundY_px - 2 - (o.y || 0) - BIRD_HEIGHT;
          oBox = { x: o.x + 8, y: containerY - 2, w: 16, h: 18 };
        }

        const oBoxes = Array.isArray(oBox) ? oBox : [oBox];
        for (let dBox of dinoBoxes) {
          for (let ob of oBoxes) {
            if (
              dBox.x < ob.x + ob.w &&
              dBox.x + dBox.w > ob.x &&
              dBox.y < ob.y + ob.h &&
              dBox.y + dBox.h > ob.y
            ) {
              hit = true;
              break;
            }
          }
          if (hit) break;
        }
      }

      setDinoY(s.dinoY);
      setObstacles([...s.obstacles]);
      setScore(s.score);

      if (hit && !s.gameOver) {
        s.gameOver = true;
        s.running = false;
        setObstacles([...s.obstacles]);
        setGameOver(true);
        setRunning(false);
        if (soundGameOver) playSound(150, 'sawtooth', 0.3);
      }

      anim = requestAnimationFrame(loop);
    }

    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [soundScore, soundGameOver, playSound, groundY]);

  const displayScore = Math.floor(score);

  return (
    <div
      ref={gameRef}
      style={{
        width: '100%',
        height: '100%',
        background: backgroundColor,
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'manipulation',
        userSelect: 'none',
        borderRadius: '16px',
        ...style,
      }}
      tabIndex={0}
    >
      <div
        onPointerDown={(e) => handleAction(e, 'click')}
        style={{ position: 'absolute', inset: 0, zIndex: 99, cursor: 'pointer' }}
      />
      {obstacles.map((o) => {
        const isSpinning = o.type === 'bird' && Math.floor((o.id || 1) * 10) % 2 !== 0;
        const isBobbing = o.type === 'kite';
        const animClass = isSpinning ? 'spinAnim' : isBobbing ? 'bobAnim' : '';
        return (
          <div
            key={o.id}
            style={{
              position: 'absolute',
              left: 0,
              top: `calc(${groundY / 10}% - ${2 + (o.y || 0)}px)`,
              transform: `translate3d(${o.x}px, 0, 0)`,
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
              {(o.type === 'torii' || o.type === 'building') && <Building bgCss={obstacleBg} />}
              {(o.type === 'bird' || o.type === 'kite') && (
                <Bird bgCss={obstacleBg} type={o.type} id={o.id} animClass={animClass} />
              )}
              {(o.type === 'single' || o.type === 'double') && (
                <Cactus bgCss={obstacleBg} type={o.type} />
              )}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 20,
          top: `calc(${groundY / 10}% + 13px)`,
          transform: `translate3d(0, ${dinoY}px, 0)`,
          zIndex: 10,
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <Dino bgCss={dinoBg} jumping={state.current.jumping} gameOver={gameOver} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${groundY / 10}%`,
          height: 2,
          background: groundColor,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spinAnim { 100% { transform: rotate(360deg); } }
            .spinAnim { animation: spinAnim 0.6s linear infinite; transform-origin: center; }
            @keyframes bobAnim { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
            .bobAnim { animation: bobAnim 2s ease-in-out infinite; }
          `,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: `${groundY / 10}%`,
          width: '100%',
          bottom: 0,
          background: backgroundColor,
          zIndex: 15,
        }}
      />

      {showScore && (
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            color: scoreColor === '#0F0F11' ? '#FFFFFF' : scoreColor,
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'monospace',
            zIndex: 40,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            background: 'rgba(255, 59, 48, 0.15)',
            border: '1px solid rgba(255, 59, 48, 0.3)',
            padding: '2px 8px',
            borderRadius: '6px',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}
        >
          SCORE {displayScore}
        </div>
      )}

      {!running && !gameOver && score === 0 && (
        <div
          style={{
            position: 'absolute',
            left: `${startX / 10}%`,
            top: `${startY / 10}%`,
            transform: `translate(-${startX / 10}%, -${startY / 10}%)`,
            color: startColor,
            fontSize: startSize,
            fontWeight: 600,
            zIndex: 30,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {startText}
        </div>
      )}

      {(gameOver || (showGameOverState && gameOver)) && (
        <>
          <div
            style={{
              position: 'absolute',
              left: `${gameOverX / 10}%`,
              top: `${gameOverY / 10}%`,
              transform: `translate(-${gameOverX / 10}%, -${gameOverY / 10}%)`,
              color: gameOverColor,
              fontSize: gameOverSize,
              fontWeight: 800,
              zIndex: 30,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {gameOverText}
          </div>
          {restartText && (
            <div
              style={{
                position: 'absolute',
                left: `${restartX / 10}%`,
                top: `calc(${gameOverY / 10}% + 45px)`,
                transform: `translate(-${restartX / 10}%, 0)`,
                color: restartColor,
                fontSize: restartSize,
                fontWeight: 600,
                zIndex: 30,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '6px 14px',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {restartText}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const Dino = memo(function Dino({
  bgCss,
  jumping,
  gameOver,
}: {
  bgCss: string;
  jumping: boolean;
  gameOver: boolean;
}) {
  let stateClass = gameOver ? 'paused' : jumping ? 'jumping' : 'running';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    @keyframes runThigh { 0% { transform: rotate(50deg); } 50% { transform: rotate(-50deg); } 100% { transform: rotate(50deg); } }
    @keyframes runCalf { 0% { transform: rotate(80deg); } 25% { transform: rotate(0deg); } 50% { transform: rotate(10deg); } 75% { transform: rotate(90deg); } 100% { transform: rotate(80deg); } }
    @keyframes flap { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-10deg) scaleX(0.9); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
    
    .thigh { transform-origin: 45px 55px; }
    .calf { transform-origin: 50px 70px; }
    .headband { transform-origin: 60px 15px; }
    
    .running .thigh1 { animation: runThigh 0.4s infinite; }
    .running .calf1 { animation: runCalf 0.4s infinite; }
    .running .thigh2 { animation: runThigh 0.4s infinite; animation-delay: -0.2s; }
    .running .calf2 { animation: runCalf 0.4s infinite; animation-delay: -0.2s; }
    .running .headband { animation: flap 0.15s infinite; }
    .running .body-group { animation: bounce 0.2s infinite; }
    
    .jumping .thigh1 { transform: rotate(-20deg); }
    .jumping .calf1 { transform: rotate(10deg); }
    .jumping .thigh2 { transform: rotate(50deg); }
    .jumping .calf2 { transform: rotate(80deg); }
    .jumping .headband { transform: rotate(-20deg); }
    .jumping .body-group { transform: translateY(-10px) rotate(15deg); transform-origin: 50px 50px; }
  </style>

  <g class="${stateClass}">
      <g class="body-group">
        <path d="M 55 35 Q 25 30 10 15" stroke="black" stroke-width="7" stroke-linecap="round" fill="none" />
      </g>
      
      <g class="thigh thigh2">
         <path d="M 45 55 L 50 70" stroke="black" stroke-width="9" stroke-linecap="round" />
         <g class="calf calf2">
            <path d="M 50 70 L 45 85 L 55 85" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
         </g>
      </g>
      
      <g class="body-group">
          <path d="M 60 30 L 45 55" stroke="black" stroke-width="14" stroke-linecap="round" />
          <path fill-rule="evenodd" fill="black" d="M 55 15 A 10 10 0 1 0 75 15 A 10 10 0 1 0 55 15 Z M 63 12 L 75 12 L 73 16 L 61 16 Z" />
          
          <g class="headband">
             <path d="M 60 15 Q 30 10 15 20 Q 35 25 60 19 Z" fill="black" />
          </g>
          
          <path d="M 55 35 L 75 40" stroke="black" stroke-width="8" stroke-linecap="round" />
      </g>

      <g class="thigh thigh1">
         <path d="M 45 55 L 50 70" stroke="black" stroke-width="9" stroke-linecap="round" />
         <g class="calf calf1">
            <path d="M 50 70 L 45 85 L 55 85" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
         </g>
      </g>
  </g>
</svg>`;
  return (
    <div
      style={{
        width: DINO_WIDTH,
        height: DINO_HEIGHT,
        background: bgCss,
        WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
      }}
    />
  );
});

const Cactus = memo(function Cactus({ bgCss, type }: { bgCss: string; type: string }) {
  const w = OBSTACLE_WIDTH * (type === 'double' ? 2 : 1);
  const isDouble = type === 'double';
  const svg = isDouble
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 33"><rect fill="black" x="2" y="28" width="11" height="5"/><rect fill="black" x="5" y="20" width="5" height="8"/><rect fill="black" x="1" y="17" width="13" height="3"/><rect fill="black" x="3" y="9" width="9" height="8"/><rect fill="black" x="0" y="5" width="15" height="4"/><rect fill="black" x="4" y="2" width="7" height="3"/><rect fill="black" x="6" y="0" width="3" height="2"/><rect fill="black" x="17" y="28" width="11" height="5"/><rect fill="black" x="20" y="20" width="5" height="8"/><rect fill="black" x="16" y="17" width="13" height="3"/><rect fill="black" x="18" y="9" width="9" height="8"/><rect fill="black" x="15" y="5" width="15" height="4"/><rect fill="black" x="19" y="2" width="7" height="3"/><rect fill="black" x="21" y="0" width="3" height="2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 33"><rect fill="black" x="2" y="28" width="11" height="5"/><rect fill="black" x="5" y="20" width="5" height="8"/><rect fill="black" x="1" y="17" width="13" height="3"/><rect fill="black" x="3" y="9" width="9" height="8"/><rect fill="black" x="0" y="5" width="15" height="4"/><rect fill="black" x="4" y="2" width="7" height="3"/><rect fill="black" x="6" y="0" width="3" height="2"/></svg>`;
  return (
    <div
      style={{
        width: w,
        height: OBSTACLE_HEIGHT,
        background: bgCss,
        WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'bottom',
      }}
    />
  );
});

const Building = memo(function Building({ bgCss }: { bgCss: string }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 45"><rect fill="black" x="0" y="5" width="60" height="5"/><rect fill="black" x="5" y="0" width="50" height="5"/><rect fill="black" x="5" y="15" width="50" height="4"/><rect fill="black" x="12" y="5" width="6" height="40"/><rect fill="black" x="42" y="5" width="6" height="40"/><rect fill="black" x="28" y="10" width="4" height="5"/></svg>`;
  return (
    <div
      style={{
        width: BUILDING_WIDTH,
        height: BUILDING_HEIGHT,
        background: bgCss,
        WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'bottom',
      }}
    />
  );
});

const Bird = memo(function Bird({
  bgCss,
  type,
  id,
  animClass,
}: {
  bgCss: string;
  type: string;
  id: number;
  animClass: string;
}) {
  const isKunai = Math.floor((id || 1) * 10) % 2 === 0;
  let svg = '';
  if (type === 'kite') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 32"><polygon fill="black" points="20,2 6,16 20,30 34,16" /><path d="M 34 16 Q 38 10 40 16 T 42 20" stroke="black" stroke-width="2" fill="none"/><path d="M 20 30 Q 25 32 25 28 T 30 30" stroke="black" stroke-width="2" fill="none"/></svg>`;
  } else {
    svg = isKunai
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 32"><path fill="black" fill-rule="evenodd" d="M 36 12 A 4 4 0 1 0 36 20 A 4 4 0 1 0 36 12 Z M 36 14 A 2 2 0 1 1 36 18 A 2 2 0 1 1 36 14 Z"/><rect fill="black" x="24" y="14" width="8" height="4"/><rect fill="black" x="22" y="10" width="2" height="12"/><polygon fill="black" points="22,12 2,16 22,20"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 32"><path fill="black" fill-rule="evenodd" d="M 21 6 L 24 16 L 34 19 L 24 22 L 21 32 L 18 22 L 8 19 L 18 16 Z M 21 16 A 3 3 0 1 0 21 22 A 3 3 0 1 0 21 16 Z"/></svg>`;
  }
  return (
    <div
      className={animClass || ''}
      style={{
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT,
        background: bgCss,
        WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  );
});

