/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Star, ChevronRight, X, Wallet, CreditCard } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { RiderInfo } from '../../types';

export const AdminRiders: React.FC = () => {
  const { ridersList, showToast } = useHalo();
  const [search, setSearch] = useState('');
  const [selectedRider, setSelectedRider] = useState<RiderInfo | null>(null);

  const filtered = ridersList.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Passenger Directory
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Review passenger ratings, ride counts, and Airwallex wallet balances
          </p>
        </div>

        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6F80]" />
          <input
            type="text"
            placeholder="Search passenger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-xl border border-[#ECE9E4] focus:outline-none focus:border-[#FF5F45]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECE9E4] overflow-hidden halo-shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F2] border-b border-[#ECE9E4] text-[#6B6F80] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">Wallet Balance</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE9E4]/60">
              {filtered.map((rider) => (
                <tr
                  key={rider.id}
                  onClick={() => setSelectedRider(rider)}
                  className="hover:bg-[#F7F5F2] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-[#FF5F45]"
                        style={{ backgroundColor: rider.avatarBg }}
                      >
                        {rider.avatarInitials}
                      </div>
                      <span className="font-bold text-[#12141F]">{rider.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-[#6B6F80]">
                    <span className="block text-[#12141F] font-medium">{rider.email}</span>
                    <span className="text-[10px]">{rider.phone}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-[#12141F]">
                      <Star size={12} className="text-[#E8A33D] fill-[#E8A33D]" />
                      <span className="tabular-nums">{rider.rating}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold tabular-nums text-[#12141F]">
                    {rider.totalRides} rides
                  </td>

                  <td className="py-3.5 px-4 font-bold tabular-nums text-[#1F9D7A]">
                    ${rider.walletBalance.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[#6B6F80] group-hover:text-[#FF5F45] font-semibold text-[11px] inline-flex items-center gap-0.5">
                      Inspect <ChevronRight size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rider Drawer */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between overflow-y-auto halo-shadow-2xl space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4]">
                <h3 className="text-sm font-bold text-[#12141F]">Passenger Record</h3>
                <button
                  type="button"
                  onClick={() => setSelectedRider(null)}
                  className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-[#FF5F45]"
                  style={{ backgroundColor: selectedRider.avatarBg }}
                >
                  {selectedRider.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#12141F]">{selectedRider.name}</h4>
                  <p className="text-xs text-[#6B6F80]">{selectedRider.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ID: {selectedRider.id}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1.5 text-xs">
                <span className="font-bold text-[#12141F] block">Airwallex Customer Vault</span>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Stored Cards</span>
                  <span className="font-semibold text-[#12141F]">
                    {selectedRider.savedPaymentCards.length} Cards on File
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Prepaid Balance</span>
                  <span className="font-bold text-[#1F9D7A] tabular-nums">
                    ${selectedRider.walletBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast(`Promo credit dispatched to ${selectedRider.name}`);
                setSelectedRider(null);
              }}
              className="w-full py-3 rounded-xl halo-gradient-bg text-white font-bold text-xs"
            >
              Issue Goodwill Credit ($10.00)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
