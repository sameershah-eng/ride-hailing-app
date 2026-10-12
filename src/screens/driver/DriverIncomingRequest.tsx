/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Navigation,
  Star,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const DriverIncomingRequest: React.FC = () => {
  const {
    activeRide,
    incomingCountdown,
    acceptIncomingRide,
    declineIncomingRide,
  } = useHalo();

  // SVG Circular countdown calculation (15 seconds)
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (incomingCountdown / 15) * circumference;

  const fareAmount = activeRide?.fareBreakdown.totalFare ?? 14.2;
  const driverNetPayout = (fareAmount * 0.82).toFixed(2);

  return (
    <div className="relative w-full h-full bg-[#12141F] text-white flex flex-col justify-between p-5 overflow-hidden select-none">
      {/* Background preview map */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <MapView
          pickup={activeRide?.pickup}
          dropoff={activeRide?.dropoff}
          showRoute={true}
          className="w-full h-full"
        />
      </div>

      {/* Top Header with Circular Countdown Timer */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A4C] bg-[#FF8A4C]/15 px-2.5 py-1 rounded-full border border-[#FF8A4C]/30">
            INCOMING REQUEST
          </span>
          <h3 className="text-xl font-bold mt-1.5">Halo Go Dispatch</h3>
        </div>

        {/* Circular Countdown Ring */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#FF5F45"
              strokeWidth="4.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="absolute text-base font-bold tabular-nums text-white">
            {incomingCountdown}s
          </span>
        </div>
      </div>

      {/* Middle Fare & Route Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-5 space-y-4"
      >
        {/* Net Driver Fare */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-xs text-white/70 block">Guaranteed Net Payout</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tabular-nums text-white">
                ${driverNetPayout}
              </span>
              <span className="text-xs text-white/50">(${fareAmount.toFixed(2)} gross)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              Upfront Fixed
            </span>
          </div>
        </div>

        {/* Rider Profile row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FFEDE8] text-[#FF5F45] font-bold text-xs flex items-center justify-center">
              {activeRide?.riderName ? activeRide.riderName.split(' ').map(n => n[0]).join('') : 'AV'}
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                {activeRide?.riderName || 'Amara Vance'}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300">
                <Star size={11} fill="currentColor" />
                <span className="font-semibold">{activeRide?.riderRating || 4.96}</span>
                <span className="text-white/40">· 48 trips</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-white/70">
            <span className="block font-semibold">1.2 km away</span>
            <span className="text-[10px] text-white/50">4 min pickup</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white mt-1 shrink-0" />
            <div>
              <span className="text-[10px] text-white/50 uppercase block font-semibold">Pickup</span>
              <span className="font-semibold text-white">
                {activeRide?.pickup.name || '342 Market Street'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F45] mt-1 shrink-0" />
            <div>
              <span className="text-[10px] text-white/50 uppercase block font-semibold">Drop-off (4.2 km)</span>
              <span className="font-semibold text-white">
                {activeRide?.dropoff.name || 'Ferry Building, The Embarcadero'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Accept & Decline Bottom Action Buttons */}
      <div className="relative z-10 space-y-2 pt-2">
        <button
          type="button"
          onClick={acceptIncomingRide}
          className="w-full py-4 rounded-2xl halo-gradient-bg text-white font-bold text-base flex items-center justify-center gap-2 halo-shadow-lg active:scale-[0.98] transition-all cursor-pointer"
        >
          <Check size={20} strokeWidth={2.5} />
          <span>Accept Ride (${driverNetPayout})</span>
        </button>

        <button
          type="button"
          onClick={declineIncomingRide}
          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white/70 hover:text-white font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          Decline Request
        </button>
      </div>
    </div>
  );
};
