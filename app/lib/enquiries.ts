export const INQUIRY_TYPES = [
  'Distributor',
  'Bulk Order',
  'Private Label',
  'General Inquiry',
] as const;

export const INTEREST_OPTIONS = [
  'AR Perfumes',
  'Femison',
  'Neat & Fresh',
  'Future Beyond Technology (FBT)',
  'Multiple Divisions',
  'Corporate / General',
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];
export type InterestOption = (typeof INTEREST_OPTIONS)[number];

export type EnquiryPayload = Readonly<{
  name: string;
  company: string;
  email: string;
  phone: string;
  countryLocation: string;
  inquiryType: InquiryType;
  interestedDivision: InterestOption;
  message: string;
  context: string;
  website: string;
  startedAt: number;
}>;
