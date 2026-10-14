import type { Email, EmailType } from "./email";

export const RANGES = ["24h", "7d", "30d"] as const;
export type Range = (typeof RANGES)[number];

export const SORT_ORDERS = ["newest", "oldest"] as const;
export type SortOrder = (typeof SORT_ORDERS)[number];

export type CategoryFilter = "all" | EmailType;

// Everything the inbox filters on. These map 1:1 to the URL query params.
export interface EmailQuery {
  q: string;
  category: CategoryFilter;
  range: Range;
  sort: SortOrder;
  page: number;
  pageSize: number;
}

// One page of results plus the total across all pages
export interface EmailPage {
  emails: Email[];
  total: number;
}
