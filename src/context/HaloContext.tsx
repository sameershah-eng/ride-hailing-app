/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  AppView,
  RideStatus,
  VehicleTier,
  LocationPoint,
  VehicleOption,
  FareBreakdown,
  DriverInfo,
  RiderInfo,
  ActiveRide,
  DriverApplicant,
  ActivityLogItem,
  ChatMessage,
  PaymentCard,
} from '../types';
import {
  INITIAL_LOCATIONS,
  INITIAL_VEHICLE_OPTIONS,
  INITIAL_RIDER,
  INITIAL_DRIVER,
  INITIAL_APPLICANTS,
  INITIAL_DRIVERS_LIST,
  INITIAL_RIDERS_LIST,
  INITIAL_PAST_RIDES,
  INITIAL_ACTIVITY_LOGS,
  ADMIN_ANALYTICS,
} from '../data/mockData';

export type RiderScreen =
  | 'onboarding'
  | 'home'
  | 'search'
  | 'vehicle_select'
  | 'payment_select'
  | 'searching'
  | 'driver_assigned'
  | 'in_progress'
  | 'trip_complete'
  | 'history'
  | 'profile';

export type DriverScreen =
  | 'verification'
  | 'home'
  | 'incoming_request'
  | 'navigation_pickup'
  | 'trip_in_progress'
  | 'earnings'
  | 'history'
  | 'profile';

export type AdminTab =
  | 'dashboard'
  | 'live_monitoring'
  | 'approvals'
  | 'drivers'
  | 'riders'
  | 'fares'
  | 'reports'
  | 'settings';

interface HaloContextType {
  // Shell navigation
  appView: AppView;
  setAppView: (view: AppView) => void;

  // Rider state & methods
  riderScreen: RiderScreen;
  setRiderScreen: (screen: RiderScreen) => void;
  pickupLocation: LocationPoint;
  setPickupLocation: (loc: LocationPoint) => void;
  dropoffLocation: LocationPoint;
  setDropoffLocation: (loc: LocationPoint) => void;
  swapLocations: () => void;
  selectedTier: VehicleTier;
  setSelectedTier: (tier: VehicleTier) => void;
  selectedCard: PaymentCard;
  setSelectedCard: (card: PaymentCard) => void;
  riderProfile: RiderInfo;
  riderHistory: typeof INITIAL_PAST_RIDES;
  calculateFare: (tier: VehicleTier, distanceKm?: number, durationMin?: number) => FareBreakdown;
  requestRide: () => void;
  cancelRide: () => void;
  rateAndTipRide: (rating: number, tags: string[], tip: number) => void;
  addPaymentCard: (card: Omit<PaymentCard, 'id' | 'isDefault'>) => void;

  // Driver state & methods
  driverScreen: DriverScreen;
  setDriverScreen: (screen: DriverScreen) => void;
  isDriverOnline: boolean;
  toggleDriverOnline: () => void;
  driverProfile: DriverInfo;
  todayEarnings: number;
  todayTrips: number;
  todayOnlineHours: string;
  acceptanceRate: number;
  incomingCountdown: number;
  driverApplicant: DriverApplicant;
  acceptIncomingRide: () => void;
  declineIncomingRide: () => void;
  driverArrivedAtPickup: () => void;
  driverStartTrip: () => void;
  driverCompleteTrip: () => void;
  cashOutDriverEarnings: (amount: number) => void;
  uploadDriverDocument: (docId: string, fileName: string) => void;

  // Shared active ride state
  activeRide: ActiveRide | null;
  tripProgress: number; // 0 to 100
  chatMessages: ChatMessage[];
  sendChatMessage: (sender: 'rider' | 'driver', text: string) => void;

  // Admin state & methods
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  selectedRideIdForInspection: string | null;
  setSelectedRideIdForInspection: (id: string | null) => void;
  applicants: DriverApplicant[];
  approveApplicantDocument: (applicantId: string, docId: string) => void;
  rejectApplicantDocument: (applicantId: string, docId: string, reason: string) => void;
  approveEntireApplicant: (applicantId: string) => void;
  rejectEntireApplicant: (applicantId: string, reason: string) => void;
  vehicleOptions: VehicleOption[];
  updateVehiclePricing: (tierId: VehicleTier, updates: Partial<VehicleOption>) => void;
  driversList: DriverInfo[];
  ridersList: RiderInfo[];
  activityLogs: ActivityLogItem[];
  analytics: typeof ADMIN_ANALYTICS;

  // Demo helpers
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetDemoData: () => void;
  fastForwardToLiveTrip: () => void;
}

const HaloContext = createContext<HaloContextType | undefined>(undefined);

export const HaloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [appView, setAppView] = useState<AppView>('shell');

  // Rider State
  const [riderScreen, setRiderScreen] = useState<RiderScreen>('home');
  const [pickupLocation, setPickupLocation] = useState<LocationPoint>(INITIAL_LOCATIONS[0]); // 342 Market St
  const [dropoffLocation, setDropoffLocation] = useState<LocationPoint>(INITIAL_LOCATIONS[1]); // Ferry Building
  const [selectedTier, setSelectedTier] = useState<VehicleTier>('halo_go');
  const [riderProfile, setRiderProfile] = useState<RiderInfo>(INITIAL_RIDER);
  const [selectedCard, setSelectedCard] = useState<PaymentCard>(INITIAL_RIDER.savedPaymentCards[0]);
  const [riderHistory, setRiderHistory] = useState(INITIAL_PAST_RIDES);

  // Driver State
  const [driverScreen, setDriverScreen] = useState<DriverScreen>('home');
  const [isDriverOnline, setIsDriverOnline] = useState<boolean>(true);
  const [driverProfile, setDriverProfile] = useState<DriverInfo>(INITIAL_DRIVER);
  const [todayEarnings, setTodayEarnings] = useState<number>(184.5);
  const [todayTrips, setTodayTrips] = useState<number>(9);
  const [todayOnlineHours, setTodayOnlineHours] = useState<string>('5h 20m');
  const [acceptanceRate, setAcceptanceRate] = useState<number>(96);
  const [incomingCountdown, setIncomingCountdown] = useState<number>(15);
  const [driverApplicant, setDriverApplicant] = useState<DriverApplicant>(INITIAL_APPLICANTS[0]);

  // Shared Active Ride
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [tripProgress, setTripProgress] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'system',
      text: 'Ride confirmed. Keep chat strictly ride-related.',
      time: '12:02 PM',
    },
    {
      id: 'm2',
      sender: 'driver',
      text: 'Hi Amara! I am at the corner of Market and Montgomery, hazard lights on.',
      time: '12:03 PM',
    },
  ]);

  // Admin State
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [selectedRideIdForInspection, setSelectedRideIdForInspection] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<DriverApplicant[]>(INITIAL_APPLICANTS);
  const [vehicleOptions, setVehicleOptions] = useState<VehicleOption[]>(INITIAL_VEHICLE_OPTIONS);
  const [driversList, setDriversList] = useState<DriverInfo[]>(INITIAL_DRIVERS_LIST);
  const [ridersList, setRidersList] = useState<RiderInfo[]>(INITIAL_RIDERS_LIST);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);
  const [analytics, setAnalytics] = useState(ADMIN_ANALYTICS);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  }, []);

  const addActivityLog = useCallback(
    (
      category: 'ride' | 'driver' | 'payment' | 'system',
      title: string,
      description: string,
      statusBadge?: string
    ) => {
      const newLog: ActivityLogItem = {
        id: `act_${Date.now()}`,
        timestamp: 'Just now',
        category,
        title,
        description,
        statusBadge,
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 24)]);
    },
    []
  );

  // Fare calculation helper
  const calculateFare = useCallback(
    (tierId: VehicleTier, customDistanceKm?: number, customDurationMin?: number): FareBreakdown => {
      const tier = vehicleOptions.find((t) => t.id === tierId) || vehicleOptions[0];
      const distanceKm = customDistanceKm ?? 4.2;
      const durationMinutes = customDurationMin ?? 11;

      const baseFare = tier.baseFare;
      const distanceFare = Number((distanceKm * tier.perKm).toFixed(2));
      const timeFare = Number((durationMinutes * tier.perMin).toFixed(2));
      const bookingFee = tier.bookingFee;

      const rawSubtotal = baseFare + distanceFare + timeFare + bookingFee;
      const subtotal = Math.max(tier.minimumFare, Number(rawSubtotal.toFixed(2)));
      const discount = 0;
      const totalFare = Number((subtotal - discount).toFixed(2));

      return {
        baseFare,
        distanceFare,
        timeFare,
        bookingFee,
        subtotal,
        discount,
        totalFare,
        distanceKm,
        durationMinutes,
      };
    },
    [vehicleOptions]
  );

  const swapLocations = useCallback(() => {
    setPickupLocation(dropoffLocation);
    setDropoffLocation(pickupLocation);
  }, [pickupLocation, dropoffLocation]);

  // Request Ride from Rider App
  const requestRide = useCallback(() => {
    const fare = calculateFare(selectedTier);
    const newRide: ActiveRide = {
      id: `ride_${Date.now()}`,
      code: `HL-${Math.floor(1000 + Math.random() * 9000)}`,
      riderId: riderProfile.id,
      riderName: riderProfile.name,
      riderRating: riderProfile.rating,
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      tier: selectedTier,
      fareBreakdown: fare,
      status: 'searching',
      requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentProgressPercent: 0,
      paymentMethod: {
        type: 'card',
        label: `${selectedCard.brand.toUpperCase()} •••• ${selectedCard.last4}`,
      },
    };

    setActiveRide(newRide);
    setRiderScreen('searching');
    setTripProgress(0);

    addActivityLog(
      'ride',
      'Ride Requested',
      `${riderProfile.name} requested ${selectedTier.replace('_', ' ').toUpperCase()} (${pickupLocation.name} → ${dropoffLocation.name})`,
      'searching'
    );

    // If driver is online, trigger incoming request countdown in Driver App!
    if (isDriverOnline) {
      setDriverScreen('incoming_request');
      setIncomingCountdown(15);
    }
  }, [
    calculateFare,
    selectedTier,
    riderProfile,
    pickupLocation,
    dropoffLocation,
    selectedCard,
    addActivityLog,
    isDriverOnline,
  ]);

  // Handle countdown timer for driver incoming request
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (driverScreen === 'incoming_request' && activeRide?.status === 'searching') {
      timer = setInterval(() => {
        setIncomingCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Time out: decline
            setDriverScreen('home');
            showToast('Request expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [driverScreen, activeRide, showToast]);

  // Cancel ride
  const cancelRide = useCallback(() => {
    setActiveRide(null);
    setRiderScreen('home');
    if (driverScreen === 'incoming_request') {
      setDriverScreen('home');
    }
    showToast('Ride request cancelled');
    addActivityLog('ride', 'Ride Cancelled', 'Passenger cancelled ride search', 'cancelled');
  }, [driverScreen, showToast, addActivityLog]);

  // Driver accepts incoming ride
  const acceptIncomingRide = useCallback(() => {
    if (!activeRide) return;

    const assignedRide: ActiveRide = {
      ...activeRide,
      status: 'driver_assigned',
      driver: driverProfile,
      assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pickupEstimatedAt: '3 min',
    };

    setActiveRide(assignedRide);
    setDriverScreen('navigation_pickup');
    setRiderScreen('driver_assigned');

    showToast('Ride accepted! Navigating to passenger pickup.');
    addActivityLog(
      'ride',
      'Ride Accepted',
      `${driverProfile.name} accepted ${assignedRide.code} for ${assignedRide.riderName}`,
      'assigned'
    );
  }, [activeRide, driverProfile, showToast, addActivityLog]);

  // Driver declines incoming ride
  const declineIncomingRide = useCallback(() => {
    setDriverScreen('home');
    setAcceptanceRate((prev) => Math.max(88, prev - 1));
    showToast('Ride declined. Waiting for next request.');
  }, [showToast]);

  // Driver arrives at pickup
  const driverArrivedAtPickup = useCallback(() => {
    if (!activeRide) return;
    setActiveRide((prev) => (prev ? { ...prev, status: 'arrived_pickup' } : null));
    showToast('Arrived at pickup. Rider notified.');
  }, [activeRide, showToast]);

  // Driver starts trip
  const driverStartTrip = useCallback(() => {
    if (!activeRide) return;
    setActiveRide((prev) => (prev ? { ...prev, status: 'in_progress', startedAt: 'Just now' } : null));
    setDriverScreen('trip_in_progress');
    setRiderScreen('in_progress');
    showToast('Trip started. En route to destination.');
    addActivityLog('ride', 'Trip Started', `Trip in progress to ${activeRide.dropoff.name}`, 'in_progress');
  }, [activeRide, showToast, addActivityLog]);

  // Continuous car progress simulation along route when in progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeRide?.status === 'in_progress') {
      interval = setInterval(() => {
        setTripProgress((prev) => {
          if (prev >= 98) {
            return 98;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [activeRide?.status]);

  // Driver completes trip
  const driverCompleteTrip = useCallback(() => {
    if (!activeRide) return;

    const completedRide: ActiveRide = {
      ...activeRide,
      status: 'completed',
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentProgressPercent: 100,
    };

    const driverPayout = Number((activeRide.fareBreakdown.totalFare * 0.82).toFixed(2));
    setTodayEarnings((prev) => Number((prev + driverPayout).toFixed(2)));
    setTodayTrips((prev) => prev + 1);

    setActiveRide(completedRide);
    setDriverScreen('home');
    setRiderScreen('trip_complete');

    // Add to rider past history
    const historyItem = {
      id: `trip_${Date.now()}`,
      code: completedRide.code,
      date: 'Today, Just now',
      pickup: completedRide.pickup.name,
      dropoff: completedRide.dropoff.name,
      tier: completedRide.tier === 'halo_go' ? 'Halo Go' : completedRide.tier === 'halo_comfort' ? 'Halo Comfort' : 'Halo XL',
      fare: completedRide.fareBreakdown.totalFare,
      driverName: driverProfile.name,
      rating: 5,
      status: 'completed',
    };
    setRiderHistory((prev) => [historyItem, ...prev]);

    // Update Admin KPIs
    setAnalytics((prev) => ({
      ...prev,
      kpis: {
        ...prev.kpis,
        todayRevenue: Number((prev.kpis.todayRevenue + completedRide.fareBreakdown.totalFare).toFixed(2)),
        completedTrips: prev.kpis.completedTrips + 1,
      },
    }));

    showToast(`Trip complete! Driver earned $${driverPayout.toFixed(2)}.`);
    addActivityLog(
      'ride',
      'Trip Completed',
      `${completedRide.code} completed. Fare: $${completedRide.fareBreakdown.totalFare.toFixed(2)}`,
      'completed'
    );
  }, [activeRide, driverProfile.name, showToast, addActivityLog]);

  // Rider rates and tips
  const rateAndTipRide = useCallback(
    (rating: number, tags: string[], tip: number) => {
      if (tip > 0) {
        setTodayEarnings((prev) => Number((prev + tip).toFixed(2)));
        showToast(`Thank you! Rated ${rating} stars and added $${tip.toFixed(2)} tip.`);
      } else {
        showToast(`Thank you! Rated ${rating} stars.`);
      }
      setActiveRide(null);
      setRiderScreen('home');
    },
    [showToast]
  );

  // Driver toggle online/offline
  const toggleDriverOnline = useCallback(() => {
    setIsDriverOnline((prev) => {
      const next = !prev;
      setDriverProfile((p) => ({ ...p, status: next ? 'online' : 'offline' }));
      showToast(next ? 'You are now Online. Ready for rides!' : 'You are now Offline.');
      addActivityLog(
        'driver',
        next ? 'Driver Online' : 'Driver Offline',
        `Tariq Vance is now ${next ? 'Online' : 'Offline'}`,
        next ? 'online' : 'offline'
      );
      return next;
    });
  }, [showToast, addActivityLog]);

  // Driver cash out to bank
  const cashOutDriverEarnings = useCallback(
    (amount: number) => {
      setTodayEarnings((prev) => Math.max(0, Number((prev - amount).toFixed(2))));
      showToast(`$${amount.toFixed(2)} transferred to Chase Checking •••• 9102 via Airwallex.`);
      addActivityLog(
        'payment',
        'Instant Payout',
        `Tariq Vance cashed out $${amount.toFixed(2)} via Airwallex Payouts`,
        'processed'
      );
    },
    [showToast, addActivityLog]
  );

  // Driver upload document
  const uploadDriverDocument = useCallback(
    (docId: string, fileName: string) => {
      setDriverApplicant((prev) => {
        const updatedDocs = prev.documents.map((doc) =>
          doc.id === docId ? { ...doc, status: 'pending' as const, fileUrl: fileName, uploadedAt: 'Just now' } : doc
        );
        return { ...prev, documents: updatedDocs };
      });
      showToast('Document uploaded successfully. Sent to compliance team.');
    },
    [showToast]
  );

  // Send chat message
  const sendChatMessage = useCallback((sender: 'rider' | 'driver', text: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
  }, []);

  // Add payment card (Airwallex modal)
  const addPaymentCard = useCallback(
    (card: Omit<PaymentCard, 'id' | 'isDefault'>) => {
      const newCard: PaymentCard = {
        ...card,
        id: `card_${Date.now()}`,
        isDefault: false,
      };
      setRiderProfile((prev) => ({
        ...prev,
        savedPaymentCards: [...prev.savedPaymentCards, newCard],
      }));
      setSelectedCard(newCard);
      showToast(`${card.brand.toUpperCase()} card added via Airwallex Secure Elements.`);
    },
    [showToast]
  );

  // Admin approvals
  const approveApplicantDocument = useCallback(
    (applicantId: string, docId: string) => {
      setApplicants((prev) =>
        prev.map((app) => {
          if (app.id !== applicantId) return app;
          const updatedDocs = app.documents.map((d) => (d.id === docId ? { ...d, status: 'approved' as const } : d));
          const allApproved = updatedDocs.every((d) => d.status === 'approved');
          return {
            ...app,
            documents: updatedDocs,
            overallStatus: allApproved ? 'approved' : app.overallStatus,
          };
        })
      );
      showToast('Document approved.');
      addActivityLog('driver', 'Document Verified', `Document approved for applicant`, 'approved');
    },
    [showToast, addActivityLog]
  );

  const rejectApplicantDocument = useCallback(
    (applicantId: string, docId: string, reason: string) => {
      setApplicants((prev) =>
        prev.map((app) => {
          if (app.id !== applicantId) return app;
          const updatedDocs = app.documents.map((d) =>
            d.id === docId ? { ...d, status: 'rejected' as const, rejectionReason: reason } : d
          );
          return {
            ...app,
            documents: updatedDocs,
            overallStatus: 'rejected' as const,
          };
        })
      );
      showToast('Document rejected and reason logged.');
      addActivityLog('driver', 'Document Rejected', `Document rejected: ${reason}`, 'rejected');
    },
    [showToast, addActivityLog]
  );

  const approveEntireApplicant = useCallback(
    (applicantId: string) => {
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicantId
            ? {
                ...app,
                overallStatus: 'approved',
                documents: app.documents.map((d) => ({ ...d, status: 'approved' })),
              }
            : app
        )
      );
      showToast('Driver application approved. Welcome pack sent.');
      addActivityLog('driver', 'Driver Onboarded', `Driver application approved and activated`, 'approved');
    },
    [showToast, addActivityLog]
  );

  const rejectEntireApplicant = useCallback(
    (applicantId: string, reason: string) => {
      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, overallStatus: 'rejected' } : app))
      );
      showToast(`Driver application rejected (${reason}).`);
      addActivityLog('driver', 'Driver Rejected', `Applicant rejected: ${reason}`, 'rejected');
    },
    [showToast, addActivityLog]
  );

  // Admin fare updates
  const updateVehiclePricing = useCallback(
    (tierId: VehicleTier, updates: Partial<VehicleOption>) => {
      setVehicleOptions((prev) =>
        prev.map((tier) => (tier.id === tierId ? { ...tier, ...updates } : tier))
      );
      showToast(`Updated pricing model for ${tierId.replace('_', ' ').toUpperCase()}.`);
      addActivityLog('system', 'Fares Updated', `Pricing matrix updated for ${tierId}`, 'updated');
    },
    [showToast, addActivityLog]
  );

  // Fast forward helper for demo presentation
  const fastForwardToLiveTrip = useCallback(() => {
    const fare = calculateFare('halo_go', 5.8, 14);
    const mockActive: ActiveRide = {
      id: 'ride_demo_live',
      code: 'HL-8492',
      riderId: riderProfile.id,
      riderName: riderProfile.name,
      riderRating: riderProfile.rating,
      pickup: INITIAL_LOCATIONS[0],
      dropoff: INITIAL_LOCATIONS[1],
      tier: 'halo_go',
      fareBreakdown: fare,
      status: 'in_progress',
      driver: driverProfile,
      requestedAt: '12:00 PM',
      assignedAt: '12:01 PM',
      startedAt: '12:04 PM',
      currentProgressPercent: 42,
      paymentMethod: {
        type: 'card',
        label: 'MASTERCARD •••• 4821',
      },
    };
    setActiveRide(mockActive);
    setTripProgress(42);
    setRiderScreen('in_progress');
    setDriverScreen('trip_in_progress');
    showToast('Fast-forwarded to Live Active Trip across all 3 products!');
  }, [calculateFare, driverProfile, riderProfile, showToast]);

  // Reset demo
  const resetDemoData = useCallback(() => {
    setActiveRide(null);
    setRiderScreen('home');
    setDriverScreen('home');
    setIsDriverOnline(true);
    setTodayEarnings(184.5);
    setTodayTrips(9);
    setTripProgress(0);
    setVehicleOptions(INITIAL_VEHICLE_OPTIONS);
    setApplicants(INITIAL_APPLICANTS);
    showToast('Demo state reset to initial baseline.');
  }, [showToast]);

  const value = useMemo(
    () => ({
      appView,
      setAppView,
      riderScreen,
      setRiderScreen,
      pickupLocation,
      setPickupLocation,
      dropoffLocation,
      setDropoffLocation,
      swapLocations,
      selectedTier,
      setSelectedTier,
      selectedCard,
      setSelectedCard,
      riderProfile,
      riderHistory,
      calculateFare,
      requestRide,
      cancelRide,
      rateAndTipRide,
      addPaymentCard,
      driverScreen,
      setDriverScreen,
      isDriverOnline,
      toggleDriverOnline,
      driverProfile,
      todayEarnings,
      todayTrips,
      todayOnlineHours,
      acceptanceRate,
      incomingCountdown,
      driverApplicant,
      acceptIncomingRide,
      declineIncomingRide,
      driverArrivedAtPickup,
      driverStartTrip,
      driverCompleteTrip,
      cashOutDriverEarnings,
      uploadDriverDocument,
      activeRide,
      tripProgress,
      chatMessages,
      sendChatMessage,
      adminTab,
      setAdminTab,
      selectedRideIdForInspection,
      setSelectedRideIdForInspection,
      applicants,
      approveApplicantDocument,
      rejectApplicantDocument,
      approveEntireApplicant,
      rejectEntireApplicant,
      vehicleOptions,
      updateVehiclePricing,
      driversList,
      ridersList,
      activityLogs,
      analytics,
      toastMessage,
      showToast,
      resetDemoData,
      fastForwardToLiveTrip,
    }),
    [
      appView,
      riderScreen,
      pickupLocation,
      dropoffLocation,
      swapLocations,
      selectedTier,
      selectedCard,
      riderProfile,
      riderHistory,
      calculateFare,
      requestRide,
      cancelRide,
      rateAndTipRide,
      addPaymentCard,
      driverScreen,
      isDriverOnline,
      toggleDriverOnline,
      driverProfile,
      todayEarnings,
      todayTrips,
      todayOnlineHours,
      acceptanceRate,
      incomingCountdown,
      driverApplicant,
      acceptIncomingRide,
      declineIncomingRide,
      driverArrivedAtPickup,
      driverStartTrip,
      driverCompleteTrip,
      cashOutDriverEarnings,
      uploadDriverDocument,
      activeRide,
      tripProgress,
      chatMessages,
      sendChatMessage,
      adminTab,
      selectedRideIdForInspection,
      applicants,
      approveApplicantDocument,
      rejectApplicantDocument,
      approveEntireApplicant,
      rejectEntireApplicant,
      vehicleOptions,
      updateVehiclePricing,
      driversList,
      ridersList,
      activityLogs,
      analytics,
      toastMessage,
      showToast,
      resetDemoData,
      fastForwardToLiveTrip,
    ]
  );

  return <HaloContext.Provider value={value}>{children}</HaloContext.Provider>;
};

export const useHalo = () => {
  const context = useContext(HaloContext);
  if (!context) {
    throw new Error('useHalo must be used within a HaloProvider');
  }
  return context;
};
