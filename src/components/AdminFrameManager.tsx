import React, { useState } from 'react';
import { Frame } from '../types/frame';
import { AdminPhotoAreaEditor } from './AdminPhotoAreaEditor';
import { generatePresetFrameOverlay } from '../data/presetFrames';
import { Plus, Trash2, Edit3, Check, X, Upload, Eye, EyeOff, Wand2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface AdminFrameManagerProps {
  frames: Frame[];
  onSaveFrames: (updatedFrames: Frame[]) => void;
  onBackToDashboard: () => void;
  samplePreviews: string[];
  onSaveSamplePreviews: (previews: string[]) => void;
  language?: Language;
}

export const AdminFrameManager: React.FC<AdminFrameManagerProps> = ({
  frames,
  onSaveFrames,
  onBackToDashboard,
  samplePreviews,
  onSaveSamplePreviews,
  language = 'en'
}) => {
  const t = translations[language];
  const [editingFrame, setEditingFrame] = useState<Frame | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    const newId = `frame-${Date.now()}`;
    const generatedImage = generatePresetFrameOverlay('frame-1');

    const newFrame: Frame = {
      id: newId,
      name: 'Photoshop Campaign Frame',
      category: 'Official Frames',
      image: generatedImage,
      enabled: true,
      description: 'Photoshop PNG campaign frame overlay for Nikaweratiya PS.',
      badge: 'New',
      photoArea: {
        x: 60,
        y: 190,
        width: 960,
        height: 690,
        radius: 24,
        shape: 'rounded'
      }
    };
    setEditingFrame(newFrame);
    setIsNew(true);
  };

  const handleGenerateTemplateOverlay = () => {
    if (!editingFrame) return;
    const sampleImage = generatePresetFrameOverlay(editingFrame.photoArea.shape === 'circle' ? 'frame-3' : 'frame-1');
    setEditingFrame({ ...editingFrame, image: sampleImage });
  };

  const handleToggleEnabled = (id: string) => {
    const updated = frames.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f));
    onSaveFrames(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign frame?')) {
      const updated = frames.filter((f) => f.id !== id);
      onSaveFrames(updated);
    }
  };

  const handleSaveModal = () => {
    if (!editingFrame) return;
    if (!editingFrame.image) {
      alert('Please upload a transparent Photoshop PNG frame image.');
      return;
    }

    if (isNew) {
      onSaveFrames([...frames, editingFrame]);
    } else {
      const updated = frames.map((f) => (f.id === editingFrame.id ? editingFrame : f));
      onSaveFrames(updated);
    }
    setEditingFrame(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingFrame) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingFrame({ ...editingFrame, image: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const updated = [...samplePreviews, event.target.result as string];
          onSaveSamplePreviews(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteSample = (index: number) => {
    if (samplePreviews.length <= 1) {
      alert('At least one hero sample preview image must remain.');
      return;
    }
    const updated = samplePreviews.filter((_, idx) => idx !== index);
    onSaveSamplePreviews(updated);
  };

  return (
    <div className="space-y-10">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Frame Management & Hero Carousel
          </h2>
          <p className="text-xs text-gray-500">
            Upload Photoshop PNG frames, manage active campaign templates, and add sample preview images.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow flex items-center space-x-2 animate-pulse-red"
          >
            <Plus className="w-4 h-4" />
            <span>+ Upload New Frame</span>
          </button>
        </div>
      </div>

      {/* Prominent Hero Sample Previews Admin Card */}
      <div className="bg-gradient-to-r from-amber-50/70 via-white to-red-50/70 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-amber-200/80 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Homepage Carousel Settings
            </span>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>Hero Auto-Sliding Sample Previews</span>
            </h3>
            <p className="text-xs text-gray-600">
              Upload sample framed photos to be displayed in the auto-sliding Hero Carousel on the homepage.
            </p>
          </div>

          <label className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 transform hover:-translate-y-0.5 transition-all">
            <Upload className="w-4 h-4" />
            <span>📷 Upload Sample Image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleSampleUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Sample Previews Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-2">
          {samplePreviews.map((sampleUrl, idx) => (
            <div key={idx} className="relative group aspect-square bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={sampleUrl} alt={`Sample ${idx + 1}`} className="w-full h-full object-contain p-1" />
              <button
                onClick={() => handleDeleteSample(idx)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Sample"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                Sample #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Frames List Table */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-extrabold text-gray-900 flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <span>Active Campaign Photo Frames</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase font-bold">
              <tr>
                <th className="py-4 px-6">Preview</th>
                <th className="py-4 px-6">Frame Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Photo Cutout Area</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {frames.map((frame) => (
                <tr key={frame.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden border p-1">
                      <img src={frame.image} alt={frame.name} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{frame.name}</div>
                    <div className="text-xs text-gray-500">{frame.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                      {frame.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-600 font-mono">
                    {frame.photoArea.width}×{frame.photoArea.height}px ({frame.photoArea.shape || 'rounded'})
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleEnabled(frame.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        frame.enabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {frame.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{frame.enabled ? 'Active' : 'Disabled'}</span>
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingFrame(frame);
                        setIsNew(false);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit Frame"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(frame.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete Frame"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Upload Frame Modal */}
      {editingFrame && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl my-8 space-y-6">
            
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-extrabold text-gray-900">
                {isNew ? 'Upload New Campaign Frame' : 'Edit Frame Settings'}
              </h3>
              <button
                onClick={() => setEditingFrame(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Frame Name</label>
                <input
                  type="text"
                  value={editingFrame.name}
                  onChange={(e) => setEditingFrame({ ...editingFrame, name: e.target.value })}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingFrame.category}
                    onChange={(e) => setEditingFrame({ ...editingFrame, category: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge (e.g. Official / New)</label>
                  <input
                    type="text"
                    value={editingFrame.badge || ''}
                    onChange={(e) => setEditingFrame({ ...editingFrame, badge: e.target.value })}
                    className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <label className="block text-xs font-bold text-gray-800">
                  Photoshop Transparent PNG Frame Image
                </label>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/png"
                      onChange={handleImageUpload}
                      className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-gray-800 hover:file:bg-gray-100 cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateTemplateOverlay}
                    className="bg-gold hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow flex items-center justify-center space-x-1.5"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Auto-Generate Sample Frame</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <AdminPhotoAreaEditor
                  frameOverlayUrl={editingFrame.image}
                  photoArea={editingFrame.photoArea}
                  onChange={(updatedArea) =>
                    setEditingFrame({ ...editingFrame, photoArea: updatedArea })
                  }
                />
              </div>

            </div>

            <div className="pt-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setEditingFrame(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
