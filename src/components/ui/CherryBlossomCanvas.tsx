import React, { useEffect, useRef } from 'react';

// Authentic Minecraft Cherry Grove pixel-art petal sprite definitions
// 0 = transparent, 1 = deep contour pink, 2 = vibrant blossom pink, 3 = pale sakura glint
const SPRITE_SHAPES = [
  // 4x4 Quad Cherry Petal Cluster
  {
    cols: 4,
    rows: 4,
    data: [
      [0, 1, 1, 0],
      [1, 2, 3, 1],
      [1, 3, 2, 1],
      [0, 1, 1, 0],
    ],
  },
  // 3x3 Stepped Petal Pair
  {
    cols: 3,
    rows: 3,
    data: [
      [1, 1, 0],
      [1, 2, 1],
      [0, 1, 1],
    ],
  },
  // 2x3 Falling Blossom Petal
  {
    cols: 2,
    rows: 3,
    data: [
      [1, 1],
      [2, 3],
      [1, 1],
    ],
  },
];

interface PixelPetal {
  x: number;
  y: number;
  pixelScale: number; // Integer scale of each blocky pixel (2, 3, or 4px)
  spriteIndex: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  swayFreq: number;
  swayAmp: number;
  swayOffset: number;
  palette: {
    contour: string;
    fill: string;
    glint: string;
  };
}

const PALETTES = [
  { contour: '#db2777', fill: '#f472b6', glint: '#fce7f3' }, // Classic Cherry Grove
  { contour: '#e11d48', fill: '#fb7185', glint: '#ffe4e6' }, // Warm Sakura Coral
  { contour: '#c026d3', fill: '#e879f9', glint: '#fae8ff' }, // Mystic Blossom Orchid
  { contour: '#be185d', fill: '#f9a8d4', glint: '#ffffff' }, // Pale Daylight Petal
];

export const CherryBlossomCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Honor accessibility reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Disable image smoothing for crisp pixel edges
    ctx.imageSmoothingEnabled = false;

    const isMobile = width < 768;
    const PETAL_COUNT = isMobile ? 18 : 36;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
      }
    };

    window.addEventListener('resize', handleResize);

    // Initialize distinctly pixelated petals distributed across viewport
    const petals: PixelPetal[] = Array.from({ length: PETAL_COUNT }, () => {
      const isForeground = Math.random() > 0.45;
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const spriteIndex = Math.floor(Math.random() * SPRITE_SHAPES.length);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        pixelScale: isForeground ? 3 : 2, // 2-3px blocky pixel size
        spriteIndex,
        speedY: isForeground ? 0.7 + Math.random() * 0.8 : 0.4 + Math.random() * 0.5,
        speedX: -0.25 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.015 + Math.random() * 0.025,
        opacity: isForeground ? 0.85 : 0.45,
        swayFreq: 0.0012 + Math.random() * 0.0018,
        swayAmp: 1.0 + Math.random() * 1.8,
        swayOffset: Math.random() * Math.PI * 2,
        palette,
      };
    });

    let lastTime = performance.now();

    const drawPixelPetal = (
      p: PixelPetal,
      context: CanvasRenderingContext2D,
      curX: number,
      curY: number
    ) => {
      const sprite = SPRITE_SHAPES[p.spriteIndex];
      const px = p.pixelScale;
      const totalW = sprite.cols * px;
      const totalH = sprite.rows * px;

      context.save();
      // Snap translation to nearest pixel to keep pixel edges sharp
      context.translate(Math.round(curX), Math.round(curY));
      context.rotate(p.rotation);

      // 3D tumbling scale flip
      const flipScale = Math.max(0.2, Math.abs(Math.cos(p.flip)));
      context.scale(1, flipScale);

      context.globalAlpha = p.opacity;

      const offsetX = -Math.round(totalW / 2);
      const offsetY = -Math.round(totalH / 2);

      // Draw each square pixel block
      for (let r = 0; r < sprite.rows; r++) {
        for (let c = 0; c < sprite.cols; c++) {
          const val = sprite.data[r][c];
          if (val === 0) continue;

          if (val === 1) {
            context.fillStyle = p.palette.contour;
          } else if (val === 2) {
            context.fillStyle = p.palette.fill;
          } else {
            context.fillStyle = p.palette.glint;
          }

          context.fillRect(
            offsetX + c * px,
            offsetY + r * px,
            px,
            px
          );
        }
      }

      context.restore();
    };

    const animate = (time: number) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Horizontal sinusoidal sway
        const sway = Math.sin(time * p.swayFreq + p.swayOffset) * p.swayAmp;
        p.x += (p.speedX + sway) * (delta / 16.6);
        p.y += p.speedY * (delta / 16.6);

        p.rotation += p.rotSpeed * (delta / 16.6);
        p.flip += p.flipSpeed * (delta / 16.6);

        // Respawn wrap-around
        if (p.y > height + 25) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        drawPixelPetal(p, ctx, p.x, p.y);
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTime = performance.now();
        animationId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] select-none"
      aria-hidden="true"
    />
  );
};
