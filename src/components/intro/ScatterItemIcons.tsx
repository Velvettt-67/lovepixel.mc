import React from 'react';
import {
  McDiamond,
  McEmerald,
  McRedstone,
  McEnderPearl,
  McPickaxe,
  McGrassBlock,
  McBookQuill,
  McExperienceOrb,
} from '../ui/MinecraftIcons';

/**
 * Pixel-art Netherite Sword (16x16 crisp)
 */
export const NetheriteSword: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Dark Obsidian Blade */}
    <rect x="13" y="1" width="2" height="2" fill="#2d282e" />
    <rect x="11" y="3" width="2" height="2" fill="#3c303d" />
    <rect x="9" y="5" width="2" height="2" fill="#4d3d4e" />
    <rect x="7" y="7" width="2" height="2" fill="#3c303d" />
    <rect x="5" y="9" width="2" height="2" fill="#2d282e" />
    {/* Blade Edge Highlight */}
    <rect x="12" y="2" width="1" height="1" fill="#7d6a7d" />
    <rect x="10" y="4" width="1" height="1" fill="#69576a" />
    <rect x="8" y="6" width="1" height="1" fill="#69576a" />
    {/* Crossguard */}
    <rect x="5" y="8" width="2" height="1" fill="#1b121c" />
    <rect x="7" y="10" width="1" height="2" fill="#1b121c" />
    <rect x="4" y="9" width="1" height="2" fill="#78350f" />
    {/* Grip & Pommel */}
    <rect x="3" y="11" width="2" height="2" fill="#451a03" />
    <rect x="1" y="13" width="2" height="2" fill="#2d282e" />
  </svg>
);

/**
 * Pixel-art Netherite Chestplate (16x16 crisp)
 */
export const NetheriteChestplate: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Obsidian / Netherite Alloy */}
    <path
      d="M2 1h4v2h4V1h4v5h-1v4h-2v4H5v-4H3V6H2V1z"
      fill="#1b151d"
    />
    <path
      d="M3 2h2v3h6V2h2v4h-1v4h-2v3H6v-3H4V6H3V2z"
      fill="#3c313d"
    />
    {/* Platinum / Gold alloy specularity */}
    <rect x="3" y="2" width="1" height="3" fill="#6b5b6d" />
    <rect x="9" y="4" width="2" height="2" fill="#7e6c80" />
    <rect x="5" y="8" width="6" height="1" fill="#251e27" />
  </svg>
);

/**
 * Pixel-art Gold Ingot (16x16 crisp)
 */
export const GoldIngot: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Dark Gold Border */}
    <rect x="2" y="6" width="12" height="6" fill="#78350f" />
    <rect x="3" y="5" width="10" height="7" fill="#a16207" />
    {/* Gold Ingot Face */}
    <rect x="4" y="6" width="8" height="4" fill="#facc15" />
    {/* Top Specular Glint */}
    <rect x="4" y="6" width="7" height="1" fill="#fef08a" />
    <rect x="4" y="7" width="1" height="2" fill="#fef08a" />
    {/* Lower Shadow Edge */}
    <rect x="5" y="9" width="7" height="1" fill="#ca8a04" />
  </svg>
);

/**
 * Pixel-art Iron Ingot (16x16 crisp)
 */
export const IronIngot: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="6" width="12" height="6" fill="#27272a" />
    <rect x="3" y="5" width="10" height="7" fill="#52525b" />
    <rect x="4" y="6" width="8" height="4" fill="#d4d4d8" />
    <rect x="4" y="6" width="7" height="1" fill="#ffffff" />
    <rect x="4" y="7" width="1" height="2" fill="#ffffff" />
    <rect x="5" y="9" width="7" height="1" fill="#a1a1aa" />
  </svg>
);

export type ItemType =
  | 'diamond'
  | 'emerald'
  | 'netherite_sword'
  | 'netherite_armor'
  | 'diamond_pickaxe'
  | 'ender_pearl'
  | 'redstone'
  | 'gold_ingot'
  | 'iron_ingot'
  | 'xp_orb'
  | 'grass_block'
  | 'enchanted_book';

export const RenderScatterItem: React.FC<{ type: ItemType; size?: number }> = ({
  type,
  size = 28,
}) => {
  switch (type) {
    case 'diamond':
      return <McDiamond size={size} />;
    case 'emerald':
      return <McEmerald size={size} />;
    case 'netherite_sword':
      return <NetheriteSword size={size} />;
    case 'netherite_armor':
      return <NetheriteChestplate size={size} />;
    case 'diamond_pickaxe':
      return <McPickaxe size={size} />;
    case 'ender_pearl':
      return <McEnderPearl size={size} />;
    case 'redstone':
      return <McRedstone size={size} />;
    case 'gold_ingot':
      return <GoldIngot size={size} />;
    case 'iron_ingot':
      return <IronIngot size={size} />;
    case 'xp_orb':
      return <McExperienceOrb size={size} />;
    case 'grass_block':
      return <McGrassBlock size={size} />;
    case 'enchanted_book':
      return <McBookQuill size={size} />;
    default:
      return <McDiamond size={size} />;
  }
};
