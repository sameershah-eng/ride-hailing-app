/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const AdminHeader: React.FC = () => {
  const { activityLogs, resetDemoData, fastForwardToLiveTrip, showToast } = useHalo();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const unreadCount = activityLogs.slice(0, 3).length;

  return (
    <header className="h-16 bg-white border-b border-[#ECE9E4] px-6 flex items-center justify-between z-20 shrink-0">
      {/* Search Input */}
      <div className="relative w-72">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6F80]"
        />
        <input
          type="text"
          placeholder="Search rides, drivers, plates..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full text-xs font-medium pl-9 pr-3 py-2 bg-[#F7F5F2] hover:bg-[#F0ECE6] focus:bg-white rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none transition-all"
        />
      </div>

      {/* Center / Right controls */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Simulator Buttons */}
        <button
          type="button"
          onClick={fastForwardToLiveTrip}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFEDE8] text-[#FF5F45] hover:bg-[#FFD8CF] active:scale-95 transition-all"
        >
          <Sparkles size={13} />
          <span>Simulate Active Ride</span>
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-xl bg-[#F7F5F2] hover:bg-[#ECE9E4] border border-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
            title="Activity Notifications"
          >
            <Bell size={16} strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF5F45] ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-[#ECE9E4] halo-shadow-xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
                <span className="text-xs font-bold text-[#12141F]">Live Activity Stream</span>
                <span className="text-[10px] text-[#1F9D7A] font-semibold">Real-Time</span>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1.5">
                {activityLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="p-2 rounded-xl bg-[#F7F5F2] text-left text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#12141F]">{log.title}</span>
                      <span className="text-[10px] text-[#6B6F80]">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#6B6F80]">{log.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#ECE9E4]">
          <div className="w-8 h-8 rounded-xl bg-[#12141F] text-white flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <span className="text-xs font-bold text-[#12141F] block">Alex Drake</span>
            <span className="text-[10px] text-[#6B6F80] block">Operations Director</span>
          </div>
        </div>
      </div>
    </header>
  );
};
