/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  Car,
  FileText,
  Landmark,
  ShieldCheck,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
  Star,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const DriverProfile: React.FC = () => {
  const { setDriverScreen, driverProfile, showToast } = useHalo();

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#ECE9E4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDriverScreen('home')}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Driver Profile</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-[#1F9D7A] border border-[#ECE9E4]"
            style={{ backgroundColor: driverProfile.avatarBg }}
          >
            {driverProfile.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#12141F] truncate">{driverProfile.name}</h3>
            <p className="text-xs text-[#6B6F80]">{driverProfile.phone}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#12141F] bg-[#F7F5F2] px-2 py-0.5 rounded-full border border-[#ECE9E4]">
                <Star size={11} className="text-[#E8A33D] fill-[#E8A33D]" />
                <span>{driverProfile.rating} Rating</span>
              </span>
              <span className="text-[10px] text-[#6B6F80]">3,420 trips</span>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
            <div className="flex items-center gap-2">
              <Car size={16} className="text-[#FF5F45]" />
              <span className="text-xs font-bold text-[#12141F]">Active Vehicle</span>
            </div>
            <span className="text-[10px] font-bold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Approved
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6B6F80]">Vehicle Model</span>
              <span className="font-semibold text-[#12141F]">{driverProfile.vehicleModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6F80]">Color</span>
              <span className="font-semibold text-[#12141F]">{driverProfile.vehicleColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6F80]">License Plate</span>
              <span className="font-mono font-bold text-[#12141F] bg-[#F7F5F2] px-1.5 py-0.5 rounded border border-[#ECE9E4]">
                {driverProfile.licensePlate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6F80]">Tier Category</span>
              <span className="font-semibold text-[#12141F]">Halo Go (Sedan)</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] divide-y divide-[#ECE9E4]/60 overflow-hidden halo-shadow-sm">
          <button
            type="button"
            onClick={() => setDriverScreen('verification')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-[#6B6F80]" />
              <span className="text-xs font-semibold text-[#12141F]">Documents & Inspection</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Bank details managed via Airwallex Payouts')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Landmark size={16} className="text-[#1F9D7A]" />
              <span className="text-xs font-semibold text-[#12141F]">Bank Accounts (Airwallex)</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Driver Safety Hotline: 1-800-555-HALO')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F7F5F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-[#6B6F80]" />
              <span className="text-xs font-semibold text-[#12141F]">Safety & Roadside Assistance</span>
            </div>
            <ChevronRight size={14} className="text-[#6B6F80]" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setDriverScreen('verification')}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-[#ECE9E4] text-xs font-semibold text-[#6B6F80] hover:text-[#12141F]"
        >
          <span>View Verification Checklist</span>
        </button>
      </div>
    </div>
  );
};
