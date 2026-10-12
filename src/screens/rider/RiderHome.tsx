/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Clock,
  Home,
  Briefcase,
  Dumbbell,
  Receipt,
  User,
  ChevronRight,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';
import { INITIAL_LOCATIONS } from '../../data/mockData';

export const RiderHome: React.FC = () => {
  const {
    setRiderScreen,
    riderProfile,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
  } = useHalo();

  const handleSelectRecent = (destinationIndex: number) => {
    setPickupLocation(INITIAL_LOCATIONS[0]); // 342 Market St
    setDropoffLocation(INITIAL_LOCATIONS[destinationIndex]);
    setRiderScreen('vehicle_select');
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#F7F5F2]">
      {/* Background Interactive Map */}
      <div className="absolute inset-0 z-0">
        <MapView
          pickup={pickupLocation}
          dropoff={dropoffLocation}
          showRoute={false}
          className="w-full h-full"
        />
      </div>

      {/* Floating Top Header Bar */}
      <div className="relative z-20 px-4 pt-2 flex items-center justify-between">
        {/* Left: Profile avatar button */}
        <button
          type="button"
          onClick={() => setRiderScreen('profile')}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] halo-shadow-sm hover:bg-white active:scale-95 transition-all"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-[#FF5F45]"
            style={{ backgroundColor: riderProfile.avatarBg }}
          >
            {riderProfile.avatarInitials}
          </div>
          <span className="text-xs font-semibold text-[#12141F]">
            ★ {riderProfile.rating}
          </span>
        </button>

        {/* Center: Halo logo badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] halo-shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full halo-gradient-bg" />
          <span className="text-xs font-bold tracking-tight text-[#12141F]">Halo</span>
        </div>

        {/* Right: Ride History Button */}
        <button
          type="button"
          onClick={() => setRiderScreen('history')}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] flex items-center justify-center text-[#12141F] halo-shadow-sm hover:bg-white active:scale-95 transition-all"
          title="Past Rides"
        >
          <Receipt size={16} strokeWidth={1.8} />
        </button>
      </div>

      {/* Spacer to keep map visible */}
      <div className="flex-1" />

      {/* Bottom Floating Sheet / Search Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-20 bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 pb-6 halo-shadow-xl"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-[#ECE9E4] rounded-full mx-auto mb-4" />

        {/* Primary "Where to?" Search Bar Trigger */}
        <button
          type="button"
          onClick={() => setRiderScreen('search')}
          className="w-full flex items-center gap-3 px-4 py-3.5 bg-[#F7F5F2] hover:bg-[#F0ECE6] border border-[#ECE9E4] rounded-2xl text-left transition-all group mb-4 active:scale-[0.99] cursor-pointer"
        >
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-[#12141F] shadow-xs group-hover:scale-105 transition-transform">
            <Search size={15} strokeWidth={2} className="text-[#FF5F45]" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-[#12141F] block">Where to?</span>
            <span className="text-[11px] text-[#6B6F80]">Enter destination or airport</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[11px] font-medium text-[#12141F] border border-[#ECE9E4]">
            <Clock size={12} className="text-[#6B6F80]" />
            <span>Now</span>
          </div>
        </button>

        {/* Quick Saved Place Shortcut Chips */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleSelectRecent(2)} // Home (Noe Valley)
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F2]/80 hover:bg-[#F7F5F2] border border-[#ECE9E4] text-left transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#12141F] shadow-2xs shrink-0">
              <Home size={14} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-[#12141F] block truncate">Home</span>
              <span className="text-[10px] text-[#6B6F80] block truncate">Noe Valley</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRecent(0)} // Work (Market St)
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F2]/80 hover:bg-[#F7F5F2] border border-[#ECE9E4] text-left transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#12141F] shadow-2xs shrink-0">
              <Briefcase size={14} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-[#12141F] block truncate">Work</span>
              <span className="text-[10px] text-[#6B6F80] block truncate">FiDi</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRecent(4)} // Chase Center
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F2]/80 hover:bg-[#F7F5F2] border border-[#ECE9E4] text-left transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#12141F] shadow-2xs shrink-0">
              <Dumbbell size={14} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-[#12141F] block truncate">Arena</span>
              <span className="text-[10px] text-[#6B6F80] block truncate">Mission Bay</span>
            </div>
          </button>
        </div>

        {/* Recent Destination Rows */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6F80] px-1 mb-1">
            Recent Destinations
          </div>

          <button
            type="button"
            onClick={() => handleSelectRecent(1)} // Ferry Building
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F5F2] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#F7F5F2] group-hover:bg-white flex items-center justify-center text-[#6B6F80] border border-[#ECE9E4]">
                <Clock size={13} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#12141F]">Ferry Building</p>
                <p className="text-[11px] text-[#6B6F80]">1 Ferry Building, The Embarcadero</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6B6F80]">
              <span className="font-medium tabular-nums">4.2 km</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRecent(3)} // SFO Airport
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F5F2] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#F7F5F2] group-hover:bg-white flex items-center justify-center text-[#6B6F80] border border-[#ECE9E4]">
                <MapPin size={13} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#12141F]">SFO Airport Terminal 2</p>
                <p className="text-[11px] text-[#6B6F80]">San Francisco Intl Airport</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6B6F80]">
              <span className="font-medium tabular-nums">18.4 km</span>
              <ChevronRight size={14} />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
