/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CreditCard,
  Wallet,
  Plus,
  Check,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { PaymentCard } from '../../types';

interface RiderPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RiderPaymentModal: React.FC<RiderPaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    riderProfile,
    selectedCard,
    setSelectedCard,
    addPaymentCard,
    showToast,
  } = useHalo();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState(riderProfile.name);

  // Auto-detect brand based on number
  const detectedBrand: 'visa' | 'mastercard' | 'amex' = cardNumber.startsWith('4')
    ? 'visa'
    : cardNumber.startsWith('3')
    ? 'amex'
    : 'mastercard';

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    return parts ? parts.join(' ') : raw;
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length > 2) {
      return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    return raw;
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = cardNumber.replace(/\D/g, '');
    if (cleanNum.length < 15) {
      showToast('Please enter a valid card number');
      return;
    }
    const [mm, yy] = expiry.split('/');
    addPaymentCard({
      brand: detectedBrand,
      last4: cleanNum.slice(-4),
      expiryMonth: mm || '12',
      expiryYear: yy || '28',
      holderName: holderName || 'Cardholder',
    });
    setIsAddingNew(false);
    setCardNumber('');
    setExpiry('');
    setCvc('');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 max-h-[85%] flex flex-col overflow-hidden halo-shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#12141F]">Payment Method</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#6B6F80] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          {!isAddingNew ? (
            <>
              {/* Airwallex Banner Badge */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4] text-[11px]">
                <div className="flex items-center gap-1.5 text-[#6B6F80] font-medium">
                  <ShieldCheck size={14} className="text-[#1F9D7A]" />
                  <span>Payments powered by <strong className="text-[#12141F]">Airwallex</strong></span>
                </div>
                <span className="text-[10px] text-[#1F9D7A] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  PCI DSS L1
                </span>
              </div>

              {/* Halo Wallet Option */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#12141F] to-[#252838] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FFB86B]">
                    <Wallet size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Halo Balance</span>
                    <span className="text-sm font-bold tabular-nums text-white">
                      ${riderProfile.walletBalance.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Wallet topped up with $25 via Airwallex')}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                >
                  Top Up
                </button>
              </div>

              {/* Saved Cards List */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80]">
                  Saved Credit / Debit Cards
                </div>

                {riderProfile.savedPaymentCards.map((card) => {
                  const isSelected = selectedCard?.id === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setSelectedCard(card);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#FF5F45] bg-[#FFEDE8]/20 ring-1 ring-[#FF5F45]'
                          : 'border-[#ECE9E4] bg-white hover:bg-[#F7F5F2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-7 rounded-md bg-[#F7F5F2] border border-[#ECE9E4] flex items-center justify-center text-xs font-bold text-[#12141F]">
                          {card.brand === 'visa' ? 'VISA' : card.brand === 'amex' ? 'AMEX' : 'MC'}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#12141F]">
                            {card.brand.toUpperCase()} •••• {card.last4}
                          </p>
                          <p className="text-[10px] text-[#6B6F80]">
                            Expires {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FF5F45] text-white flex items-center justify-center">
                          <Check size={12} strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add New Card Button */}
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-[#ECE9E4] text-[#12141F] hover:bg-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add New Card via Airwallex</span>
              </button>
            </>
          ) : (
            /* Airwallex Styled Card Input Form */
            <form onSubmit={handleSaveCard} className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#12141F]">
                <span>Add Card Details</span>
                <span className="text-[10px] text-[#6B6F80] flex items-center gap-1">
                  <Lock size={10} /> 256-bit Encrypted
                </span>
              </div>

              {/* Card Number */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                  Card Number
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none bg-[#F7F5F2] tabular-nums"
                  />
                  <span className="absolute right-3 text-[10px] font-bold text-[#6B6F80] uppercase">
                    {detectedBrand}
                  </span>
                </div>
              </div>

              {/* Expiry & CVC */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Expires (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08/28"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none bg-[#F7F5F2] tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                    Security Code (CVC)
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none bg-[#F7F5F2] tabular-nums"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name as on card"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none bg-[#F7F5F2]"
                />
              </div>

              {/* Airwallex badge note */}
              <p className="text-[10px] text-[#6B6F80] leading-relaxed pt-1">
                Your payment data is securely tokenized via Airwallex Elements. Halo never stores full card numbers.
              </p>

              {/* Form Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#ECE9E4] text-xs font-semibold text-[#6B6F80] hover:bg-[#F7F5F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl halo-gradient-bg text-white text-xs font-semibold halo-shadow-sm active:scale-95 transition-all"
                >
                  Save Card
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
