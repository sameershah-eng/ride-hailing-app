/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  UserCheck,
  Car,
  Users,
  Coins,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useHalo, AdminTab } from '../../context/HaloContext';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const { adminTab, setAdminTab, applicants, activeRide } = useHalo();

  const pendingApprovalsCount = applicants.filter(
    (a) => a.overallStatus === 'pending'
  ).length;

  const menuItems: { id: AdminTab; label: string; icon: React.FC<{ size?: number; className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'live_monitoring',
      label: 'Live Monitoring',
      icon: Navigation,
      badge: activeRide ? '1 LIVE' : undefined,
    },
    {
      id: 'approvals',
      label: 'Driver Approvals',
      icon: UserCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
    { id: 'drivers', label: 'Fleet & Drivers', icon: Car },
    { id: 'riders', label: 'Passengers', icon: Users },
    { id: 'fares', label: 'Fare Matrix', icon: Coins },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-white border-r border-[#ECE9E4] flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#ECE9E4]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl halo-gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0">
              H
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <span className="font-bold text-sm tracking-tight text-[#12141F] block">
                  Halo Console
                </span>
                <span className="text-[10px] text-[#6B6F80] font-medium block">
                  Fleet Ops v2.4
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#6B6F80] hover:text-[#12141F] transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative group cursor-pointer ${
                  isActive
                    ? 'bg-[#12141F] text-white shadow-xs'
                    : 'text-[#6B6F80] hover:text-[#12141F] hover:bg-[#F7F5F2]'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={18}
                  className={`shrink-0 ${
                    isActive ? 'text-[#FF8A4C]' : 'group-hover:text-[#12141F]'
                  }`}
                />

                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                      isActive
                        ? 'bg-[#FF5F45] text-white'
                        : item.badge === '1 LIVE'
                        ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                        : 'bg-[#FFEDE8] text-[#FF5F45]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge && (
                  <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#FF5F45]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Dispatch Hub Status */}
      <div className="p-3 border-t border-[#ECE9E4]">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#12141F]">SF Metro Dispatch</span>
              <span className="w-2 h-2 rounded-full bg-[#1F9D7A] animate-pulse" />
            </div>
            <p className="text-[10px] text-[#6B6F80] leading-snug">
              28 drivers online · 99.8% SLA response
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="System Operational">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F9D7A]" />
          </div>
        )}
      </div>
    </aside>
  );
};
