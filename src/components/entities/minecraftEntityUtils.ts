import * as THREE from 'three';
import modelsData from '../../config/minecraftEntityModels.json';
import { MOB_REGISTRY, PLAYER_REGISTRY } from '../../config/minecraftEntityConfig';
import type { MobKey, PlayerSkinKey, EntityCameraConfig } from '../../config/minecraftEntityConfig';

// Polyfill Three.js r186 frustum intersection methods if missing on prototype
if (typeof (THREE.Mesh.prototype as any).intersectsFrustum !== 'function') {
  (THREE.Mesh.prototype as any).intersectsFrustum = function (frustum: any) {
    return frustum.intersectsObject(this);
  };
}
if (typeof (THREE.Object3D.prototype as any).intersectsFrustum !== 'function') {
  (THREE.Object3D.prototype as any).intersectsFrustum = function (frustum: any) {
    return frustum.intersectsObject(this);
  };
}

export interface BedrockCube {
  origin: [number, number, number];
  size: [number, number, number];
  uv: [number, number];
  inflate?: number;
  rotation?: [number, number, number];
  pivot?: [number, number, number];
  mirror?: boolean;
}

export interface BedrockBone {
  name: string;
  parent?: string;
  pivot?: [number, number, number];
  rotation?: [number, number, number];
  bind_pose_rotation?: [number, number, number];
  mirror?: boolean;
  cubes?: BedrockCube[];
}

export interface BedrockGeometry {
  texturewidth: number;
  textureheight: number;
  bones: BedrockBone[];
}

// -------------------------------------------------------------
// 1. CANONICAL MINECRAFT BOX UV MAPPING
// -------------------------------------------------------------
export function setBedrockBoxUVs(
  box: THREE.BoxGeometry,
  u: number,
  v: number,
  width: number,
  height: number,
  depth: number,
  textureWidth: number,
  textureHeight: number,
  mirrorU: boolean = false
): void {
  const uv = (px: number, py: number) => {
    return new THREE.Vector2(px / textureWidth, 1.0 - py / textureHeight);
  };

  // Face 0: +X (Left face in Bedrock space)
  let uvPosX = [
    uv(u + 2 * depth + width, v + depth),
    uv(u + depth + width, v + depth),
    uv(u + 2 * depth + width, v + depth + height),
    uv(u + depth + width, v + depth + height),
  ];

  // Face 1: -X (Right face in Bedrock space)
  let uvNegX = [
    uv(u + depth, v + depth),
    uv(u, v + depth),
    uv(u + depth, v + depth + height),
    uv(u, v + depth + height),
  ];

  // Face 2: +Y (Top face)
  let uvPosY = [
    uv(u + depth, v + depth),
    uv(u + depth + width, v + depth),
    uv(u + depth, v),
    uv(u + depth + width, v),
  ];

  // Face 3: -Y (Bottom face)
  let uvNegY = [
    uv(u + depth + width, v),
    uv(u + depth + 2 * width, v),
    uv(u + depth + width, v + depth),
    uv(u + depth + 2 * width, v + depth),
  ];

  // Face 4: +Z (Back face / South in Bedrock space)
  let uvPosZ = [
    uv(u + 2 * depth + 2 * width, v + depth),
    uv(u + 2 * depth + width, v + depth),
    uv(u + 2 * depth + 2 * width, v + depth + height),
    uv(u + 2 * depth + width, v + depth + height),
  ];

  // Face 5: -Z (Front face / North in Bedrock space)
  let uvNegZ = [
    uv(u + depth + width, v + depth),
    uv(u + depth, v + depth),
    uv(u + depth + width, v + depth + height),
    uv(u + depth, v + depth + height),
  ];

  if (mirrorU) {
    const flipQuad = (quad: THREE.Vector2[]) => [quad[1], quad[0], quad[3], quad[2]];
    const tmpPosX = flipQuad(uvNegX);
    const tmpNegX = flipQuad(uvPosX);
    uvPosX = tmpPosX;
    uvNegX = tmpNegX;
    uvPosY = flipQuad(uvPosY);
    uvNegY = flipQuad(uvNegY);
    uvPosZ = flipQuad(uvPosZ);
    uvNegZ = flipQuad(uvNegZ);
  }

  const newUVData: number[] = [];
  for (const uvArray of [uvPosX, uvNegX, uvPosY, uvNegY, uvPosZ, uvNegZ]) {
    for (const p of uvArray) {
      newUVData.push(p.x, p.y);
    }
  }
  box.setAttribute('uv', new THREE.Float32BufferAttribute(newUVData, 2));
}

// -------------------------------------------------------------
// 2. TEXTURE LOADER & CACHING
// -------------------------------------------------------------
const textureCache = new Map<string, THREE.Texture>();

export function getNearestTexture(url: string): THREE.Texture {
  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }
  const loader = new THREE.TextureLoader();
  const tex = loader.load(url);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);
  return tex;
}

// -------------------------------------------------------------
// 3. AUTHENTIC 3D HELD WEAPONS
// -------------------------------------------------------------
export function createHeldSwordMesh(type: 'diamond' | 'netherite'): THREE.Group {
  const group = new THREE.Group();
  group.name = 'held-sword';
  const texUrl =
    type === 'diamond'
      ? '/assets/textures/entity/diamond_sword.png'
      : '/assets/textures/entity/netherite_sword.png';
  const texture = getNearestTexture(texUrl);

  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: type === 'diamond' ? 0.3 : 0.6,
    metalness: type === 'diamond' ? 0.2 : 0.4,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
  });

  const geo = new THREE.PlaneGeometry(12, 12);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.rotation.y = Math.PI / 2;
  mesh.rotation.z = -Math.PI / 4;
  mesh.position.set(0, 4, -4);
  group.add(mesh);

  return group;
}

export function createHeldTorchMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'held-torch';
  const woodMat = new THREE.MeshStandardMaterial({ color: '#854d0e', roughness: 0.9 });
  const flameMat = new THREE.MeshBasicMaterial({ color: '#f59e0b' });

  const stick = new THREE.Mesh(new THREE.BoxGeometry(1.5, 7, 1.5), woodMat);
  stick.position.set(0, 2, 0);
  stick.castShadow = true;
  group.add(stick);

  const head = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2, 1.8), flameMat);
  head.position.set(0, 5.5, 0);
  group.add(head);

  const light = new THREE.PointLight('#f59e0b', 1.5, 6);
  light.position.set(0, 6, 0);
  group.add(light);

  group.rotation.x = -Math.PI / 6;
  return group;
}

// -------------------------------------------------------------
// 4. 3D AUTHENTIC MINECRAFT ARMOR FOR PLAYERS
// -------------------------------------------------------------
export function attachPlayerArmor(
  bones: Map<string, THREE.Group>,
  isSlim: boolean,
  armorType: 'diamond' | 'netherite'
): void {
  const layer1Url =
    armorType === 'diamond'
      ? '/assets/textures/entity/diamond_layer_1.png'
      : '/assets/textures/entity/netherite_layer_1.png';
  const layer2Url =
    armorType === 'diamond'
      ? '/assets/textures/entity/diamond_layer_2.png'
      : '/assets/textures/entity/netherite_layer_2.png';

  const mat1 = new THREE.MeshStandardMaterial({
    map: getNearestTexture(layer1Url),
    roughness: armorType === 'diamond' ? 0.35 : 0.7,
    metalness: armorType === 'diamond' ? 0.15 : 0.3,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  const mat2 = new THREE.MeshStandardMaterial({
    map: getNearestTexture(layer2Url),
    roughness: armorType === 'diamond' ? 0.35 : 0.7,
    metalness: armorType === 'diamond' ? 0.15 : 0.3,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  // 1. HELMET on head (8x8x8 inflate ~0.6 -> 9.2x9.2x9.2)
  const headBone = bones.get('head');
  if (headBone) {
    const helmetGeo = new THREE.BoxGeometry(9.2, 9.2, 9.2);
    setBedrockBoxUVs(helmetGeo, 0, 0, 8, 8, 8, 64, 32);
    const helmet = new THREE.Mesh(helmetGeo, mat1);
    helmet.name = 'armor-helmet';
    helmet.castShadow = true;
    helmet.position.set(0, 4, 0);
    headBone.add(helmet);
  }

  // 2. CHESTPLATE BODY on body (8x12x4 inflate ~0.6 -> 9.2x13.2x5.2)
  const bodyBone = bones.get('body');
  if (bodyBone) {
    const chestGeo = new THREE.BoxGeometry(9.2, 13.2, 5.2);
    setBedrockBoxUVs(chestGeo, 16, 16, 8, 12, 4, 64, 32);
    const chest = new THREE.Mesh(chestGeo, mat1);
    chest.name = 'armor-chestplate';
    chest.castShadow = true;
    chest.position.set(0, -6, 0);
    bodyBone.add(chest);

    // Leggings waist on body (Layer 2)
    const waistGeo = new THREE.BoxGeometry(8.6, 12.6, 4.6);
    setBedrockBoxUVs(waistGeo, 16, 16, 8, 12, 4, 64, 32);
    const waist = new THREE.Mesh(waistGeo, mat2);
    waist.name = 'armor-leggings-waist';
    waist.castShadow = true;
    waist.position.set(0, -6, 0);
    bodyBone.add(waist);
  }

  // 3. CHESTPLATE SLEEVES
  const rArmBone = bones.get('rightArm');
  if (rArmBone) {
    const armW = isSlim ? 4.2 : 5.2;
    const rArmGeo = new THREE.BoxGeometry(armW, 13.2, 5.2);
    setBedrockBoxUVs(rArmGeo, 40, 16, 4, 12, 4, 64, 32);
    const rArm = new THREE.Mesh(rArmGeo, mat1);
    rArm.name = 'armor-right-arm';
    rArm.castShadow = true;
    rArm.position.set(isSlim ? -0.5 : -1.0, isSlim ? -3.5 : -4.0, 0);
    rArmBone.add(rArm);
  }

  const lArmBone = bones.get('leftArm');
  if (lArmBone) {
    const armW = isSlim ? 4.2 : 5.2;
    const lArmGeo = new THREE.BoxGeometry(armW, 13.2, 5.2);
    setBedrockBoxUVs(lArmGeo, 40, 16, 4, 12, 4, 64, 32, true);
    const lArm = new THREE.Mesh(lArmGeo, mat1);
    lArm.name = 'armor-left-arm';
    lArm.castShadow = true;
    lArm.position.set(isSlim ? 0.5 : 1.0, isSlim ? -3.5 : -4.0, 0);
    lArmBone.add(lArm);
  }

  // 4. LEGGINGS & BOOTS ON LEGS
  const rLegBone = bones.get('rightLeg');
  if (rLegBone) {
    // Leggings right (Layer 2)
    const rLeggingsGeo = new THREE.BoxGeometry(4.6, 12.6, 4.6);
    setBedrockBoxUVs(rLeggingsGeo, 0, 16, 4, 12, 4, 64, 32);
    const rLeggings = new THREE.Mesh(rLeggingsGeo, mat2);
    rLeggings.name = 'armor-leggings-right';
    rLeggings.castShadow = true;
    rLeggings.position.set(0, -6, 0);
    rLegBone.add(rLeggings);

    // Boots right (Layer 1)
    const rBootsGeo = new THREE.BoxGeometry(5.2, 13.2, 5.2);
    setBedrockBoxUVs(rBootsGeo, 0, 16, 4, 12, 4, 64, 32);
    const rBoots = new THREE.Mesh(rBootsGeo, mat1);
    rBoots.name = 'armor-boots-right';
    rBoots.castShadow = true;
    rBoots.position.set(0, -6, 0);
    rLegBone.add(rBoots);
  }

  const lLegBone = bones.get('leftLeg');
  if (lLegBone) {
    // Leggings left (Layer 2)
    const lLeggingsGeo = new THREE.BoxGeometry(4.6, 12.6, 4.6);
    setBedrockBoxUVs(lLeggingsGeo, 0, 16, 4, 12, 4, 64, 32, true);
    const lLeggings = new THREE.Mesh(lLeggingsGeo, mat2);
    lLeggings.name = 'armor-leggings-left';
    lLeggings.castShadow = true;
    lLeggings.position.set(0, -6, 0);
    lLegBone.add(lLeggings);

    // Boots left (Layer 1)
    const lBootsGeo = new THREE.BoxGeometry(5.2, 13.2, 5.2);
    setBedrockBoxUVs(lBootsGeo, 0, 16, 4, 12, 4, 64, 32, true);
    const lBoots = new THREE.Mesh(lBootsGeo, mat1);
    lBoots.name = 'armor-boots-left';
    lBoots.castShadow = true;
    lBoots.position.set(0, -6, 0);
    lLegBone.add(lBoots);
  }
}

// -------------------------------------------------------------
// 5. BUILD PLAYER MODEL (NATIVE THREE.JS BEDROCK GEOMETRY)
// -------------------------------------------------------------
export interface PlayerModelBones {
  head: THREE.Group;
  body: THREE.Group;
  rightArm: THREE.Group;
  leftArm: THREE.Group;
  rightLeg: THREE.Group;
  leftLeg: THREE.Group;
}

export interface CanonicalPlayer {
  skin: PlayerModelBones;
  bones: Map<string, THREE.Group>;
}

export function buildPlayerModel(
  skinKey: PlayerSkinKey,
  heldItem: 'sword' | 'torch' | 'none' = 'sword'
): { root: THREE.Group; player: CanonicalPlayer } {
  const config = PLAYER_REGISTRY[skinKey] || PLAYER_REGISTRY['player-steve'];
  const isSlim = Boolean(config.isSlim);

  const rawEntity = isSlim
    ? (modelsData as Record<string, any>).player_slim
    : (modelsData as Record<string, any>).player;
  const geom: BedrockGeometry = rawEntity.geometry.default;

  const skinTex = getNearestTexture(config.skinUrl);

  const baseMat = new THREE.MeshStandardMaterial({
    map: skinTex,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const overlayMat = new THREE.MeshStandardMaterial({
    map: skinTex,
    roughness: 0.85,
    metalness: 0.05,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  const rootGroup = new THREE.Group();
  const bones = new Map<string, THREE.Group>();

  // 1. Create bone groups and their cubes
  for (const b of geom.bones) {
    const g = new THREE.Group();
    g.name = b.name;
    const pivot = b.pivot || [0, 0, 0];
    g.position.set(pivot[0], pivot[1], pivot[2]);

    if (b.cubes) {
      for (const c of b.cubes) {
        const sx = c.size[0];
        const sy = c.size[1];
        const sz = c.size[2];
        const inf = c.inflate || 0;
        const boxGeo = new THREE.BoxGeometry(sx + 2 * inf, sy + 2 * inf, sz + 2 * inf);
        const isMirror = Boolean(b.mirror || c.mirror);
        setBedrockBoxUVs(boxGeo, c.uv[0], c.uv[1], sx, sy, sz, 64, 64, isMirror);

        // Outer layers: hat, jacket, sleeves, pants have inflate > 0
        const isOverlay =
          inf > 0 ||
          ['hat', 'jacket', 'leftSleeve', 'rightSleeve', 'leftPants', 'rightPants'].includes(b.name);
        const mesh = new THREE.Mesh(boxGeo, isOverlay ? overlayMat : baseMat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.position.set(
          c.origin[0] + c.size[0] / 2 - pivot[0],
          c.origin[1] + c.size[1] / 2 - pivot[1],
          c.origin[2] + c.size[2] / 2 - pivot[2]
        );
        g.add(mesh);
      }
    }
    bones.set(b.name, g);
  }

  // 2. Assemble bone hierarchy
  const bonesByName = new Map(geom.bones.map((b) => [b.name.toLowerCase(), b]));
  for (const b of geom.bones) {
    const g = bones.get(b.name)!;
    const parentJson = b.parent ? bonesByName.get(b.parent.toLowerCase()) : null;
    if (parentJson) {
      const parentGroup = bones.get(parentJson.name);
      if (parentGroup) {
        const parentPivot = parentJson.pivot || [0, 0, 0];
        g.position.x -= parentPivot[0];
        g.position.y -= parentPivot[1];
        g.position.z -= parentPivot[2];
        parentGroup.add(g);
        continue;
      }
    }
    rootGroup.add(g);
  }

  // 3. Attach full 3D Armor for armored variants
  if (skinKey === 'player-diamond-knight') {
    attachPlayerArmor(bones, isSlim, 'diamond');
  } else if (skinKey === 'player-netherite-paladin') {
    attachPlayerArmor(bones, isSlim, 'netherite');
  }

  // 4. Attach held item to right arm
  const rArmBone = bones.get('rightArm');
  if (rArmBone) {
    if (heldItem === 'sword') {
      const swordType = skinKey === 'player-netherite-paladin' ? 'netherite' : 'diamond';
      const sword = createHeldSwordMesh(swordType);
      sword.position.set(isSlim ? -0.5 : -1.0, -9.5, -1);
      rArmBone.add(sword);
    } else if (heldItem === 'torch') {
      const torch = createHeldTorchMesh();
      torch.position.set(isSlim ? -0.5 : -1.0, -9.5, -1);
      rArmBone.add(torch);
    }
  }

  // Scale: 1 block = 16 pixels
  // Facing camera: rotate around Y by Math.PI so front faces viewer
  rootGroup.scale.set(1 / 16, 1 / 16, 1 / 16);
  rootGroup.rotation.y = Math.PI;

  const playerObj: CanonicalPlayer = {
    skin: {
      head: bones.get('head') || new THREE.Group(),
      body: bones.get('body') || new THREE.Group(),
      rightArm: bones.get('rightArm') || new THREE.Group(),
      leftArm: bones.get('leftArm') || new THREE.Group(),
      rightLeg: bones.get('rightLeg') || new THREE.Group(),
      leftLeg: bones.get('leftLeg') || new THREE.Group(),
    },
    bones,
  };

  return { root: rootGroup, player: playerObj };
}

// -------------------------------------------------------------
// 6. BUILD AUTHENTIC BEDROCK MOB MODEL
// -------------------------------------------------------------
export function buildBedrockMob(mobKey: MobKey): {
  root: THREE.Group;
  bones: Map<string, THREE.Group>;
} {
  const rawEntity = (modelsData as Record<string, any>)[mobKey];
  if (!rawEntity || !rawEntity.geometry) {
    return { root: new THREE.Group(), bones: new Map() };
  }

  const primaryGeom: BedrockGeometry = rawEntity.geometry.sheared || rawEntity.geometry.default;
  const secondaryGeom: BedrockGeometry | null =
    mobKey === 'sheep'
      ? rawEntity.geometry.default
      : mobKey === 'slime'
      ? rawEntity.geometry.armor
      : null;

  const texture = getNearestTexture(MOB_REGISTRY[mobKey].texture);
  const primaryMat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.85,
    metalness: 0.05,
    transparent: mobKey === 'allay' || mobKey === 'slime',
    opacity: mobKey === 'allay' ? 0.95 : 1.0,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  });

  let secondaryMat: THREE.MeshStandardMaterial | null = null;
  if (mobKey === 'sheep') {
    const furTex = getNearestTexture('/assets/textures/entity/sheep_fur.png');
    secondaryMat = new THREE.MeshStandardMaterial({
      map: furTex,
      roughness: 0.9,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.DoubleSide,
    });
  } else if (mobKey === 'slime') {
    secondaryMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
  }

  const rootGroup = new THREE.Group();
  const bones = new Map<string, THREE.Group>();

  // Helper to create bone mesh
  function addCubesToBone(
    boneGroup: THREE.Group,
    boneJson: BedrockBone,
    geom: BedrockGeometry,
    material: THREE.Material
  ) {
    if (!boneJson.cubes) return;
    const pivot = boneJson.pivot || [0, 0, 0];
    const texW = geom.texturewidth || 64;
    const texH = geom.textureheight || 32;

    for (const c of boneJson.cubes) {
      // Bedrock sizes: 0-thickness elements (wings, stinger) get thin thickness
      const sx = Math.max(c.size[0], 0.02);
      const sy = Math.max(c.size[1], 0.02);
      const sz = Math.max(c.size[2], 0.02);
      const inf = c.inflate || 0;

      const boxGeo = new THREE.BoxGeometry(sx + 2 * inf, sy + 2 * inf, sz + 2 * inf);
      const isMirror = Boolean(boneJson.mirror || c.mirror);
      setBedrockBoxUVs(boxGeo, c.uv[0], c.uv[1], sx, sy, sz, texW, texH, isMirror);

      const mesh = new THREE.Mesh(boxGeo, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Position cube relative to bone pivot
      const cx = c.origin[0] + c.size[0] / 2 - pivot[0];
      const cy = c.origin[1] + c.size[1] / 2 - pivot[1];
      const cz = c.origin[2] + c.size[2] / 2 - pivot[2];

      if (c.rotation && c.pivot) {
        const subGroup = new THREE.Group();
        subGroup.position.set(
          c.pivot[0] - pivot[0],
          c.pivot[1] - pivot[1],
          c.pivot[2] - pivot[2]
        );
        subGroup.rotation.x = (-c.rotation[0] * Math.PI) / 180;
        subGroup.rotation.y = (-c.rotation[1] * Math.PI) / 180;
        subGroup.rotation.z = (-c.rotation[2] * Math.PI) / 180;

        mesh.position.set(
          c.origin[0] + c.size[0] / 2 - c.pivot[0],
          c.origin[1] + c.size[1] / 2 - c.pivot[1],
          c.origin[2] + c.size[2] / 2 - c.pivot[2]
        );
        subGroup.add(mesh);
        boneGroup.add(subGroup);
      } else {
        mesh.position.set(cx, cy, cz);
        boneGroup.add(mesh);
      }
    }
  }

  // 1. Instantiate all primary bones
  for (const b of primaryGeom.bones) {
    const g = new THREE.Group();
    g.name = b.name;
    const pivot = b.pivot || [0, 0, 0];
    g.position.set(pivot[0], pivot[1], pivot[2]);

    if (b.bind_pose_rotation) {
      g.rotation.x = (b.bind_pose_rotation[0] * Math.PI) / 180;
      g.rotation.y = (b.bind_pose_rotation[1] * Math.PI) / 180;
      g.rotation.z = (b.bind_pose_rotation[2] * Math.PI) / 180;
    } else if (b.rotation) {
      g.rotation.x = (b.rotation[0] * Math.PI) / 180;
      g.rotation.y = (b.rotation[1] * Math.PI) / 180;
      g.rotation.z = (b.rotation[2] * Math.PI) / 180;
    }

    addCubesToBone(g, b, primaryGeom, primaryMat);
    bones.set(b.name, g);
  }

  // 2. Add secondary geometry (e.g. Sheep Fluffy Wool, Slime Outer Gel)
  if (secondaryGeom && secondaryMat) {
    for (const sb of secondaryGeom.bones) {
      let targetBone = bones.get(sb.name);
      if (!targetBone) {
        targetBone = new THREE.Group();
        targetBone.name = sb.name + '_secondary';
        const pivot = sb.pivot || [0, 0, 0];
        targetBone.position.set(pivot[0], pivot[1], pivot[2]);
        bones.set(sb.name + '_secondary', targetBone);
      }
      addCubesToBone(targetBone, sb, secondaryGeom, secondaryMat);
    }
  }

  // 3. Assemble hierarchy with canonical Minecraft quadruped rules
  const bonesByName = new Map(primaryGeom.bones.map((b) => [b.name.toLowerCase(), b]));

  for (const b of primaryGeom.bones) {
    const g = bones.get(b.name)!;

    // Quadrupeds (Sheep, Pig):
    // Legs and head should remain upright and grounded, unaffected by body's horizontal pitch
    const isQuadrupedDetached =
      (mobKey === 'sheep' || mobKey === 'pig') &&
      (b.name.startsWith('leg') || b.name === 'head');

    const parentName = isQuadrupedDetached ? undefined : b.parent;
    const parentJson = parentName ? bonesByName.get(parentName.toLowerCase()) : null;

    if (parentJson) {
      const parentGroup = bones.get(parentJson.name);
      if (parentGroup) {
        const parentPivot = parentJson.pivot || [0, 0, 0];
        g.position.x -= parentPivot[0];
        g.position.y -= parentPivot[1];
        g.position.z -= parentPivot[2];
        parentGroup.add(g);
        continue;
      }
    }
    rootGroup.add(g);
  }

  // Wolf special: body lies horizontally between hips and shoulders
  if (mobKey === 'wolf') {
    const body = bones.get('body');
    if (body) {
      body.rotation.x = Math.PI / 2;
    }
  }

  // Enderman special: shift base so feet touch ground at Y = 0
  if (mobKey === 'enderman') {
    rootGroup.position.y = 4 / 16;
  }

  // Minecraft scale: 1 block = 16 pixels
  // Facing camera: rotate around Y by Math.PI so front faces viewer
  rootGroup.scale.set(1 / 16, 1 / 16, 1 / 16);
  rootGroup.rotation.y = Math.PI;

  return { root: rootGroup, bones };
}

// -------------------------------------------------------------
// 7. ENTITY-SPECIFIC DYNAMIC CAMERA FRAMING
// -------------------------------------------------------------
export function getEntityCameraFraming(
  entityId: string,
  rootObject?: THREE.Object3D
): EntityCameraConfig {
  // If an instantiated 3D object is provided, calculate framing from true bounding box
  if (rootObject) {
    rootObject.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    box.getSize(size);

    const fov = 32;
    const tanHalfFov = Math.tan(((fov / 2) * Math.PI) / 180);
    const height = Math.max(size.y, 0.4);

    // Target visual occupancy: 68% of viewport height
    const targetOccupancy = 0.68;
    const requiredDistance = height / (2 * targetOccupancy * tanHalfFov);
    // Add extra distance if width/depth is large
    const horizontalDistance = Math.max(size.x, size.z) / (2 * 0.75 * tanHalfFov);
    const finalDistance = Math.max(requiredDistance, horizontalDistance, 1.8);

    const centerY = (box.min.y + box.max.y) / 2;
    const pitchAngle = (10 * Math.PI) / 180; // 10 degree downward pitch

    const camY = centerY + finalDistance * Math.sin(pitchAngle);
    const camZ = finalDistance * Math.cos(pitchAngle);

    return {
      target: [0, Number(centerY.toFixed(2)), 0],
      position: [0, Number(camY.toFixed(2)), Number(camZ.toFixed(2))],
      fov,
    };
  }

  // Canonical fallback framing table calibrated to each entity's true proportions
  const TABLE: Record<string, EntityCameraConfig> = {
    'player-steve': {
      target: [0, 1.0, 0],
      position: [0, 1.85, 5.2],
      fov: 32,
    },
    'player-alex': {
      target: [0, 1.0, 0],
      position: [0, 1.85, 5.2],
      fov: 32,
    },
    'player-diamond-knight': {
      target: [0, 1.0, 0],
      position: [0, 1.85, 5.4],
      fov: 32,
    },
    'player-netherite-paladin': {
      target: [0, 1.0, 0],
      position: [0, 1.85, 5.4],
      fov: 32,
    },
    'mob-creeper': {
      target: [0, 0.82, 0],
      position: [0, 1.45, 4.4],
      fov: 32,
    },
    'mob-wolf': {
      target: [0, 0.45, 0],
      position: [0, 0.95, 3.2],
      fov: 32,
    },
    'mob-sheep': {
      target: [0, 0.58, 0],
      position: [0, 1.4, 3.9],
      fov: 32,
    },
    'mob-pig': {
      target: [0, 0.48, 0],
      position: [0, 1.2, 3.55],
      fov: 32,
    },
    'mob-bee': {
      target: [0, 0.35, 0],
      position: [0, 0.7, 2.4],
      fov: 32,
    },
    'mob-enderman': {
      target: [0, 1.45, 0],
      position: [0, 2.7, 7.4],
      fov: 32,
    },
    'mob-slime': {
      target: [0, 0.28, 0],
      position: [0, 0.6, 2.0],
      fov: 32,
    },
    'mob-allay': {
      target: [0, 0.38, 0],
      position: [0, 0.75, 2.4],
      fov: 32,
    },
    'mob-axolotl': {
      target: [0, 0.22, 0],
      position: [0, 0.6, 2.4],
      fov: 32,
    },
  };

  return (
    TABLE[entityId] || {
      target: [0, 1.0, 0],
      position: [0, 1.85, 5.2],
      fov: 32,
    }
  );
}
