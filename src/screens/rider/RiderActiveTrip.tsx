/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MessageSquare,
  Shield,
  Share2,
  ChevronUp,
  Star,
  X,
  Send,
  AlertTriangle,
  Check,
  Navigation,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const RiderActiveTrip: React.FC = () => {
  const {
    activeRide,
    tripProgress,
    chatMessages,
    sendChatMessage,
    showToast,
    driverCompleteTrip,
  } = useHalo();

  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const driver = activeRide?.driver;
  const isEnRoute = activeRide?.status === 'in_progress';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage('rider', messageInput.trim());
    setMessageInput('');
  };

  const handleShareTrip = () => {
    showToast('Trip tracking link copied to clipboard!');
  };

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Background Live Map with smooth car moving along route */}
      <div className="flex-1 w-full relative">
        <MapView
          pickup={activeRide?.pickup}
          dropoff={activeRide?.dropoff}
          driver={driver}
          showRoute={true}
          progressPercent={tripProgress}
          className="w-full h-full"
        />

        {/* Top Status Capsule */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#ECE9E4] halo-shadow-md text-xs font-semibold text-[#12141F]">
          <span className="w-2 h-2 rounded-full bg-[#1F9D7A] animate-pulse" />
          <span>
            {isEnRoute
              ? `Dropping off at ${activeRide?.dropoff.name}`
              : 'Driver is 3 min away · White Camry'}
          </span>
        </div>

        {/* Floating Safety & Share Quick Buttons */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setShowSafetyModal(true)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] flex items-center justify-center text-[#12141F] shadow-sm hover:bg-white active:scale-95 transition-all"
            title="Safety Toolkit"
          >
            <Shield size={16} className="text-[#1F9D7A]" />
          </button>

          <button
            type="button"
            onClick={handleShareTrip}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] flex items-center justify-center text-[#12141F] shadow-sm hover:bg-white active:scale-95 transition-all"
            title="Share Trip Link"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Driver Card & Trip Progress Sheet */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 28 }}
        className="relative z-20 bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 pb-6 halo-shadow-xl space-y-4"
      >
        <div className="w-10 h-1 bg-[#ECE9E4] rounded-full mx-auto" />

        {/* Live Trip Progress Bar (if in progress) */}
        {isEnRoute && (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#12141F] mb-1.5">
              <span>Trip in progress</span>
              <span className="tabular-nums text-[#FF5F45]">{Math.round(tripProgress)}% completed</span>
            </div>
            <div className="h-1.5 w-full bg-[#F7F5F2] rounded-full overflow-hidden">
              <div
                className="h-full halo-gradient-bg rounded-full transition-all duration-300"
                style={{ width: `${Math.max(5, tripProgress)}%` }}
              />
            </div>
          </div>
        )}

        {/* Driver Profile & Car Details Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Driver Avatar */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-[#1F9D7A] border border-[#ECE9E4]"
              style={{ backgroundColor: driver?.avatarBg || '#E6F4EA' }}
            >
              {driver?.avatarInitials || 'TV'}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-[#12141F]">
                  {driver?.name || 'Tariq Vance'}
                </h4>
                <div className="flex items-center gap-0.5 text-xs font-semibold text-[#E8A33D]">
                  <Star size={12} fill="#E8A33D" />
                  <span>{driver?.rating || 4.92}</span>
                </div>
              </div>
              <p className="text-xs text-[#6B6F80]">
                {driver?.vehicleColor} {driver?.vehicleModel}
              </p>
              <div className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[#F7F5F2] border border-[#ECE9E4] text-[10px] font-bold tracking-wider text-[#12141F] tabular-nums">
                {driver?.licensePlate || 'LEB 4821'}
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowChatModal(true)}
              className="w-10 h-10 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#ECE9E4] flex items-center justify-center text-[#12141F] active:scale-95 transition-all relative"
              title="Message Driver"
            >
              <MessageSquare size={17} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF5F45] rounded-full ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => setShowCallModal(true)}
              className="w-10 h-10 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#ECE9E4] flex items-center justify-center text-[#12141F] active:scale-95 transition-all"
              title="Call Driver"
            >
              <Phone size={17} />
            </button>
          </div>
        </div>

        {/* Destination & Fixed Fare Summary */}
        <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
              Destination
            </span>
            <span className="font-semibold text-[#12141F] truncate block max-w-[200px]">
              {activeRide?.dropoff.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
              Fixed Fare
            </span>
            <span className="font-bold text-[#12141F] tabular-nums text-sm">
              ${activeRide?.fareBreakdown.totalFare.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Demo Fast Forward Shortcut button for client presentation */}
        <button
          type="button"
          onClick={driverCompleteTrip}
          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F7F5F2] border border-[#ECE9E4] text-[11px] font-medium text-[#6B6F80] hover:text-[#12141F] transition-all flex items-center justify-center gap-1.5"
        >
          <span>Demo Action: Complete Trip & Open Receipt</span>
        </button>
      </motion.div>

      {/* In-App Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-4 h-[75%] flex flex-col halo-shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#1F9D7A] flex items-center justify-center font-bold text-xs">
                    {driver?.avatarInitials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#12141F]">{driver?.name}</h5>
                    <p className="text-[10px] text-[#1F9D7A]">Active Ride HL-8492</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChatModal(false)}
                  className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
                {chatMessages.map((m) => {
                  const isRider = m.sender === 'rider';
                  const isSys = m.sender === 'system';

                  if (isSys) {
                    return (
                      <div key={m.id} className="text-center text-[10px] text-[#6B6F80] bg-[#F7F5F2] py-1 px-3 rounded-full mx-auto max-w-[85%]">
                        {m.text}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isRider ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[78%] px-3.5 py-2 rounded-2xl ${
                          isRider
                            ? 'halo-gradient-bg text-white rounded-br-2xs shadow-xs'
                            : 'bg-[#F7F5F2] text-[#12141F] rounded-bl-2xs border border-[#ECE9E4]'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-[#6B6F80] px-1 mt-0.5">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-[#ECE9E4] flex gap-2">
                <input
                  type="text"
                  placeholder="Message your driver..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-[#F7F5F2] rounded-xl border border-[#ECE9E4] focus:outline-none focus:border-[#FF5F45]"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-xl halo-gradient-bg text-white flex items-center justify-center active:scale-95 transition-all"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulated Phone Call Modal */}
      <AnimatePresence>
        {showCallModal && (
          <div className="absolute inset-0 z-50 bg-[#12141F]/90 backdrop-blur-md flex flex-col items-center justify-between p-8 text-white">
            <div className="pt-8 text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-[#E6F4EA] text-[#1F9D7A] flex items-center justify-center font-bold text-2xl mx-auto shadow-lg">
                {driver?.avatarInitials}
              </div>
              <h3 className="text-lg font-bold">{driver?.name}</h3>
              <p className="text-xs text-white/60">Calling via Halo Masked VoIP...</p>
            </div>

            <div className="text-center text-xs text-white/50 space-y-1">
              <p>Your real phone number is protected & masked</p>
              <p className="tabular-nums">00:04</p>
            </div>

            <div className="w-full pb-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="w-16 h-16 rounded-full bg-[#E5484D] flex items-center justify-center text-white active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <Phone size={24} className="rotate-[135deg]" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Safety Toolkit Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 space-y-4 halo-shadow-xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-[#1F9D7A]" />
                  <span className="text-sm font-bold text-[#12141F]">Safety Toolkit</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSafetyModal(false)}
                  className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleShareTrip();
                    setShowSafetyModal(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#12141F] shadow-2xs">
                    <Share2 size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#12141F] block">Share Live Trip Status</span>
                    <span className="text-[11px] text-[#6B6F80]">Send real-time GPS tracking to trusted contacts</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Halo 24/7 Safety Incident Team alerted');
                    setShowSafetyModal(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#F7F5F2] hover:bg-[#EFECE6] flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1F9D7A] shadow-2xs">
                    <Shield size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#12141F] block">Halo 24/7 Response Line</span>
                    <span className="text-[11px] text-[#6B6F80]">Immediate in-app priority safety agent</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Emergency 911 dispatch triggered with live coordinates');
                    setShowSafetyModal(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-3 text-left transition-colors text-[#E5484D]"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E5484D] shadow-2xs">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <span className="font-bold block">911 Emergency Assistance</span>
                    <span className="text-[11px] text-[#B91C1C]">Auto-shares vehicle make, plate, and location</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
