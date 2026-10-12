/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, DollarSign, CreditCard, ArrowRight, Check } from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const RiderOnboarding: React.FC = () => {
  const { setRiderScreen, showToast } = useHalo();
  const [slide, setSlide] = useState(0);
  const [isPhoneStep, setIsPhoneStep] = useState(false);
  const [phone, setPhone] = useState('(415) 892-0194');
  const [otp, setOtp] = useState(['8', '4', '9', '2', '0', '1']);

  const slides = [
    {
      icon: DollarSign,
      title: 'Fixed Upfront Fares',
      subtitle: 'Know the exact cost before booking. Zero surge multipliers or unpredictable meter hikes.',
      tag: 'TRANSPARENT PRICING',
    },
    {
      icon: ShieldCheck,
      title: 'Vetted Drivers & Modern Cars',
      subtitle: 'Strict background checks, vehicle inspections, and annual reviews for total safety.',
      tag: 'SAFETY FIRST',
    },
    {
      icon: CreditCard,
      title: 'Seamless Airwallex Checkout',
      subtitle: 'Instant payments with saved cards, Apple Pay, or your Halo balance in one tap.',
      tag: 'GLOBAL PAYMENTS',
    },
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      setIsPhoneStep(true);
    }
  };

  const handleVerifyOtp = () => {
    showToast('Phone verified. Welcome back, Amara!');
    setRiderScreen('home');
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between p-6 overflow-hidden">
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FF8A4C]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg halo-gradient-bg flex items-center justify-center text-white font-bold text-xs shadow-xs">
            H
          </div>
          <span className="font-bold text-base tracking-tight text-[#12141F]">Halo</span>
        </div>
        {!isPhoneStep && (
          <button
            type="button"
            onClick={() => setIsPhoneStep(true)}
            className="text-xs font-semibold text-[#6B6F80] hover:text-[#12141F] transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {!isPhoneStep ? (
        /* Slide carousel */
        <div className="relative z-10 flex-1 flex flex-col justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-start"
            >
              <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFEDE8] text-[#FF5F45] text-[10px] font-bold tracking-wider uppercase">
                {slides[slide].tag}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[#F7F5F2] border border-[#ECE9E4] flex items-center justify-center text-[#FF5F45] mb-6 halo-shadow-sm">
                {React.createElement(slides[slide].icon, { size: 28, strokeWidth: 1.8 })}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#12141F] leading-snug mb-3">
                {slides[slide].title}
              </h2>

              <p className="text-sm text-[#6B6F80] leading-relaxed">
                {slides[slide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center gap-1.5 mt-8">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? 'w-6 halo-gradient-bg' : 'w-1.5 bg-[#ECE9E4]'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* OTP Phone Authentication Step */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 flex flex-col justify-center py-4"
        >
          <div className="mb-2 text-[10px] font-bold tracking-wider uppercase text-[#1F9D7A] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block self-start">
            SECURE VERIFICATION
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#12141F] mb-1.5">
            Enter 6-digit code
          </h2>
          <p className="text-xs text-[#6B6F80] mb-6">
            We sent a verification code to <span className="text-[#12141F] font-semibold">{phone}</span>
          </p>

          {/* OTP Input Boxes */}
          <div className="flex items-center justify-between gap-2 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  const newOtp = [...otp];
                  newOtp[i] = val;
                  setOtp(newOtp);
                }}
                className="w-11 h-12 text-center text-lg font-bold text-[#12141F] bg-[#F7F5F2] border border-[#ECE9E4] rounded-xl focus:outline-none focus:border-[#FF5F45] focus:bg-white transition-all tabular-nums"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B6F80]">
            <span>Didn't receive code?</span>
            <button
              type="button"
              onClick={() => showToast('New code sent: 849201')}
              className="text-[#FF5F45] font-semibold hover:underline"
            >
              Resend in 30s
            </button>
          </div>
        </motion.div>
      )}

      {/* Bottom CTA */}
      <div className="relative z-10 pt-4">
        {!isPhoneStep ? (
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 px-5 rounded-2xl halo-gradient-bg text-white font-semibold text-sm flex items-center justify-center gap-2 halo-shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{slide === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-3.5 px-5 rounded-2xl halo-gradient-bg text-white font-semibold text-sm flex items-center justify-center gap-2 halo-shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Check size={16} />
              <span>Verify & Continue</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPhoneStep(false)}
              className="text-xs text-center text-[#6B6F80] hover:text-[#12141F] py-1"
            >
              Back to slides
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
