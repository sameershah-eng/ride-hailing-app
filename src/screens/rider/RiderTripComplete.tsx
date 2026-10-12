/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  CheckCircle2,
  Receipt,
  Heart,
  CreditCard,
  Sparkles,
  Download,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const RiderTripComplete: React.FC = () => {
  const { activeRide, rateAndTipRide, showToast } = useHalo();

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Smooth driving', 'Clean car']);
  const [selectedTip, setSelectedTip] = useState<number>(3);

  const availableTags = [
    'Smooth driving',
    'Clean car',
    'Great route',
    'Polite & friendly',
    'Quiet ride',
    'Great music',
  ];

  const tipOptions = [0, 1, 3, 5];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleComplete = () => {
    rateAndTipRide(rating, selectedTags, selectedTip);
  };

  const fareTotal = activeRide?.fareBreakdown.totalFare ?? 14.2;
  const finalTotal = Number((fareTotal + selectedTip).toFixed(2));

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col justify-between p-5 overflow-y-auto">
      {/* Top Completion Header */}
      <div className="text-center pt-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-14 h-14 rounded-full bg-[#1F9D7A]/15 text-[#1F9D7A] flex items-center justify-center mx-auto mb-2 border border-[#1F9D7A]/20"
        >
          <CheckCircle2 size={30} strokeWidth={2.2} />
        </motion.div>
        <h2 className="text-xl font-bold text-[#12141F]">You have arrived!</h2>
        <p className="text-xs text-[#6B6F80]">
          Trip completed safely at {activeRide?.dropoff.name || 'Ferry Building'}
        </p>
      </div>

      {/* Itemized Airwallex Receipt Card */}
      <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3 my-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
          <div className="flex items-center gap-1.5">
            <Receipt size={14} className="text-[#FF5F45]" />
            <span className="text-xs font-bold text-[#12141F]">Trip Receipt</span>
          </div>
          <span className="text-[10px] text-[#6B6F80] font-mono">{activeRide?.code || 'HL-8492'}</span>
        </div>

        <div className="space-y-1.5 text-xs text-[#6B6F80]">
          <div className="flex justify-between">
            <span>Ride Fare (Halo Go)</span>
            <span className="tabular-nums font-semibold text-[#12141F]">
              ${fareTotal.toFixed(2)}
            </span>
          </div>
          {selectedTip > 0 && (
            <div className="flex justify-between text-[#1F9D7A]">
              <span>Driver Tip</span>
              <span className="tabular-nums font-semibold">
                +${selectedTip.toFixed(2)}
              </span>
            </div>
          )}
          <div className="pt-2 border-t border-[#ECE9E4] flex justify-between font-bold text-sm text-[#12141F]">
            <span>Total Paid</span>
            <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Airwallex Payment confirmation badge */}
        <div className="pt-1 flex items-center justify-between text-[10px] text-[#6B6F80] border-t border-dashed border-[#ECE9E4]">
          <div className="flex items-center gap-1">
            <CreditCard size={12} />
            <span>Paid with {activeRide?.paymentMethod.label || 'Mastercard •••• 4821'}</span>
          </div>
          <span className="text-[#1F9D7A] font-semibold">Processed via Airwallex</span>
        </div>
      </div>

      {/* Driver Rating & Review Section */}
      <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3 mb-3">
        <div className="text-center">
          <p className="text-xs font-semibold text-[#12141F]">
            Rate {activeRide?.driver?.name || 'Tariq Vance'}
          </p>
          <div className="flex justify-center gap-2 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  size={26}
                  className={star <= rating ? 'text-[#E8A33D] fill-[#E8A33D]' : 'text-[#ECE9E4]'}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Quick compliment tags */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleToggleTag(tag)}
                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                  isSelected
                    ? 'border-[#FF5F45] bg-[#FFEDE8] text-[#FF5F45]'
                    : 'border-[#ECE9E4] text-[#6B6F80] hover:bg-[#F7F5F2]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Tip Selector */}
        <div className="pt-2 border-t border-[#ECE9E4]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#12141F] mb-2">
            <span className="flex items-center gap-1 text-[#6B6F80]">
              <Heart size={13} className="text-[#FF5F45]" />
              <span>Add driver tip</span>
            </span>
            <span className="text-[10px] text-[#1F9D7A]">100% goes to driver</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {tipOptions.map((tip) => (
              <button
                key={tip}
                type="button"
                onClick={() => setSelectedTip(tip)}
                className={`py-1.5 rounded-xl border text-xs font-bold tabular-nums transition-all ${
                  selectedTip === tip
                    ? 'halo-gradient-bg text-white border-transparent shadow-xs'
                    : 'border-[#ECE9E4] text-[#12141F] hover:bg-[#F7F5F2]'
                }`}
              >
                {tip === 0 ? 'No tip' : `$${tip}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button
        type="button"
        onClick={handleComplete}
        className="w-full py-3.5 px-4 rounded-2xl halo-gradient-bg text-white font-bold text-sm halo-shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
      >
        Done
      </button>
    </div>
  );
};
