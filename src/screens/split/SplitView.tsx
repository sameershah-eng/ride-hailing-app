/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RiderApp } from '../rider/RiderApp';
import { DriverApp } from '../driver/DriverApp';
import { useHalo } from '../../context/HaloContext';
import { Sparkles, ArrowRightLeft } from 'lucide-react';

export const SplitView: React.FC = () => {
  const { activeRide } = useHalo();

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col items-center justify-start py-6 px-4 pb-28">
      {/* Top Banner explaining the live sync */}
      <div className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ECE9E4] halo-shadow-sm text-xs font-semibold text-[#12141F]">
        <span className="w-2 h-2 rounded-full bg-[#1F9D7A] animate-pulse" />
        <ArrowRightLeft size={14} className="text-[#FF5F45]" />
        <span>
          Real-Time Synced Mode: Request a ride on the Left phone → Accept on the Right phone
        </span>
      </div>

      {/* Side-by-Side Phone Frames */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-6xl">
        {/* Rider Phone */}
        <div className="flex flex-col items-center">
          <RiderApp isSplitMode={true} />
        </div>

        {/* Driver Phone */}
        <div className="flex flex-col items-center">
          <DriverApp isSplitMode={true} />
        </div>
      </div>
    </div>
  );
};
