import type { EmailType } from "../types/email";

export const tagStyles: Record<EmailType, { label: string; className: string }> = {
  assessment: { label: "Assessment", className: "bg-amber-100 text-amber-800" },
  interview: { label: "Interview", className: "bg-emerald-100 text-emerald-800" },
  offer: { label: "Offer", className: "bg-violet-100 text-violet-800" },
  recruiter: { label: "Recruiter", className: "bg-indigo-100 text-indigo-800" },
  confirmation: { label: "Confirmation", className: "bg-gray-100 text-gray-700" },
  rejection: { label: "Rejection", className: "bg-red-100 text-red-800" },
  other: { label: "Other", className: "bg-gray-100 text-gray-700" },
};
