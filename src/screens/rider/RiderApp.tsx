/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneFrame } from '../../components/common/PhoneFrame';
import { useHalo } from '../../context/HaloContext';
import { RiderOnboarding } from './RiderOnboarding';
import { RiderHome } from './RiderHome';
import { RiderSearch } from './RiderSearch';
import { RiderVehicleSelect } from './RiderVehicleSelect';
import { RiderSearching } from './RiderSearching';
import { RiderActiveTrip } from './RiderActiveTrip';
import { RiderTripComplete } from './RiderTripComplete';
import { RiderHistory } from './RiderHistory';
import { RiderProfile } from './RiderProfile';

export const RiderApp: React.FC<{ isSplitMode?: boolean }> = ({ isSplitMode = false }) => {
  const { riderScreen, activeRide } = useHalo();

  const renderScreen = () => {
    switch (riderScreen) {
      case 'onboarding':
        return <RiderOnboarding />;
      case 'home':
        return <RiderHome />;
      case 'search':
        return <RiderSearch />;
      case 'vehicle_select':
        return <RiderVehicleSelect />;
      case 'searching':
        return <RiderSearching />;
      case 'driver_assigned':
      case 'in_progress':
        return <RiderActiveTrip />;
      case 'trip_complete':
        return <RiderTripComplete />;
      case 'history':
        return <RiderHistory />;
      case 'profile':
        return <RiderProfile />;
      default:
        return <RiderHome />;
    }
  };

  const getBadge = () => {
    if (activeRide?.status === 'in_progress') return 'Live Trip';
    if (activeRide?.status === 'searching') return 'Searching';
    if (activeRide?.status === 'driver_assigned') return 'Driver En Route';
    return 'Ready';
  };

  return (
    <PhoneFrame
      appName="Halo Passenger"
      appBadge={getBadge()}
      badgeColor={activeRide?.status === 'in_progress' ? 'emerald' : 'coral'}
    >
      {renderScreen()}
    </PhoneFrame>
  );
};
