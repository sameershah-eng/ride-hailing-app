/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  Star,
  ChevronRight,
  Car,
  CheckCircle2,
  Phone,
  X,
  Filter,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { DriverInfo } from '../../types';

export const AdminDrivers: React.FC = () => {
  const { driversList, showToast } = useHalo();
  const [search, setSearch] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<DriverInfo | null>(null);

  const filtered = driversList.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
      d.vehicleModel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Fleet & Driver Directory
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Manage verified active drivers, service ratings, and vehicle compliance
          </p>
        </div>

        <div className="relative w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6F80]" />
          <input
            type="text"
            placeholder="Search driver or plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-xl border border-[#ECE9E4] focus:outline-none focus:border-[#FF5F45]"
          />
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-2xl border border-[#ECE9E4] overflow-hidden halo-shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F2] border-b border-[#ECE9E4] text-[#6B6F80] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE9E4]/60">
              {filtered.map((drv) => (
                <tr
                  key={drv.id}
                  onClick={() => setSelectedDriver(drv)}
                  className="hover:bg-[#F7F5F2] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-[#12141F]"
                        style={{ backgroundColor: drv.avatarBg }}
                      >
                        {drv.avatarInitials}
                      </div>
                      <div>
                        <span className="font-bold text-[#12141F] block">{drv.name}</span>
                        <span className="text-[10px] text-[#6B6F80]">{drv.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#12141F] block">
                      {drv.vehicleModel} ({drv.vehicleColor})
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#6B6F80] bg-[#F7F5F2] px-1.5 py-0.5 rounded border border-[#ECE9E4]">
                      {drv.licensePlate}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 capitalize font-medium text-[#12141F]">
                    {drv.vehicleTier.replace('_', ' ')}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-[#12141F]">
                      <Star size={12} className="text-[#E8A33D] fill-[#E8A33D]" />
                      <span className="tabular-nums">{drv.rating}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold tabular-nums text-[#12141F]">
                    {drv.totalTrips.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        drv.status === 'online'
                          ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                          : 'bg-[#F7F5F2] text-[#6B6F80]'
                      }`}
                    >
                      {drv.status}
                    </span>
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

      {/* Driver Inspector Drawer */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between overflow-y-auto halo-shadow-2xl space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4]">
                <h3 className="text-sm font-bold text-[#12141F]">Driver Profile File</h3>
                <button
                  type="button"
                  onClick={() => setSelectedDriver(null)}
                  className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-[#12141F]"
                  style={{ backgroundColor: selectedDriver.avatarBg }}
                >
                  {selectedDriver.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#12141F]">{selectedDriver.name}</h4>
                  <p className="text-xs text-[#6B6F80]">{selectedDriver.phone}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Driver ID: {selectedDriver.id}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4]">
                  <span className="text-[10px] font-bold uppercase text-[#6B6F80] block">
                    Rating
                  </span>
                  <span className="text-base font-bold text-[#12141F] tabular-nums">
                    ★ {selectedDriver.rating}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4]">
                  <span className="text-[10px] font-bold uppercase text-[#6B6F80] block">
                    Completed Trips
                  </span>
                  <span className="text-base font-bold text-[#12141F] tabular-nums">
                    {selectedDriver.totalTrips.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Vehicle Specs */}
              <div className="mt-4 p-3.5 rounded-xl border border-[#ECE9E4] space-y-1.5 text-xs">
                <span className="font-bold text-[#12141F] block">Assigned Vehicle</span>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Make & Model</span>
                  <span className="font-semibold text-[#12141F]">{selectedDriver.vehicleModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">Color</span>
                  <span className="font-semibold text-[#12141F]">{selectedDriver.vehicleColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6F80]">License Plate</span>
                  <span className="font-mono font-bold text-[#12141F]">{selectedDriver.licensePlate}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast(`Driver message dispatched to ${selectedDriver.name}`);
                setSelectedDriver(null);
              }}
              className="w-full py-3 rounded-xl halo-gradient-bg text-white font-bold text-xs"
            >
              Send Operational Push Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
