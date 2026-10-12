/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Star, ThumbsUp, ShieldCheck, Heart, Award } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const DriverHistory: React.FC = () => {
  const { setDriverScreen, driverProfile } = useHalo();

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
          <span className="text-sm font-bold text-[#12141F]">Ratings & Performance</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Rating KPI Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-3xl font-extrabold text-[#12141F] tabular-nums">
            <Star size={28} className="text-[#E8A33D] fill-[#E8A33D]" />
            <span>{driverProfile.rating}</span>
          </div>
          <p className="text-xs font-semibold text-[#12141F]">Top 5% Halo Driver in San Francisco</p>
          <p className="text-[11px] text-[#6B6F80]">Based on 3,420 lifetime passenger ratings</p>

          {/* Rating distribution breakdown */}
          <div className="pt-3 border-t border-[#ECE9E4] space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] w-6 text-right font-medium">5 ★</span>
              <div className="flex-1 h-2 bg-[#F7F5F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#1F9D7A] rounded-full w-[94%]" />
              </div>
              <span className="text-[10px] w-8 text-right font-semibold tabular-nums">94%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] w-6 text-right font-medium">4 ★</span>
              <div className="flex-1 h-2 bg-[#F7F5F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8A33D] rounded-full w-[5%]" />
              </div>
              <span className="text-[10px] w-8 text-right font-semibold tabular-nums">5%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] w-6 text-right font-medium">3 ★</span>
              <div className="flex-1 h-2 bg-[#F7F5F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#ECE9E4] rounded-full w-[1%]" />
              </div>
              <span className="text-[10px] w-8 text-right font-semibold tabular-nums">1%</span>
            </div>
          </div>
        </div>

        {/* Rider Compliment Badges */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] px-1">
            Top Rider Compliments
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-xl border border-[#ECE9E4] p-3 text-center space-y-1">
              <Award size={18} className="text-[#FF5F45] mx-auto" />
              <span className="text-sm font-bold text-[#12141F] block tabular-nums">1,240</span>
              <span className="text-[10px] text-[#6B6F80] block">Smooth Driving</span>
            </div>

            <div className="bg-white rounded-xl border border-[#ECE9E4] p-3 text-center space-y-1">
              <Heart size={18} className="text-[#FF8A4C] mx-auto" />
              <span className="text-sm font-bold text-[#12141F] block tabular-nums">980</span>
              <span className="text-[10px] text-[#6B6F80] block">Clean Vehicle</span>
            </div>

            <div className="bg-white rounded-xl border border-[#ECE9E4] p-3 text-center space-y-1">
              <ThumbsUp size={18} className="text-[#1F9D7A] mx-auto" />
              <span className="text-sm font-bold text-[#12141F] block tabular-nums">840</span>
              <span className="text-[10px] text-[#6B6F80] block">Great Navigation</span>
            </div>

            <div className="bg-white rounded-xl border border-[#ECE9E4] p-3 text-center space-y-1">
              <ShieldCheck size={18} className="text-[#12141F] mx-auto" />
              <span className="text-sm font-bold text-[#12141F] block tabular-nums">100%</span>
              <span className="text-[10px] text-[#6B6F80] block">Zero Incidents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
