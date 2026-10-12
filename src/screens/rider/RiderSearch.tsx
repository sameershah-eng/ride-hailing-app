/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowUpDown, MapPin, Search, Clock, Check } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { INITIAL_LOCATIONS } from '../../data/mockData';
import { LocationPoint } from '../../types';

export const RiderSearch: React.FC = () => {
  const {
    setRiderScreen,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    swapLocations,
  } = useHalo();

  const [activeField, setActiveField] = useState<'pickup' | 'dropoff'>('dropoff');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = INITIAL_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (loc: LocationPoint) => {
    if (activeField === 'pickup') {
      setPickupLocation(loc);
      setActiveField('dropoff');
    } else {
      setDropoffLocation(loc);
      setRiderScreen('vehicle_select');
    }
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-[#ECE9E4] bg-[#F7F5F2]/50 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={() => setRiderScreen('home')}
            className="w-8 h-8 rounded-full bg-white border border-[#ECE9E4] flex items-center justify-center text-[#12141F] hover:bg-[#F7F5F2] active:scale-95 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Plan your ride</span>
        </div>

        {/* Pickup & Dropoff Inputs Container */}
        <div className="relative flex items-center gap-2 bg-white p-3 rounded-2xl border border-[#ECE9E4] halo-shadow-sm">
          {/* Timeline dots indicator */}
          <div className="flex flex-col items-center justify-between py-1 self-stretch shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#12141F]" />
            <div className="w-0.5 h-5 bg-[#ECE9E4] my-0.5" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F45]" />
          </div>

          {/* Input fields */}
          <div className="flex-1 space-y-2">
            <div>
              <input
                type="text"
                placeholder="Pickup location"
                value={activeField === 'pickup' && searchQuery ? searchQuery : pickupLocation.name}
                onFocus={() => {
                  setActiveField('pickup');
                  setSearchQuery('');
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-all ${
                  activeField === 'pickup'
                    ? 'border-[#12141F] bg-[#F7F5F2]'
                    : 'border-transparent hover:bg-[#F7F5F2]'
                }`}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Where to?"
                value={activeField === 'dropoff' && searchQuery ? searchQuery : dropoffLocation.name}
                onFocus={() => {
                  setActiveField('dropoff');
                  setSearchQuery('');
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className={`w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-all ${
                  activeField === 'dropoff'
                    ? 'border-[#FF5F45] bg-[#FFEDE8]/30'
                    : 'border-transparent hover:bg-[#F7F5F2]'
                }`}
              />
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={swapLocations}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] border border-[#ECE9E4] flex items-center justify-center text-[#12141F] active:scale-95 transition-all shrink-0"
            title="Swap Pickup and Drop-off"
          >
            <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      {/* Suggested & Search Results List */}
      <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#ECE9E4]/60">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] pb-2">
          {searchQuery ? 'Search Results' : 'Suggested Destinations in San Francisco'}
        </div>

        {filteredLocations.map((loc) => {
          const isSelected =
            (activeField === 'pickup' && pickupLocation.id === loc.id) ||
            (activeField === 'dropoff' && dropoffLocation.id === loc.id);

          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleSelectLocation(loc)}
              className="w-full flex items-center justify-between py-3 px-2 text-left hover:bg-[#F7F5F2] rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F7F5F2] group-hover:bg-white flex items-center justify-center text-[#6B6F80] border border-[#ECE9E4] shrink-0">
                  {loc.category === 'home' || loc.category === 'work' ? (
                    <Clock size={14} />
                  ) : (
                    <MapPin size={14} className={isSelected ? 'text-[#FF5F45]' : ''} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12141F] group-hover:text-[#FF5F45] transition-colors">
                    {loc.name}
                  </p>
                  <p className="text-[11px] text-[#6B6F80] truncate max-w-[220px]">
                    {loc.address}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-[#1F9D7A] text-white flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={2.5} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
