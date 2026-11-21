export type EntityCategory =
  | 'player'
  | 'passive'
  | 'companion'
  | 'hostile'
  | 'humanoid'
  | 'aquatic'
  | 'flying'
  | 'boss';

export type AssetType = '3d-voxel-model' | 'crisp-pixel-sprite' | 'procedural-rig';
export type AnimationPriority = 'critical' | 'interactive' | 'ambient' | 'background';

export interface CharacterMobEntry {
  id: string;
  name: string;
  category: EntityCategory;
  sourceImage: 'Reference Image A (Player Skins Grid)' | 'Reference Image B (Entities & Mobs Collage)';
  originalSource: string;
  creator: string;
  license: string;
  assetType: AssetType;
  resolutionOrQuality: string;
  description: string;
  plannedPlacement: string;
  animationPriority: AnimationPriority;
  defaultScale: number;
  themeColor: string;
  animationType: 'idle-breathe' | 'walk-cycle' | 'wing-flutter' | 'hop-squish' | 'swim-undulate' | 'hover-float' | 'tail-wag';
}

export const CHARACTER_MOB_MANIFEST: CharacterMobEntry[] = [
  // ==========================================
  // REFERENCE IMAGE A: PLAYER SKINS GRID
  // ==========================================
  {
    id: 'player-steve',
    name: 'Steve (Classic Pioneer)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios / Minecraft Core Player Canon',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines (Community Server Display)',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 64x64 UV Texture Mapping & Procedural 3D Voxel Rig',
    description: 'Iconic Minecraft protagonist with cyan short-sleeved tunic, dark blue denim trousers, and dark hair.',
    plannedPlacement: 'Hero Atmosphere, Community Guild Roster, Footer Bedrock Stroll',
    animationPriority: 'critical',
    defaultScale: 1.0,
    themeColor: '#00a8a8',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-alex',
    name: 'Alex (Wilderness Scout)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios / Minecraft Core Player Canon',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines (Community Server Display)',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 64x64 UV Texture Mapping & Procedural 3D Voxel Rig',
    description: 'Wilderness explorer with vibrant ginger hair braid, sage green tunic, brown boots, and 3-pixel slim arm geometry.',
    plannedPlacement: 'Hero 3D Voxel Scene, Survival SMP Mode Showcase, Community Guild Roster',
    animationPriority: 'critical',
    defaultScale: 1.0,
    themeColor: '#5b8731',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-ari',
    name: 'Ari (Forest Ranger)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Adventurer with maroon hooded cowl, high-ponytail black hair, and rugged trail-running boots.',
    plannedPlacement: 'Community Member Showcase, Realm Hubs',
    animationPriority: 'interactive',
    defaultScale: 1.0,
    themeColor: '#802626',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-efe',
    name: 'Efe (Royal Artisan)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Artisan with regal violet and teal clothing, gold belt buckle, cropped indigo hair, and silver earrings.',
    plannedPlacement: 'Store VIP Category Card, Community Guild Lineup',
    animationPriority: 'interactive',
    defaultScale: 1.0,
    themeColor: '#7c3aed',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-kai',
    name: 'Kai (Coastal Voyager)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Coastal mariner with azure longcoat, light blonde hair, and white maritime cravat.',
    plannedPlacement: 'Community Hub Lineup, Aquatic Showcase',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#0284c7',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-makena',
    name: 'Makena (Sunlit Pioneer)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Cheerful pioneer wearing bright amber sweater vest, striped undershirt, and brown slacks.',
    plannedPlacement: 'Community Guild Lineup, Rules Fair-Play Accent',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#f59e0b',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-noor',
    name: 'Noor (Deep Cave Delver)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Subterranean explorer sporting a crimson utility jacket, protective arm wraps, and dark cargo trousers.',
    plannedPlacement: 'Mining & Cave Exploration Telemetry, Community Lineup',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#dc2626',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-sunny',
    name: 'Sunny (Homestead Architect)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Agrarian builder with denim dungarees, forest-green shirt, and shoulder-length blonde hair.',
    plannedPlacement: 'Claim Land Protection Pillar, Community Lineup',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#10b981',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-zuri',
    name: 'Zuri (Desert Caravaneer)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Mojang Studios (Minecraft 1.20 Default Cast Update)',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Desert wanderer in earth-tone terracotta scarf and woven tribal striped tunic.',
    plannedPlacement: 'Economy & Trade Telemetry, Community Lineup',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#ea580c',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-diamond-knight',
    name: 'Diamond Knight (Enchanted Champion)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Minecraft Community Classic Armor Hierarchy',
    creator: 'Love Pixel Creative Engineering',
    license: 'Proprietary Fan Server Asset',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Voxel Armor Rig with Cyan Specular Sheen',
    description: 'Full diamond plated armor set with horned visor helmet, chestplate, greaves, and diamond broadsword.',
    plannedPlacement: 'Living Ecosystem Showcase, Mythic Store Ranks, Hero Background',
    animationPriority: 'critical',
    defaultScale: 1.05,
    themeColor: '#55ffff',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-netherite-paladin',
    name: 'Netherite Paladin (Ancient Vanguard)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Minecraft Community Classic Armor Hierarchy',
    creator: 'Love Pixel Creative Engineering',
    license: 'Proprietary Fan Server Asset',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Voxel Netherite Armor Rig with Basalt Matte Finish',
    description: 'Heavy ancient debris alloy battle plate, horned war-helm, gold belt trim, and molten core reflections.',
    plannedPlacement: 'Living Ecosystem Showcase, Store Titan Rank Badge',
    animationPriority: 'interactive',
    defaultScale: 1.08,
    themeColor: '#4b484f',
    animationType: 'idle-breathe'
  },
  {
    id: 'player-redstone-engineer',
    name: 'Redstone Engineer (Clockwork Mechanist)',
    category: 'player',
    sourceImage: 'Reference Image A (Player Skins Grid)',
    originalSource: 'Minecraft Technical Community Archetype',
    creator: 'Love Pixel Creative Engineering',
    license: 'Proprietary Fan Server Asset',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Technical crafter equipped with brass magnifying goggles, leather tool belt, and pulsing redstone torch.',
    plannedPlacement: '20 TPS Lag-Free Economy Pillar, FAQ Accordion Header',
    animationPriority: 'interactive',
    defaultScale: 1.0,
    themeColor: '#ef4444',
    animationType: 'idle-breathe'
  },

  // ==========================================
  // REFERENCE IMAGE B: MOBS & ENTITIES COLLAGE
  // ==========================================

  // --- PASSIVE ANIMALS ---
  {
    id: 'mob-pig',
    name: 'Pig (Classic Pink Oinker)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'procedural-rig',
    resolutionOrQuality: 'Authentic 3D Voxel Quadruped Rig',
    description: 'Plump pink quadruped with protruding snout and little black and white eyes.',
    plannedPlacement: 'Footer Bedrock Stroll, Survival SMP Biome Card',
    animationPriority: 'interactive',
    defaultScale: 0.85,
    themeColor: '#f472b6',
    animationType: 'walk-cycle'
  },
  {
    id: 'mob-sheep',
    name: 'Sheep (Fluffy Wool Grazier)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'procedural-rig',
    resolutionOrQuality: 'Authentic 3D Voxel Quadruped Rig with Volumetric Wool',
    description: 'Gentle grazing woolly sheep with fluffy fleece coating and tan head.',
    plannedPlacement: 'Survival SMP Card, Footer Bedrock Stroll, Ecosystem Showcase',
    animationPriority: 'interactive',
    defaultScale: 0.9,
    themeColor: '#f1f5f9',
    animationType: 'walk-cycle'
  },
  {
    id: 'mob-cow',
    name: 'Cow (Spotted Bovine)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Crisp Native Pixel Render',
    description: 'Classic brown-and-white patched pasture cow with gray horns and friendly muzzle.',
    plannedPlacement: 'Footer Bedrock Stroll, Farm Economy Stats',
    animationPriority: 'ambient',
    defaultScale: 0.9,
    themeColor: '#78350f',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-chicken',
    name: 'Chicken (Feathered Clucker)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Crisp Native Pixel Render',
    description: 'White feathered bird with red wattle, yellow beak, and flapping mini wings.',
    plannedPlacement: 'Footer Bedrock Stroll, Support FAQ Accent',
    animationPriority: 'ambient',
    defaultScale: 0.6,
    themeColor: '#f8fafc',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-fox',
    name: 'Fox (Orange Bush-Tailed Prowler)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Agile woodland predator with vibrant orange fur, bushy white-tipped tail, and alert black ears.',
    plannedPlacement: 'Ecosystem Showcase, Community Wilderness Hub',
    animationPriority: 'interactive',
    defaultScale: 0.8,
    themeColor: '#f97316',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-sniffer',
    name: 'Sniffer (Ancient Floraphile)',
    category: 'passive',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft 1.20 Trails & Tales Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Colossal six-legged ancient beast with moss-covered shell, flapping ears, and deep sniffing snout.',
    plannedPlacement: 'World Showcase Trails Section, Ecosystem Showcase',
    animationPriority: 'interactive',
    defaultScale: 1.2,
    themeColor: '#059669',
    animationType: 'idle-breathe'
  },

  // --- PETS & COMPANIONS ---
  {
    id: 'mob-wolf',
    name: 'Wolf (Loyal Tamed Companion)',
    category: 'companion',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Voxel Canine Rig with Dynamic Tail Physics',
    description: 'Tamed white wolf with vibrant red collar, perky triangular ears, and rhythmic wagging tail.',
    plannedPlacement: 'Claim Land Protection Pillar, Living Ecosystem Showcase, Footer Bedrock Stroll',
    animationPriority: 'critical',
    defaultScale: 0.85,
    themeColor: '#e2e8f0',
    animationType: 'tail-wag'
  },
  {
    id: 'mob-allay',
    name: 'Allay (Luminescent Azure Fairy)',
    category: 'companion',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft 1.19 Wild Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Luminescent 3D Voxel Rig with Translucent Rapid-Flap Wings',
    description: 'Joyful floating miniature fairy glowing in cyan bioluminescence, holding musical notes and items.',
    plannedPlacement: 'Hero Atmosphere Scene, Skyblock Realm Showcase, Store Cosmetic Perk Accent',
    animationPriority: 'critical',
    defaultScale: 0.75,
    themeColor: '#38bdf8',
    animationType: 'wing-flutter'
  },
  {
    id: 'mob-iron-golem',
    name: 'Iron Golem (Village Citadel Sentinel)',
    category: 'companion',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Vanilla Asset Registry',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Heavy Stone & Iron Voxel Rig with Vines & Crimson Poppy',
    description: 'Massive towering iron automaton with broad protective shoulders, elongated arms, and gentle red poppy flower.',
    plannedPlacement: 'Rules Page Security Header, Citadel Haven Realm Showcase',
    animationPriority: 'interactive',
    defaultScale: 1.3,
    themeColor: '#cbd5e1',
    animationType: 'walk-cycle'
  },

  // --- HOSTILE MOBS ---
  {
    id: 'mob-creeper',
    name: 'Creeper (Silent Primed Stalker)',
    category: 'hostile',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Core Iconography',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Mossy Voxel Rig with Frowning Pixel Face',
    description: 'Iconic armless monster with mottled camouflage green texture, four stubby feet, and frowning square face.',
    plannedPlacement: 'Living Ecosystem Showcase, Server Defense Anycast Card',
    animationPriority: 'critical',
    defaultScale: 0.95,
    themeColor: '#22c55e',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-enderman',
    name: 'Enderman (Tall Void Wanderer)',
    category: 'hostile',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Core Iconography',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: '3-Block Slender Voxel Rig with Glowing Purple Eyes & Void Particles',
    description: 'Towering 3-block tall nocturnal wanderer with obsidian black skin, slender elongated limbs, and glowing magenta eyes.',
    plannedPlacement: 'Living Ecosystem Showcase, Nether Citadel Game Mode Banner',
    animationPriority: 'critical',
    defaultScale: 1.35,
    themeColor: '#a855f7',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-slime',
    name: 'Slime (Bouncy Gelatinous Cube)',
    category: 'hostile',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Core Iconography',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Translucent Emerald Double-Layer Voxel Mesh with Squish Physics',
    description: 'Translucent emerald green cube with a darker floating nucleus and bouncy physics.',
    plannedPlacement: 'Living Ecosystem Showcase, Community Events Accent',
    animationPriority: 'interactive',
    defaultScale: 0.85,
    themeColor: '#84cc16',
    animationType: 'hop-squish'
  },
  {
    id: 'mob-blaze',
    name: 'Blaze (Floating Nether Rod Inferno)',
    category: 'hostile',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Nether Core',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render with Ember Glow',
    description: 'Floating Nether fortress sentinel composed of orbiting yellow rods and smoking incendiary embers.',
    plannedPlacement: 'Nether Citadel Realm Card, Ecosystem Showcase',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#f59e0b',
    animationType: 'hover-float'
  },
  {
    id: 'mob-warden',
    name: 'Warden (Deep Dark Sculk Titan)',
    category: 'boss',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft 1.19 Deep Dark Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Sculk-Vibrated Ultra-High Definition Vector Art',
    description: 'Blind hulking titan from the deep dark caverns with sculk horns, exposed glowing rib cage, and sonic shriek attack.',
    plannedPlacement: 'Living Ecosystem Boss Showcase, Rules Heavy Moderation Header',
    animationPriority: 'critical',
    defaultScale: 1.4,
    themeColor: '#0f766e',
    animationType: 'idle-breathe'
  },

  // --- HUMANOIDS & VILLAGERS ---
  {
    id: 'mob-villager-cleric',
    name: 'Villager Cleric (Alchemical Healer)',
    category: 'humanoid',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Village & Pillage Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Crisp Native Pixel Render',
    description: 'Pious potion merchant wearing a long violet robe embellished with a gold creeper emblem on the back.',
    plannedPlacement: 'Rules Page Code of Conduct, Store Potion & Ranks Section',
    animationPriority: 'interactive',
    defaultScale: 0.95,
    themeColor: '#9333ea',
    animationType: 'idle-breathe'
  },
  {
    id: 'mob-wandering-trader',
    name: 'Wandering Trader (Nomadic Merchant)',
    category: 'humanoid',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Village & Pillage Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'High-Definition Native Voxel Vector Render',
    description: 'Traveling merchant cloaked in blue and gold embroidery, always accompanied by decorative pack llamas.',
    plannedPlacement: 'Storefront Welcome Banner, Community Trade Market',
    animationPriority: 'ambient',
    defaultScale: 1.0,
    themeColor: '#2563eb',
    animationType: 'idle-breathe'
  },

  // --- AQUATIC ENTITIES ---
  {
    id: 'mob-axolotl',
    name: 'Axolotl (Lucy Pink Cavern Amphibian)',
    category: 'aquatic',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft 1.17 Caves & Cliffs Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Voxel Amphibian Rig with Wave Swimming Spine',
    description: 'Endearing subterranean amphibian with pastel pink body, darker external gills, and gentle swimming wave.',
    plannedPlacement: 'Living Ecosystem Showcase, Underwater Video Showcase Accent',
    animationPriority: 'critical',
    defaultScale: 0.75,
    themeColor: '#f43f5e',
    animationType: 'swim-undulate'
  },
  {
    id: 'mob-dolphin',
    name: 'Dolphin (Azure Open-Ocean Acrobat)',
    category: 'aquatic',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Update Aquatic',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Crisp Native Pixel Render',
    description: 'Playful marine mammal sporting gray and blue gradients that grants dolphin grace swimming speed.',
    plannedPlacement: 'Tropical Reef Archipelago Biome Showcase',
    animationPriority: 'ambient',
    defaultScale: 0.9,
    themeColor: '#38bdf8',
    animationType: 'swim-undulate'
  },

  // --- FLYING ENTITIES ---
  {
    id: 'mob-bee',
    name: 'Bee (Striped Pollen Harvester)',
    category: 'flying',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft Buzzy Bees Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: '3d-voxel-model',
    resolutionOrQuality: 'Authentic 3D Fuzzy Voxel Rig with Translucent Buzzing Wings',
    description: 'Chubby yellow and black striped pollinator with iridescent fluttering wings and sweet nectar dust.',
    plannedPlacement: 'Cherry Grove Biome Card, Skyblock Island Atmosphere, Ecosystem Showcase',
    animationPriority: 'critical',
    defaultScale: 0.65,
    themeColor: '#eab308',
    animationType: 'wing-flutter'
  },
  {
    id: 'mob-parrot',
    name: 'Parrot (Scarlet Macaw Perch)',
    category: 'flying',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft World of Color Update',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Crisp Native Pixel Render',
    description: 'Vivid scarlet, yellow, and navy feathered companion capable of perching atop player shoulders.',
    plannedPlacement: 'Community Hub Discord Voice Accent, Hero Atmosphere',
    animationPriority: 'ambient',
    defaultScale: 0.55,
    themeColor: '#ef4444',
    animationType: 'wing-flutter'
  },

  // --- BOSS-LIKE CREATURES ---
  {
    id: 'mob-ender-dragon',
    name: 'Ender Dragon (Obsidian Sovereign of the End)',
    category: 'boss',
    sourceImage: 'Reference Image B (Entities & Mobs Collage)',
    originalSource: 'Mojang Studios / Minecraft The End Dimension Canon',
    creator: 'Mojang Studios',
    license: 'Minecraft Brand & Commercial Guidelines',
    assetType: 'crisp-pixel-sprite',
    resolutionOrQuality: 'Ultra-High Definition Voxel Silhouette with Purple Breath',
    description: 'Majestic draconic ruler of the End dimension with obsidian black scales and glowing amethyst eyes.',
    plannedPlacement: 'Living Ecosystem Showcase Boss Tier, End Dimension Events Card',
    animationPriority: 'critical',
    defaultScale: 1.5,
    themeColor: '#7e22ce',
    animationType: 'wing-flutter'
  }
];

export const getEntityById = (id: string): CharacterMobEntry | undefined => {
  return CHARACTER_MOB_MANIFEST.find(e => e.id === id);
};

export const getEntitiesByCategory = (category: EntityCategory): CharacterMobEntry[] => {
  return CHARACTER_MOB_MANIFEST.filter(e => e.category === category);
};
