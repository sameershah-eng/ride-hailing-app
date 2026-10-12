/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Car,
  Navigation,
  Clock,
  MapPin,
  ShieldCheck,
  ChevronRight,
  X,
  Phone,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { MapView } from '../../components/common/MapView';

export const AdminLiveMonitoring: React.FC = () => {
  const {
    activeRide,
    tripProgress,
    driversList,
    cancelRide,
    showToast,
  } = useHalo();

  const [selectedRideCode, setSelectedRideCode] = useState<string | null>(
    activeRide?.code || 'HL-8492'
  );

  // Combine real active ride with mock background fleet rides
  const liveRidesList = [
    ...(activeRide
      ? [
          {
            id: activeRide.id,
            code: activeRide.code,
            tier: activeRide.tier === 'halo_go' ? 'Halo Go' : activeRide.tier === 'halo_comfort' ? 'Halo Comfort' : 'Halo XL',
            status:
              activeRide.status === 'searching'
                ? 'Searching'
                : activeRide.status === 'in_progress'
                ? 'On Trip'
                : 'En Route to Pickup',
            pickup: activeRide.pickup.name,
            dropoff: activeRide.dropoff.name,
            fare: activeRide.fareBreakdown.totalFare,
            rider: activeRide.riderName,
            driver: activeRide.driver?.name || 'Assigning...',
            vehicle: activeRide.driver?.vehicleModel || 'Pending',
            plate: activeRide.driver?.licensePlate || '—',
            isRealSynced: true,
          },
        ]
      : []),
    {
      id: 'r_mock_1',
      code: 'HL-4190',
      tier: 'Halo Comfort',
      status: 'On Trip',
      pickup: 'Ferry Building',
      dropoff: 'SFO Airport Terminal 2',
      fare: 38.4,
      rider: 'David L.',
      driver: 'Elena Rostova',
      vehicle: 'Tesla Model Y',
      plate: '9QWE441',
      isRealSynced: false,
    },
    {
      id: 'r_mock_2',
      code: 'HL-2218',
      tier: 'Halo XL',
      status: 'En Route to Pickup',
      pickup: 'Chase Center',
      dropoff: 'Presidio Tunnel Tops',
      fare: 29.5,
      rider: 'Chloe S.',
      driver: 'Mateo Silva',
      vehicle: 'Chevrolet Suburban',
      plate: '6VBN782',
      isRealSynced: false,
    },
  ];

  const currentInspectedRide =
    liveRidesList.find((r) => r.code === selectedRideCode) || liveRidesList[0];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-[#F7F5F2]">
      {/* Left: Big Map View Container (65% width) */}
      <div className="flex-1 relative h-full">
        <MapView
          pickup={activeRide?.pickup}
          dropoff={activeRide?.dropoff}
          driver={activeRide?.driver}
          showRoute={true}
          progressPercent={tripProgress}
          multiDrivers={driversList}
          className="w-full h-full"
        />

        {/* Floating City Fleet Stats Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 px-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#ECE9E4] halo-shadow-md text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1F9D7A] animate-pulse" />
          <span className="font-bold text-[#12141F]">SF Metro Active Radar</span>
          <span className="text-[#6B6F80]">· {liveRidesList.length} active dispatches</span>
        </div>
      </div>

      {/* Right: Active Rides Side Panel & Inspector Drawer (35% width, max 420px) */}
      <div className="w-full md:w-96 bg-white border-l border-[#ECE9E4] flex flex-col h-full z-20 shrink-0">
        {/* Panel Header */}
        <div className="p-4 border-b border-[#ECE9E4] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#12141F]">Active Trips Queue</h2>
            <p className="text-[11px] text-[#6B6F80]">
              {liveRidesList.length} trips currently in transit
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#1F9D7A] border border-emerald-200">
            Live Telemetry
          </span>
        </div>

        {/* Rides List */}
        <div className="p-3 space-y-2 border-b border-[#ECE9E4] max-h-60 overflow-y-auto">
          {liveRidesList.map((ride) => {
            const isSelected = selectedRideCode === ride.code;

            return (
              <button
                key={ride.id}
                type="button"
                onClick={() => setSelectedRideCode(ride.code)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#FF5F45] bg-[#FFEDE8]/20 ring-1 ring-[#FF5F45]'
                    : 'border-[#ECE9E4] hover:bg-[#F7F5F2]'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#ECE9E4]/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#12141F] font-mono">
                      {ride.code}
                    </span>
                    {ride.isRealSynced && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full halo-gradient-bg text-white font-bold">
                        SYNCED
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ride.status === 'On Trip'
                        ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                        : ride.status === 'Searching'
                        ? 'bg-amber-50 text-[#E8A33D] border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>

                <div className="pt-1.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#12141F] truncate max-w-[200px]">
                      {ride.pickup} → {ride.dropoff}
                    </p>
                    <p className="text-[10px] text-[#6B6F80]">
                      {ride.driver} · {ride.vehicle}
                    </p>
                  </div>
                  <span className="font-bold text-[#12141F] tabular-nums">
                    ${ride.fare.toFixed(2)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Ride Detailed Inspector */}
        {currentInspectedRide && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
                Trip Telemetry Inspector
              </span>
              <span className="text-xs font-mono font-bold text-[#12141F]">
                {currentInspectedRide.code}
              </span>
            </div>

            {/* Rider & Driver split cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4]">
                <span className="text-[10px] text-[#6B6F80] uppercase font-bold block">
                  Passenger
                </span>
                <span className="font-bold text-[#12141F] block mt-0.5">
                  {currentInspectedRide.rider}
                </span>
                <span className="text-[10px] text-[#1F9D7A]">★ 4.96 Verified</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4]">
                <span className="text-[10px] text-[#6B6F80] uppercase font-bold block">
                  Driver
                </span>
                <span className="font-bold text-[#12141F] block mt-0.5">
                  {currentInspectedRide.driver}
                </span>
                <span className="text-[10px] text-[#6B6F80]">
                  Plate: {currentInspectedRide.plate}
                </span>
              </div>
            </div>

            {/* Route Addresses */}
            <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#12141F] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#6B6F80] font-semibold block uppercase">
                    Pickup Location
                  </span>
                  <span className="font-semibold text-[#12141F]">
                    {currentInspectedRide.pickup}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F45] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#6B6F80] font-semibold block uppercase">
                    Drop-off Location
                  </span>
                  <span className="font-semibold text-[#12141F]">
                    {currentInspectedRide.dropoff}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety & Airwallex Payment Audit */}
            <div className="p-3 rounded-xl border border-[#ECE9E4] text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#6B6F80]">Airwallex Hold</span>
                <span className="font-bold text-[#12141F] tabular-nums">
                  ${currentInspectedRide.fare.toFixed(2)} AUTH
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B6F80]">GPS Ping Interval</span>
                <span className="text-[#1F9D7A] font-semibold">1,000 ms</span>
              </div>
            </div>

            {/* Operational Actions */}
            {currentInspectedRide.isRealSynced && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={cancelRide}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#E5484D] text-[#E5484D] hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertTriangle size={14} />
                  <span>Admin Dispatch Intervention / Cancel</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
