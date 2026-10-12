/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HaloProvider, useHalo } from './context/HaloContext';
import { PresentationShell } from './components/shell/PresentationShell';
import { RiderApp } from './screens/rider/RiderApp';
import { DriverApp } from './screens/driver/DriverApp';
import { AdminApp } from './screens/admin/AdminApp';
import { SplitView } from './screens/split/SplitView';
import { FloatingSwitcher } from './components/common/FloatingSwitcher';
import { Toast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const { appView } = useHalo();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#12141F] font-sans antialiased selection:bg-[#FF8A4C]/20 relative">
      {/* Dynamic View Router */}
      {appView === 'shell' && <PresentationShell />}

      {appView === 'rider' && (
        <div className="min-h-screen flex items-center justify-center py-6 px-2 pb-24">
          <RiderApp />
        </div>
      )}

      {appView === 'driver' && (
        <div className="min-h-screen flex items-center justify-center py-6 px-2 pb-24">
          <DriverApp />
        </div>
      )}

      {appView === 'admin' && <AdminApp />}

      {appView === 'split' && <SplitView />}

      {/* Persistent Floating Switcher (Pill at bottom center) */}
      <FloatingSwitcher />

      {/* Global Toast System */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <HaloProvider>
      <AppContent />
    </HaloProvider>
  );
}
