import { Frame } from '../types/frame';

export const PRESET_FRAMES: Frame[] = [
  {
    id: 'wanni-main-2026',
    name: 'Nikaweratiya PS Main Campaign Frame 2026',
    category: 'Official Frames 2026',
    image: '/assets/frames/wanni-frame-main.png',
    enabled: true,
    photoArea: {
      x: 115,
      y: 115,
      width: 850,
      height: 850,
      radius: 425,
      shape: 'circle'
    },
    description: 'Official Photoshop high-resolution 2026 campaign frame for Wanni Poth Wasanthaya.',
    badge: 'Official 2026'
  },
  {
    id: 'wanni-hd-2026',
    name: 'Wanni Poth Wasanthaya 2026 HD Frame',
    category: 'Official Frames 2026',
    image: '/assets/frames/wanni-frame-hd.png',
    enabled: true,
    photoArea: {
      x: 115,
      y: 115,
      width: 850,
      height: 850,
      radius: 425,
      shape: 'circle'
    },
    description: 'High definition campaign frame overlay with Nikaweratiya Pradeshiya Sabha emblem.',
    badge: 'Featured'
  },
  {
    id: 'wanni-clean-2026',
    name: 'Nikaweratiya PS Clean Frame 2026',
    category: 'Official Frames 2026',
    image: '/assets/frames/wanni-frame-2026-clean.png',
    enabled: true,
    photoArea: {
      x: 115,
      y: 115,
      width: 850,
      height: 850,
      radius: 425,
      shape: 'circle'
    },
    description: 'Clean circular cutout frame design for library book donation supporters.',
    badge: 'Popular'
  },
  {
    id: 'wanni-badge-2026',
    name: 'Nikaweratiya PS Badge Frame 2026',
    category: 'Official Frames 2026',
    image: '/assets/frames/wanni-frame-2026-badge.png',
    enabled: true,
    photoArea: {
      x: 115,
      y: 115,
      width: 850,
      height: 850,
      radius: 425,
      shape: 'circle'
    },
    description: 'Classic circular campaign frame featuring "දිවි ඇතිතුරු අකුරු මිතුරු".',
    badge: 'Classic'
  }
];

export const presetFrames = PRESET_FRAMES;

export const defaultSamplePreviews: string[] = [
  '/assets/hero-sample.png'
];

export function generatePresetFrameOverlay(frameId: string): string {
  const found = PRESET_FRAMES.find((f) => f.id === frameId);
  if (found) return found.image;
  return '/assets/frames/wanni-frame-main.png';
}
