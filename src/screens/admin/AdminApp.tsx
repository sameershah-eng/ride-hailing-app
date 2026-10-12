/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useHalo } from '../../context/HaloContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { AdminLiveMonitoring } from './AdminLiveMonitoring';
import { AdminDriverApprovals } from './AdminDriverApprovals';
import { AdminDrivers } from './AdminDrivers';
import { AdminRiders } from './AdminRiders';
import { AdminFareManagement } from './AdminFareManagement';
import { AdminReports } from './AdminReports';
import { AdminSettings } from './AdminSettings';

export const AdminApp: React.FC = () => {
  const { adminTab } = useHalo();
  const [collapsed, setCollapsed] = useState(false);

  const renderTab = () => {
    switch (adminTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'live_monitoring':
        return <AdminLiveMonitoring />;
      case 'approvals':
        return <AdminDriverApprovals />;
      case 'drivers':
        return <AdminDrivers />;
      case 'riders':
        return <AdminRiders />;
      case 'fares':
        return <AdminFareManagement />;
      case 'reports':
        return <AdminReports />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#F7F5F2] text-[#12141F]">
      {/* Collapsible Left Navigation Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto pb-24">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};
