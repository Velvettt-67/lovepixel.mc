import React, { useEffect, useRef, useState } from 'react';
import { RenderScatterItem, type ItemType } from './ScatterItemIcons';

interface ScatterItemState {
  id: number;
  type: ItemType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  scale: number;
  groundY: number;
  bounces: number;
  isGrounded: boolean;
  opacity: number;
}

interface ExplosionPuff {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  color: string;
  rot: number;
  opacity: number;
}

interface ItemScatterSystemProps {
  isActive: boolean; // Trigger explosion & scatter
  onExplosionPeak?: () => void;
  clearingCenter?: boolean;
}

const ITEMS_LIST: ItemType[] = [
  'diamond',
  'netherite_sword',
  'emerald',
  'netherite_armor',
  'diamond_pickaxe',
  'gold_ingot',
  'ender_pearl',
  'xp_orb',
  'redstone',
  'diamond',
  'grass_block',
  'iron_ingot',
  'enchanted_book',
  'emerald',
  'netherite_sword',
  'xp_orb',
];

export const ItemScatterSystem: React.FC<ItemScatterSystemProps> = ({
  isActive,
  onExplosionPeak,
  clearingCenter = false,
}) => {
  const [items, setItems] = useState<ScatterItemState[]>([]);
  const [puffs, setPuffs] = useState<ExplosionPuff[]>([]);
  const [flashIntensity, setFlashIntensity] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const itemsRef = useRef<ScatterItemState[]>([]);
  const puffsRef = useRef<ExplosionPuff[]>([]);
  const hasTriggeredPeakRef = useRef(false);

  // Initialize particles when explosion triggers
  useEffect(() => {
    if (!isActive) {
      return;
    }

    // 1. Initial white explosion flash
    let flashTimer: number | null = null;
    const flashRaf = requestAnimationFrame(() => {
      setFlashIntensity(1);
      flashTimer = window.setTimeout(() => {
        setFlashIntensity(0);
      }, 180);
    });

    // 2. Generate Minecraft blocky smoke puffs
    const newPuffs: ExplosionPuff[] = [];
    const puffColors = ['#ffffff', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a'];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 120 + Math.random() * 260;
      newPuffs.push({
        id: i,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60, // Slight upward bias
        size: 24 + Math.random() * 20,
        maxSize: 64 + Math.random() * 48,
        color: puffColors[i % puffColors.length],
        rot: Math.random() * 360,
        opacity: 0.95,
      });
    }
    puffsRef.current = newPuffs;

    // 3. Generate 16 authentic scattering Minecraft items
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    const speedMult = isSmallScreen ? 0.55 : 1.0;

    const newItems: ScatterItemState[] = ITEMS_LIST.map((type, idx) => {
      // Radial spread: items fly outwards left and right, leaving the center clear
      const isLeft = idx % 2 === 0;
      const spreadAngle = isLeft
        ? -Math.PI * 0.75 + (idx / ITEMS_LIST.length) * (Math.PI * 0.6)
        : -Math.PI * 0.25 - (idx / ITEMS_LIST.length) * (Math.PI * 0.6);

      const speed = (280 + Math.random() * 340) * speedMult;
      // Vary the ground landing plane
      const groundY = isSmallScreen
        ? 150 + Math.random() * 100
        : 130 + Math.random() * 120;

      return {
        id: idx,
        type,
        x: 0,
        y: 0,
        vx: Math.cos(spreadAngle) * speed,
        vy: (Math.sin(spreadAngle) * speed - 180) * (isSmallScreen ? 0.75 : 1.0), // initial upward blast impulse
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 720, // Believable angular momentum
        scale: isSmallScreen ? 0.75 + Math.random() * 0.2 : 0.9 + Math.random() * 0.25,
        groundY,
        bounces: 2,
        isGrounded: false,
        opacity: 1,
      };
    });

    itemsRef.current = newItems;

    lastTimeRef.current = performance.now();

    // 4. Physics animation loop
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const gravity = 850; // px/s^2

      // Update Smoke Puffs
      const nextPuffs = puffsRef.current
        .map(puff => {
          const nextSize = Math.min(puff.maxSize, puff.size + dt * 110);
          const nextX = puff.x + puff.vx * dt;
          const nextY = puff.y + puff.vy * dt;
          const nextOpacity = Math.max(0, puff.opacity - dt * 1.1);
          return {
            ...puff,
            x: nextX,
            y: nextY,
            size: nextSize,
            opacity: nextOpacity,
          };
        })
        .filter(puff => puff.opacity > 0.02);

      puffsRef.current = nextPuffs;
      setPuffs(nextPuffs);

      // Trigger explosion peak callback when puffs expand and items reach apex (~0.3s)
      if (!hasTriggeredPeakRef.current && onExplosionPeak) {
        hasTriggeredPeakRef.current = true;
        onExplosionPeak();
      }

      // Update Items Physics
      const nextItems = itemsRef.current.map(item => {
        if (item.isGrounded) {
          // Gently push grounded items outwards if center clearing is active
          let curX = item.x;
          if (clearingCenter && Math.abs(curX) < 180) {
            curX += (curX >= 0 ? 1 : -1) * dt * 80;
          }
          return { ...item, x: curX };
        }

        let newX = item.x + item.vx * dt;
        let newY = item.y + item.vy * dt;
        let newVy = item.vy + gravity * dt;
        let newVx = item.vx * (1 - dt * 0.4); // Air drag
        let newRot = item.rot + item.vRot * dt;
        let newVrot = item.vRot * (1 - dt * 0.8);
        let newBounces = item.bounces;
        let isGrounded = false;

        // Ground collision & subtle bounce (matching Pin 2 reference)
        if (newY >= item.groundY) {
          newY = item.groundY;
          if (newBounces > 0 && Math.abs(newVy) > 60) {
            newVy = -newVy * 0.38; // Restitution bounce
            newVx *= 0.6;
            newBounces -= 1;
          } else {
            newVy = 0;
            newVx = 0;
            newVrot = 0;
            isGrounded = true;
          }
        }

        return {
          ...item,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rot: newRot,
          vRot: newVrot,
          bounces: newBounces,
          isGrounded,
        };
      });

      itemsRef.current = nextItems;
      setItems(nextItems);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(flashRaf);
      if (flashTimer) clearTimeout(flashTimer);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, clearingCenter, onExplosionPeak]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20">
      {/* 1. Impact Flash Effect */}
      {flashIntensity > 0 && (
        <div
          className="absolute inset-0 bg-white mix-blend-screen transition-opacity duration-150 pointer-events-none"
          style={{ opacity: flashIntensity * 0.85 }}
        />
      )}

      {/* 2. Minecraft Blocky Smoke Clouds */}
      {puffs.map(puff => (
        <div
          key={puff.id}
          className="absolute select-none pointer-events-none"
          style={{
            transform: `translate(${puff.x}px, ${puff.y}px) rotate(${puff.rot}deg)`,
            width: `${puff.size}px`,
            height: `${puff.size}px`,
            backgroundColor: puff.color,
            opacity: puff.opacity,
            boxShadow: `0 0 10px ${puff.color}`,
            borderRadius: '2px', // authentic blocky pixel edges
          }}
        />
      ))}

      {/* 3. Scattering Physics Items with Ground Drop Shadows (as seen in Pin 2) */}
      {items.map(item => {
        // Calculate ground shadow size and darkness based on height above ground
        const heightAboveGround = Math.max(0, item.groundY - item.y);
        const shadowScale = Math.max(0.3, 1 - heightAboveGround / 240);
        const shadowOpacity = Math.max(0.1, 0.6 - heightAboveGround / 300);

        return (
          <React.Fragment key={item.id}>
            {/* Ground Contact Drop Shadow (Pin 2 signature detail) */}
            <div
              className="absolute pointer-events-none"
              style={{
                transform: `translate(${item.x}px, ${item.groundY + 14}px) scale(${shadowScale})`,
                width: '32px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                opacity: shadowOpacity,
                filter: 'blur(2px)',
              }}
            />

            {/* Flying / Settled Minecraft Item */}
            <div
              className="absolute pointer-events-none flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{
                transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg) scale(${item.scale})`,
                opacity: item.opacity,
              }}
            >
              <RenderScatterItem type={item.type} size={30} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
