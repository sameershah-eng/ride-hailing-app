/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Landmark,
  ShieldCheck,
  ChevronRight,
  X,
  Check,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useHalo } from '../../context/HaloContext';

export const DriverEarnings: React.FC = () => {
  const {
    setDriverScreen,
    todayEarnings,
    todayTrips,
    cashOutDriverEarnings,
    showToast,
  } = useHalo();

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [showCashOutSheet, setShowCashOutSheet] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState(todayEarnings > 0 ? todayEarnings : 150);

  // Weekly data for Recharts bar chart
  const weeklyData = [
    { day: 'Mon', earnings: 142 },
    { day: 'Tue', earnings: 185 },
    { day: 'Wed', earnings: 160 },
    { day: 'Thu', earnings: 210 },
    { day: 'Fri', earnings: 295 },
    { day: 'Sat', earnings: 340 },
    { day: 'Sun', earnings: todayEarnings > 0 ? todayEarnings : 184 },
  ];

  const handleCashOut = () => {
    cashOutDriverEarnings(cashOutAmount);
    setShowCashOutSheet(false);
  };

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-[#ECE9E4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDriverScreen('home')}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Earnings & Payouts</span>
        </div>

        <button
          type="button"
          onClick={() => setShowCashOutSheet(true)}
          className="text-xs font-semibold px-3 py-1 rounded-full halo-gradient-bg text-white shadow-xs active:scale-95 transition-all"
        >
          Cash Out
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Total Balance Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80]">
                Available Balance
              </span>
              <div className="text-2xl font-extrabold text-[#12141F] tabular-nums mt-0.5">
                ${todayEarnings.toFixed(2)}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1F9D7A] flex items-center justify-center">
              <DollarSign size={20} strokeWidth={2.2} />
            </div>
          </div>

          <div className="pt-2 border-t border-[#ECE9E4] flex items-center justify-between text-xs text-[#6B6F80]">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              <span>{todayTrips} trips completed today</span>
            </span>
            <span className="text-[#1F9D7A] font-semibold flex items-center gap-0.5">
              <TrendingUp size={12} />
              <span>+18% vs last week</span>
            </span>
          </div>
        </div>

        {/* Period Selector & Recharts Bar Chart */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12141F]">Weekly Trend</span>
            <div className="flex gap-1 bg-[#F7F5F2] p-1 rounded-xl">
              {(['daily', 'weekly', 'monthly'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg transition-all ${
                    period === p ? 'bg-white text-[#12141F] shadow-2xs' : 'text-[#6B6F80]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chart View */}
          <div className="h-36 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#6B6F80" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B6F80" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#F7F5F2' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#12141F] text-white text-[10px] px-2 py-1 rounded-md shadow-md">
                          ${payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="earnings" fill="#FF8A4C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Completed Trips Breakdown List */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] px-1">
            Recent Trip Earnings
          </div>

          <div className="bg-white rounded-2xl border border-[#ECE9E4] divide-y divide-[#ECE9E4]/60 overflow-hidden halo-shadow-sm">
            <div className="p-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#12141F]">Market St → Ferry Building</p>
                <p className="text-[10px] text-[#6B6F80]">Today 11:42 AM · 4.2 km · Halo Go</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1F9D7A] block tabular-nums">+$14.20</span>
                <span className="text-[10px] text-[#6B6F80]">+$3.00 tip</span>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#12141F]">Mission Bay → SFO Terminal 2</p>
                <p className="text-[10px] text-[#6B6F80]">Today 09:15 AM · 19.1 km · Halo XL</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1F9D7A] block tabular-nums">+$38.50</span>
                <span className="text-[10px] text-[#6B6F80]">+$5.00 tip</span>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#12141F]">Noe Valley → FiDi</p>
                <p className="text-[10px] text-[#6B6F80]">Yesterday 06:10 PM · 6.8 km · Halo Comfort</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#1F9D7A] block tabular-nums">+$21.80</span>
                <span className="text-[10px] text-[#6B6F80]">Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Out Bottom Sheet (Airwallex Instant Payout) */}
      {showCashOutSheet && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 space-y-4 halo-shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
              <span className="text-sm font-bold text-[#12141F]">Instant Bank Cash Out</span>
              <button
                type="button"
                onClick={() => setShowCashOutSheet(false)}
                className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
              >
                <X size={15} />
              </button>
            </div>

            {/* Bank Card Info */}
            <div className="p-3 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#ECE9E4] flex items-center justify-center text-[#12141F]">
                  <Landmark size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#12141F]">Chase Premier Checking</h5>
                  <p className="text-[10px] text-[#6B6F80]">•••• 9102 · Routing 12100024</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            {/* Amount Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Cash Out Amount</span>
                <span className="font-bold text-[#12141F] tabular-nums">${cashOutAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Airwallex Instant Transfer Fee</span>
                <span className="font-bold text-[#1F9D7A]">FREE (0%)</span>
              </div>
              <div className="pt-2 border-t border-[#ECE9E4] flex justify-between font-bold text-sm">
                <span>Arrival Time</span>
                <span className="text-[#1F9D7A]">Within 15 minutes</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCashOut}
              className="w-full py-3.5 px-4 rounded-2xl halo-gradient-bg text-white font-bold text-xs halo-shadow-md active:scale-95 transition-all"
            >
              Transfer ${cashOutAmount.toFixed(2)} to Chase Bank
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
