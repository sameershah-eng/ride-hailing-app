/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  appName: string;
  appBadge?: string;
  badgeColor?: 'coral' | 'emerald' | 'amber';
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  appName,
  appBadge,
  badgeColor = 'coral',
}) => {
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Top device label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6F80]">
          {appName}
        </span>
        {appBadge && (
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              badgeColor === 'emerald'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : badgeColor === 'amber'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-[#FFEDE8] text-[#FF5F45] border border-[#FFD8CF]'
            }`}
          >
            {appBadge}
          </span>
        )}
      </div>

      {/* Realistic iPhone Chassis (390 x 844 viewport) */}
      <div
        className="relative w-[390px] h-[844px] max-w-full rounded-[52px] p-[11px] bg-[#1C1D24] shadow-[0_24px_64px_rgba(18,20,31,0.18),0_4px_16px_rgba(18,20,31,0.08)] ring-1 ring-black/40 ring-inset select-none"
        style={{
          boxShadow:
            '0 0 0 1px #2B2D38, 0 16px 48px -8px rgba(18, 20, 31, 0.22), 0 32px 72px -16px rgba(18, 20, 31, 0.16)',
        }}
      >
        {/* Stainless Steel Side Buttons Simulation */}
        <div className="absolute -left-[14px] top-[115px] w-[3px] h-[26px] bg-[#3A3C4A] rounded-l-sm" />
        <div className="absolute -left-[14px] top-[165px] w-[3px] h-[50px] bg-[#3A3C4A] rounded-l-sm" />
        <div className="absolute -left-[14px] top-[225px] w-[3px] h-[50px] bg-[#3A3C4A] rounded-l-sm" />
        <div className="absolute -right-[14px] top-[180px] w-[3px] h-[75px] bg-[#3A3C4A] rounded-r-sm" />

        {/* Screen Bezel & Display Interior */}
        <div className="relative w-full h-full bg-[#F7F5F2] rounded-[42px] overflow-hidden flex flex-col border border-black/10">
          {/* iOS Status Bar */}
          <div className="relative z-30 h-11 w-full flex items-center justify-between px-7 shrink-0 text-[#12141F] font-semibold text-[13px] tracking-tight">
            {/* Clock */}
            <span className="tabular-nums font-medium">{timeStr}</span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[116px] h-[28px] bg-[#12141F] rounded-full flex items-center justify-between px-3 shadow-xs">
              {/* Sensor lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#1F212E]" />
              {/* Camera lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#181924] border border-[#2B2D3B]/40" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-[#12141F]">
              {/* Cellular 4 bars */}
              <div className="flex items-end gap-[1.5px] h-3">
                <div className="w-[2.5px] h-1.5 bg-[#12141F] rounded-2xs" />
                <div className="w-[2.5px] h-2 bg-[#12141F] rounded-2xs" />
                <div className="w-[2.5px] h-2.5 bg-[#12141F] rounded-2xs" />
                <div className="w-[2.5px] h-3 bg-[#12141F] rounded-2xs" />
              </div>
              <Wifi size={14} strokeWidth={2.2} />
              <div className="flex items-center gap-0.5">
                <Battery size={16} strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Phone Screen Dynamic Viewport Content */}
          <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="relative z-30 h-5 w-full flex items-center justify-center shrink-0 pointer-events-none pb-1">
            <div className="w-32 h-1 bg-[#12141F]/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
