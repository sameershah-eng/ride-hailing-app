/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
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
  Legend,
} from 'recharts';
import { useHalo } from '../../context/HaloContext';

export const AdminReports: React.FC = () => {
  const { showToast } = useHalo();
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'ytd'>('7d');

  const reportData = [
    { date: 'Oct 06', grossFare: 11200, driverPayout: 9184, platformNet: 2016 },
    { date: 'Oct 07', grossFare: 12400, driverPayout: 10168, platformNet: 2232 },
    { date: 'Oct 08', grossFare: 10800, driverPayout: 8856, platformNet: 1944 },
    { date: 'Oct 09', grossFare: 13500, driverPayout: 11070, platformNet: 2430 },
    { date: 'Oct 10', grossFare: 16800, driverPayout: 13776, platformNet: 3024 },
    { date: 'Oct 11', grossFare: 18200, driverPayout: 14924, platformNet: 3276 },
    { date: 'Oct 12', grossFare: 14500, driverPayout: 11890, platformNet: 2610 },
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Gross Fare ($),Driver Payout ($),Platform Net Margin ($)\n' +
      reportData
        .map((r) => `${r.date},${r.grossFare},${r.driverPayout},${r.platformNet}`)
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `halo_financial_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Report CSV successfully downloaded.');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Financial & Fleet Performance Reports
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Export reconciled ledgers, driver earnings allocations, and merchant processing fees
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <div className="flex bg-white p-1 rounded-2xl border border-[#ECE9E4] halo-shadow-xs">
            {(['today', '7d', '30d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                  dateRange === r
                    ? 'halo-gradient-bg text-white shadow-2xs'
                    : 'text-[#6B6F80] hover:text-[#12141F]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F5F2] border border-[#ECE9E4] text-[#12141F] text-xs font-bold halo-shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Financial Split Breakdown Chart */}
      <div className="bg-white p-5 rounded-2xl border border-[#ECE9E4] halo-shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#12141F]">
              Gross Revenue vs Driver Payouts
            </h3>
            <p className="text-xs text-[#6B6F80]">Settled via Airwallex Global Treasury</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-[#FF5F45] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F45]" /> Gross Fares
            </span>
            <span className="flex items-center gap-1 text-[#1F9D7A] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F9D7A]" /> Driver Payouts (82%)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E4" vertical={false} />
              <XAxis dataKey="date" stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B6F80" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#12141F] text-white p-2.5 rounded-xl text-xs space-y-1 shadow-lg">
                        <p className="font-bold">{payload[0].payload.date}</p>
                        <p className="text-[#FF8A4C]">Gross: ${payload[0].value?.toLocaleString()}</p>
                        <p className="text-[#1F9D7A]">Driver Payouts: ${payload[1].value?.toLocaleString()}</p>
                        <p className="text-white/60">Platform Net: ${payload[0].payload.platformNet?.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="grossFare" fill="#FF8A4C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="driverPayout" fill="#1F9D7A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
