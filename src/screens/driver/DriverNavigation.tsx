/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CornerUpRight,
  Navigation,
  Phone,
  MessageSquare,
  Shield,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const DriverNavigation: React.FC = () => {
  const {
    activeRide,
    tripProgress,
    driverArrivedAtPickup,
    driverStartTrip,
    driverCompleteTrip,
    showToast,
  } = useHalo();

  const isAtPickup = activeRide?.status === 'arrived_pickup';
  const isInProgress = activeRide?.status === 'in_progress';

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Turn-by-Turn Instruction Banner at Top */}
      <div className="relative z-20 p-3 pt-2">
        <div className="bg-[#12141F] text-white rounded-2xl p-3.5 halo-shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#FFB86B] shrink-0">
            <CornerUpRight size={22} strokeWidth={2.2} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold tabular-nums">In 200 m</span>
              <span className="text-xs text-white/70">turn right onto</span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {isInProgress ? 'The Embarcadero Blvd' : 'Market Street'}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold tabular-nums text-white block">
              {isInProgress ? '8 min' : '2 min'}
            </span>
            <span className="text-[10px] text-white/50">
              {isInProgress ? '3.8 km' : '0.8 km'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Vector Navigation Map */}
      <div className="flex-1 w-full relative -mt-3">
        <MapView
          pickup={activeRide?.pickup}
          dropoff={activeRide?.dropoff}
          showRoute={true}
          progressPercent={tripProgress}
          className="w-full h-full"
        />

        {/* Speed Limit & Compass Overlay */}
        <div className="absolute top-6 right-3 z-10 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[#12141F] flex flex-col items-center justify-center halo-shadow-sm">
            <span className="text-[8px] font-bold text-[#6B6F80]">SPEED</span>
            <span className="text-xs font-extrabold text-[#12141F] tabular-nums">25</span>
          </div>
        </div>
      </div>

      {/* Driver Controls & Rider Information Sheet */}
      <div className="relative z-20 bg-white rounded-t-[26px] border-t border-[#ECE9E4] p-4 pb-6 halo-shadow-xl space-y-3">
        <div className="w-10 h-1 bg-[#ECE9E4] rounded-full mx-auto" />

        {/* Rider Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFEDE8] text-[#FF5F45] font-bold text-xs flex items-center justify-center">
              {activeRide?.riderName ? activeRide.riderName.split(' ').map(n => n[0]).join('') : 'AV'}
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#12141F]">
                {activeRide?.riderName || 'Amara Vance'}
              </h4>
              <p className="text-[11px] text-[#6B6F80]">
                {isInProgress
                  ? `Drop-off: ${activeRide?.dropoff.name}`
                  : `Pickup: ${activeRide?.pickup.name}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => showToast('Opening masked passenger call...')}
              className="w-8 h-8 rounded-lg bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F]"
              title="Call Rider"
            >
              <Phone size={14} />
            </button>
            <button
              type="button"
              onClick={() => showToast('Driver messaging enabled in active ride')}
              className="w-8 h-8 rounded-lg bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F]"
              title="Chat with Rider"
            >
              <MessageSquare size={14} />
            </button>
          </div>
        </div>

        {/* Phase Transition Action Buttons */}
        {!isAtPickup && !isInProgress && (
          /* Step 1: Navigating to pickup */
          <button
            type="button"
            onClick={driverArrivedAtPickup}
            className="w-full py-3.5 px-4 rounded-2xl halo-gradient-bg text-white font-bold text-sm flex items-center justify-center gap-2 halo-shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <MapPin size={16} />
            <span>I Have Arrived at Pickup</span>
          </button>
        )}

        {isAtPickup && !isInProgress && (
          /* Step 2: Arrived, rider gets in -> Start Trip */
          <div className="space-y-2">
            <div className="text-center text-[11px] text-[#1F9D7A] font-semibold bg-emerald-50 py-1 rounded-lg border border-emerald-200">
              Passenger notified. Waiting for board.
            </div>
            <button
              type="button"
              onClick={driverStartTrip}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#12141F] hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 halo-shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Swipe to Start Trip</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {isInProgress && (
          /* Step 3: Trip in progress -> Complete Trip */
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6B6F80]">
              <span>Route Progress</span>
              <span className="font-semibold text-[#12141F] tabular-nums">
                {Math.round(tripProgress)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F2] rounded-full overflow-hidden">
              <div
                className="h-full halo-gradient-bg rounded-full transition-all duration-300"
                style={{ width: `${Math.max(8, tripProgress)}%` }}
              />
            </div>
            <button
              type="button"
              onClick={driverCompleteTrip}
              className="w-full py-3.5 px-4 rounded-2xl halo-gradient-bg text-white font-bold text-sm flex items-center justify-center gap-2 halo-shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <CheckCircle2 size={18} />
              <span>Complete Trip & Collect Fare</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
