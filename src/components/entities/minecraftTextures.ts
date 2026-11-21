import * as THREE from 'three';

// Cache generated textures so they are created exactly once
const textureCache = new Map<string, THREE.CanvasTexture>();

function createPixelTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  cacheKey: string
): THREE.CanvasTexture {
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    draw(ctx);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(cacheKey, texture);
  return texture;
}

// -------------------------------------------------------------
// 1. BLOCK TEXTURES (16x16 Authentic Minecraft Pixel Grids)
// -------------------------------------------------------------

export function getGrassTopTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const palette = ['#5b8e15', '#679e19', '#4d7c0f', '#7cb324', '#3f6b0a'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const color = palette[Math.floor(Math.abs(rand) * palette.length)];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'block_grass_top');
}

export function getGrassSideTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const dirtPalette = ['#866043', '#735135', '#604329', '#966c4d'];
    const grassPalette = ['#5b8e15', '#679e19', '#4d7c0f', '#7cb324'];

    // Fill dirt base
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        ctx.fillStyle = dirtPalette[Math.floor(Math.abs(rand) * dirtPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Top grass overhang
    const overhangs = [3, 4, 3, 5, 4, 3, 4, 5, 3, 4, 4, 3, 5, 4, 3, 4];
    for (let x = 0; x < 16; x++) {
      const h = overhangs[x];
      for (let y = 0; y < h; y++) {
        const rand = (Math.sin(x * 23.12 + y * 45.67) * 43758.5453) % 1;
        ctx.fillStyle = grassPalette[Math.floor(Math.abs(rand) * grassPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'block_grass_side');
}

export function getDirtTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const dirtPalette = ['#866043', '#735135', '#604329', '#966c4d'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 17.3 + y * 91.7) * 43758.5453) % 1;
        ctx.fillStyle = dirtPalette[Math.floor(Math.abs(rand) * dirtPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'block_dirt');
}

export function getStoneTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const stonePalette = ['#737373', '#666666', '#595959', '#7f7f7f', '#8c8c8c'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 33.1 + y * 44.9) * 43758.5453) % 1;
        ctx.fillStyle = stonePalette[Math.floor(Math.abs(rand) * stonePalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'block_stone');
}

export function getObsidianTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const obsPalette = ['#121018', '#161320', '#1c1728', '#2a1f3d', '#3f2b5c', '#100e16'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 19.3 + y * 67.1) * 43758.5453) % 1;
        ctx.fillStyle = obsPalette[Math.floor(Math.abs(rand) * obsPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'block_obsidian');
}

export function getMagmaTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    // Dark basalt base
    ctx.fillStyle = '#261b17';
    ctx.fillRect(0, 0, 16, 16);

    // Glowing magma veins
    const magmaColors = ['#991b1b', '#dc2626', '#ea580c', '#f59e0b', '#fef08a'];
    const veins = [
      [2, 3], [3, 3], [4, 4], [5, 4], [6, 5], [7, 6], [8, 6],
      [10, 2], [11, 3], [12, 4], [13, 5], [14, 5],
      [3, 10], [4, 11], [5, 11], [6, 12], [7, 13], [8, 14],
      [11, 9], [12, 10], [13, 11], [14, 12]
    ];

    veins.forEach(([x, y]) => {
      ctx.fillStyle = magmaColors[Math.floor(Math.random() * magmaColors.length)];
      ctx.fillRect(x, y, 1, 1);
      // Corona glow
      ctx.fillStyle = '#7c2d12';
      if (x > 0) ctx.fillRect(x - 1, y, 1, 1);
      if (x < 15) ctx.fillRect(x + 1, y, 1, 1);
    });
  }, 'block_magma');
}

// -------------------------------------------------------------
// 2. STEVE SKIN TEXTURES
// -------------------------------------------------------------

export function getSteveHeadTexture(): THREE.CanvasTexture {
  return createPixelTexture(32, 16, (ctx) => {
    // Front face (8x8 at x=8, y=8 in standard skin mapping, here simplified to 16x16 face front)
    ctx.fillStyle = '#d4a373'; // Tanned skin
    ctx.fillRect(0, 0, 32, 16);

    // Dark brown hair
    ctx.fillStyle = '#3d2314';
    ctx.fillRect(0, 0, 32, 4); // Hair top band
    ctx.fillRect(0, 4, 3, 5);  // Left hair sideburn
    ctx.fillRect(13, 4, 3, 5); // Right hair sideburn

    // Eyes
    ctx.fillStyle = '#ffffff'; // White sclera
    ctx.fillRect(4, 7, 3, 2);
    ctx.fillRect(9, 7, 3, 2);
    ctx.fillStyle = '#2563eb'; // Blue pupil
    ctx.fillRect(5, 7, 2, 2);
    ctx.fillRect(9, 7, 2, 2);

    // Nose
    ctx.fillStyle = '#c48a56';
    ctx.fillRect(7, 9, 2, 1);

    // Iconic Goatee / Mouth
    ctx.fillStyle = '#522f18';
    ctx.fillRect(6, 11, 4, 1);
    ctx.fillStyle = '#3d2314';
    ctx.fillRect(6, 12, 4, 1);
  }, 'steve_head');
}

export function getSteveTorsoTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    // Teal cyan shirt with authentic shading
    ctx.fillStyle = '#0891b2';
    ctx.fillRect(0, 0, 16, 16);

    // Fold shading & darker hem
    ctx.fillStyle = '#0e7490';
    ctx.fillRect(0, 14, 16, 2);
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 5, 16, 1);

    // V-neck showing tanned chest
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(6, 0, 4, 3);
    ctx.fillStyle = '#c48a56';
    ctx.fillRect(7, 2, 2, 1);
  }, 'steve_torso');
}

export function getSteveLegsTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    // Blue jeans
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 16, 12);

    // Denim seam shading
    ctx.fillStyle = '#172554';
    ctx.fillRect(0, 0, 1, 12);
    ctx.fillRect(15, 0, 1, 12);
    ctx.fillRect(7, 0, 2, 12);

    // Gray shoes
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 12, 16, 4);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 15, 16, 1);
  }, 'steve_legs');
}

// -------------------------------------------------------------
// 3. ALEX SKIN TEXTURES
// -------------------------------------------------------------

export function getAlexHeadTexture(): THREE.CanvasTexture {
  return createPixelTexture(32, 16, (ctx) => {
    ctx.fillStyle = '#e0a98b'; // Peach skin
    ctx.fillRect(0, 0, 32, 16);

    // Ginger hair with bangs
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, 0, 32, 5);
    ctx.fillRect(0, 5, 4, 7);
    ctx.fillRect(12, 5, 4, 7);
    ctx.fillStyle = '#d97706'; // Hair highlight
    ctx.fillRect(3, 1, 6, 2);

    // Emerald green eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, 7, 3, 2);
    ctx.fillRect(9, 7, 3, 2);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(5, 7, 2, 2);
    ctx.fillRect(9, 7, 2, 2);

    // Soft mouth
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(6, 11, 4, 1);
  }, 'alex_head');
}

export function getAlexTorsoTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    // Olive green tunic
    ctx.fillStyle = '#4d7c0f';
    ctx.fillRect(0, 0, 16, 12);
    ctx.fillStyle = '#3f6212';
    ctx.fillRect(0, 0, 16, 1);

    // Brown leather belt
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 12, 16, 4);
    // Gold buckle
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(7, 13, 2, 2);
  }, 'alex_torso');
}

// -------------------------------------------------------------
// 4. DIAMOND ARMOR TEXTURE
// -------------------------------------------------------------

export function getDiamondArmorTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const cyanPalette = ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#bae6fd'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 14.1 + y * 73.3) * 43758.5453) % 1;
        ctx.fillStyle = cyanPalette[Math.floor(Math.abs(rand) * cyanPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // High-specular cyan glint in corner
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 2, 2, 2);
    ctx.fillRect(10, 10, 1, 1);
  }, 'armor_diamond');
}

// -------------------------------------------------------------
// 5. NETHERITE ARMOR TEXTURE
// -------------------------------------------------------------

export function getNetheriteArmorTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const nethPalette = ['#292524', '#3d3835', '#44403c', '#57534e', '#1c1917'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 18.7 + y * 51.9) * 43758.5453) % 1;
        ctx.fillStyle = nethPalette[Math.floor(Math.abs(rand) * nethPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // Subtle purple/crimson Damascus steel vein
    ctx.fillStyle = '#7e22ce';
    ctx.fillRect(4, 5, 2, 1);
    ctx.fillRect(6, 6, 3, 1);
    ctx.fillRect(9, 7, 2, 1);
    // Gold rivet
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(2, 2, 1, 1);
    ctx.fillRect(13, 2, 1, 1);
  }, 'armor_netherite');
}

// -------------------------------------------------------------
// 6. WOLF TEXTURE
// -------------------------------------------------------------

export function getWolfBodyTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const furPalette = ['#e2e8f0', '#cbd5e1', '#f1f5f9', '#94a3b8'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 12.1 + y * 31.3) * 43758.5453) % 1;
        ctx.fillStyle = furPalette[Math.floor(Math.abs(rand) * furPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'wolf_body');
}

export function getWolfHeadTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 16, 16);

    // Dark ears
    ctx.fillStyle = '#64748b';
    ctx.fillRect(2, 0, 3, 3);
    ctx.fillRect(11, 0, 3, 3);

    // Black eyes with white reflection
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 6, 2, 2);
    ctx.fillRect(10, 6, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, 6, 1, 1);
    ctx.fillRect(10, 6, 1, 1);

    // Muzzle / nose
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(5, 9, 6, 5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 9, 2, 2); // Black nose
  }, 'wolf_head');
}

// -------------------------------------------------------------
// 7. SHEEP TEXTURES (Fluffy Wool & Face)
// -------------------------------------------------------------

export function getSheepWoolTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const woolPalette = ['#f8fafc', '#f1f5f9', '#e2e8f0', '#ffffff', '#cbd5e1'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 21.1 + y * 49.3) * 43758.5453) % 1;
        ctx.fillStyle = woolPalette[Math.floor(Math.abs(rand) * woolPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'sheep_wool');
}

export function getSheepFaceTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    ctx.fillStyle = '#d4a373'; // Tan skin
    ctx.fillRect(0, 0, 16, 16);

    // Wool fleece on forehead
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 16, 5);

    // Eyes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2, 7, 2, 2);
    ctx.fillRect(12, 7, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 7, 1, 1);
    ctx.fillRect(12, 7, 1, 1);

    // Soft pinkish nose
    ctx.fillStyle = '#c48a56';
    ctx.fillRect(6, 11, 4, 3);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(7, 13, 2, 1);
  }, 'sheep_face');
}

// -------------------------------------------------------------
// 8. AXOLOTL TEXTURES
// -------------------------------------------------------------

export function getAxolotlBodyTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const pinkPalette = ['#f472b6', '#fbcfe8', '#ec4899', '#f9a8d4'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 15.3 + y * 61.7) * 43758.5453) % 1;
        ctx.fillStyle = pinkPalette[Math.floor(Math.abs(rand) * pinkPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'axolotl_body');
}

// -------------------------------------------------------------
// 9. CREEPER TEXTURE (Camouflage Greens)
// -------------------------------------------------------------

export function getCreeperTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const creeperPalette = [
      '#16a34a', '#22c55e', '#15803d', '#4ade80', '#14532d', '#166534', '#86efac'
    ];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 11.7 + y * 29.3) * 43758.5453) % 1;
        ctx.fillStyle = creeperPalette[Math.floor(Math.abs(rand) * creeperPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'creeper_skin');
}

// -------------------------------------------------------------
// 10. ENDERMAN TEXTURE (Void Obsidian & Glowing Eyes)
// -------------------------------------------------------------

export function getEndermanBodyTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    const endPalette = ['#090d16', '#0f172a', '#020617', '#111827', '#171026'];
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const rand = (Math.sin(x * 19.3 + y * 83.1) * 43758.5453) % 1;
        ctx.fillStyle = endPalette[Math.floor(Math.abs(rand) * endPalette.length)];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, 'enderman_body');
}

export function getEndermanHeadTexture(): THREE.CanvasTexture {
  return createPixelTexture(16, 16, (ctx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 16, 16);

    // Glowing Purple Eyes (4 pixels wide each in authentic Enderman proportion)
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(2, 7, 4, 1);
    ctx.fillRect(10, 7, 4, 1);
    ctx.fillStyle = '#e879f9'; // Bright center pupil
    ctx.fillRect(3, 7, 2, 1);
    ctx.fillRect(11, 7, 2, 1);
  }, 'enderman_head');
}
