import React from 'react';
import { AdminStats } from '../types/frame';
import { Layers, Image as ImageIcon, TrendingUp, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface AdminDashboardProps {
  stats: AdminStats;
  onManageFramesClick: () => void;
  language?: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  onManageFramesClick,
  language = 'en'
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-3xl p-6 border border-border shadow-sm">
        <div>
          <span className="text-xs font-extrabold text-primary bg-primary-soft px-3 py-1 rounded-full uppercase tracking-wider">
            ADMIN PANEL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Wanni Poth Wasanthaya Campaign Analytics
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Nikaweratiya Pradeshiya Sabha • Official Photo Frame Generator
          </p>
        </div>

        <button
          onClick={onManageFramesClick}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition-all flex items-center space-x-2 animate-pulse-red"
        >
          <Layers className="w-4 h-4" />
          <span>Frame Management</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Frames</span>
            <div className="p-3 bg-red-50 text-primary rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-gray-900">{stats.totalFrames}</span>
            <span className="text-xs text-gray-500 ml-2">Active Templates</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Total Generations</span>
            <div className="p-3 bg-amber-50 text-gold rounded-xl">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-gray-900">{stats.totalGenerated}</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">↑ High Engagement</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Active Frames</span>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-gray-900">{stats.todayCount}</span>
            <span className="text-xs text-gray-500 ml-2">Creations Today</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Most Used Frame</span>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-lg font-bold text-gray-900 line-clamp-1">{stats.popularFrame}</span>
            <span className="text-xs text-purple-600 font-semibold">Top Choice</span>
          </div>
        </div>

      </div>

    </div>
  );
};
