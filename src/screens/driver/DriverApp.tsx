/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneFrame } from '../../components/common/PhoneFrame';
import { useHalo } from '../../context/HaloContext';
import { DriverVerification } from './DriverVerification';
import { DriverHome } from './DriverHome';
import { DriverIncomingRequest } from './DriverIncomingRequest';
import { DriverNavigation } from './DriverNavigation';
import { DriverEarnings } from './DriverEarnings';
import { DriverHistory } from './DriverHistory';
import { DriverProfile } from './DriverProfile';

export const DriverApp: React.FC<{ isSplitMode?: boolean }> = ({ isSplitMode = false }) => {
  const { driverScreen, isDriverOnline, activeRide } = useHalo();

  const renderScreen = () => {
    switch (driverScreen) {
      case 'verification':
        return <DriverVerification />;
      case 'home':
        return <DriverHome />;
      case 'incoming_request':
        return <DriverIncomingRequest />;
      case 'navigation_pickup':
      case 'trip_in_progress':
        return <DriverNavigation />;
      case 'earnings':
        return <DriverEarnings />;
      case 'history':
        return <DriverHistory />;
      case 'profile':
        return <DriverProfile />;
      default:
        return <DriverHome />;
    }
  };

  const getBadge = () => {
    if (activeRide?.status === 'in_progress') return 'On Trip';
    if (activeRide?.status === 'driver_assigned' || activeRide?.status === 'arrived_pickup') return 'Navigating';
    if (isDriverOnline) return 'Online';
    return 'Offline';
  };

  return (
    <PhoneFrame
      appName="Halo Driver"
      appBadge={getBadge()}
      badgeColor={isDriverOnline ? 'emerald' : 'amber'}
    >
      {renderScreen()}
    </PhoneFrame>
  );
};
