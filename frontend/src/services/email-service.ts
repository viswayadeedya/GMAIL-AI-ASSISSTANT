// services/email-service.ts
import type { Email } from "../types/email";
import type { EmailPage, EmailQuery, Range } from "../types/inbox";
import { mockEmails } from "../mockdata/emails";

const RANGE_MS: Record<Range, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

// Mock version: filters, sorts and pages the local array.
// With a backend, this body becomes a fetch that sends `query` as params.
export async function searchEmails(query: EmailQuery): Promise<EmailPage> {
  const since = Date.now() - RANGE_MS[query.range];
  const text = query.q.trim().toLowerCase();

  const matches = mockEmails
    .filter((e) => new Date(e.receivedAt).getTime() >= since)
    .filter((e) => query.category === "all" || e.type === query.category)
    .filter(
      (e) =>
        !text ||
        [e.senderName, e.companyName, e.subject].some((field) =>
          field.toLowerCase().includes(text),
        ),
    )
    .sort((a, b) =>
      query.sort === "newest"
        ? b.receivedAt.localeCompare(a.receivedAt)
        : a.receivedAt.localeCompare(b.receivedAt),
    );

  const start = (query.page - 1) * query.pageSize;
  return {
    emails: matches.slice(start, start + query.pageSize),
    total: matches.length,
  };
}

export async function getEmails(): Promise<Email[]> {
  return mockEmails;
}

export async function getEmailById(id: string): Promise<Email | undefined> {
  return mockEmails.find((e) => e.id === id);
}
