/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Users,
  Clock,
  Info,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  X,
  Car,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { VehicleTier } from '../../types';
import { MapView } from '../../components/common/MapView';
import { RiderPaymentModal } from './RiderPaymentModal';

export const RiderVehicleSelect: React.FC = () => {
  const {
    setRiderScreen,
    pickupLocation,
    dropoffLocation,
    selectedTier,
    setSelectedTier,
    vehicleOptions,
    calculateFare,
    selectedCard,
    requestRide,
  } = useHalo();

  const [showFareBreakdown, setShowFareBreakdown] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const currentFare = calculateFare(selectedTier);
  const selectedVehicleObj = vehicleOptions.find((v) => v.id === selectedTier) || vehicleOptions[0];

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-hidden">
      {/* Background Map showing the planned route */}
      <div className="h-[40%] w-full relative shrink-0">
        <MapView
          pickup={pickupLocation}
          dropoff={dropoffLocation}
          showRoute={true}
          progressPercent={0}
          className="w-full h-full"
        />

        {/* Back navigation button */}
        <button
          type="button"
          onClick={() => setRiderScreen('search')}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] flex items-center justify-center text-[#12141F] shadow-sm hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Route summary badge */}
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE9E4] text-[11px] font-semibold text-[#12141F] shadow-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F9D7A]" />
          <span>4.2 km · 11 min</span>
        </div>
      </div>

      {/* Vehicle Options Sheet */}
      <div className="flex-1 bg-white rounded-t-[26px] border-t border-[#ECE9E4] p-4 flex flex-col justify-between overflow-y-auto halo-shadow-xl">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
              Choose Vehicle Option
            </span>
            <span className="text-[11px] font-semibold text-[#1F9D7A] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Guaranteed Fixed Fare
            </span>
          </div>

          {/* 3 Vehicle Tiers */}
          <div className="space-y-2">
            {vehicleOptions.map((opt) => {
              const fare = calculateFare(opt.id);
              const isSelected = selectedTier === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedTier(opt.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FF5F45] bg-[#FFEDE8]/25 ring-1 ring-[#FF5F45] halo-shadow-sm'
                      : 'border-[#ECE9E4] bg-white hover:bg-[#F7F5F2]'
                  }`}
                >
                  {/* Left: Icon & info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'halo-gradient-bg text-white shadow-xs'
                          : 'bg-[#F7F5F2] text-[#12141F] border border-[#ECE9E4]'
                      }`}
                    >
                      <Car size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#12141F]">{opt.name}</span>
                        <div className="flex items-center gap-0.5 text-[10px] text-[#6B6F80]">
                          <Users size={11} />
                          <span>{opt.seats}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6B6F80]">{opt.tagline}</p>
                      <div className="flex items-center gap-1 text-[10px] font-medium text-[#1F9D7A] pt-0.5">
                        <Clock size={10} />
                        <span>{opt.etaMinutes} min away</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-[#12141F] tabular-nums">
                      ${fare.totalFare.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-[#6B6F80]">Fixed</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fare Breakdown button */}
          <button
            type="button"
            onClick={() => setShowFareBreakdown(true)}
            className="flex items-center justify-between w-full p-2 text-[11px] font-medium text-[#6B6F80] hover:text-[#12141F] transition-colors"
          >
            <span className="flex items-center gap-1">
              <Info size={13} />
              <span>View transparent fare breakdown</span>
            </span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Bottom Booking Bar */}
        <div className="pt-2 border-t border-[#ECE9E4] space-y-2.5">
          {/* Payment Method Selector Pill */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#F7F5F2] rounded-xl border border-[#ECE9E4]">
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 text-xs font-medium text-[#12141F] hover:text-[#FF5F45] transition-colors text-left"
            >
              <CreditCard size={15} className="text-[#6B6F80]" />
              <span>{selectedCard.brand.toUpperCase()} •••• {selectedCard.last4}</span>
              <span className="text-[10px] text-[#6B6F80] underline">Change</span>
            </button>
            <span className="text-[10px] text-[#6B6F80]">Airwallex</span>
          </div>

          {/* Primary Request Button */}
          <button
            type="button"
            onClick={requestRide}
            className="w-full py-3.5 px-4 rounded-2xl halo-gradient-bg text-white font-bold text-sm halo-shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer"
          >
            <span>Request {selectedVehicleObj.name}</span>
            <span className="tabular-nums font-bold text-base">
              ${currentFare.totalFare.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Fare Breakdown Modal Sheet */}
      <AnimatePresence>
        {showFareBreakdown && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 halo-shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4]">
                <div>
                  <span className="text-sm font-bold text-[#12141F]">
                    {selectedVehicleObj.name} Price Breakdown
                  </span>
                  <p className="text-[11px] text-[#6B6F80]">4.2 km · 11 min estimated trip</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFareBreakdown(false)}
                  className="w-7 h-7 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#6B6F80]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-[#12141F]">
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Base Fare</span>
                  <span className="font-semibold tabular-nums">${currentFare.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Distance Fare (4.2 km @ ${selectedVehicleObj.perKm}/km)</span>
                  <span className="font-semibold tabular-nums">${currentFare.distanceFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Time Fare (11 min @ ${selectedVehicleObj.perMin}/min)</span>
                  <span className="font-semibold tabular-nums">${currentFare.timeFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Halo Platform & Safety Fee</span>
                  <span className="font-semibold tabular-nums">${currentFare.bookingFee.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-[#ECE9E4] flex justify-between text-sm font-bold">
                  <span>Total Upfront Fare</span>
                  <span className="tabular-nums text-[#FF5F45]">${currentFare.totalFare.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F5F2] text-[10px] text-[#6B6F80] mb-4">
                No surge pricing. Halo guarantees this price regardless of route traffic delays.
              </div>

              <button
                type="button"
                onClick={() => setShowFareBreakdown(false)}
                className="w-full py-2.5 rounded-xl bg-[#12141F] text-white text-xs font-semibold"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Selection Modal */}
      <RiderPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
};
