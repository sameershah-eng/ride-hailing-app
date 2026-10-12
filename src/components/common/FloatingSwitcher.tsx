/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Car,
  LayoutDashboard,
  Columns2,
  Home,
  RotateCcw,
  FastForward,
  Sparkles,
  ChevronUp,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { AppView } from '../../types';

export const FloatingSwitcher: React.FC = () => {
  const {
    appView,
    setAppView,
    activeRide,
    resetDemoData,
    fastForwardToLiveTrip,
  } = useHalo();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs: { id: AppView; label: string; icon: React.FC<{ size?: number; className?: string; strokeWidth?: number }> }[] = [
    { id: 'shell', label: 'Overview', icon: Home },
    { id: 'rider', label: 'Rider App', icon: Smartphone },
    { id: 'driver', label: 'Driver App', icon: Car },
    { id: 'admin', label: 'Admin Panel', icon: LayoutDashboard },
    { id: 'split', label: 'Side-by-Side', icon: Columns2 },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none">
      {/* Expanded Quick Action Toolbar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mb-2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-[#ECE9E4] halo-shadow-lg flex items-center gap-2 text-xs"
          >
            <div className="px-2 py-1 text-[#6B6F80] font-medium border-r border-[#ECE9E4] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#FF5F45]" />
              <span>Demo Controls</span>
            </div>

            <button
              type="button"
              onClick={() => {
                fastForwardToLiveTrip();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-[#12141F] bg-[#F7F5F2] hover:bg-[#EFECE6] active:scale-95 transition-all"
            >
              <FastForward size={14} className="text-[#FF5F45]" />
              <span>Simulate Live Active Trip</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetDemoData();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-[#6B6F80] hover:text-[#12141F] hover:bg-[#F7F5F2] active:scale-95 transition-all"
            >
              <RotateCcw size={14} />
              <span>Reset State</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Persistent Floating Pill */}
      <div className="flex items-center gap-1 p-1.5 bg-[#12141F]/95 backdrop-blur-md text-white rounded-full halo-shadow-xl border border-white/10">
        {/* Halo Mini Brand Tag */}
        <div className="flex items-center gap-1.5 pl-3 pr-2 py-1 text-xs font-semibold text-white/90 border-r border-white/15">
          <div className="w-2 h-2 rounded-full halo-gradient-bg" />
          <span className="tracking-tight">Halo</span>
          {activeRide && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F9D7A] animate-pulse" title="Active Ride Synced" />
          )}
        </div>

        {/* View Switcher Buttons */}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = appView === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAppView(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5 active:scale-95'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="floating-pill-active"
                  className="absolute inset-0 halo-gradient-bg rounded-full -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <Icon size={14} strokeWidth={1.8} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}

        {/* Fast Actions Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Demo Controls"
          className={`p-1.5 rounded-full transition-colors ml-0.5 ${
            isMenuOpen ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          title="Demo Simulation Shortcuts"
        >
          <ChevronUp
            size={14}
            className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};
