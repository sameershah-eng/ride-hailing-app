/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  User,
  Star,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
  Wallet,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const RiderProfile: React.FC = () => {
  const { setRiderScreen, riderProfile, showToast } = useHalo();

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#ECE9E4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRiderScreen('home')}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Account & Settings</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-[#FF5F45] border border-[#ECE9E4]"
            style={{ backgroundColor: riderProfile.avatarBg }}
          >
            {riderProfile.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#12141F] truncate">{riderProfile.name}</h3>
            <p className="text-xs text-[#6B6F80] truncate">{riderProfile.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#12141F] bg-[#F7F5F2] px-2 py-0.5 rounded-full border border-[#ECE9E4]">
                <Star size={11} className="text-[#E8A33D] fill-[#E8A33D]" />
                <span>{riderProfile.rating} Rider Rating</span>
              </span>
            </div>
          </div>
        </div>

        {/* Halo Balance Card */}
        <div className="p-4 rounded-2xl halo-gradient-bg text-white halo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold opacity-90 block">Halo Wallet Balance</span>
            <span className="text-xl font-bold tabular-nums">
              ${riderProfile.walletBalance.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => showToast('Wallet top-up initiated via Airwallex')}
            className="px-3 py-1.5 rounded-xl bg-white text-[#12141F] text-xs font-bold hover:bg-white/90 active:scale-95 transition-all shadow-xs"
          >
            Add Funds
          </button>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] divide-y divide-[#ECE9E4]/60 overflow-hidden halo-shadow-sm">
          <button
            type="button"
            onClick={() => showToast('Payment methods managed via Airwallex')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={16} className="text-[#6B6F80]" />
              <span className="text-xs font-semibold text-[#12141F]">Payment & Cards</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#6B6F80]">
              <span>Airwallex</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => showToast('Safety preferences are active (Automatic trip share enabled)')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-[#1F9D7A]" />
              <span className="text-xs font-semibold text-[#12141F]">Safety Preferences</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Push notifications enabled for trip updates')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-[#6B6F80]" />
              <span className="text-xs font-semibold text-[#12141F]">Notifications</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Support line available 24/7')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={16} className="text-[#6B6F80]" />
              <span className="text-xs font-semibold text-[#12141F]">Help & Support</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>
        </div>

        {/* Demo Logout */}
        <button
          type="button"
          onClick={() => setRiderScreen('onboarding')}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-[#ECE9E4] text-xs font-semibold text-[#E5484D] hover:bg-rose-50 transition-colors"
        >
          <LogOut size={14} />
          <span>Reset to Onboarding Demo</span>
        </button>
      </div>
    </div>
  );
};
