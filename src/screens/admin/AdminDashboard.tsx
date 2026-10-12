/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  TrendingUp,
  Car,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Flame,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useHalo } from '../../context/HaloContext';

export const AdminDashboard: React.FC = () => {
  const {
    analytics,
    activeRide,
    isDriverOnline,
    activityLogs,
    setAdminTab,
  } = useHalo();

  // Active rides dynamic count
  const activeRidesCount = (activeRide && activeRide.status !== 'completed' && activeRide.status !== 'cancelled') ? 1 : 0;
  const onlineDriversCount = analytics.kpis.onlineDrivers + (isDriverOnline ? 1 : 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Operations Dashboard
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Live fleet telemetry, dispatch metrics, and revenue distribution across San Francisco
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ECE9E4] text-xs font-semibold text-[#12141F] halo-shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1F9D7A] animate-pulse" />
            <span>Systems Normal</span>
          </span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Rides */}
        <div
          onClick={() => setAdminTab('live_monitoring')}
          className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm hover:border-[#FF5F45] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
              Active Rides
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFEDE8] text-[#FF5F45] flex items-center justify-center">
              <Car size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#12141F] tabular-nums">
              {activeRidesCount}
            </span>
            <span className="text-xs text-[#1F9D7A] font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} />
              <span>Live Synced</span>
            </span>
          </div>
          <p className="text-[11px] text-[#6B6F80] mt-1 group-hover:text-[#FF5F45] transition-colors">
            Tap to view live radar map →
          </p>
        </div>

        {/* Online Drivers */}
        <div
          onClick={() => setAdminTab('drivers')}
          className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm hover:border-[#1F9D7A] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
              Online Drivers
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1F9D7A] flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#12141F] tabular-nums">
              {onlineDriversCount}
            </span>
            <span className="text-xs text-[#1F9D7A] font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} />
              <span>+4 this hr</span>
            </span>
          </div>
          <p className="text-[11px] text-[#6B6F80] mt-1 group-hover:text-[#1F9D7A] transition-colors">
            96% fleet compliance rate →
          </p>
        </div>

        {/* Today's Gross Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
              Today's Gross Fares
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#E8A33D] flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#12141F] tabular-nums">
              ${analytics.kpis.todayRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-[#1F9D7A] font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} />
              <span>+{analytics.kpis.revenueChangePct}%</span>
            </span>
          </div>
          <p className="text-[11px] text-[#6B6F80] mt-1">
            Settled via Airwallex Global Payouts
          </p>
        </div>

        {/* Completed Trips */}
        <div className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B6F80]">
              Completed Trips
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F7F5F2] text-[#12141F] flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#12141F] tabular-nums">
              {analytics.kpis.completedTrips}
            </span>
            <span className="text-xs text-[#1F9D7A] font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} />
              <span>+{analytics.kpis.tripsChangePct}%</span>
            </span>
          </div>
          <p className="text-[11px] text-[#6B6F80] mt-1">
            Avg wait: 3.8 min (target: &lt; 5 min)
          </p>
        </div>
      </div>

      {/* Charts Section: Revenue Area Chart & Rides by Hour Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#12141F]">Gross Fare Volume (Today)</h3>
              <p className="text-xs text-[#6B6F80]">Hourly revenue generation curve</p>
            </div>
            <span className="text-xs font-semibold text-[#1F9D7A] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Peak: 18:00 ($2,190)
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.revenueHourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaCoralGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5F45" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF5F45" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E4" vertical={false} />
                <XAxis dataKey="time" stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#12141F] text-white p-2 rounded-xl text-xs space-y-0.5 shadow-lg">
                          <p className="font-bold">{payload[0].payload.time}</p>
                          <p className="text-[#FFB86B] font-semibold">${payload[0].value} gross fares</p>
                          <p className="text-white/60 text-[10px]">{payload[0].payload.rides} trips completed</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FF5F45" strokeWidth={2.5} fillOpacity={1} fill="url(#areaCoralGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend Bar Chart (1 col) */}
        <div className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#12141F]">Trips by Day</h3>
              <p className="text-xs text-[#6B6F80]">Weekly volume distribution</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.weeklyTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E4" vertical={false} />
                <XAxis dataKey="day" stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#12141F] text-white p-2 rounded-xl text-xs space-y-0.5 shadow-lg">
                          <p className="font-bold">{payload[0].payload.day}</p>
                          <p className="text-[#1F9D7A] font-semibold">{payload[0].value} trips</p>
                          <p className="text-white/60 text-[10px]">${payload[0].payload.revenue.toLocaleString()} revenue</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="rides" fill="#12141F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Live Activity Feed */}
      <div className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-[#FF5F45]" />
            <h3 className="text-sm font-bold text-[#12141F]">Real-Time Fleet Activity Log</h3>
          </div>
          <span className="text-[11px] text-[#6B6F80] font-medium">Auto-updating event feed</span>
        </div>

        <div className="divide-y divide-[#ECE9E4]/60 overflow-hidden">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between hover:bg-[#F7F5F2] px-2 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    log.category === 'ride'
                      ? 'bg-[#FFEDE8] text-[#FF5F45]'
                      : log.category === 'driver'
                      ? 'bg-emerald-50 text-[#1F9D7A]'
                      : 'bg-amber-50 text-[#E8A33D]'
                  }`}
                >
                  {log.category === 'ride' ? <Car size={15} /> : log.category === 'driver' ? <Users size={15} /> : <DollarSign size={15} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#12141F]">{log.title}</span>
                    {log.statusBadge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#F7F5F2] text-[#6B6F80] uppercase">
                        {log.statusBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6F80] mt-0.5">{log.description}</p>
                </div>
              </div>

              <span className="text-[11px] font-medium text-[#6B6F80] shrink-0 tabular-nums">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
