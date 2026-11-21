import {
  CHARACTER_MOB_MANIFEST,
  getEntityById,
  getEntitiesByCategory,
} from '../../config/characterMobManifest';
import type {
  CharacterMobEntry,
  EntityCategory,
} from '../../config/characterMobManifest';

export {
  CHARACTER_MOB_MANIFEST,
  getEntityById,
  getEntitiesByCategory,
};

export type {
  CharacterMobEntry,
  EntityCategory,
};

/**
 * Filter manifest entries for specific section roles
 */
export const getSectionEntities = (section: 'hero' | 'telemetry' | 'store' | 'community' | 'rules' | 'footer') => {
  switch (section) {
    case 'hero':
      return CHARACTER_MOB_MANIFEST.filter(e =>
        ['player-steve', 'player-alex', 'mob-allay', 'player-diamond-knight'].includes(e.id)
      );
    case 'telemetry':
      return CHARACTER_MOB_MANIFEST.filter(e =>
        ['player-redstone-engineer', 'mob-iron-golem', 'player-steve', 'player-alex'].includes(e.id)
      );
    case 'store':
      return CHARACTER_MOB_MANIFEST.filter(e =>
        ['player-diamond-knight', 'player-netherite-paladin', 'mob-allay', 'mob-wolf'].includes(e.id)
      );
    case 'community':
      return CHARACTER_MOB_MANIFEST.filter(e => e.category === 'player');
    case 'rules':
      return CHARACTER_MOB_MANIFEST.filter(e =>
        ['mob-iron-golem', 'mob-villager-cleric', 'mob-warden'].includes(e.id)
      );
    case 'footer':
      return CHARACTER_MOB_MANIFEST.filter(e =>
        ['player-steve', 'player-alex', 'mob-wolf', 'mob-pig', 'mob-sheep', 'mob-chicken'].includes(e.id)
      );
    default:
      return CHARACTER_MOB_MANIFEST;
  }
};
