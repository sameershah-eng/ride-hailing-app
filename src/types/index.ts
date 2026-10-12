/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = 'shell' | 'rider' | 'driver' | 'admin' | 'split';

export type RideStatus =
  | 'idle'
  | 'searching'
  | 'driver_assigned'
  | 'arrived_pickup'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type VehicleTier = 'halo_go' | 'halo_comfort' | 'halo_xl';

export interface LocationPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  category?: 'airport' | 'transit' | 'business' | 'home' | 'work' | 'popular';
}

export interface VehicleOption {
  id: VehicleTier;
  name: string;
  tagline: string;
  description: string;
  seats: number;
  etaMinutes: number;
  baseFare: number;
  perKm: number;
  perMin: number;
  bookingFee: number;
  minimumFare: number;
  iconType: 'sedan' | 'comfort' | 'suv';
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  bookingFee: number;
  subtotal: number;
  discount: number;
  totalFare: number;
  distanceKm: number;
  durationMinutes: number;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  totalTrips: number;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  vehicleTier: VehicleTier;
  status: 'online' | 'offline' | 'busy' | 'pending_approval' | 'suspended';
  lat: number;
  lng: number;
  heading: number; // in degrees
}

export interface RiderInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  totalRides: number;
  walletBalance: number;
  savedPaymentCards: PaymentCard[];
}

export interface PaymentCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  holderName: string;
}

export interface ActiveRide {
  id: string;
  code: string; // e.g. "HL-8492"
  riderId: string;
  riderName: string;
  riderRating: number;
  pickup: LocationPoint;
  dropoff: LocationPoint;
  tier: VehicleTier;
  fareBreakdown: FareBreakdown;
  status: RideStatus;
  driver?: DriverInfo;
  requestedAt: string;
  assignedAt?: string;
  pickupEstimatedAt?: string;
  startedAt?: string;
  completedAt?: string;
  currentProgressPercent: number; // 0 to 100
  paymentMethod: {
    type: 'card' | 'wallet';
    label: string;
  };
  rating?: number;
  ratingTags?: string[];
  tipAmount?: number;
}

export interface DriverDocument {
  id: string;
  title: string;
  type: 'license' | 'registration' | 'insurance' | 'background';
  documentNumber: string;
  issuedDate: string;
  expiryDate: string;
  status: 'approved' | 'pending' | 'rejected';
  rejectionReason?: string;
  fileUrl?: string;
  uploadedAt: string;
}

export interface DriverApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  avatarBg: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  licensePlate: string;
  tier: VehicleTier;
  submittedAt: string;
  overallStatus: 'pending' | 'approved' | 'rejected';
  documents: DriverDocument[];
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  category: 'ride' | 'driver' | 'payment' | 'system';
  title: string;
  description: string;
  statusBadge?: string;
  relatedId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'rider' | 'driver' | 'system';
  text: string;
  time: string;
}
