import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Pixel-art Minecraft Shield Icon
 * Authentic defensive shield with oak face, iron rim, and reinforced cross boss
 */
export const McShield: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Dark Oak Shield Outer Silhouette */}
    <path
      d="M4 2h16v10c0 4.5-3.5 7.5-8 10-4.5-2.5-8-5.5-8-10V2z"
      fill="#382212"
    />
    {/* Iron Reinforced Outer Rim */}
    <path
      d="M5 3h14v8.5c0 4-3.2 6.5-7 8.8C8.2 18 5 15.5 5 11.5V3z"
      fill="#71717a"
    />
    {/* Oak Planks Shield Face */}
    <path
      d="M7 5h10v6c0 3-2.5 5-5 6.8C9.5 16 7 14 7 11V5z"
      fill="#92400e"
    />
    {/* Iron Cross Boss */}
    <rect x="11" y="5" width="2" height="12" fill="#e4e4e7" />
    <rect x="7" y="9" width="10" height="2" fill="#e4e4e7" />
    {/* Center Iron Rivet */}
    <rect x="10.5" y="8.5" width="3" height="3" fill="#ffffff" />
    {/* Top Rim Specular Glint */}
    <rect x="5" y="3" width="14" height="1" fill="#f4f4f5" />
    <rect x="5" y="4" width="1" height="8" fill="#d4d4d8" />
  </svg>
);

/**
 * Pixel-art Minecraft Redstone Repeater & Dust Icon
 * Glowing redstone circuitry, stone slab, and redstone torch
 */
export const McRedstone: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Smooth Stone Base Plate */}
    <rect x="2" y="14" width="20" height="7" fill="#27272a" />
    <rect x="3" y="15" width="18" height="5" fill="#71717a" />
    <rect x="3" y="15" width="18" height="1" fill="#a1a1aa" />
    
    {/* Redstone Dust Wire */}
    <rect x="4" y="17" width="16" height="2" fill="#b91c1c" />
    <rect x="5" y="17.5" width="14" height="1" fill="#ef4444" />
    
    {/* Stationary Redstone Torch */}
    <rect x="6" y="7" width="3" height="7" fill="#451a03" />
    <rect x="5" y="4" width="5" height="4" fill="#dc2626" />
    <rect x="6" y="5" width="3" height="2" fill="#fecaca" />
    
    {/* Adjustable Repeater Torch */}
    <rect x="15" y="9" width="3" height="5" fill="#451a03" />
    <rect x="14" y="6" width="5" height="4" fill="#b91c1c" />
    <rect x="15" y="7" width="3" height="2" fill="#f87171" />
    
    {/* Active Redstone Spark Particles */}
    <rect x="7" y="2" width="1" height="1" fill="#ff4444" />
    <rect x="16" y="4" width="1" height="1" fill="#ff4444" />
  </svg>
);

/**
 * Pixel-art Minecraft Clock Icon
 * Gold rimmed celestial dial with sun & night sky
 */
export const McClock: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Gold Outer Casing */}
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#78350f" />
    <rect x="3" y="3" width="18" height="18" rx="1" fill="#eab308" />
    <rect x="4" y="4" width="16" height="16" fill="#ca8a04" />
    
    {/* Celestial Sky Window */}
    <rect x="5" y="5" width="14" height="14" fill="#0f172a" />
    
    {/* Day (Sun Hemisphere) */}
    <rect x="5" y="5" width="14" height="7" fill="#38bdf8" />
    <rect x="9" y="6.5" width="6" height="4" fill="#facc15" />
    <rect x="11" y="7.5" width="2" height="2" fill="#ffffff" />
    
    {/* Night (Stars Hemisphere) */}
    <rect x="7" y="14" width="1.5" height="1.5" fill="#fef08a" />
    <rect x="15" y="15" width="1.5" height="1.5" fill="#ffffff" />
    <rect x="11" y="16" width="2" height="2" fill="#e2e8f0" />
    
    {/* Center Pointer Dial */}
    <rect x="11" y="11" width="2" height="2" fill="#78350f" />
    <rect x="11.5" y="11.5" width="1" height="1" fill="#fde047" />
  </svg>
);

/**
 * Pixel-art Minecraft Compass Icon
 * Brass casing with north-pointing red needle
 */
export const McCompass: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Brass Outer Frame */}
    <circle cx="12" cy="12" r="10" fill="#27272a" />
    <circle cx="12" cy="12" r="8.5" fill="#71717a" />
    <circle cx="12" cy="12" r="7" fill="#18181b" />
    
    {/* Cardinal Tick Marks */}
    <rect x="11.5" y="5.5" width="1" height="2" fill="#a1a1aa" />
    <rect x="11.5" y="16.5" width="1" height="2" fill="#a1a1aa" />
    <rect x="5.5" y="11.5" width="2" height="1" fill="#a1a1aa" />
    <rect x="16.5" y="11.5" width="2" height="1" fill="#a1a1aa" />
    
    {/* North Pointing Red Needle */}
    <polygon points="12,6 14,12 12,11 10,12" fill="#ef4444" />
    <polygon points="12,6 12,11 10,12" fill="#dc2626" />
    
    {/* South Pointing Silver Needle */}
    <polygon points="12,18 14,12 12,13 10,12" fill="#e4e4e7" />
    <polygon points="12,18 12,13 14,12" fill="#a1a1aa" />
    
    {/* Center Pivot Pin */}
    <circle cx="12" cy="12" r="1.5" fill="#f59e0b" />
  </svg>
);

/**
 * Pixel-art Minecraft Full Heart Icon
 * Classic 16x16 pixel-grid health heart
 */
export const McHeart: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 ${className}`}
    {...props}
  >
    {/* Dark Pixel Border */}
    <path
      d="M2 2h3v1h2V2h2V1h2V2h3v3h-1v2h-2v2h-2v2h-2v2h-2v-2H5v-2H3V7H1V5H0V2h2z"
      fill="#18181b"
    />
    {/* Heart Core Fill */}
    <path
      d="M2 3h3v1h2V3h2v1h3v2h-1v2h-2v2h-2v2h-2v-2H5V8H3V6H2V3z"
      fill="#dc2626"
    />
    {/* Specular White Highlight Glint */}
    <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
    <rect x="3" y="5" width="1" height="1" fill="#ffffff" />
    {/* Shadow gradient row */}
    <rect x="8" y="5" width="2" height="1" fill="#b91c1c" />
    <rect x="6" y="8" width="4" height="1" fill="#991b1b" />
  </svg>
);

/**
 * Pixel-art Minecraft Armor Chestplate Icon
 * Classic 16x16 pixel-grid defense plate
 */
export const McArmor: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 ${className}`}
    {...props}
  >
    {/* Dark Iron Border */}
    <path
      d="M2 1h4v2h4V1h4v5h-1v4h-2v4H5v-4H3V6H2V1z"
      fill="#18181b"
    />
    {/* Iron Ingot Plate Fill */}
    <path
      d="M3 2h2v3h6V2h2v4h-1v4h-2v3H6v-3H4V6H3V2z"
      fill="#a1a1aa"
    />
    {/* White Specular Glint */}
    <rect x="3" y="2" width="1" height="3" fill="#ffffff" />
    <rect x="9" y="4" width="2" height="2" fill="#f4f4f5" />
    <rect x="5" y="8" width="6" height="1" fill="#52525b" />
  </svg>
);

/**
 * Pixel-art Minecraft Emerald Gem Icon
 * Hexagonal cut emerald with crisp glints
 */
export const McEmerald: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Dark Contour Outline */}
    <path
      d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z"
      fill="#022c22"
    />
    {/* Emerald Body Fill */}
    <path
      d="M8.5 3.5h7l5 5v7l-5 5h-7l-5-5v-7l5-5z"
      fill="#059669"
    />
    {/* Center Facet Plate */}
    <polygon points="8,8 16,8 18,12 16,16 8,16 6,12" fill="#10b981" />
    {/* Top Facet Highlight */}
    <polygon points="8,8 16,8 15,5 9,5" fill="#34d399" />
    {/* Left Highlight */}
    <polygon points="8,8 6,12 4.5,10 7,6" fill="#6ee7b7" />
    {/* Sparkling White Glint */}
    <rect x="8" y="7" width="2" height="2" fill="#ffffff" />
  </svg>
);

/**
 * Pixel-art Minecraft Diamond Gem Icon
 * Cut gem silhouette with aqua crown facets
 */
export const McDiamond: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Outer Dark Silhouette */}
    <path
      d="M7 2h10l6 8-11 12L1 10l6-8z"
      fill="#082f49"
    />
    {/* Diamond Body Fill */}
    <path
      d="M7.5 3.5h9l5 6.5-9.5 10.5-9.5-10.5 5-6.5z"
      fill="#0284c7"
    />
    {/* Crown Facets */}
    <polygon points="7.5,3.5 12,3.5 10,9 4,9" fill="#38bdf8" />
    <polygon points="12,3.5 16.5,3.5 20,9 14,9" fill="#7dd3fc" />
    <polygon points="10,9 14,9 12,3.5" fill="#bae6fd" />
    {/* Lower Pavilion Facets */}
    <polygon points="12,19 10,9 14,9" fill="#0369a1" />
    <polygon points="12,19 3,9 10,9" fill="#075985" />
    <polygon points="12,19 21,9 14,9" fill="#0c4a6e" />
    {/* Glint */}
    <rect x="11" y="4.5" width="2" height="2" fill="#ffffff" />
  </svg>
);

/**
 * Pixel-art Minecraft Wooden Chest Icon
 * Oak plank chest with front iron latch
 */
export const McChest: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Chest Dark Outer Border */}
    <rect x="3" y="4" width="18" height="16" fill="#271b11" />
    {/* Top Lid Plank */}
    <rect x="4" y="5" width="16" height="4" fill="#92400e" />
    <rect x="4" y="5" width="16" height="1" fill="#b45309" />
    {/* Hinge Line */}
    <rect x="4" y="9" width="16" height="1" fill="#18181b" />
    {/* Main Chest Body Planks */}
    <rect x="4" y="10" width="16" height="9" fill="#78350f" />
    <rect x="6" y="12" width="12" height="6" fill="#92400e" />
    {/* Front Iron Lock Latch */}
    <rect x="10.5" y="7.5" width="3" height="4.5" fill="#18181b" />
    <rect x="11" y="8" width="2" height="3.5" fill="#e4e4e7" />
    <rect x="11.5" y="9" width="1" height="1" fill="#52525b" />
  </svg>
);

/**
 * Pixel-art Minecraft Ender Pearl Icon
 * Teal mystical sphere with obsidian border
 */
export const McEnderPearl: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Outer Obsidian Ring */}
    <circle cx="12" cy="12" r="9.5" fill="#042f2e" stroke="#134e4a" strokeWidth="1" />
    {/* Teal Ender Body */}
    <circle cx="12" cy="12" r="7.5" fill="#0f766e" />
    {/* Glowing Aqua Core */}
    <circle cx="11.5" cy="11.5" r="5" fill="#14b8a6" />
    {/* Inner Mystic Glint */}
    <circle cx="10.5" cy="10.5" r="3" fill="#5eead4" />
    <rect x="9.5" y="9.5" width="2" height="2" fill="#ccfbf1" />
    <rect x="10" y="10" width="1" height="1" fill="#ffffff" />
  </svg>
);

/**
 * Pixel-art Minecraft Grass Block Icon (Isometric)
 * Turf top, grass drape, and rich brown dirt
 */
export const McGrassBlock: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Top Green Turf */}
    <polygon points="12,2 21,7 12,12 3,7" fill="#65a30d" stroke="#365314" strokeWidth="1" />
    <polygon points="12,3 19,7 12,10.5 5,7" fill="#84cc16" />
    {/* Left Dirt Side */}
    <polygon points="3,7 12,12 12,21 3,16" fill="#78350f" stroke="#451a03" strokeWidth="1" />
    {/* Left Grass Hangover Drape */}
    <polygon points="3,7 12,12 12,14 10,13 8,14.5 6,13 3,14" fill="#4d7c0f" />
    {/* Right Dirt Side */}
    <polygon points="12,12 21,7 21,16 12,21" fill="#92400e" stroke="#451a03" strokeWidth="1" />
    {/* Right Grass Hangover Drape */}
    <polygon points="12,12 21,7 21,13.5 19,13 17,14.5 15,13 12,14" fill="#3f6212" />
  </svg>
);

/**
 * Pixel-art Minecraft Book and Quill Icon
 * Leather bound tome with white quill feather
 */
export const McBookQuill: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Leather Book Cover */}
    <rect x="4" y="6" width="14" height="15" rx="1" fill="#78350f" stroke="#451a03" strokeWidth="1" />
    {/* Paper Pages */}
    <rect x="6" y="8" width="10" height="11" fill="#fef3c7" />
    <rect x="7" y="10" width="8" height="1" fill="#92400e" />
    <rect x="7" y="12" width="7" height="1" fill="#92400e" />
    <rect x="7" y="14" width="8" height="1" fill="#92400e" />
    {/* Feather Quill */}
    <path
      d="M19 2c-3 1-5 4-6 7l3 3c3-1 6-3 7-6l-4-4z"
      fill="#f4f4f5"
      stroke="#71717a"
      strokeWidth="1"
    />
    <polygon points="13,9 12,13 16,12" fill="#18181b" />
    <rect x="15" y="5" width="2" height="3" fill="#e4e4e7" />
  </svg>
);

/**
 * Pixel-art Experience Orb Icon
 * Pulsing green-yellow crystalline orb
 */
export const McExperienceOrb: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Outer Crystal Facets */}
    <polygon points="12,2 18,6 22,12 18,18 12,22 6,18 2,12 6,6" fill="#365314" />
    <polygon points="12,4 17,7 20,12 17,17 12,20 7,17 4,12 7,7" fill="#65a30d" />
    {/* Glowing Lime Core */}
    <polygon points="12,6 16,9 18,12 16,15 12,18 8,15 6,12 8,9" fill="#84cc16" />
    {/* Hot Center Yellow / White Glint */}
    <rect x="10" y="10" width="4" height="4" fill="#facc15" />
    <rect x="11" y="11" width="2" height="2" fill="#ffffff" />
  </svg>
);

/**
 * Pixel-art Minecraft Diamond Pickaxe Icon
 * Unmistakable curved pickaxe head with wooden shaft
 */
export const McPickaxe: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Dark Outline */}
    <rect x="14" y="2" width="8" height="2" fill="#082f49" />
    <rect x="20" y="4" width="2" height="4" fill="#082f49" />
    <rect x="10" y="4" width="4" height="2" fill="#082f49" />
    <rect x="6" y="8" width="4" height="2" fill="#082f49" />
    <rect x="4" y="12" width="2" height="4" fill="#082f49" />
    
    {/* Diamond Pickaxe Blades */}
    <rect x="14" y="4" width="6" height="2" fill="#0284c7" />
    <rect x="18" y="4" width="2" height="2" fill="#38bdf8" />
    <rect x="18" y="2" width="2" height="2" fill="#ffffff" />
    <rect x="8" y="6" width="6" height="2" fill="#0284c7" />
    <rect x="6" y="10" width="4" height="2" fill="#38bdf8" />
    <rect x="4" y="12" width="2" height="2" fill="#a5f3fc" />
    
    {/* Wooden Shaft */}
    <rect x="12" y="8" width="2" height="2" fill="#78350f" />
    <rect x="10" y="10" width="2" height="2" fill="#78350f" />
    <rect x="8" y="12" width="2" height="2" fill="#78350f" />
    <rect x="6" y="14" width="2" height="2" fill="#78350f" />
    <rect x="4" y="16" width="2" height="2" fill="#78350f" />
    <rect x="2" y="18" width="2" height="2" fill="#451a03" />
  </svg>
);

/**
 * Pixel-art Minecraft Diamond Sword Icon
 * Unmistakable straight blade with gold crossguard and oak hilt
 */
export const McSword: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Tip */}
    <rect x="19" y="3" width="2" height="2" fill="#ffffff" />
    <rect x="17" y="5" width="2" height="2" fill="#67e8f9" />
    <rect x="15" y="7" width="2" height="2" fill="#06b6d4" />
    <rect x="13" y="9" width="2" height="2" fill="#0284c7" />
    <rect x="11" y="11" width="2" height="2" fill="#0369a1" />
    
    {/* Blade Dark Outline */}
    <rect x="20" y="2" width="2" height="2" fill="#082f49" />
    <rect x="18" y="2" width="2" height="2" fill="#082f49" />
    <rect x="20" y="4" width="2" height="2" fill="#082f49" />
    <rect x="16" y="4" width="2" height="2" fill="#082f49" />
    <rect x="14" y="6" width="2" height="2" fill="#082f49" />
    <rect x="12" y="8" width="2" height="2" fill="#082f49" />
    
    {/* Crossguard */}
    <rect x="9" y="11" width="2" height="2" fill="#f59e0b" />
    <rect x="11" y="13" width="2" height="2" fill="#f59e0b" />
    <rect x="8" y="13" width="2" height="2" fill="#b45309" />
    <rect x="12" y="10" width="2" height="2" fill="#b45309" />
    
    {/* Hilt & Pommel */}
    <rect x="7" y="15" width="2" height="2" fill="#78350f" />
    <rect x="5" y="17" width="2" height="2" fill="#451a03" />
    <rect x="3" y="19" width="2" height="2" fill="#06b6d4" />
    <rect x="2" y="20" width="2" height="2" fill="#082f49" />
  </svg>
);

/**
 * Pixel-art Minecraft Crafting Table Icon
 * Isometric block showing wood planks and tools on side
 */
export const McCraftingTable: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    className={`inline-block flex-shrink-0 transition-transform duration-200 ${className}`}
    {...props}
  >
    {/* Top 3x3 Grid Face */}
    <polygon points="12,2 21,7 12,12 3,7" fill="#b45309" stroke="#451a03" strokeWidth="1" />
    <polygon points="12,3 19,7 12,10.5 5,7" fill="#d97706" />
    
    {/* Left Face with Saw / Tool */}
    <polygon points="3,7 12,12 12,21 3,16" fill="#78350f" stroke="#451a03" strokeWidth="1" />
    <rect x="5" y="11" width="4" height="2" fill="#92400e" />
    <rect x="5" y="14" width="5" height="1" fill="#d4d4d8" />
    
    {/* Right Face with Hammer */}
    <polygon points="12,12 21,7 21,16 12,21" fill="#92400e" stroke="#451a03" strokeWidth="1" />
    <rect x="15" y="11" width="3" height="3" fill="#71717a" />
    <rect x="16" y="14" width="1" height="4" fill="#451a03" />
  </svg>
);
