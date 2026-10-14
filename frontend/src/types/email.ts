// types/email.ts

export type EmailType =
  | "rejection"
  | "assessment"
  | "interview"
  | "offer"
  | "recruiter"
  | "confirmation"
  | "other";

// What the list and dashboard need
export interface EmailSummary {
  id: string;
  senderName: string;
  companyName: string;
  subject: string;
  summary: string; // short preview, a line or two
  receivedAt: string; // ISO date string
  type: EmailType;
  actionNeeded: boolean;
  dueAt?: string; // ISO date: due date, or "reply by" time, mentioned in the email
}

// What the detail page needs
export interface Email extends EmailSummary {
  senderEmail: string;
  body: string; // the full message
}
