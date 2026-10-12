/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  MapPin,
  Bell,
  Save,
  Check,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const AdminSettings: React.FC = () => {
  const { showToast } = useHalo();

  const [zones, setZones] = useState({
    sanFrancisco: true,
    oakland: true,
    sanJose: false,
    marinCounty: false,
  });

  const [dispatchRadius, setDispatchRadius] = useState(5.0); // km
  const [safetyHotline, setSafetyHotline] = useState('+1 (800) 555-HALO');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform operational settings saved successfully.');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
          Platform Administration Settings
        </h1>
        <p className="text-xs text-[#6B6F80]">
          Configure regional geofencing, Airwallex merchant payout keys, and dispatch radii
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Airwallex Merchant Config Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-[#FF5F45]" />
              <h3 className="text-xs font-bold text-[#12141F]">
                Airwallex Payment Gateway & Payout Engine
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Connected & Live
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                Airwallex Client ID
              </label>
              <input
                type="text"
                readOnly
                value="awx_live_pk_994102948214"
                className="w-full font-mono text-xs px-3 py-2 rounded-xl border border-[#ECE9E4] bg-[#F7F5F2]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                Settlement Currency
              </label>
              <input
                type="text"
                readOnly
                value="USD ($) — ACH Instant / RTP"
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#ECE9E4] bg-[#F7F5F2]"
              />
            </div>
          </div>
        </div>

        {/* Operational City Zones */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ECE9E4]">
            <MapPin size={18} className="text-[#1F9D7A]" />
            <h3 className="text-xs font-bold text-[#12141F]">
              Operational Metropolitan Zones
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {Object.entries(zones).map(([zoneKey, enabled]) => (
              <label
                key={zoneKey}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-[#ECE9E4] hover:bg-[#F7F5F2] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) =>
                    setZones({ ...zones, [zoneKey]: e.target.checked })
                  }
                  className="rounded text-[#FF5F45] focus:ring-[#FF5F45]"
                />
                <span className="font-semibold text-[#12141F] capitalize">
                  {zoneKey.replace(/([A-Z])/g, ' $1')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Dispatch Parameters */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ECE9E4]">
            <ShieldCheck size={18} className="text-[#12141F]" />
            <h3 className="text-xs font-bold text-[#12141F]">
              Dispatch & Safety Parameters
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                Maximum Dispatch Radius (km)
              </label>
              <input
                type="number"
                step="0.5"
                value={dispatchRadius}
                onChange={(e) => setDispatchRadius(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9E4] bg-[#F7F5F2]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                24/7 Safety Hotline Number
              </label>
              <input
                type="text"
                value={safetyHotline}
                onChange={(e) => setSafetyHotline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9E4] bg-[#F7F5F2]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-3 rounded-xl halo-gradient-bg text-white text-xs font-bold halo-shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
