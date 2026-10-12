/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Coins,
  Calculator,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Car,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { VehicleTier, VehicleOption } from '../../types';

export const AdminFareManagement: React.FC = () => {
  const { vehicleOptions, updateVehiclePricing, showToast } = useHalo();

  // Local editable copy
  const [faresState, setFaresState] = useState<VehicleOption[]>(vehicleOptions);

  // Live calculator test parameters
  const [calcTier, setCalcTier] = useState<VehicleTier>('halo_go');
  const [calcDistance, setCalcDistance] = useState<number>(5.4); // km
  const [calcDuration, setCalcDuration] = useState<number>(14); // minutes

  const handleFieldChange = (
    tierId: VehicleTier,
    field: keyof VehicleOption,
    value: number
  ) => {
    setFaresState((prev) =>
      prev.map((opt) => (opt.id === tierId ? { ...opt, [field]: value } : opt))
    );
  };

  const handleSaveAll = () => {
    faresState.forEach((tier) => {
      updateVehiclePricing(tier.id, tier);
    });
    showToast('Fixed fare pricing matrix published across all Rider apps!');
  };

  // Calculate live preview price
  const activeCalcTierObj = faresState.find((t) => t.id === calcTier) || faresState[0];
  const previewBase = activeCalcTierObj.baseFare;
  const previewDist = Number((calcDistance * activeCalcTierObj.perKm).toFixed(2));
  const previewTime = Number((calcDuration * activeCalcTierObj.perMin).toFixed(2));
  const previewBooking = activeCalcTierObj.bookingFee;
  const rawTotal = previewBase + previewDist + previewTime + previewBooking;
  const previewTotal = Math.max(activeCalcTierObj.minimumFare, rawTotal);
  const driverNetEarnings = (previewTotal * 0.82).toFixed(2);
  const haloCommission = (previewTotal * 0.18).toFixed(2);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Fixed Fare Pricing Matrix
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Configure deterministic base rates, per-distance tariffs, and platform fees. No surge multipliers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl halo-gradient-bg text-white text-xs font-bold halo-shadow-sm active:scale-95 transition-all cursor-pointer self-start"
        >
          <Save size={15} />
          <span>Save & Deploy Pricing</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Fares Matrix Configuration Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {faresState.map((tier) => (
            <div
              key={tier.id}
              className="bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg halo-gradient-bg flex items-center justify-center text-white">
                    <Car size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#12141F]">{tier.name}</h3>
                    <p className="text-[10px] text-[#6B6F80]">{tier.tagline}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Fixed Pricing
                </span>
              </div>

              {/* 5 Fare Parameter Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Base Fare ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={tier.baseFare}
                    onChange={(e) =>
                      handleFieldChange(tier.id, 'baseFare', parseFloat(e.target.value) || 0)
                    }
                    className="w-full font-semibold px-2.5 py-1.5 rounded-lg border border-[#ECE9E4] bg-[#F7F5F2] focus:bg-white focus:outline-none focus:border-[#FF5F45] tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Per Km ($)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={tier.perKm}
                    onChange={(e) =>
                      handleFieldChange(tier.id, 'perKm', parseFloat(e.target.value) || 0)
                    }
                    className="w-full font-semibold px-2.5 py-1.5 rounded-lg border border-[#ECE9E4] bg-[#F7F5F2] focus:bg-white focus:outline-none focus:border-[#FF5F45] tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Per Minute ($)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={tier.perMin}
                    onChange={(e) =>
                      handleFieldChange(tier.id, 'perMin', parseFloat(e.target.value) || 0)
                    }
                    className="w-full font-semibold px-2.5 py-1.5 rounded-lg border border-[#ECE9E4] bg-[#F7F5F2] focus:bg-white focus:outline-none focus:border-[#FF5F45] tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Booking Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={tier.bookingFee}
                    onChange={(e) =>
                      handleFieldChange(tier.id, 'bookingFee', parseFloat(e.target.value) || 0)
                    }
                    className="w-full font-semibold px-2.5 py-1.5 rounded-lg border border-[#ECE9E4] bg-[#F7F5F2] focus:bg-white focus:outline-none focus:border-[#FF5F45] tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Minimum Fare ($)
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    value={tier.minimumFare}
                    onChange={(e) =>
                      handleFieldChange(tier.id, 'minimumFare', parseFloat(e.target.value) || 0)
                    }
                    className="w-full font-semibold px-2.5 py-1.5 rounded-lg border border-[#ECE9E4] bg-[#F7F5F2] focus:bg-white focus:outline-none focus:border-[#FF5F45] tabular-nums"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Trip Fare Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
            <div className="flex items-center gap-2">
              <Calculator size={18} className="text-[#FF5F45]" />
              <h3 className="text-sm font-bold text-[#12141F]">
                Live Fare Simulator
              </h3>
            </div>
            <span className="text-[10px] text-[#6B6F80] font-semibold">Real-Time Estimator</span>
          </div>

          {/* Tier Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1.5">
              Select Tier to Test
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['halo_go', 'halo_comfort', 'halo_xl'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCalcTier(t)}
                  className={`py-1.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    calcTier === t
                      ? 'halo-gradient-bg text-white border-transparent shadow-xs'
                      : 'border-[#ECE9E4] text-[#12141F] hover:bg-[#F7F5F2]'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[#6B6F80]">Trip Distance</span>
              <span className="font-bold text-[#12141F] tabular-nums">
                {calcDistance.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.2"
              value={calcDistance}
              onChange={(e) => setCalcDistance(parseFloat(e.target.value))}
              className="w-full accent-[#FF5F45] cursor-pointer"
            />
          </div>

          {/* Duration Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[#6B6F80]">Trip Duration</span>
              <span className="font-bold text-[#12141F] tabular-nums">
                {calcDuration} minutes
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="1"
              value={calcDuration}
              onChange={(e) => setCalcDuration(parseInt(e.target.value))}
              className="w-full accent-[#FF5F45] cursor-pointer"
            />
          </div>

          {/* Estimated Upfront Result */}
          <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
              <span className="text-xs text-[#6B6F80]">Passenger Upfront Fare</span>
              <span className="text-2xl font-extrabold text-[#12141F] tabular-nums">
                ${previewTotal.toFixed(2)}
              </span>
            </div>

            <div className="space-y-1 text-xs text-[#6B6F80]">
              <div className="flex justify-between">
                <span>Driver Payout (82%)</span>
                <span className="font-semibold text-[#1F9D7A] tabular-nums">
                  ${driverNetEarnings}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Halo Platform Margin (18%)</span>
                <span className="font-semibold text-[#12141F] tabular-nums">
                  ${haloCommission}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#ECE9E4] text-[10px] text-[#6B6F80] flex items-start gap-1.5">
            <Info size={14} className="text-[#FF5F45] shrink-0 mt-0.5" />
            <span>
              All riders in the Rider App will be billed exactly this fixed amount before booking. Driver and Rider sync automatically.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
