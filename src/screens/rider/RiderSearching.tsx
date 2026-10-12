/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldAlert, Sparkles, Car } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const RiderSearching: React.FC = () => {
  const {
    activeRide,
    pickupLocation,
    dropoffLocation,
    cancelRide,
    acceptIncomingRide,
  } = useHalo();

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Background Map with radar rings */}
      <div className="flex-1 w-full relative">
        <MapView
          pickup={pickupLocation}
          dropoff={dropoffLocation}
          showRoute={true}
          isSearching={true}
          className="w-full h-full"
        />

        {/* Searching banner tag at top */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#ECE9E4] halo-shadow-md text-xs font-semibold text-[#12141F]">
          <div className="w-2 h-2 rounded-full bg-[#FF5F45] animate-ping" />
          <span>Searching for nearby driver...</span>
        </div>
      </div>

      {/* Bottom Sheet Card */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 28 }}
        className="relative z-20 bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 pb-6 halo-shadow-xl"
      >
        <div className="w-10 h-1 bg-[#ECE9E4] rounded-full mx-auto mb-4" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl halo-gradient-bg flex items-center justify-center text-white shadow-xs">
            <Car size={24} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#12141F]">
              Confirming your {activeRide?.tier.replace('_', ' ').toUpperCase() || 'Halo Go'}
            </h3>
            <p className="text-xs text-[#6B6F80]">
              Checking for top-rated drivers near {pickupLocation.name}
            </p>
          </div>
        </div>

        {/* Micro progress status bar */}
        <div className="h-1.5 w-full bg-[#F7F5F2] rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full halo-gradient-bg rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: '85%' }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        {/* Cross-App Demo Prompt Banner */}
        <div className="p-3 rounded-xl bg-[#FFEDE8]/50 border border-[#FFD8CF] text-[11px] text-[#12141F] mb-4 flex items-start gap-2">
          <Sparkles size={14} className="text-[#FF5F45] shrink-0 mt-0.5" />
          <div>
            <strong>Cross-App Demo:</strong> Open the <em>Driver App</em> in the bottom switcher to accept this request live, or click below to simulate immediate driver acceptance!
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={cancelRide}
            className="flex-1 py-3 px-4 rounded-xl border border-[#ECE9E4] text-[#12141F] hover:bg-[#F7F5F2] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <X size={14} />
            <span>Cancel Ride</span>
          </button>

          <button
            type="button"
            onClick={acceptIncomingRide}
            className="flex-1 py-3 px-4 rounded-xl halo-gradient-bg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <Sparkles size={14} />
            <span>Fast Accept</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
