/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  Car,
  LayoutDashboard,
  Columns2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Navigation,
  DollarSign,
  TrendingUp,
  RotateCcw,
  FastForward,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const PresentationShell: React.FC = () => {
  const {
    setAppView,
    activeRide,
    isDriverOnline,
    todayEarnings,
    analytics,
    fastForwardToLiveTrip,
    resetDemoData,
  } = useHalo();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#12141F] flex flex-col justify-between p-6 md:p-12 pb-28 select-none">
      {/* Top Brand Bar */}
      <header className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#ECE9E4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl halo-gradient-bg flex items-center justify-center text-white font-extrabold text-lg halo-shadow-sm">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#12141F]">Halo</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#12141F] text-white tracking-wide uppercase">
                Interactive Showcase
              </span>
            </div>
            <p className="text-xs text-[#6B6F80]">
              Unified ride-hailing architecture for Rider, Driver, and Operations Admin
            </p>
          </div>
        </div>

        {/* Global Live Synchronization Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#ECE9E4] halo-shadow-xs text-xs">
            <span className="w-2 h-2 rounded-full bg-[#1F9D7A] animate-pulse" />
            <span className="font-semibold text-[#12141F]">
              {activeRide ? `Active Trip: ${activeRide.code}` : 'Cross-App State Engine Synced'}
            </span>
          </div>

          <button
            type="button"
            onClick={fastForwardToLiveTrip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFEDE8] text-[#FF5F45] hover:bg-[#FFD8CF] text-xs font-bold transition-all active:scale-95"
            title="Fast Forward Simulation"
          >
            <FastForward size={13} />
            <span>Simulate Active Trip</span>
          </button>
        </div>
      </header>

      {/* Main Pitch Banner */}
      <section className="max-w-6xl w-full mx-auto my-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ECE9E4] halo-shadow-xs text-xs font-semibold text-[#6B6F80]">
          <Sparkles size={14} className="text-[#FF5F45]" />
          <span>Production-Grade Architecture · Built for High Reliability</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#12141F] max-w-3xl mx-auto leading-tight">
          Next-Generation Mobility Platform
        </h1>

        <p className="text-sm md:text-base text-[#6B6F80] max-w-2xl mx-auto leading-relaxed">
          Explore all three core products running simultaneously with instant synchronized state. Book a ride in the passenger app, dispatch to the driver, and monitor live fleet telemetry on the executive dashboard.
        </p>
      </section>

      {/* The 3 Core Large Product Cards */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {/* Card 1: Rider App */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setAppView('rider')}
          className="bg-white rounded-3xl border border-[#ECE9E4] p-6 halo-shadow-md hover:border-[#FF5F45] flex flex-col justify-between cursor-pointer group transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEDE8] text-[#FF5F45] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Smartphone size={24} strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F7F5F2] text-[#12141F] border border-[#ECE9E4]">
                iOS 390×844
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#12141F] group-hover:text-[#FF5F45] transition-colors">
                Rider App
              </h3>
              <p className="text-xs text-[#6B6F80] mt-1 leading-relaxed">
                Clean consumer interface with guaranteed upfront pricing, live GPS vehicle tracking, and Airwallex checkout.
              </p>
            </div>

            {/* Live Micro State Preview */}
            <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B6F80]">
                <span>Active Passenger:</span>
                <span className="font-semibold text-[#12141F]">Amara Vance (4.96 ★)</span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Pricing Model:</span>
                <span className="font-semibold text-[#1F9D7A]">100% Fixed (No Surge)</span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Payments:</span>
                <span className="font-semibold text-[#12141F]">Airwallex Elements</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl halo-gradient-bg text-white font-bold text-xs flex items-center justify-center gap-2 halo-shadow-xs group-hover:opacity-95 transition-opacity"
            >
              <span>Launch Rider App</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Card 2: Driver App */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setAppView('driver')}
          className="bg-white rounded-3xl border border-[#ECE9E4] p-6 halo-shadow-md hover:border-[#1F9D7A] flex flex-col justify-between cursor-pointer group transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1F9D7A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Car size={24} strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F7F5F2] text-[#12141F] border border-[#ECE9E4]">
                iOS 390×844
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#12141F] group-hover:text-[#1F9D7A] transition-colors">
                Driver App
              </h3>
              <p className="text-xs text-[#6B6F80] mt-1 leading-relaxed">
                High-contrast dispatch cockpit with 15s circular countdown, turn-by-turn routing, and instant bank cash-out.
              </p>
            </div>

            {/* Live Micro State Preview */}
            <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B6F80]">
                <span>Driver Status:</span>
                <span className={`font-semibold ${isDriverOnline ? 'text-[#1F9D7A]' : 'text-[#6B6F80]'}`}>
                  {isDriverOnline ? 'Online · Dispatch Ready' : 'Offline'}
                </span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Today's Earnings:</span>
                <span className="font-bold text-[#12141F] tabular-nums">
                  ${todayEarnings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Compliance:</span>
                <span className="font-semibold text-[#1F9D7A]">4 of 4 Verified</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-[#12141F] group-hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 halo-shadow-xs transition-colors"
            >
              <span>Launch Driver App</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Card 3: Admin Panel */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setAppView('admin')}
          className="bg-white rounded-3xl border border-[#ECE9E4] p-6 halo-shadow-md hover:border-[#12141F] flex flex-col justify-between cursor-pointer group transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F7F5F2] text-[#12141F] flex items-center justify-center group-hover:scale-105 transition-transform">
                <LayoutDashboard size={24} strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#12141F] text-white">
                Full-Width Desktop
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#12141F] transition-colors">
                Admin Panel
              </h3>
              <p className="text-xs text-[#6B6F80] mt-1 leading-relaxed">
                Operations control center: live city radar, driver verification workflow, and real-time fixed fare matrix calculator.
              </p>
            </div>

            {/* Live Micro State Preview */}
            <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B6F80]">
                <span>Today's Volume:</span>
                <span className="font-bold text-[#12141F] tabular-nums">
                  ${analytics.kpis.todayRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Online Fleet:</span>
                <span className="font-semibold text-[#12141F]">
                  {analytics.kpis.onlineDrivers} Vehicles in SF
                </span>
              </div>
              <div className="flex justify-between text-[#6B6F80]">
                <span>Compliance Queue:</span>
                <span className="font-semibold text-[#FF5F45]">1 Action Required</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl border border-[#ECE9E4] hover:bg-[#F7F5F2] text-[#12141F] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Open Admin Console</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Side-by-Side Dual Phone Mode Banner for Client Presentation */}
      <div className="max-w-6xl w-full mx-auto my-4 p-5 rounded-3xl bg-white border border-[#ECE9E4] halo-shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl halo-gradient-bg flex items-center justify-center text-white shrink-0">
            <Columns2 size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#12141F]">
              Side-by-Side Interactive Presentation Mode
            </h4>
            <p className="text-xs text-[#6B6F80]">
              Place Rider and Driver phones side by side on your screen to watch instant cross-app request dispatch in real time.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setAppView('split')}
          className="px-4 py-2.5 rounded-xl halo-gradient-bg text-white font-bold text-xs halo-shadow-xs hover:opacity-95 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          View Split Phones
        </button>
      </div>

      {/* Footer System Specs */}
      <footer className="max-w-6xl w-full mx-auto pt-6 text-center text-xs text-[#6B6F80] border-t border-[#ECE9E4]/60">
        <p>
          Halo Mobility Inc. · Designed with Plus Jakarta Sans, Tailwind CSS, Framer Motion & Airwallex Payments.
        </p>
      </footer>
    </div>
  );
};
