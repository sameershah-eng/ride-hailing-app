/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { LocationPoint, DriverInfo } from '../../types';

/**
 * ============================================================================
 * NOTE ON PRODUCTION GOOGLE MAPS INTEGRATION:
 * This custom vector SVG map provides a zero-dependency, hyper-performant,
 * brand-tailored visual map designed to run instantly without billing or API keys.
 * 
 * To plug in the real Google Maps JavaScript API or Mapbox GL JS in production:
 * 1. Replace this SVG renderer with `<div ref={mapContainerRef} />`
 * 2. In `useEffect`, initialize `new google.maps.Map(mapContainerRef.current, {
 *      styles: customHaloAubergineOrWarmMapStyle,
 *      center: { lat: 37.788, lng: -122.402 },
 *      zoom: 14
 *    })`
 * 3. Mount `google.maps.Polyline` for the route and `google.maps.Marker`
 *    with a custom SVG car icon for live GPS position updates.
 * ============================================================================
 */

interface MapViewProps {
  className?: string;
  pickup?: LocationPoint;
  dropoff?: LocationPoint;
  driver?: DriverInfo;
  progressPercent?: number; // 0 to 100 along the route
  showRoute?: boolean;
  isSearching?: boolean;
  interactive?: boolean;
  multiDrivers?: DriverInfo[];
  selectedDriverId?: string;
  onDriverSelect?: (id: string) => void;
  height?: string | number;
}

export const MapView: React.FC<MapViewProps> = ({
  className = '',
  pickup,
  dropoff,
  progressPercent = 0,
  showRoute = true,
  isSearching = false,
  multiDrivers,
  selectedDriverId,
  onDriverSelect,
}) => {
  // SVG Canvas dimensions: 800 x 900
  // Coordinates mapped to realistic San Francisco downtown / Embarcadero waterfront

  // Path definition for the primary demo route (Market St -> Ferry Building -> Embarcadero)
  // Smooth cubic Bezier spline
  const routePoints = useMemo(() => {
    // Pickup: Market & 4th (x: 340, y: 520)
    // Intermediate waypoint 1: (x: 420, y: 440)
    // Intermediate waypoint 2: (x: 500, y: 380)
    // Dropoff: Ferry Building / Embarcadero (x: 560, y: 320)
    const p0 = { x: 330, y: 520 };
    const p1 = { x: 410, y: 440 };
    const p2 = { x: 490, y: 380 };
    const p3 = { x: 570, y: 310 };

    return {
      p0,
      p1,
      p2,
      p3,
      pathString: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`,
    };
  }, []);

  // Calculate position and angle along the Bezier curve given progress (0 to 1)
  const carState = useMemo(() => {
    const t = Math.max(0, Math.min(1, progressPercent / 100));
    const { p0, p1, p2, p3 } = routePoints;

    // Cubic bezier position
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
    const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;

    // Derivative for tangent heading angle
    const dx =
      3 * uu * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * tt * (p3.x - p2.x);
    const dy =
      3 * uu * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * tt * (p3.y - p2.y);

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    return { x, y, angle };
  }, [progressPercent, routePoints]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-[#F7F5F2] ${className}`}
      style={{ isolation: 'isolate' }}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="180 180 500 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Signature Halo coral gradient for route */}
          <linearGradient id="haloRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5F45" />
            <stop offset="50%" stopColor="#FF8A4C" />
            <stop offset="100%" stopColor="#FFB86B" />
          </linearGradient>

          {/* Route casing shadow */}
          <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF5F45" floodOpacity="0.3" />
          </filter>

          {/* Soft car shadow */}
          <filter id="carGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#12141F" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base Landmass (Warm Off-White) */}
        <rect width="900" height="900" fill="#F8F6F2" />

        {/* San Francisco Bay Water (Soft Elegant Slate Blue) */}
        <path
          d="M 520 0 
             Q 535 150, 560 260
             Q 590 340, 610 440
             Q 630 520, 680 620
             L 900 620 L 900 0 Z"
          fill="#E2EDF5"
        />

        {/* Subtle Water Shimmer Waves */}
        <path
          d="M 640 160 Q 670 155, 710 165 M 680 260 Q 720 250, 770 265 M 690 400 Q 740 395, 800 410"
          stroke="#D2E3F0"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Parks & Green Spaces (Muted Sage) */}
        {/* Yerba Buena Gardens */}
        <rect x="365" y="475" width="48" height="42" rx="4" fill="#EBF2EC" stroke="#DEE8DF" strokeWidth="1" />
        {/* Salesforce Park Roof */}
        <rect x="425" y="455" width="60" height="24" rx="10" fill="#EBF2EC" stroke="#DEE8DF" strokeWidth="1" />
        {/* South Park Oval */}
        <ellipse cx="445" cy="570" rx="30" ry="18" fill="#EBF2EC" stroke="#DEE8DF" strokeWidth="1" />
        {/* Embarcadero Plaza */}
        <polygon points="535,325 570,305 575,340 540,350" fill="#EBF2EC" stroke="#DEE8DF" strokeWidth="1" />

        {/* Street Network (White Arterials with Crisp Neutral Borders) */}
        {/* Highway 80 / Bay Bridge Approach */}
        <path
          d="M 280 680 L 460 550 L 650 430 L 850 330"
          stroke="#EAE6DF"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 280 680 L 460 550 L 650 430 L 850 330"
          stroke="#FFFFFF"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* Market Street Diagonal Arterial */}
        <line x1="220" y1="620" x2="570" y2="310" stroke="#ECE8E2" strokeWidth="16" strokeLinecap="round" />
        <line x1="220" y1="620" x2="570" y2="310" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />

        {/* The Embarcadero Waterfront Boulevard */}
        <path
          d="M 525 180 Q 555 260, 580 340 Q 615 440, 645 540"
          stroke="#ECE8E2"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 525 180 Q 555 260, 580 340 Q 615 440, 645 540"
          stroke="#FFFFFF"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* Grid Streets: Mission, Howard, Folsom, Harrison */}
        <g stroke="#ECE8E2" strokeWidth="7" strokeLinecap="round">
          {/* Mission St */}
          <line x1="260" y1="620" x2="550" y2="360" />
          {/* Howard St */}
          <line x1="290" y1="650" x2="570" y2="400" />
          {/* Folsom St */}
          <line x1="320" y1="680" x2="590" y2="440" />
          {/* Cross Streets (1st, 2nd, 3rd, 4th, 5th, Montgomery, Kearny) */}
          <line x1="280" y1="480" x2="420" y2="640" />
          <line x1="330" y1="440" x2="470" y2="600" />
          <line x1="380" y1="400" x2="520" y2="560" />
          <line x1="430" y1="360" x2="570" y2="520" />
          <line x1="480" y1="320" x2="620" y2="480" />
          {/* Financial District North Grid */}
          <line x1="360" y1="340" x2="530" y2="340" />
          <line x1="350" y1="280" x2="520" y2="280" />
          <line x1="370" y1="230" x2="510" y2="230" />
          <line x1="400" y1="200" x2="400" y2="370" />
          <line x1="450" y1="200" x2="450" y2="370" />
        </g>

        {/* White road fills */}
        <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round">
          <line x1="260" y1="620" x2="550" y2="360" />
          <line x1="290" y1="650" x2="570" y2="400" />
          <line x1="320" y1="680" x2="590" y2="440" />
          <line x1="280" y1="480" x2="420" y2="640" />
          <line x1="330" y1="440" x2="470" y2="600" />
          <line x1="380" y1="400" x2="520" y2="560" />
          <line x1="430" y1="360" x2="570" y2="520" />
          <line x1="480" y1="320" x2="620" y2="480" />
          <line x1="360" y1="340" x2="530" y2="340" />
          <line x1="350" y1="280" x2="520" y2="280" />
          <line x1="370" y1="230" x2="510" y2="230" />
          <line x1="400" y1="200" x2="400" y2="370" />
          <line x1="450" y1="200" x2="450" y2="370" />
        </g>

        {/* Building Blocks / Footprints */}
        <g fill="#F2EEE7" opacity="0.6">
          <rect x="360" y="380" width="28" height="24" rx="2" />
          <rect x="400" y="350" width="34" height="26" rx="2" />
          <rect x="445" y="325" width="26" height="28" rx="2" />
          <rect x="480" y="295" width="30" height="28" rx="2" />
          <rect x="310" y="470" width="32" height="30" rx="2" />
          <rect x="345" y="440" width="30" height="26" rx="2" />
          <rect x="390" y="415" width="32" height="26" rx="2" />
          <rect x="475" y="430" width="36" height="30" rx="2" />
          <rect x="515" y="400" width="30" height="26" rx="2" />
        </g>

        {/* Subtle City Landmark Labels */}
        <text x="320" y="555" fill="#9CA0AF" fontSize="9" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">
          SOMA
        </text>
        <text x="440" y="275" fill="#9CA0AF" fontSize="9" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">
          FINANCIAL DISTRICT
        </text>
        <text x="590" y="380" fill="#6B7280" fontSize="8" fontWeight="600" letterSpacing="0.05em">
          EMBARCADERO
        </text>
        <text x="390" y="492" fill="#5E7864" fontSize="8" fontWeight="500" textAnchor="middle">
          Yerba Buena
        </text>

        {/* THE ROUTE LINE */}
        {showRoute && (
          <g>
            {/* Background Glow / Casing */}
            <path
              d={routePoints.pathString}
              stroke="#FFFFFF"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Coral Gradient Active Route Line */}
            <path
              d={routePoints.pathString}
              stroke="url(#haloRouteGrad)"
              strokeWidth="5.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#routeShadow)"
            />
          </g>
        )}

        {/* PICKUP PIN */}
        <g transform={`translate(${routePoints.p0.x}, ${routePoints.p0.y})`}>
          {/* Searching pulsing rings */}
          {isSearching && (
            <>
              <circle r="22" fill="#FF5F45" opacity="0.18">
                <animate attributeName="r" values="10;36" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="14" fill="#FF5F45" opacity="0.25">
                <animate attributeName="r" values="8;24" dur="2s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Outer anchor circle */}
          <circle r="11" fill="#FFFFFF" filter="url(#carGlow)" />
          <circle r="7.5" fill="#12141F" />
          <circle r="3" fill="#FFFFFF" />

          {/* Label tag */}
          <g transform="translate(0, -22)">
            <rect x="-42" y="-12" width="84" height="18" rx="9" fill="#12141F" />
            <text x="0" y="1" fill="#FFFFFF" fontSize="8.5" fontWeight="600" textAnchor="middle">
              {pickup?.name?.slice(0, 15) || '342 Market St'}
            </text>
          </g>
        </g>

        {/* DROPOFF PIN */}
        {showRoute && (
          <g transform={`translate(${routePoints.p3.x}, ${routePoints.p3.y})`}>
            {/* Outer badge */}
            <circle r="12" fill="#FFFFFF" filter="url(#carGlow)" />
            <circle r="8.5" fill="#FF5F45" />
            {/* Square center for destination */}
            <rect x="-3" y="-3" width="6" height="6" fill="#FFFFFF" rx="1" />

            {/* Label tag */}
            <g transform="translate(0, -22)">
              <rect x="-44" y="-12" width="88" height="18" rx="9" fill="#FFFFFF" stroke="#ECE9E4" strokeWidth="1" filter="url(#carGlow)" />
              <text x="0" y="1" fill="#12141F" fontSize="8.5" fontWeight="600" textAnchor="middle">
                {dropoff?.name?.slice(0, 16) || 'Ferry Building'}
              </text>
            </g>
          </g>
        )}

        {/* ANIMATED RIDE CAR MARKER */}
        {showRoute && (
          <g
            transform={`translate(${carState.x}, ${carState.y}) rotate(${carState.angle})`}
            filter="url(#carGlow)"
          >
            {/* Car body (sleek minimalist vehicle top view) */}
            <rect x="-11" y="-6" width="22" height="12" rx="4" fill="#12141F" />
            {/* Windshield */}
            <rect x="-4" y="-4.5" width="6" height="9" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            {/* Headlights (Warm Halo Gold) */}
            <circle cx="9" cy="-3.5" r="1.5" fill="#FFB86B" />
            <circle cx="9" cy="3.5" r="1.5" fill="#FFB86B" />
            {/* Taillights (Coral red) */}
            <circle cx="-10" cy="-3.5" r="1.2" fill="#FF5F45" />
            <circle cx="-10" cy="3.5" r="1.2" fill="#FF5F45" />
          </g>
        )}

        {/* MULTI-DRIVER CARS (FOR ADMIN LIVE MONITORING & DISPATCH) */}
        {multiDrivers &&
          multiDrivers.map((drv, idx) => {
            // Map lat/lng roughly to SVG coordinate space
            const x = 320 + ((drv.lng + 122.42) * 5000) % 280;
            const y = 350 + ((37.8 - drv.lat) * 5000) % 260;
            const isSelected = selectedDriverId === drv.id;

            return (
              <g
                key={drv.id || idx}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onDriverSelect && onDriverSelect(drv.id)}
              >
                {isSelected && (
                  <circle r="16" fill="#FF5F45" opacity="0.2">
                    <animate attributeName="r" values="12;20" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Driver pin badge */}
                <circle
                  r="9"
                  fill={drv.status === 'online' ? '#FFFFFF' : '#F3F4F6'}
                  stroke={isSelected ? '#FF5F45' : '#D1D5DB'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter="url(#carGlow)"
                />
                <circle
                  r="4.5"
                  fill={drv.status === 'online' ? '#1F9D7A' : '#9CA3AF'}
                />
                {/* Mini driver label */}
                <g transform="translate(0, -14)">
                  <rect x="-24" y="-8" width="48" height="13" rx="4" fill="#FFFFFF" stroke="#ECE9E4" strokeWidth="0.8" />
                  <text x="0" y="2" fill="#12141F" fontSize="7" fontWeight="600" textAnchor="middle">
                    {drv.name.split(' ')[0]}
                  </text>
                </g>
              </g>
            );
          })}
      </svg>

      {/* Floating Map Compass / Reset Center Button */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-auto">
        <button
          type="button"
          aria-label="Center map"
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-[#ECE9E4] flex items-center justify-center text-[#12141F] shadow-sm hover:bg-white active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>
      </div>

      {/* Subtle Map Attribution / Integration Badge */}
      <div className="absolute bottom-2 left-2 z-10 pointer-events-none text-[10px] text-[#8C90A0] bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#ECE9E4]/60">
        San Francisco Downtown · Halo Vector Engine
      </div>
    </div>
  );
};
