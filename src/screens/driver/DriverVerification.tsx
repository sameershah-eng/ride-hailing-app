/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';

export const DriverVerification: React.FC = () => {
  const {
    setDriverScreen,
    driverApplicant,
    uploadDriverDocument,
    showToast,
  } = useHalo();

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('driver_license_front.jpg');

  const approvedCount = driverApplicant.documents.filter((d) => d.status === 'approved').length;
  const totalCount = driverApplicant.documents.length;
  const progressPercent = Math.round((approvedCount / totalCount) * 100);

  const handleSimulateUpload = () => {
    if (!selectedDocId) return;
    uploadDriverDocument(selectedDocId, selectedFileName);
    setSelectedDocId(null);
  };

  return (
    <div className="relative w-full h-full bg-[#F7F5F2] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#ECE9E4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDriverScreen('home')}
            className="w-8 h-8 rounded-full bg-[#F7F5F2] hover:bg-[#ECE9E4] flex items-center justify-center text-[#12141F] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-bold text-[#12141F]">Driver Compliance</span>
        </div>
        <span className="text-[11px] font-semibold text-[#1F9D7A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Verified Driver
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-[#ECE9E4] p-4 halo-shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12141F]">Document Verification</span>
            <span className="text-xs font-bold text-[#FF5F45] tabular-nums">
              {approvedCount} of {totalCount} verified
            </span>
          </div>

          <div className="h-2 w-full bg-[#F7F5F2] rounded-full overflow-hidden">
            <div
              className="h-full halo-gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-[#6B6F80]">
            All documents are reviewed by Halo Trust & Safety within 2 hours.
          </p>
        </div>

        {/* Documents List */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] px-1">
            Required Documents
          </div>

          {driverApplicant.documents.map((doc) => {
            const isApproved = doc.status === 'approved';
            const isPending = doc.status === 'pending';
            const isRejected = doc.status === 'rejected';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-[#ECE9E4] p-3.5 halo-shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isApproved
                        ? 'bg-emerald-50 text-[#1F9D7A]'
                        : isPending
                        ? 'bg-amber-50 text-[#E8A33D]'
                        : 'bg-rose-50 text-[#E5484D]'
                    }`}
                  >
                    <FileText size={18} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#12141F]">{doc.title}</h5>
                    <p className="text-[10px] text-[#6B6F80]">
                      Doc No: {doc.documentNumber} · Expires {doc.expiryDate}
                    </p>
                    {isRejected && doc.rejectionReason && (
                      <p className="text-[10px] text-[#E5484D] font-medium mt-0.5">
                        {doc.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isApproved
                        ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                        : isPending
                        ? 'bg-amber-50 text-[#E8A33D] border border-amber-200'
                        : 'bg-rose-50 text-[#E5484D] border border-rose-200'
                    }`}
                  >
                    {isApproved ? 'Approved' : isPending ? 'Pending' : 'Action Req'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedDocId(doc.id)}
                    className="p-1 text-[#6B6F80] hover:text-[#12141F]"
                    title="Re-upload or Update"
                  >
                    <Upload size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Airwallex Tax & Payout Compliance */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#ECE9E4] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-[#1F9D7A]" />
            <div>
              <span className="font-bold text-[#12141F] block">W-9 Tax Compliance</span>
              <span className="text-[10px] text-[#6B6F80]">Verified via Airwallex Payouts</span>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#1F9D7A]">Active</span>
        </div>
      </div>

      {/* Upload Simulation Sheet */}
      {selectedDocId && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-[28px] border-t border-[#ECE9E4] p-5 space-y-4 halo-shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
              <span className="text-sm font-bold text-[#12141F]">Upload Document</span>
              <button
                type="button"
                onClick={() => setSelectedDocId(null)}
                className="w-7 h-7 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#6B6F80]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="border-2 border-dashed border-[#ECE9E4] rounded-2xl p-6 text-center space-y-2 bg-[#F7F5F2]/50">
              <Upload size={24} className="text-[#FF5F45] mx-auto" />
              <p className="text-xs font-semibold text-[#12141F]">
                Drag and drop your scanned copy or select file
              </p>
              <p className="text-[10px] text-[#6B6F80]">PDF, JPG, PNG up to 15MB</p>
              <input
                type="text"
                value={selectedFileName}
                onChange={(e) => setSelectedFileName(e.target.value)}
                className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[#ECE9E4] bg-white text-center w-full max-w-[240px]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedDocId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#ECE9E4] text-xs font-semibold text-[#6B6F80]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateUpload}
                className="flex-1 py-2.5 rounded-xl halo-gradient-bg text-white text-xs font-semibold"
              >
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
