import React, { useRef, useEffect } from 'react';
import { PhotoArea } from '../types/frame';
import { drawRoundedRect } from '../utils/canvasHelper';

interface AdminPhotoAreaEditorProps {
  frameOverlayUrl: string;
  photoArea: PhotoArea;
  onChange: (updated: PhotoArea) => void;
}

export const AdminPhotoAreaEditor: React.FC<AdminPhotoAreaEditorProps> = ({
  frameOverlayUrl,
  photoArea,
  onChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!frameOverlayUrl) return;
    const img = new Image();
    img.src = frameOverlayUrl;
    img.onload = () => {
      imgRef.current = img;
      drawPreview();
    };
  }, [frameOverlayUrl]);

  const drawPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background checkered grid
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    for (let i = 0; i < 1080; i += 90) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1080);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1080, i);
      ctx.stroke();
    }

    const { x, y, width, height, radius, shape } = photoArea;

    // Render sample user photo underneath cutout area
    ctx.save();
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (radius > 0) {
      drawRoundedRect(ctx, x, y, width, height, radius);
      ctx.clip();
    } else {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
    }

    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('USER PHOTO CUTOUT AREA', x + width / 2, y + height / 2);
    ctx.restore();

    // Draw Frame Overlay PNG on top
    if (imgRef.current && imgRef.current.complete) {
      ctx.drawImage(imgRef.current, 0, 0, 1080, 1080);
    }

    // Highlight Cutout Bounds
    ctx.strokeStyle = '#E31E24';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (radius > 0) {
      drawRoundedRect(ctx, x, y, width, height, radius);
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, width, height);
    }
    ctx.setLineDash([]);
  };

  useEffect(() => {
    drawPreview();
  }, [photoArea, frameOverlayUrl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Visual Canvas Preview */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="relative w-full max-w-[420px] aspect-square bg-white rounded-2xl overflow-hidden shadow-md border-2 border-gray-300">
          <canvas ref={canvasRef} className="w-full h-full object-contain block" />
        </div>
        <p className="text-[11px] text-gray-500 mt-2">
          Red dashed line shows active photo cutout bounds (1080×1080 canvas native).
        </p>
      </div>

      {/* Photo Area Configuration Sliders */}
      <div className="lg:col-span-6 space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
        <h4 className="text-sm font-bold text-gray-900 border-b pb-2">
          Photo Area Settings
        </h4>

        {/* X Position */}
        <div>
          <label className="flex justify-between text-xs font-semibold text-gray-700">
            <span>X Position: {photoArea.x}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="1080"
            value={photoArea.x}
            onChange={(e) => onChange({ ...photoArea, x: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Y Position */}
        <div>
          <label className="flex justify-between text-xs font-semibold text-gray-700">
            <span>Y Position: {photoArea.y}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="1080"
            value={photoArea.y}
            onChange={(e) => onChange({ ...photoArea, y: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Width */}
        <div>
          <label className="flex justify-between text-xs font-semibold text-gray-700">
            <span>Width: {photoArea.width}px</span>
          </label>
          <input
            type="range"
            min="100"
            max="1080"
            value={photoArea.width}
            onChange={(e) => onChange({ ...photoArea, width: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Height */}
        <div>
          <label className="flex justify-between text-xs font-semibold text-gray-700">
            <span>Height: {photoArea.height}px</span>
          </label>
          <input
            type="range"
            min="100"
            max="1080"
            value={photoArea.height}
            onChange={(e) => onChange({ ...photoArea, height: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Corner Radius */}
        <div>
          <label className="flex justify-between text-xs font-semibold text-gray-700">
            <span>Corner Radius: {photoArea.radius}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="400"
            value={photoArea.radius}
            onChange={(e) => onChange({ ...photoArea, radius: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Shape */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Cutout Shape
          </label>
          <div className="flex space-x-2">
            {(['square', 'rounded', 'circle'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  onChange({
                    ...photoArea,
                    shape: s,
                    radius: s === 'circle' ? 400 : s === 'square' ? 0 : 24
                  })
                }
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize border ${
                  photoArea.shape === s
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
