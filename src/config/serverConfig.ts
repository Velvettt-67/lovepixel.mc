export interface GameModeInfo {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'launching_soon' | 'active' | 'in_development';
  bannerImage: string;
  badge: string;
  features: string[];
}

export interface ServerFAQ {
  question: string;
  answer: string;
  category: 'connection' | 'gameplay' | 'store' | 'rules';
}

export interface ServerRuleItem {
  id: number;
  title: string;
  summary: string;
  details: string;
  severity: 'Warning' | 'Temporary Ban' | 'Permanent Ban';
}

export interface ServerConfig {
  brandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  serverAddress: string;
  serverPortJava: number;
  serverPortBedrock: number;
  bedrockSupported: boolean;
  isAddressConfigured: boolean;
  supportedVersions: string;
  discordInviteUrl: string;
  isDiscordConfigured: boolean;
  statusApiEndpoint: string | null; // e.g. 'https://api.mcstatus.io/v2/status/java/'
  disclaimer: string;
  gameModes: GameModeInfo[];
  faq: ServerFAQ[];
  rules: ServerRuleItem[];
  socialLinks: {
    platform: string;
    url: string;
    configured: boolean;
  }[];
}

export const SERVER_CONFIG: ServerConfig = {
  brandName: 'LOVE PIXEL',
  tagline: 'YOUR NEXT WORLD BEGINS HERE.',
  headline: 'YOUR NEXT WORLD BEGINS HERE.',
  subheadline: 'A new world. New adventures. Your next story starts with us.',
  serverAddress: 'play.lovepixel.net',
  serverPortJava: 25565,
  serverPortBedrock: 19132,
  bedrockSupported: true,
  isAddressConfigured: true,
  supportedVersions: 'Java & Bedrock 1.20.x — 1.21.x',
  discordInviteUrl: 'https://discord.gg/lovepixel',
  isDiscordConfigured: true,
  statusApiEndpoint: 'https://api.mcstatus.io/v2/status/java/',
  disclaimer: 'NOT AN OFFICIAL MINECRAFT SERVER OR SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.',
  
  gameModes: [
    {
      id: 'survival-smp',
      title: 'Vanilla+ Survival SMP',
      tagline: 'Expansive wilderness, player-driven economy & claims',
      description: 'An authentic survival experience augmented with grief prevention, custom world generation, dynamic player shops, and seasonal world bosses.',
      status: 'launching_soon',
      bannerImage: '/assets/images/lush-forest-river.jpeg',
      badge: 'Core World',
      features: [
        'Overworld & Nether custom biomes',
        'Intuitive claim land protection',
        'Player-driven chest & auction shops',
        'Balanced progression & quality of life'
      ]
    },
    {
      id: 'skyblock-realms',
      title: 'Skyblock Realms',
      tagline: 'Build your empire from a solitary floating voxel island',
      description: 'Start with scarce resources high above the void. Automate production, conquer progressive generator tiers, and climb the realm leaderboards.',
      status: 'launching_soon',
      bannerImage: '/assets/images/skyblock-peaks.png',
      badge: 'Competitive',
      features: [
        'Custom ore cobble generators',
        'Island upgrade trees & minion perks',
        'Community island visits & ratings',
        'Weekly realm challenges & rewards'
      ]
    },
    {
      id: 'dungeon-rpg',
      title: 'Mythic Dungeons & Raids',
      tagline: 'Procedural dungeons, custom gear & challenging boss encounters',
      description: 'Gather your party to plunge into deep subterranean caverns. Slay mythic creatures, gather legendary runes, and forge custom equipment.',
      status: 'in_development',
      bannerImage: '/assets/images/mountain-citadel.jpeg',
      badge: 'Co-op RPG',
      features: [
        'Multi-stage dungeon instances',
        'Custom mobs with unique attack telegraphs',
        'Socketable gem & rune enchanting',
        'Epic party boss raids'
      ]
    }
  ],

  faq: [
    {
      category: 'connection',
      question: 'How do I join the Love Pixel server?',
      answer: 'Launch Minecraft Java Edition (or Bedrock Edition), click Multiplayer > Add Server, and input the server address "play.lovepixel.net". Java uses port 25565 (default); Bedrock uses port 19132.'
    },
    {
      category: 'connection',
      question: 'Which Minecraft versions are supported?',
      answer: 'Love Pixel supports clients from 1.20.x up to the newest 1.21.x releases. We recommend running the latest stable release with Sodium / Iris or Optifine for the smoothest visual performance.'
    },
    {
      category: 'store',
      question: 'How long does digital store item delivery take?',
      answer: 'All ranks, crate keys, cosmetics, and boosters are automatically dispatched via our in-game automated system typically within 1 to 5 minutes of verified checkout completion. You must be connected or log in to receive items.'
    },
    {
      category: 'store',
      question: 'Can I purchase items as a gift for another player?',
      answer: 'Yes! On every product detail page, toggle the "Gift to a Friend" option and specify their exact case-sensitive Minecraft in-game username.'
    },
    {
      category: 'gameplay',
      question: 'Are there pay-to-win mechanics on Love Pixel?',
      answer: 'No. Love Pixel strictly adheres to the official Minecraft Commercial Usage Guidelines. Ranks and store products provide cosmetic distinctions, quality-of-life perks, and convenience enhancements that do not disrupt competitive survival balance.'
    },
    {
      category: 'rules',
      question: 'Where can I report rule violations or bugs?',
      answer: 'You can submit reports through our in-game "/report" command or open a ticket directly on our Support and Community channels.'
    }
  ],

  rules: [
    {
      id: 1,
      title: 'Fair Play & Client Integrity',
      summary: 'Strict zero-tolerance for unfair client modifications and exploits.',
      details: 'Hacked clients, X-ray texture packs, automated botting scripts, fly hacks, and exploiting duplication glitches are strictly prohibited.',
      severity: 'Permanent Ban'
    },
    {
      id: 2,
      title: 'Respectful Chat & Community Conduct',
      summary: 'Maintain a mature, welcoming, and harassment-free atmosphere.',
      details: 'Harassment, hate speech, spamming, self-promotion of unrelated servers, doxxing, and malicious threats will not be tolerated.',
      severity: 'Temporary Ban'
    },
    {
      id: 3,
      title: 'Griefing & Theft Outside Anarchy Zones',
      summary: 'Respect other players’ claims, builds, and property.',
      details: 'Destroying builds inside claims, lava-casting perimeter boundaries, or trapping new players at public warps is forbidden.',
      severity: 'Temporary Ban'
    },
    {
      id: 4,
      title: 'Account Security & Real-Money Trading (RMT)',
      summary: 'Do not trade in-game items for external real-world currency.',
      details: 'All official digital transactions must occur exclusively through the Love Pixel digital store. Third-party RMT trades are unauthorized and cause account suspension.',
      severity: 'Permanent Ban'
    }
  ],

  socialLinks: [
    { platform: 'Discord', url: 'https://discord.gg/lovepixel', configured: true },
    { platform: 'YouTube', url: 'https://youtube.com/@lovepixel', configured: false },
    { platform: 'X / Twitter', url: 'https://x.com/lovepixel', configured: false },
    { platform: 'GitHub', url: 'https://github.com/lovepixel', configured: false }
  ]
};
