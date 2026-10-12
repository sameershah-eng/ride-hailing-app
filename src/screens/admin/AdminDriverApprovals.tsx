/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  X,
  Check,
  Shield,
  Car,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useHalo } from '../../context/HaloContext';
import { DriverApplicant, DriverDocument } from '../../types';

export const AdminDriverApprovals: React.FC = () => {
  const {
    applicants,
    approveApplicantDocument,
    rejectApplicantDocument,
    approveEntireApplicant,
    rejectEntireApplicant,
    showToast,
  } = useHalo();

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<DriverApplicant | null>(applicants[0]);
  const [activeDocumentReview, setActiveDocumentReview] = useState<DriverDocument | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredApplicants = applicants.filter((a) => {
    if (filter === 'all') return true;
    return a.overallStatus === filter;
  });

  const handleApproveDoc = (docId: string) => {
    if (!selectedApplicant) return;
    approveApplicantDocument(selectedApplicant.id, docId);
    // update local reference
    setSelectedApplicant((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        documents: prev.documents.map((d) => (d.id === docId ? { ...d, status: 'approved' as const } : d)),
      };
    });
  };

  const handleRejectDoc = () => {
    if (!selectedApplicant || !activeDocumentReview) return;
    rejectApplicantDocument(selectedApplicant.id, activeDocumentReview.id, rejectionReason || 'Document illegible or expired.');
    setShowRejectModal(false);
    setRejectionReason('');
    setActiveDocumentReview(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#12141F]">
            Driver Compliance & Onboarding Queue
          </h1>
          <p className="text-xs text-[#6B6F80]">
            Audit driver credentials, vehicle registrations, and commercial insurance policies
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-white p-1 rounded-2xl border border-[#ECE9E4] halo-shadow-xs self-start">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'halo-gradient-bg text-white shadow-2xs'
                  : 'text-[#6B6F80] hover:text-[#12141F] hover:bg-[#F7F5F2]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Applicants Table + Review Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Applicants (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECE9E4] overflow-hidden halo-shadow-sm">
          <div className="p-4 border-b border-[#ECE9E4] flex items-center justify-between">
            <span className="text-xs font-bold text-[#12141F]">
              Applicants ({filteredApplicants.length})
            </span>
            <span className="text-[11px] text-[#6B6F80]">Click to inspect credentials</span>
          </div>

          <div className="divide-y divide-[#ECE9E4]/60">
            {filteredApplicants.map((applicant) => {
              const isSelected = selectedApplicant?.id === applicant.id;
              const approvedCount = applicant.documents.filter((d) => d.status === 'approved').length;

              return (
                <div
                  key={applicant.id}
                  onClick={() => setSelectedApplicant(applicant)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#FFEDE8]/25' : 'hover:bg-[#F7F5F2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-[#12141F] border border-[#ECE9E4]"
                      style={{ backgroundColor: applicant.avatarBg }}
                    >
                      {applicant.avatarInitials}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#12141F]">
                          {applicant.name}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            applicant.overallStatus === 'approved'
                              ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                              : applicant.overallStatus === 'pending'
                              ? 'bg-amber-50 text-[#E8A33D] border border-amber-200'
                              : 'bg-rose-50 text-[#E5484D] border border-rose-200'
                          }`}
                        >
                          {applicant.overallStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6F80]">
                        {applicant.vehicleModel} ({applicant.vehicleColor}) · {applicant.licensePlate}
                      </p>
                      <p className="text-[10px] text-[#6B6F80] mt-0.5">
                        {approvedCount}/{applicant.documents.length} documents verified · {applicant.submittedAt}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-[#6B6F80]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Applicant Credential Review Drawer (5 cols) */}
        {selectedApplicant && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECE9E4] p-5 halo-shadow-sm space-y-4">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E4]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block">
                  Application Review
                </span>
                <h3 className="text-sm font-bold text-[#12141F]">
                  {selectedApplicant.name}
                </h3>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                  selectedApplicant.overallStatus === 'approved'
                    ? 'bg-emerald-50 text-[#1F9D7A] border border-emerald-200'
                    : selectedApplicant.overallStatus === 'pending'
                    ? 'bg-amber-50 text-[#E8A33D] border border-amber-200'
                    : 'bg-rose-50 text-[#E5484D] border border-rose-200'
                }`}
              >
                {selectedApplicant.overallStatus}
              </span>
            </div>

            {/* Vehicle & Tier specs */}
            <div className="p-3 rounded-xl bg-[#F7F5F2] border border-[#ECE9E4] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Vehicle</span>
                <span className="font-semibold text-[#12141F]">
                  {selectedApplicant.vehicleModel} ({selectedApplicant.vehicleYear})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Plate & Color</span>
                <span className="font-semibold text-[#12141F]">
                  {selectedApplicant.licensePlate} · {selectedApplicant.vehicleColor}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6F80]">Requested Category</span>
                <span className="font-semibold text-[#12141F] capitalize">
                  {selectedApplicant.tier.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#12141F] block">
                Submitted Documents
              </span>

              {selectedApplicant.documents.map((doc) => {
                const isApproved = doc.status === 'approved';
                const isRejected = doc.status === 'rejected';

                return (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-[#ECE9E4] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={15} className="text-[#FF5F45]" />
                        <span className="font-semibold text-[#12141F]">{doc.title}</span>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          isApproved
                            ? 'bg-emerald-50 text-[#1F9D7A]'
                            : isRejected
                            ? 'bg-rose-50 text-[#E5484D]'
                            : 'bg-amber-50 text-[#E8A33D]'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <div className="text-[10px] text-[#6B6F80]">
                      Doc #: {doc.documentNumber} · Expires: {doc.expiryDate}
                    </div>

                    {isRejected && doc.rejectionReason && (
                      <p className="text-[10px] text-[#E5484D] font-medium">
                        Reason: {doc.rejectionReason}
                      </p>
                    )}

                    {/* Action buttons for this doc */}
                    {!isApproved && (
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleApproveDoc(doc.id)}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1F9D7A] font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <Check size={12} strokeWidth={2.5} />
                          <span>Approve Doc</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDocumentReview(doc);
                            setShowRejectModal(true);
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#E5484D] font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <X size={12} strokeWidth={2.5} />
                          <span>Reject Doc</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Overall Driver Approvals */}
            <div className="pt-2 border-t border-[#ECE9E4] flex gap-2">
              <button
                type="button"
                onClick={() => approveEntireApplicant(selectedApplicant.id)}
                className="flex-1 py-2.5 rounded-xl halo-gradient-bg text-white font-bold text-xs halo-shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={14} />
                <span>Authorize & Activate Driver</span>
              </button>

              <button
                type="button"
                onClick={() => rejectEntireApplicant(selectedApplicant.id, 'Failed background clearance')}
                className="py-2.5 px-3 rounded-xl border border-[#ECE9E4] hover:bg-rose-50 text-[#E5484D] font-semibold text-xs transition-colors"
              >
                Reject App
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reject Reason Modal */}
      {showRejectModal && activeDocumentReview && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#ECE9E4] p-5 max-w-sm w-full space-y-3 halo-shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE9E4]">
              <span className="text-xs font-bold text-[#12141F]">
                Reject {activeDocumentReview.title}
              </span>
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="text-[#6B6F80] hover:text-[#12141F]"
              >
                <X size={15} />
              </button>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F80] block mb-1">
                Reason for Rejection
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Document expired, blurred photograph, or mismatched vehicle VIN..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE9E4] focus:border-[#FF5F45] focus:outline-none bg-[#F7F5F2]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 rounded-xl border border-[#ECE9E4] text-xs font-semibold text-[#6B6F80]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectDoc}
                className="flex-1 py-2 rounded-xl bg-[#E5484D] text-white text-xs font-semibold active:scale-95 transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
