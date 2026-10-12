/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Receipt, ChevronRight, Star, X, Download, ShieldCheck } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const RiderHistory: React.FC = () => {
  const { setRiderScreen, riderHistory, showToast } = useHalo();
  const [filter, setFilter] = useState<'all' | 'recent'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<(typeof riderHistory)[0] | null>(null);

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-[#ECE9E4] shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={() => setRiderScreen('home')}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Your Trips</span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'halo-gradient-bg text-white shadow-xs'
                : 'bg-[#F7F5F2] text-[#6B6F80] hover:text-[#12141F]'
            }`}
          >
            All Rides
          </button>
          <button
            type="button"
            onClick={() => setFilter('recent')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filter === 'recent'
                ? 'halo-gradient-bg text-white shadow-xs'
                : 'bg-[#F7F5F2] text-[#6B6F80] hover:text-[#12141F]'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Trips List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {riderHistory.map((trip) => (
          <button
            key={trip.id}
            type="button"
            onClick={() => setSelectedReceipt(trip)}
            className="w-full bg-white rounded-2xl border border-[#ECE9E4] p-3.5 text-left hover:border-[#FF5F45] halo-shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#12141F]">{trip.tier}</span>
                <span className="text-[10px] text-[#6B6F80] font-mono">{trip.code}</span>
              </div>
              <span className="text-xs font-bold text-[#12141F] tabular-nums">
                ${trip.fare.toFixed(2)}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#12141F] truncate max-w-[220px]">
                  {trip.pickup} → {trip.dropoff}
                </p>
                <p className="text-[10px] text-[#6B6F80] mt-0.5">{trip.date}</p>
              </div>
              <div className="flex items-center gap-1 text-[#6B6F80] group-hover:text-[#FF5F45]">
                <span className="text-[10px] font-medium">Receipt</span>
                <ChevronRight size={13} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Itemized Receipt Modal */}
      {selectedReceipt && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 space-y-4 halo-shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
              <div>
                <span className="text-sm font-bold text-[#12141F]">Ride Receipt</span>
                <p className="text-[11px] text-[#6B6F80] font-mono">{selectedReceipt.code}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#12141F]">
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Date & Time</span>
                <span className="font-medium">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Driver</span>
                <span className="font-medium">{selectedReceipt.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Route</span>
                <span className="font-medium truncate max-w-[200px]">
                  {selectedReceipt.dropoff}
                </span>
              </div>
              <div className="pt-2 border-t border-[#ECE9E4] flex justify-between font-bold text-sm">
                <span>Total Paid</span>
                <span className="tabular-nums text-[#FF5F45]">${selectedReceipt.fare.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F5F2] text-[10px] text-[#6B6F80]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#1F9D7A]" />
                <span>Airwallex Transaction Authorized</span>
              </div>
              <span className="font-mono">TXN-8492019</span>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast('Receipt PDF sent to amara.vance@workmail.com');
                setSelectedReceipt(null);
              }}
              className="w-full py-2.5 rounded-xl halo-gradient-bg text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              <span>Email Official PDF Receipt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
