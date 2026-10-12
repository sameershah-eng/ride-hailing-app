/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Power,
  DollarSign,
  Clock,
  Compass,
  FileCheck,
  ChevronRight,
  Shield,
  TrendingUp,
  Flame,
  ArrowUpRight,
  User,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const DriverHome: React.FC = () => {
  const {
    setDriverScreen,
    isDriverOnline,
    toggleDriverOnline,
    driverProfile,
    todayEarnings,
    todayTrips,
    todayOnlineHours,
    acceptanceRate,
    requestRide,
  } = useHalo();

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Background Map with Driver Location */}
      <div className="absolute inset-0 z-0">
        <MapView
          showRoute={false}
          className="w-full h-full"
        />
      </div>

      {/* Top Floating Earnings Bar & Driver Status */}
      <div className="relative z-20 p-4 space-y-2.5">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#ECE9E4] p-3.5 halo-shadow-md">
          {/* Top row: Profile & Online status indicator */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE9E4]">
            <button
              type="button"
              onClick={() => setDriverScreen('profile')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-[#1F9D7A]"
                style={{ backgroundColor: driverProfile.avatarBg }}
              >
                {driverProfile.avatarInitials}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-[#12141F] block">{driverProfile.name}</span>
                <span className="text-[10px] text-[#6B6F80]">{driverProfile.vehicleModel}</span>
              </div>
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDriverOnline ? 'bg-[#1F9D7A] animate-pulse' : 'bg-[#6B6F80]'
                }`}
              />
              <span className={isDriverOnline ? 'text-[#1F9D7A]' : 'text-[#6B6F80]'}>
                {isDriverOnline ? 'Online · Dispatching' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Today KPI Stats 3-column grid */}
          <div className="pt-2.5 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
                Today's Net
              </span>
              <span className="text-sm font-bold text-[#12141F] tabular-nums">
                ${todayEarnings.toFixed(2)}
              </span>
            </div>

            <div className="border-x border-[#ECE9E4]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
                Trips
              </span>
              <span className="text-sm font-bold text-[#12141F] tabular-nums">
                {todayTrips}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
                Online
              </span>
              <span className="text-sm font-bold text-[#12141F] tabular-nums">
                {todayOnlineHours}
              </span>
            </div>
          </div>
        </div>

        {/* Heatmap / High Surge Notice */}
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#ECE9E4] halo-shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <Flame size={15} className="text-[#FF5F45]" />
            <span className="font-semibold text-[#12141F]">High Demand: Financial District</span>
          </div>
          <span className="text-[10px] font-bold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            +3 min dispatch
          </span>
        </div>
      </div>

      {/* Spacer to expose map */}
      <div className="flex-1" />

      {/* Bottom Sheet with Giant Online/Offline Toggle & Quick Links */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 pb-6 halo-shadow-xl space-y-4"
      >
        <div className="w-10 h-1 bg-[#ECE9E4] rounded-full mx-auto" />

        {/* The Signature Large Online / Offline Toggle Switch */}
        <div className="flex flex-col items-center justify-center py-1">
          <button
            type="button"
            onClick={toggleDriverOnline}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 halo-shadow-lg active:scale-95 cursor-pointer ${
              isDriverOnline
                ? 'halo-gradient-bg text-white ring-4 ring-[#FF5F45]/20'
                : 'bg-[#12141F] text-white/70 ring-4 ring-black/10'
            }`}
            title="Toggle Driver Status"
          >
            <Power size={32} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-[#12141F] mt-2">
            {isDriverOnline ? 'Tap to Go Offline' : 'Tap to Go Online'}
          </span>
          <span className="text-[11px] text-[#6B6F80]">
            {isDriverOnline
              ? 'Ready to receive immediate ride requests'
              : 'You will not receive any passenger requests'}
          </span>
        </div>

        {/* Quick Driver Action Links */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#ECE9E4]">
          <button
            type="button"
            onClick={() => setDriverScreen('earnings')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#ECE9E4] transition-all text-center"
          >
            <DollarSign size={16} className="text-[#1F9D7A] mb-1" />
            <span className="text-[11px] font-bold text-[#12141F] block">Earnings</span>
            <span className="text-[9px] text-[#6B6F80] block">Cash Out</span>
          </button>

          <button
            type="button"
            onClick={() => setDriverScreen('verification')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#ECE9E4] transition-all text-center"
          >
            <FileCheck size={16} className="text-[#FF5F45] mb-1" />
            <span className="text-[11px] font-bold text-[#12141F] block">Documents</span>
            <span className="text-[9px] text-[#6B6F80] block">Verified</span>
          </button>

          <button
            type="button"
            onClick={() => setDriverScreen('history')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#ECE9E4] transition-all text-center"
          >
            <TrendingUp size={16} className="text-[#12141F] mb-1" />
            <span className="text-[11px] font-bold text-[#12141F] block">Rating</span>
            <span className="text-[9px] text-[#6B6F80] block">4.92 ★</span>
          </button>
        </div>

        {/* Simulated Demo Trigger (if driver is online) */}
        {isDriverOnline && (
          <button
            type="button"
            onClick={requestRide}
            className="w-full py-2.5 px-3 rounded-xl bg-[#FFEDE8] hover:bg-[#FFD8CF] text-[#FF5F45] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowUpRight size={14} />
            <span>Simulate Incoming Passenger Request</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
