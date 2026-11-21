export type ProductCategory = 'all' | 'ranks' | 'keys' | 'cosmetics' | 'boosters' | 'bundles';

export interface StoreCategoryItem {
  id: ProductCategory;
  name: string;
  tagline: string;
  iconName: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  category: 'ranks' | 'keys' | 'cosmetics' | 'boosters' | 'bundles';
  shortDesc: string;
  description: string;
  priceUSD: number; // Configured USD display price
  priceINR: number; // Configured exact INR base price
  price: number; // Default numerical display price (USD)
  currency: string;
  isPriceConfigured: boolean;
  badge?: 'Featured' | 'Popular' | 'Best Value' | 'Exclusive';
  image: string;
  gameMode: 'Global' | 'Survival SMP' | 'Skyblock Realms' | 'Dungeons RPG';
  duration: 'Permanent' | '30 Days' | 'One-Time Use' | 'Seasonal';
  status: 'active' | 'coming_soon' | 'preorder';
  perks: string[];
  notes?: string;
}

export interface StorePolicy {
  title: string;
  description: string;
}

export interface StoreConfig {
  currencyCode: string;
  currencySymbol: string;
  discordInviteUrl: string;
  categories: StoreCategoryItem[];
  products: StoreProduct[];
  policies: StorePolicy[];
  deliveryNotice: string;
  chargebackWarning: string;
}

export const STORE_CONFIG: StoreConfig = {
  currencyCode: 'USD',
  currencySymbol: '$',
  discordInviteUrl: 'https://discord.gg/lovepixel',
  
  categories: [
    { id: 'all', name: 'All Products', tagline: 'Browse the entire Love Pixel digital catalogue', iconName: 'Grid' },
    { id: 'ranks', name: 'Server Ranks', tagline: 'Permanent status, cosmetic prefixes & server perks', iconName: 'Shield' },
    { id: 'keys', name: 'Crate Keys', tagline: 'Unlock legendary loot crates & cosmetic caches', iconName: 'Key' },
    { id: 'cosmetics', name: 'Cosmetics', tagline: 'Aura trails, custom wings, hats & visual flair', iconName: 'Emerald' },
    { id: 'boosters', name: 'Boosters', tagline: 'Server-wide experience & resource multiplier surge', iconName: 'Redstone' },
    { id: 'bundles', name: 'Bundles', tagline: 'Curated value packages for new and veteran adventurers', iconName: 'Chest' },
  ],

  products: [
    // ---------------------------------------------------------
    // SEVEN OFFICIAL SERVER RANKS (EXACT INR & CONFIGURED USD)
    // ---------------------------------------------------------
    {
      id: 'rank-celestial',
      slug: 'celestial-rank',
      name: 'Celestial Rank',
      category: 'ranks',
      shortDesc: 'Supreme celestial tier for revered server patrons with celestial styling and discord role.',
      description: 'The supreme rank on Love Pixel. Celebrates our most dedicated patrons with permanent celestial chat prefix styling, exclusive Discord role, and verified priority ticket handling.',
      priceUSD: 15.79,
      priceINR: 1500,
      price: 15.79,
      currency: 'USD',
      isPriceConfigured: true,
      badge: 'Exclusive',
      image: '/assets/images/aurora-night.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [CELESTIAL] chat prefix and glowing nameplate',
        'Exclusive Celestial Supporter Discord role in official community',
        'Direct ticket access for rank confirmation and account delivery',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel). Perks unconfirmed for gameplay remain editable.',
    },
    {
      id: 'rank-beast',
      slug: 'beast-rank',
      name: 'Beast Rank',
      category: 'ranks',
      shortDesc: 'Apex predator tier rank featuring distinctive beast styling and discord role.',
      description: 'Command the wilderness with the prestigious Beast Rank. Features distinctive [BEAST] title styling, dedicated Discord community role, and staff ticket support.',
      priceUSD: 11.58,
      priceINR: 1100,
      price: 11.58,
      currency: 'USD',
      isPriceConfigured: true,
      badge: 'Featured',
      image: '/assets/images/nether-citadel.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [BEAST] chat prefix and highlighted tablist entry',
        'Beast Supporter role in official Discord server',
        'Assisted rank verification via Discord ticket',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },
    {
      id: 'rank-immortal',
      slug: 'immortal-rank',
      name: 'Immortal Rank',
      category: 'ranks',
      shortDesc: 'Undying prestige tier rank celebrating steadfast dedication to Love Pixel.',
      description: 'Stand the test of time with Immortal Rank. Unlocks permanent in-game chat recognition, Immortal Discord role, and staff verification assistance.',
      priceUSD: 7.37,
      priceINR: 700,
      price: 7.37,
      currency: 'USD',
      isPriceConfigured: true,
      badge: 'Popular',
      image: '/assets/images/mountain-citadel.jpeg',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [IMMORTAL] chat prefix styling',
        'Immortal Supporter Discord role',
        'Direct verification in ticket channel',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },
    {
      id: 'rank-mythic',
      slug: 'mythic-rank',
      name: 'Mythic Rank',
      category: 'ranks',
      shortDesc: 'Ancient mythic tier rank featuring distinguished titles and server recognition.',
      description: 'Harness the ancient lore of the realm with Mythic Rank. Includes distinct [MYTHIC] badge, supporter role, and delivery coordination on Discord.',
      priceUSD: 5.26,
      priceINR: 500,
      price: 5.26,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/lush-cave-crystals.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [MYTHIC] chat prefix styling',
        'Mythic Supporter Discord role',
        'Staff-assisted delivery verification',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },
    {
      id: 'rank-titan',
      slug: 'titan-rank',
      name: 'Titan Rank',
      category: 'ranks',
      shortDesc: 'Colossal titan tier offering distinguished rank recognition and styling.',
      description: 'Rise above the clouds with Titan Rank. Features clean [TITAN] nameplate, community Discord role, and dedicated ticket verification.',
      priceUSD: 3.68,
      priceINR: 350,
      price: 3.68,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/skyblock-peaks.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [TITAN] chat prefix styling',
        'Titan Supporter Discord role',
        'Staff confirmation and delivery support',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },
    {
      id: 'rank-knight',
      slug: 'knight-rank',
      name: 'Knight Rank',
      category: 'ranks',
      shortDesc: 'Gallant vanguard tier providing permanent knight title and styling.',
      description: 'Join the realm vanguard with Knight Rank. Offers recognizable [KNIGHT] prefix, community Discord role, and simple ticket delivery process.',
      priceUSD: 2.11,
      priceINR: 200,
      price: 2.11,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/survival-island.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [KNIGHT] chat prefix styling',
        'Knight Supporter Discord role',
        'Staff-assisted delivery verification',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },
    {
      id: 'rank-elite',
      slug: 'elite-rank',
      name: 'Elite Rank',
      category: 'ranks',
      shortDesc: 'Essential foundational tier with permanent elite title and community badge.',
      description: 'The ideal entry point into server patronage. Includes permanent [ELITE] title styling, Discord supporter badge, and ticket verification support.',
      priceUSD: 1.05,
      priceINR: 100,
      price: 1.05,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/forest-cabin.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Permanent [ELITE] chat prefix styling',
        'Elite Supporter Discord role',
        'Staff-assisted delivery verification',
        'Future perk updates confirmed upon official release',
      ],
      notes: 'Purchase coordinated via Discord ticket (https://discord.gg/lovepixel).',
    },

    // ---------------------------------------------------------
    // CRATE KEYS, COSMETICS, BOOSTERS & BUNDLES
    // ---------------------------------------------------------
    {
      id: 'key-mythic-3x',
      slug: 'mythic-crate-keys-3x',
      name: 'Mythic Crate Keys (x3)',
      category: 'keys',
      shortDesc: 'Three keys for the legendary Mythic Spawn Crate containing rare relics.',
      description: 'Unlock the ancient Mythic Crate located at the central spawn beacon. Every crate is guaranteed to reward high-tier enchant books, rare cosmetic heads, or coin pouches.',
      priceUSD: 4.99,
      priceINR: 475,
      price: 4.99,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/lush-cave-crystals.png',
      gameMode: 'Survival SMP',
      duration: 'One-Time Use',
      status: 'active',
      perks: [
        '3x Mythic Crate Keys delivered to your in-game inventory',
        'No duplicate junk rolls guaranteed',
        'Chance at exclusive particle trails and server trophies',
        'Keys never expire and can be stored in player vaults',
      ],
    },
    {
      id: 'key-cosmic-bundle',
      slug: 'cosmic-crate-key-bundle',
      name: 'Cosmic Key Treasury (x10)',
      category: 'keys',
      shortDesc: 'Value bundle of 10 Cosmic Keys with bonus cosmetic aura token.',
      description: 'A bulk treasury bundle designed for serious crate enthusiasts. Includes 10 Cosmic keys plus a guaranteed Celestial Aura cosmetic scroll upon opening.',
      priceUSD: 14.99,
      priceINR: 1425,
      price: 14.99,
      currency: 'USD',
      isPriceConfigured: true,
      badge: 'Best Value',
      image: '/assets/images/aurora-night.png',
      gameMode: 'Survival SMP',
      duration: 'One-Time Use',
      status: 'active',
      perks: [
        '10x Cosmic Crate Keys with elevated rare roll odds',
        '1x Bonus Celestial Aura cosmetic voucher',
        'Usable on both Survival SMP and Skyblock Realms',
        'Tradeable in-game via secure player trade interface',
      ],
    },
    {
      id: 'cosmetic-aurora-wings',
      slug: 'aurora-celestial-wings',
      name: 'Aurora Celestial Wings',
      category: 'cosmetics',
      shortDesc: 'Stunning animated photon wings with chromatic aurora particle trails.',
      description: 'Equip an ethereal pair of floating chromatic wings made of pure simulated starlight. Custom coded particles that react dynamically when you sprint, jump, or glide.',
      priceUSD: 7.99,
      priceINR: 760,
      price: 7.99,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/aurora-night.png',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Custom animated 3D particle wings model visible to all players',
        'Toggable chromatic color presets (Emerald, Cyan, Violet, Amber)',
        'Zero performance impact on other players',
        'Equippable through the /cosmetics interface anytime',
      ],
    },
    {
      id: 'booster-global-exp',
      slug: 'global-2x-exp-booster',
      name: 'Global 2x Server EXP Booster',
      category: 'boosters',
      shortDesc: 'Activate 2 hours of double experience for every player online on the realm.',
      description: 'Become the hero of the entire server. Activating this booster grants double experience gain to every single connected adventurer on your realm for 120 minutes with your name announced.',
      priceUSD: 5.99,
      priceINR: 570,
      price: 5.99,
      currency: 'USD',
      isPriceConfigured: true,
      image: '/assets/images/cherry-grove.png',
      gameMode: 'Global',
      duration: 'One-Time Use',
      status: 'active',
      perks: [
        '2 Hours of double experience multiplier (2.0x EXP)',
        'Server-wide chat broadcast crediting you as the activator',
        'Stacks safely on top of seasonal server events',
        'Includes 500 community karma tokens',
      ],
    },
    {
      id: 'bundle-founder-pack',
      slug: 'founder-starter-bundle',
      name: 'Pixel Founder’s Treasury',
      category: 'bundles',
      shortDesc: 'Limited launch bundle featuring Knight Rank, 5 Mythic Keys & exclusive companion.',
      description: 'The definitive launch package celebrating Love Pixel. Packaged with Knight Rank, 5 Mythic keys, the exclusive Voxel Golem companion, and 50,000 claim blocks.',
      priceUSD: 24.99,
      priceINR: 2375,
      price: 24.99,
      currency: 'USD',
      isPriceConfigured: true,
      badge: 'Best Value',
      image: '/assets/images/harbor-village.jpeg',
      gameMode: 'Global',
      duration: 'Permanent',
      status: 'active',
      perks: [
        'Knight Rank included permanently',
        '5x Mythic Crate Keys & 3x Cosmic Keys',
        'Exclusive "Founder" commemorative chat title',
        'Voxel Golem miniature companion pet',
        '50,000 Land claim blocks to establish your kingdom',
        '1x Realm EXP booster',
      ],
    },
  ],

  policies: [
    {
      title: 'Discord Rank Purchase Process',
      description: 'Rank purchases are arranged directly through our official Discord server (https://discord.gg/lovepixel). Open a rank-purchase ticket with a screenshot of your selected rank for staff verification.',
    },
    {
      title: 'Staff Verification & Account Delivery',
      description: 'Staff manually verify the selected rank and payment instructions before arranging delivery to your exact Minecraft account. Delivery is not instant and depends on staff confirmation.',
    },
    {
      title: 'Mojang Commercial Usage Compliance',
      description: 'Love Pixel complies strictly with Mojang commercial guidelines. Store ranks provide cosmetic styling, chat titles, and discord roles without pay-to-win unfair gameplay advantages.',
    },
    {
      title: 'Account Security Notice',
      description: 'Love Pixel staff will NEVER ask for your Minecraft password, Microsoft login, authentication tokens, or recovery codes. Only your exact Minecraft in-game username is required.',
    },
  ],

  deliveryNotice: 'Rank purchases are arranged manually through our official Discord server ticket system. Join https://discord.gg/lovepixel to complete your purchase.',
  chargebackWarning: 'Any fraudulent dispute or unauthorized action will result in permanent removal from all Love Pixel network realms and Discord services.',
};
