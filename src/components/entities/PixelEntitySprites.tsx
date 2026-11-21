import React from 'react';

interface SpriteProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

// -------------------------------------------------------------
// 1. PLAYER SKINS (Authentic Pixel Orthographic Renders)
// -------------------------------------------------------------

export const PixelSteveSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head & Hair */}
    <rect x="4" y="1" width="8" height="8" fill="#d4a373" />
    <rect x="4" y="1" width="8" height="2" fill="#3d2314" />
    <rect x="4" y="3" width="2" height="3" fill="#3d2314" />
    <rect x="10" y="3" width="2" height="3" fill="#3d2314" />
    {/* Eyes & Mouth */}
    <rect x="5" y="5" width="2" height="1" fill="#2563eb" />
    <rect x="9" y="5" width="2" height="1" fill="#2563eb" />
    <rect x="7" y="6" width="2" height="1" fill="#8c5838" />
    <rect x="6" y="7" width="4" height="1" fill="#522f18" />
    {/* Torso (Cyan Shirt) */}
    <rect x="4" y="9" width="8" height="7" fill="#0891b2" />
    {/* Arms */}
    <rect x="1" y="9" width="3" height="3" fill="#0891b2" />
    <rect x="1" y="12" width="3" height="4" fill="#d4a373" />
    <rect x="12" y="9" width="3" height="3" fill="#0891b2" />
    <rect x="12" y="12" width="3" height="4" fill="#d4a373" />
    {/* Legs (Blue Jeans & Gray Shoes) */}
    <rect x="4" y="16" width="4" height="6" fill="#1e3a8a" />
    <rect x="8" y="16" width="4" height="6" fill="#1e3a8a" />
    <rect x="4" y="22" width="4" height="2" fill="#334155" />
    <rect x="8" y="22" width="4" height="2" fill="#334155" />
  </svg>
);

export const PixelAlexSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head & Ginger Hair */}
    <rect x="4" y="1" width="8" height="8" fill="#e0a98b" />
    <rect x="4" y="1" width="8" height="3" fill="#b45309" />
    <rect x="4" y="4" width="2" height="4" fill="#b45309" />
    <rect x="10" y="4" width="2" height="6" fill="#b45309" />
    {/* Eyes */}
    <rect x="5" y="5" width="2" height="1" fill="#0284c7" />
    <rect x="9" y="5" width="2" height="1" fill="#0284c7" />
    {/* Green Tunic */}
    <rect x="4" y="9" width="8" height="8" fill="#4d7c0f" />
    <rect x="4" y="16" width="8" height="1" fill="#3f6212" />
    {/* Slim Arms */}
    <rect x="2" y="9" width="2" height="3" fill="#4d7c0f" />
    <rect x="2" y="12" width="2" height="4" fill="#e0a98b" />
    <rect x="12" y="9" width="2" height="3" fill="#4d7c0f" />
    <rect x="12" y="12" width="2" height="4" fill="#e0a98b" />
    {/* Brown Pants & Boots */}
    <rect x="4" y="17" width="4" height="5" fill="#78350f" />
    <rect x="8" y="17" width="4" height="5" fill="#78350f" />
    <rect x="4" y="22" width="4" height="2" fill="#451a03" />
    <rect x="8" y="22" width="4" height="2" fill="#451a03" />
  </svg>
);

export const PixelDiamondKnightSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Diamond Helmet */}
    <rect x="3" y="0" width="10" height="9" fill="#38bdf8" />
    <rect x="4" y="4" width="8" height="2" fill="#0f172a" />
    <rect x="6" y="4" width="1" height="2" fill="#55ffff" />
    <rect x="9" y="4" width="1" height="2" fill="#55ffff" />
    {/* Diamond Chestplate */}
    <rect x="3" y="9" width="10" height="8" fill="#0284c7" />
    <rect x="5" y="10" width="6" height="5" fill="#38bdf8" />
    {/* Plated Arms */}
    <rect x="1" y="9" width="2" height="7" fill="#0284c7" />
    <rect x="13" y="9" width="2" height="7" fill="#0284c7" />
    {/* Diamond Leggings & Boots */}
    <rect x="4" y="17" width="4" height="5" fill="#0369a1" />
    <rect x="8" y="17" width="4" height="5" fill="#0369a1" />
    <rect x="3" y="22" width="5" height="2" fill="#38bdf8" />
    <rect x="8" y="22" width="5" height="2" fill="#38bdf8" />
  </svg>
);

export const PixelNetheritePaladinSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Netherite Helmet */}
    <rect x="3" y="0" width="10" height="9" fill="#334155" />
    <rect x="2" y="1" width="1" height="4" fill="#64748b" />
    <rect x="13" y="1" width="1" height="4" fill="#64748b" />
    <rect x="4" y="4" width="8" height="2" fill="#090d16" />
    <rect x="6" y="4" width="1" height="2" fill="#f97316" />
    <rect x="9" y="4" width="1" height="2" fill="#f97316" />
    {/* Netherite Chestplate */}
    <rect x="3" y="9" width="10" height="8" fill="#1e293b" />
    <rect x="6" y="11" width="4" height="4" fill="#475569" />
    {/* Arms */}
    <rect x="1" y="9" width="2" height="7" fill="#334155" />
    <rect x="13" y="9" width="2" height="7" fill="#334155" />
    {/* Leggings & Boots */}
    <rect x="4" y="17" width="4" height="5" fill="#0f172a" />
    <rect x="8" y="17" width="4" height="5" fill="#0f172a" />
    <rect x="3" y="22" width="5" height="2" fill="#334155" />
    <rect x="8" y="22" width="5" height="2" fill="#334155" />
  </svg>
);

export const PixelRedstoneEngineerSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head & Goggles */}
    <rect x="4" y="1" width="8" height="8" fill="#d4a373" />
    <rect x="4" y="1" width="8" height="3" fill="#3d2314" />
    {/* Brass Goggles with Red Glow */}
    <rect x="3" y="3" width="10" height="2" fill="#78350f" />
    <rect x="5" y="3" width="2" height="2" fill="#ef4444" />
    <rect x="9" y="3" width="2" height="2" fill="#ef4444" />
    {/* Apron & Tunic */}
    <rect x="4" y="9" width="8" height="7" fill="#b45309" />
    <rect x="5" y="11" width="6" height="5" fill="#78350f" />
    {/* Arms (holding redstone torch) */}
    <rect x="1" y="9" width="3" height="7" fill="#d4a373" />
    <rect x="12" y="9" width="3" height="7" fill="#d4a373" />
    <rect x="13" y="13" width="2" height="3" fill="#78350f" />
    <rect x="13" y="11" width="2" height="2" fill="#ef4444" />
    {/* Legs */}
    <rect x="4" y="16" width="4" height="6" fill="#1e293b" />
    <rect x="8" y="16" width="4" height="6" fill="#1e293b" />
    <rect x="4" y="22" width="4" height="2" fill="#0f172a" />
    <rect x="8" y="22" width="4" height="2" fill="#0f172a" />
  </svg>
);

// -------------------------------------------------------------
// 2. ICONIC MOBS (Authentic Pixel Vector Sprites)
// -------------------------------------------------------------

export const PixelCreeperSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Creeper Head */}
    <rect x="4" y="1" width="8" height="8" fill="#22c55e" />
    {/* Mottled Pixel Variation */}
    <rect x="5" y="2" width="2" height="2" fill="#16a34a" />
    <rect x="9" y="6" width="2" height="2" fill="#15803d" />
    {/* Eyes */}
    <rect x="5" y="4" width="2" height="2" fill="#052e16" />
    <rect x="9" y="4" width="2" height="2" fill="#052e16" />
    {/* Nose & Mouth */}
    <rect x="7" y="6" width="2" height="2" fill="#052e16" />
    <rect x="6" y="8" width="4" height="1" fill="#052e16" />
    <rect x="6" y="7" width="1" height="2" fill="#052e16" />
    <rect x="9" y="7" width="1" height="2" fill="#052e16" />
    {/* Body */}
    <rect x="5" y="9" width="6" height="9" fill="#16a34a" />
    <rect x="6" y="11" width="2" height="3" fill="#22c55e" />
    {/* 4 Feet */}
    <rect x="4" y="18" width="4" height="5" fill="#15803d" />
    <rect x="8" y="18" width="4" height="5" fill="#15803d" />
  </svg>
);

export const PixelAllaySprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-125 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Translucent Wings */}
    <rect x="1" y="4" width="5" height="5" fill="#bae6fd" opacity="0.75" />
    <rect x="10" y="4" width="5" height="5" fill="#bae6fd" opacity="0.75" />
    {/* Cute Head */}
    <rect x="5" y="3" width="6" height="5" fill="#38bdf8" />
    {/* Big Indigo Eyes */}
    <rect x="6" y="5" width="1" height="2" fill="#1e3a8a" />
    <rect x="9" y="5" width="1" height="2" fill="#1e3a8a" />
    {/* Torso & Little Robe */}
    <rect x="6" y="8" width="4" height="4" fill="#0284c7" />
    <rect x="5" y="9" width="1" height="2" fill="#38bdf8" />
    <rect x="10" y="9" width="1" height="2" fill="#38bdf8" />
  </svg>
);

export const PixelBeeSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.2}
    height={size}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-125 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Antennae */}
    <rect x="4" y="1" width="1" height="3" fill="#292524" />
    <rect x="7" y="1" width="1" height="3" fill="#292524" />
    {/* Translucent Wings */}
    <rect x="2" y="3" width="5" height="2" fill="#bae6fd" opacity="0.8" />
    <rect x="9" y="3" width="5" height="2" fill="#bae6fd" opacity="0.8" />
    {/* Yellow & Brown Striped Body */}
    <rect x="3" y="4" width="12" height="9" fill="#eab308" />
    <rect x="7" y="4" width="3" height="9" fill="#451a03" />
    <rect x="12" y="4" width="2" height="9" fill="#451a03" />
    {/* Cyan Eyes */}
    <rect x="4" y="6" width="2" height="2" fill="#38bdf8" />
    <rect x="4" y="8" width="2" height="1" fill="#0284c7" />
    {/* Stinger */}
    <rect x="15" y="8" width="1" height="2" fill="#1c1917" />
  </svg>
);

export const PixelWolfSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.3}
    height={size}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Ears */}
    <rect x="3" y="1" width="2" height="2" fill="#cbd5e1" />
    <rect x="7" y="1" width="2" height="2" fill="#cbd5e1" />
    {/* Head & Snout */}
    <rect x="3" y="3" width="6" height="5" fill="#e2e8f0" />
    <rect x="1" y="5" width="2" height="3" fill="#cbd5e1" />
    <rect x="1" y="5" width="1" height="1" fill="#0f172a" />
    {/* Eyes */}
    <rect x="5" y="4" width="1" height="1" fill="#0f172a" />
    {/* Red Tamed Collar */}
    <rect x="8" y="4" width="2" height="4" fill="#dc2626" />
    {/* Body */}
    <rect x="9" y="4" width="8" height="6" fill="#e2e8f0" />
    {/* Wagging Tail */}
    <rect x="17" y="3" width="2" height="4" fill="#cbd5e1" />
    {/* 4 Legs */}
    <rect x="3" y="10" width="2" height="5" fill="#cbd5e1" />
    <rect x="6" y="10" width="2" height="5" fill="#cbd5e1" />
    <rect x="13" y="10" width="2" height="5" fill="#cbd5e1" />
    <rect x="16" y="10" width="2" height="5" fill="#cbd5e1" />
  </svg>
);

export const PixelPigSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.3}
    height={size}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head & Snout */}
    <rect x="2" y="3" width="6" height="6" fill="#f472b6" />
    <rect x="1" y="6" width="3" height="2" fill="#ec4899" />
    <rect x="1" y="6" width="1" height="1" fill="#9d174d" />
    <rect x="1" y="7" width="1" height="1" fill="#9d174d" />
    {/* Eyes */}
    <rect x="4" y="4" width="1" height="1" fill="#0f172a" />
    {/* Torso */}
    <rect x="7" y="3" width="10" height="7" fill="#f472b6" />
    {/* Legs */}
    <rect x="3" y="10" width="2" height="5" fill="#ec4899" />
    <rect x="6" y="10" width="2" height="5" fill="#ec4899" />
    <rect x="12" y="10" width="2" height="5" fill="#ec4899" />
    <rect x="15" y="10" width="2" height="5" fill="#ec4899" />
  </svg>
);

export const PixelSheepSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.3}
    height={size}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head */}
    <rect x="2" y="3" width="4" height="5" fill="#d4a373" />
    <rect x="3" y="4" width="1" height="1" fill="#0f172a" />
    {/* Fluffy White Wool */}
    <rect x="5" y="2" width="12" height="9" fill="#f8fafc" />
    <rect x="6" y="1" width="10" height="1" fill="#f1f5f9" />
    <rect x="1" y="2" width="3" height="2" fill="#f8fafc" />
    {/* Legs */}
    <rect x="3" y="10" width="2" height="5" fill="#d4a373" />
    <rect x="6" y="11" width="2" height="4" fill="#d4a373" />
    <rect x="12" y="11" width="2" height="4" fill="#d4a373" />
    <rect x="15" y="11" width="2" height="4" fill="#d4a373" />
  </svg>
);

export const PixelAxolotlSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.4}
    height={size}
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* External Gills (Dark Pink) */}
    <rect x="1" y="3" width="2" height="3" fill="#ec4899" />
    <rect x="7" y="3" width="2" height="3" fill="#ec4899" />
    {/* Head */}
    <rect x="2" y="5" width="6" height="4" fill="#f472b6" />
    <rect x="3" y="6" width="1" height="1" fill="#1e1b4b" />
    <rect x="6" y="6" width="1" height="1" fill="#1e1b4b" />
    {/* Body */}
    <rect x="8" y="6" width="7" height="3" fill="#f472b6" />
    {/* Undulating Tail */}
    <rect x="15" y="5" width="6" height="3" fill="#ec4899" />
    {/* Tiny Feet */}
    <rect x="7" y="9" width="2" height="2" fill="#f472b6" />
    <rect x="13" y="9" width="2" height="2" fill="#f472b6" />
  </svg>
);

export const PixelIronGolemSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size * 1.2}
    height={size * 1.5}
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Heavy Stone Head & Snout */}
    <rect x="7" y="1" width="6" height="6" fill="#e2e8f0" />
    <rect x="9" y="4" width="2" height="2" fill="#cbd5e1" />
    <rect x="8" y="3" width="1" height="1" fill="#dc2626" />
    <rect x="11" y="3" width="1" height="1" fill="#dc2626" />
    {/* Massive Shoulders & Torso */}
    <rect x="4" y="7" width="12" height="8" fill="#cbd5e1" />
    <rect x="6" y="9" width="4" height="2" fill="#22c55e" /> {/* Vine */}
    {/* Elongated Arms */}
    <rect x="1" y="7" width="3" height="12" fill="#94a3b8" />
    <rect x="16" y="7" width="3" height="12" fill="#94a3b8" />
    {/* Red Poppy in hand */}
    <rect x="17" y="16" width="2" height="2" fill="#ef4444" />
    {/* Sturdy Legs */}
    <rect x="6" y="15" width="3" height="8" fill="#94a3b8" />
    <rect x="11" y="15" width="3" height="8" fill="#94a3b8" />
  </svg>
);

export const PixelEndermanSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.8}
    viewBox="0 0 16 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Head */}
    <rect x="5" y="1" width="6" height="6" fill="#090d16" />
    {/* Glowing Purple Eyes */}
    <rect x="6" y="3" width="1" height="1" fill="#c084fc" />
    <rect x="9" y="3" width="1" height="1" fill="#c084fc" />
    {/* Slender Torso */}
    <rect x="6" y="7" width="4" height="7" fill="#0f172a" />
    {/* Long Thin Arms */}
    <rect x="4" y="7" width="1" height="14" fill="#090d16" />
    <rect x="11" y="7" width="1" height="14" fill="#090d16" />
    {/* Long Legs */}
    <rect x="6" y="14" width="1" height="13" fill="#090d16" />
    <rect x="9" y="14" width="1" height="13" fill="#090d16" />
  </svg>
);

export const PixelSlimeSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Translucent Gel Outer Cube */}
    <rect x="2" y="3" width="12" height="11" fill="#4ade80" fillOpacity="0.85" />
    <rect x="3" y="2" width="10" height="1" fill="#86efac" />
    <rect x="2" y="3" width="1" height="11" fill="#86efac" />
    {/* Inner Nucleus Core */}
    <rect x="4" y="5" width="8" height="7" fill="#16a34a" />
    {/* Slime Face */}
    <rect x="4" y="6" width="2" height="2" fill="#14532d" />
    <rect x="10" y="6" width="2" height="2" fill="#14532d" />
    <rect x="7" y="10" width="2" height="1" fill="#14532d" />
  </svg>
);

export const PixelClericSprite: React.FC<SpriteProps> = ({ size = 32, className = '', animate = false }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pixelated ${animate ? 'hover:scale-110 transition-transform duration-200' : ''} ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Cleric Villager Hood & Big Nose */}
    <rect x="4" y="1" width="8" height="8" fill="#d4a373" />
    <rect x="3" y="1" width="10" height="3" fill="#9333ea" />
    <rect x="3" y="3" width="2" height="6" fill="#9333ea" />
    <rect x="11" y="3" width="2" height="6" fill="#9333ea" />
    {/* Villager Emerald Green Eyes */}
    <rect x="5" y="4" width="1" height="2" fill="#22c55e" />
    <rect x="9" y="4" width="1" height="2" fill="#22c55e" />
    {/* Iconic Villager Nose */}
    <rect x="7" y="5" width="2" height="4" fill="#c48a56" />
    {/* Purple Cleric Robe with Gold Trim */}
    <rect x="4" y="9" width="8" height="12" fill="#9333ea" />
    <rect x="7" y="9" width="2" height="12" fill="#fbbf24" />
    {/* Folded Arms */}
    <rect x="3" y="10" width="10" height="3" fill="#7e22ce" />
    {/* Shoes */}
    <rect x="5" y="21" width="3" height="2" fill="#3d2314" />
    <rect x="8" y="21" width="3" height="2" fill="#3d2314" />
  </svg>
);

