export interface VisualAsset {
  id: string;
  name: string;
  creator: string;
  sourceUrl: string;
  license: string;
  localPath: string;
  description: string;
  category: 'hero' | 'world' | 'store' | 'community' | 'biome' | 'audio';
}

export const ASSET_MANIFEST: VisualAsset[] = [
  {
    id: 'hero-landscape',
    name: 'Alpine Sunset Lake & Peaks',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-unbound',
    license: 'Complementary Shaders License (Official Media Distribution)',
    localPath: '/assets/images/hero-landscape.png',
    description: 'High-altitude panoramic lake at golden sunset captured with Complementary Unbound shader pack.',
    category: 'hero'
  },
  {
    id: 'bsl-sunset-haven',
    name: 'Waterfront Citadel Sunset',
    creator: 'Capt Tatsu',
    sourceUrl: 'https://modrinth.com/shader/bsl-shaders',
    license: 'BSL Shaders Terms of Use',
    localPath: '/assets/images/bsl-sunset-haven.jpeg',
    description: 'Seaside medieval castle with atmospheric light rays and golden water reflections using BSL Shaders.',
    category: 'world'
  },
  {
    id: 'lush-forest-river',
    name: 'Pine Canyon River',
    creator: 'Capt Tatsu',
    sourceUrl: 'https://modrinth.com/shader/bsl-shaders',
    license: 'BSL Shaders Terms of Use',
    localPath: '/assets/images/lush-forest-river.jpeg',
    description: 'Pristine mountain river through dense pine woodland with realistic water reflections.',
    category: 'world'
  },
  {
    id: 'mountain-citadel',
    name: 'Highland Mountain Stronghold',
    creator: 'Capt Tatsu',
    sourceUrl: 'https://modrinth.com/shader/bsl-shaders',
    license: 'BSL Shaders Terms of Use',
    localPath: '/assets/images/mountain-citadel.jpeg',
    description: 'Alpine fortress built atop sheer mountain cliffs with volumetric fog.',
    category: 'world'
  },
  {
    id: 'survival-island',
    name: 'Tropical Reef Archipelago',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-unbound',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/survival-island.png',
    description: 'Azure tropical ocean island with vibrant coral reef and clear water reflections.',
    category: 'biome'
  },
  {
    id: 'cherry-grove',
    name: 'Cherry Blossom Sanctuary',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-unbound',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/cherry-grove.png',
    description: 'Volumetric bloom and vibrant pink petals in Minecraft Cherry Biome.',
    category: 'biome'
  },
  {
    id: 'aurora-night',
    name: 'Celestial Aurora Night',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-unbound',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/aurora-night.png',
    description: 'Starry nocturnal wilderness illuminated by dynamic green and purple aurora borealis.',
    category: 'biome'
  },
  {
    id: 'skyblock-peaks',
    name: 'Glacial Pinnacles',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-unbound',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/skyblock-peaks.png',
    description: 'Pristine glacial spires under cold crisp skies with atmospheric depth.',
    category: 'biome'
  },
  {
    id: 'lush-cave-crystals',
    name: 'Lush Cavern & Glow Aquifer',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-reimagined',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/lush-cave-crystals.png',
    description: 'Subterranean lush biome with glowing spores and underground reflective pool.',
    category: 'store'
  },
  {
    id: 'harbor-village',
    name: 'Dawn Merchant Harbor',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-reimagined',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/harbor-village.jpeg',
    description: 'Coastal trading village with merchant ships and soft morning haze.',
    category: 'community'
  },
  {
    id: 'nether-citadel',
    name: 'Basalt & Magma Citadel',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-reimagined',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/nether-citadel.png',
    description: 'Crimson forest and basalt stronghold with volumetric fog and molten magma glow.',
    category: 'store'
  },
  {
    id: 'forest-cabin',
    name: 'Alpine Timber Lodge',
    creator: 'EminGT (Complementary Development)',
    sourceUrl: 'https://modrinth.com/shader/complementary-reimagined',
    license: 'Complementary Shaders License',
    localPath: '/assets/images/forest-cabin.png',
    description: 'Illuminated wooden homestead nestled in dense alpine woods under twilight.',
    category: 'store'
  },
  {
    id: 'gameplay-showcase-video',
    name: 'Cinematic Minecraft Wilderness Expedition',
    creator: 'Xbox MENA / Mojang Studios',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:%D8%A5%D8%B9%D9%84%D8%A7%D9%86_%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB_%E2%80%93_Minecraft_Caves_%26_Cliffs_%E2%80%93_Part_II.webm',
    license: 'Creative Commons Attribution 3.0 Unported (CC BY 3.0)',
    localPath: '/assets/videos/gameplay-showcase.mp4',
    description: 'Seamless 1080p cinematic landscape expedition across snowy alpine peaks, subterranean lush grottoes, coastal lagoons, and twilight sakura groves.',
    category: 'world'
  },
  {
    id: 'nature-ambience-audio',
    name: 'Whispering Brook & Woodland Birds Ambience',
    creator: 'TwoWings & Barracuda1983 (Wikimedia Commons)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Brook_sound.ogg',
    license: 'Creative Commons Attribution 3.0 / CC0 1.0 Public Domain',
    localPath: '/assets/audio/nature_ambience.mp3',
    description: 'Peaceful flowing mountain brook soundscape blended with gentle woodland birdsong, configured at a soft 8% background volume layer.',
    category: 'audio'
  }
];

export const getAssetById = (id: string): VisualAsset | undefined => {
  return ASSET_MANIFEST.find(asset => asset.id === id);
};
