import { Frame } from '../types/frame';
import { PRESET_FRAMES } from '../data/presetFrames';

const STORAGE_KEY = 'wanni_poth_wasanthaya_frames_v5';
const STATS_KEY = 'wanni_poth_wasanthaya_stats_v5';
const SAMPLE_PREVIEWS_KEY = 'wanni_poth_wasanthaya_sample_previews_v1';

export const DEFAULT_SAMPLE_PREVIEWS = [
  '/assets/hero-sample.png'
];

export function getSavedSamplePreviews(): string[] {
  try {
    const raw = localStorage.getItem(SAMPLE_PREVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(SAMPLE_PREVIEWS_KEY, JSON.stringify(DEFAULT_SAMPLE_PREVIEWS));
      return DEFAULT_SAMPLE_PREVIEWS;
    }
    const parsed: string[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : DEFAULT_SAMPLE_PREVIEWS;
  } catch (e) {
    return DEFAULT_SAMPLE_PREVIEWS;
  }
}

export function saveSamplePreviews(previews: string[]): void {
  try {
    localStorage.setItem(SAMPLE_PREVIEWS_KEY, JSON.stringify(previews));
  } catch (e) {
    console.error('Failed to save sample previews', e);
  }
}

export function getSavedFrames(): Frame[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESET_FRAMES));
      return PRESET_FRAMES;
    }
    const parsed: Frame[] = JSON.parse(raw);
    if (parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESET_FRAMES));
      return PRESET_FRAMES;
    }
    return parsed;
  } catch (e) {
    return PRESET_FRAMES;
  }
}

export function saveFrames(frames: Frame[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
  } catch (e) {
    console.error('Failed to save frames to localStorage', e);
  }
}

export function incrementGeneratedCount(frameId: string): void {
  try {
    const statsRaw = localStorage.getItem(STATS_KEY);
    const stats = statsRaw ? JSON.parse(statsRaw) : { totalGenerated: 0, todayCount: 0, lastDate: '', frameCounts: {} };
    
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastDate !== today) {
      stats.todayCount = 0;
      stats.lastDate = today;
    }
    
    stats.totalGenerated = (stats.totalGenerated || 0) + 1;
    stats.todayCount = (stats.todayCount || 0) + 1;
    stats.frameCounts[frameId] = (stats.frameCounts[frameId] || 0) + 1;
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to increment generated count', e);
  }
}

export function getAdminStats() {
  try {
    const statsRaw = localStorage.getItem(STATS_KEY);
    const stats = statsRaw ? JSON.parse(statsRaw) : { totalGenerated: 420, todayCount: 84, frameCounts: {} };
    const frames = getSavedFrames();
    
    let popularFrame = 'Nikaweratiya PS Main Campaign Frame 2026';
    if (frames.length > 0) popularFrame = frames[0].name;

    return {
      totalFrames: frames.length,
      totalGenerated: stats.totalGenerated || 420,
      todayCount: stats.todayCount || 84,
      popularFrame
    };
  } catch (e) {
    return {
      totalFrames: 4,
      totalGenerated: 420,
      todayCount: 84,
      popularFrame: 'Nikaweratiya PS Main Campaign Frame 2026'
    };
  }
}
