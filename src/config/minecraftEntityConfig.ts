export type MobKey =
  | 'creeper'
  | 'wolf'
  | 'sheep'
  | 'pig'
  | 'bee'
  | 'enderman'
  | 'slime'
  | 'allay'
  | 'axolotl';

export interface MobEntityConfig {
  key: MobKey;
  texture: string;
  secondaryTexture?: string;
  name: string;
}

export const MOB_REGISTRY: Record<MobKey, MobEntityConfig> = {
  creeper: {
    key: 'creeper',
    texture: '/assets/textures/entity/creeper.png',
    name: 'Creeper',
  },
  wolf: {
    key: 'wolf',
    texture: '/assets/textures/entity/wolf_tame.png',
    name: 'Tamed Wolf',
  },
  sheep: {
    key: 'sheep',
    texture: '/assets/textures/entity/sheep.png',
    secondaryTexture: '/assets/textures/entity/sheep_fur.png',
    name: 'Fluffy Sheep',
  },
  pig: {
    key: 'pig',
    texture: '/assets/textures/entity/pig.png',
    name: 'Pasture Pig',
  },
  bee: {
    key: 'bee',
    texture: '/assets/textures/entity/bee.png',
    name: 'Honey Bee',
  },
  enderman: {
    key: 'enderman',
    texture: '/assets/textures/entity/enderman.png',
    name: 'Enderman',
  },
  slime: {
    key: 'slime',
    texture: '/assets/textures/entity/slime.png',
    name: 'Slime',
  },
  allay: {
    key: 'allay',
    texture: '/assets/textures/entity/allay.png',
    name: 'Allay',
  },
  axolotl: {
    key: 'axolotl',
    texture: '/assets/textures/entity/axolotl_lucy.png',
    name: 'Lucy Axolotl',
  },
};

export type PlayerSkinKey =
  | 'player-steve'
  | 'player-alex'
  | 'player-diamond-knight'
  | 'player-netherite-paladin';

export interface PlayerSkinConfig {
  id: PlayerSkinKey;
  skinUrl: string;
  isSlim: boolean;
  name: string;
}

export const PLAYER_REGISTRY: Record<PlayerSkinKey, PlayerSkinConfig> = {
  'player-steve': {
    id: 'player-steve',
    skinUrl: '/assets/skins/steve.png',
    isSlim: false,
    name: 'Steve',
  },
  'player-alex': {
    id: 'player-alex',
    skinUrl: '/assets/skins/alex.png',
    isSlim: true,
    name: 'Alex',
  },
  'player-diamond-knight': {
    id: 'player-diamond-knight',
    skinUrl: '/assets/skins/steve.png', // Steve base with full 3D Diamond armor
    isSlim: false,
    name: 'Diamond Knight',
  },
  'player-netherite-paladin': {
    id: 'player-netherite-paladin',
    skinUrl: '/assets/skins/steve.png', // Steve base with full 3D Netherite armor
    isSlim: false,
    name: 'Netherite Paladin',
  },
};

export interface EntityCameraConfig {
  target: [number, number, number];
  position: [number, number, number];
  fov: number;
}

export const ENTITY_CAMERA_REGISTRY: Record<string, EntityCameraConfig> = {
  'player-steve': {
    target: [0, 1.05, 0],
    position: [0.75, 1.85, 5.8],
    fov: 32,
  },
  'player-alex': {
    target: [0, 1.05, 0],
    position: [0.75, 1.85, 5.8],
    fov: 32,
  },
  'player-diamond-knight': {
    target: [0, 1.05, 0],
    position: [0.85, 1.85, 5.8],
    fov: 32,
  },
  'player-netherite-paladin': {
    target: [0, 1.05, 0],
    position: [0.85, 1.85, 5.8],
    fov: 32,
  },
  'mob-creeper': {
    target: [0, 0.85, 0],
    position: [0.65, 1.45, 4.5],
    fov: 32,
  },
  'mob-wolf': {
    target: [0, 0.45, 0],
    position: [1.5, 0.95, 3.1],
    fov: 32,
  },
  'mob-sheep': {
    target: [0, 0.55, 0],
    position: [2.1, 1.5, 3.9],
    fov: 32,
  },
  'mob-pig': {
    target: [0, 0.45, 0],
    position: [2.3, 1.25, 3.3],
    fov: 32,
  },
  'mob-bee': {
    target: [0, 0.35, 0],
    position: [1.15, 0.75, 2.4],
    fov: 32,
  },
  'mob-enderman': {
    target: [0, 1.45, 0],
    position: [0.8, 2.45, 7.5],
    fov: 32,
  },
  'mob-slime': {
    target: [0, 0.28, 0],
    position: [0.65, 0.62, 2.1],
    fov: 32,
  },
  'mob-allay': {
    target: [0, 0.38, 0],
    position: [0.75, 0.75, 2.3],
    fov: 32,
  },
  'mob-axolotl': {
    target: [0, 0.22, 0],
    position: [0.95, 0.65, 2.4],
    fov: 32,
  },
};

export type BiomeTab = 'adventurers' | 'wildlife' | 'hostile' | 'special';

export interface TabConfig {
  id: BiomeTab;
  label: string;
  badge: string;
}

export const TABS: TabConfig[] = [
  {
    id: 'adventurers',
    label: 'Player Pioneers',
    badge: 'AUTHENTIC PLAYER SKINS',
  },
  {
    id: 'wildlife',
    label: 'Overworld Wildlife',
    badge: 'PASSIVE & PETS',
  },
  {
    id: 'hostile',
    label: 'Cavern & Nether',
    badge: 'DUNGEON THREATS',
  },
  {
    id: 'special',
    label: 'Mystic & Aquatic',
    badge: 'RARE REALM FAUNA',
  },
];

export interface ShowcaseEntityItem {
  id: string;
  name: string;
  tagline: string;
  category: BiomeTab;
  behavior: 'Player' | 'Passive Companion' | 'Passive Mob' | 'Hostile' | 'Neutral Void';
  gearAvailable?: boolean;
  type: 'player' | 'mob';
  playerKey?: PlayerSkinKey;
  mobKey?: MobKey;
  biome: 'grassland' | 'taiga' | 'meadow' | 'lush-cave' | 'end' | 'nether';
  biomeLabel: string;
  biomeBadge: string;
  backdropImage: string;
}

export const SHOWCASE_ENTITIES: ShowcaseEntityItem[] = [
  {
    id: 'player-steve',
    name: 'Steve',
    tagline: 'Pioneer Miner & Crafter',
    category: 'adventurers',
    behavior: 'Player',
    gearAvailable: true,
    type: 'player',
    playerKey: 'player-steve',
    biome: 'grassland',
    biomeLabel: 'Sunlit Plains Clearing',
    biomeBadge: 'OVERWORLD SPAWN',
    backdropImage: '/assets/images/hero-landscape.png',
  },
  {
    id: 'player-alex',
    name: 'Alex',
    tagline: 'Wilderness Scout & Pathfinder',
    category: 'adventurers',
    behavior: 'Player',
    gearAvailable: true,
    type: 'player',
    playerKey: 'player-alex',
    biome: 'grassland',
    biomeLabel: 'Pine River Valley',
    biomeBadge: 'WILDERNESS CANYON',
    backdropImage: '/assets/images/lush-forest-river.jpeg',
  },
  {
    id: 'player-diamond-knight',
    name: 'Diamond Knight',
    tagline: 'Enchanted Realm Champion',
    category: 'adventurers',
    behavior: 'Player',
    gearAvailable: true,
    type: 'player',
    playerKey: 'player-diamond-knight',
    biome: 'meadow',
    biomeLabel: 'Stone Mountain Citadel',
    biomeBadge: 'WARRIOR STRONGHOLD',
    backdropImage: '/assets/images/mountain-citadel.jpeg',
  },
  {
    id: 'player-netherite-paladin',
    name: 'Netherite Paladin',
    tagline: 'Ancient Citadel Vanguard',
    category: 'adventurers',
    behavior: 'Player',
    gearAvailable: true,
    type: 'player',
    playerKey: 'player-netherite-paladin',
    biome: 'nether',
    biomeLabel: 'Nether Fortress Bastion',
    biomeBadge: 'BASALT MAGMA CITADEL',
    backdropImage: '/assets/images/nether-citadel.png',
  },
  {
    id: 'mob-wolf',
    name: 'Tamed Wolf',
    tagline: 'Loyal Wilderness Companion',
    category: 'wildlife',
    behavior: 'Passive Companion',
    type: 'mob',
    mobKey: 'wolf',
    biome: 'taiga',
    biomeLabel: 'Old-Growth Taiga Pines',
    biomeBadge: 'PINEWOOD SHELTER',
    backdropImage: '/assets/images/forest-cabin.png',
  },
  {
    id: 'mob-sheep',
    name: 'Fluffy Sheep',
    tagline: 'Highland Wool Grazier',
    category: 'wildlife',
    behavior: 'Passive Mob',
    type: 'mob',
    mobKey: 'sheep',
    biome: 'meadow',
    biomeLabel: 'Highland Flower Meadow',
    biomeBadge: 'PASTURE MEADOW',
    backdropImage: '/assets/images/bsl-sunset-haven.jpeg',
  },
  {
    id: 'mob-pig',
    name: 'Pasture Pig',
    tagline: 'Friendly Farmstead Companion',
    category: 'wildlife',
    behavior: 'Passive Mob',
    type: 'mob',
    mobKey: 'pig',
    biome: 'grassland',
    biomeLabel: 'Meadow Farmstead Pasture',
    biomeBadge: 'OVERWORLD PASTURE',
    backdropImage: '/assets/images/harbor-village.jpeg',
  },
  {
    id: 'mob-bee',
    name: 'Honey Bee',
    tagline: 'Blossom Pollen Harvester',
    category: 'wildlife',
    behavior: 'Passive Mob',
    type: 'mob',
    mobKey: 'bee',
    biome: 'meadow',
    biomeLabel: 'Wildflower Glade Canopy',
    biomeBadge: 'BLOSSOM CANOPY',
    backdropImage: '/assets/images/bsl-sunset-haven.jpeg',
  },
  {
    id: 'mob-creeper',
    name: 'Creeper',
    tagline: 'Silent Explosive Stalker',
    category: 'hostile',
    behavior: 'Hostile',
    type: 'mob',
    mobKey: 'creeper',
    biome: 'grassland',
    biomeLabel: 'Dense Oak Wood Clearing',
    biomeBadge: 'DEEP OVERWORLD',
    backdropImage: '/assets/images/lush-forest-river.jpeg',
  },
  {
    id: 'mob-enderman',
    name: 'Enderman',
    tagline: 'Void Wanderer of the End',
    category: 'hostile',
    behavior: 'Neutral Void',
    type: 'mob',
    mobKey: 'enderman',
    biome: 'end',
    biomeLabel: 'End Dimension Void Aurora',
    biomeBadge: 'VOID CHORUS HIGHLANDS',
    backdropImage: '/assets/images/aurora-night.png',
  },
  {
    id: 'mob-slime',
    name: 'Slime',
    tagline: 'Bouncy Subterranean Gel Cube',
    category: 'hostile',
    behavior: 'Hostile',
    type: 'mob',
    mobKey: 'slime',
    biome: 'lush-cave',
    biomeLabel: 'Cavern Aquifer Pool',
    biomeBadge: 'DEEP CAVE WATERWAY',
    backdropImage: '/assets/images/lush-cave-crystals.png',
  },
  {
    id: 'mob-axolotl',
    name: 'Lucy Axolotl',
    tagline: 'Lush Cavern Aquatic Friend',
    category: 'special',
    behavior: 'Passive Companion',
    type: 'mob',
    mobKey: 'axolotl',
    biome: 'lush-cave',
    biomeLabel: 'Lush Cavern Glow Berry Pool',
    biomeBadge: 'SUBTERRANEAN LAGOON',
    backdropImage: '/assets/images/lush-cave-crystals.png',
  },
  {
    id: 'mob-allay',
    name: 'Allay',
    tagline: 'Luminescent Item Courier',
    category: 'special',
    behavior: 'Passive Companion',
    type: 'mob',
    mobKey: 'allay',
    biome: 'meadow',
    biomeLabel: 'Skyblock Cloud Peaks',
    biomeBadge: 'SKY GLADE PINNACLE',
    backdropImage: '/assets/images/skyblock-peaks.png',
  },
];
