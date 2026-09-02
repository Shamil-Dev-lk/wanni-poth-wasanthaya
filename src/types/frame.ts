export interface PhotoArea {
  x: number;       // Center X or Top-Left X (in 1080x1080 standard frame px)
  y: number;       // Center Y or Top-Left Y
  width: number;   // Cutout width
  height: number;  // Cutout height
  radius: number;  // Corner radius (0 for square, >0 for rounded, 50% for circle)
  shape?: 'square' | 'rounded' | 'circle';
}

export interface Frame {
  id: string;
  name: string;
  category: string;
  image: string;       // URL/DataURI of overlay
  enabled: boolean;
  photoArea: PhotoArea;
  description: string;
  badge?: string;
  createdAt?: string;
}

export type ActiveStep = 'frame' | 'upload' | 'edit' | 'download';

export interface AdminStats {
  totalFrames: number;
  totalGenerated: number;
  todayCount: number;
  popularFrame: string;
}
