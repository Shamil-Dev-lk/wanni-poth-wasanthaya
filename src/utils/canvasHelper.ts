import { Frame, PhotoArea } from '../types/frame';

/**
 * Calculates initial cover scale and centered coordinates for photo fitting.
 */
export function calculateCoverFit(
  imgWidth: number,
  imgHeight: number,
  cropWidth: number,
  cropHeight: number
) {
  // Determine scale to cover crop box completely
  const scale = Math.max(cropWidth / imgWidth, cropHeight / imgHeight);
  
  // Calculate top-left position to center the image in crop area
  const fittedWidth = imgWidth * scale;
  const fittedHeight = imgHeight * scale;
  
  const initialX = (cropWidth - fittedWidth) / 2;
  const initialY = (cropHeight - fittedHeight) / 2;

  return {
    scale,
    fittedWidth,
    fittedHeight,
    initialX,
    initialY
  };
}

/**
 * Draws rounded rectangle path on canvas context.
 */
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/**
 * Renders user photo and frame overlay onto standard 1080x1080 canvas context.
 */
export function renderCanvasComposition(
  canvas: HTMLCanvasElement,
  userImage: HTMLImageElement | null,
  frameOverlay: HTMLImageElement | null,
  photoArea: PhotoArea,
  transform: { panX: number; panY: number; zoom: number },
  targetSize: number = 1080
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = targetSize;
  canvas.height = targetSize;

  // Clear background with soft off-white
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetSize, targetSize);

  const { x, y, width, height, radius, shape } = photoArea;

  // Draw user image if loaded
  if (userImage && userImage.complete && userImage.naturalWidth > 0) {
    ctx.save();

    // Set clipping region according to photoArea shape
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
    } else if (radius > 0) {
      drawRoundedRect(ctx, x, y, width, height, radius);
      ctx.clip();
    } else {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.closePath();
      ctx.clip();
    }

    // Fill background inside photo area with white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x, y, width, height);

    // Cover calculation
    const cover = calculateCoverFit(
      userImage.naturalWidth,
      userImage.naturalHeight,
      width,
      height
    );

    // Apply user zoom multiplier and pan offsets
    const currentScale = cover.scale * transform.zoom;
    const drawW = userImage.naturalWidth * currentScale;
    const drawH = userImage.naturalHeight * currentScale;

    // Center point relative to photoArea
    const drawX = x + (width - drawW) / 2 + transform.panX;
    const drawY = y + (height - drawH) / 2 + transform.panY;

    // Draw user image smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(userImage, drawX, drawY, drawW, drawH);

    ctx.restore();
  } else {
    // Placeholder background inside photo area if no photo uploaded yet
    ctx.save();
    if (radius > 0) {
      drawRoundedRect(ctx, x, y, width, height, radius);
      ctx.clip();
    } else {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
    }
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(x, y, width, height);
    
    // Subtle cross/plus icon
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + width / 2 - 30, y + height / 2);
    ctx.lineTo(x + width / 2 + 30, y + height / 2);
    ctx.moveTo(x + width / 2, y + height / 2 - 30);
    ctx.lineTo(x + width / 2, y + height / 2 + 30);
    ctx.stroke();
    ctx.restore();
  }

  // Draw frame overlay on top
  if (frameOverlay && frameOverlay.complete && frameOverlay.naturalWidth > 0) {
    ctx.drawImage(frameOverlay, 0, 0, targetSize, targetSize);
  }
}

/**
 * Universal high-compatibility canvas downloader for Mobile & Desktop.
 */
export function downloadCanvasImage(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg',
  filename: string
) {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const cleanFilename = filename.endsWith(`.${format === 'jpeg' ? 'jpg' : 'png'}`)
    ? filename
    : `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;

  // Try Blob URL approach first (highest mobile compatibility)
  if (canvas.toBlob) {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = cleanFilename;
          link.href = blobUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
          }, 4000);
          return;
        }

        // Fallback to Data URL if Blob creation returns null
        fallbackDataUrlDownload(canvas, mimeType, cleanFilename, format);
      },
      mimeType,
      format === 'jpeg' ? 0.92 : 1.0
    );
  } else {
    fallbackDataUrlDownload(canvas, mimeType, cleanFilename, format);
  }
}

function fallbackDataUrlDownload(
  canvas: HTMLCanvasElement,
  mimeType: string,
  filename: string,
  format: 'png' | 'jpeg'
) {
  try {
    const dataUrl = canvas.toDataURL(mimeType, format === 'jpeg' ? 0.92 : 1.0);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    // If pop-up blocker or canvas tainted, open image in new tab for user to save
    try {
      const dataUrl = canvas.toDataURL(mimeType);
      const win = window.open();
      if (win) {
        win.document.write(`<img src="${dataUrl}" style="max-width:100%;height:auto;"/>`);
      }
    } catch (err) {
      alert('To download your photo on mobile, tap and hold the image preview to save it to your Photos!');
    }
  }
}
