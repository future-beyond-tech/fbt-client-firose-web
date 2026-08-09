/* ──────────────────────────────────────────────────────────────────────────────
   FIROSE Consumer Products Catalogue
   55 SKUs across two consumer brands: Femison & Neat & Fresh
   ────────────────────────────────────────────────────────────────────────────── */

export type BrochureBrand = 'femison' | 'neat-fresh';

export type ProductCategory =
  | 'waters'
  | 'oils'
  | 'nutrition'
  | 'wellness'
  | 'relief'
  | 'laundry'
  | 'toilet'
  | 'floor'
  | 'kitchen'
  | 'pest';

export interface Product {
  id: string;
  sl: number;
  name: string;
  variant: string;
  size: string;
  mrp: number | null;
  emoji: string;
  category: ProductCategory;
  brand: BrochureBrand;
  features: string[];
}

/* ─── BRAND META ──────────────────────────────────────────────────────────── */

export interface BrandMeta {
  id: BrochureBrand;
  name: string;
  tagline: string;
  description: string;
  color: string;
  colorLight: string;
  categories: { key: ProductCategory; label: string; emoji: string; examples: string }[];
}

export const brandMeta: Record<BrochureBrand, BrandMeta> = {
  femison: {
    id: 'femison',
    name: 'Femison',
    tagline: 'Consumer Care · Personal Care · Nutrition',
    description:
      'A consumer and family-care portfolio covering herbal waters, oils, nutrition products, and named care formulations. Product use should follow the information supplied on the pack.',
    color: '#8B2252',
    colorLight: '#F7E6EF',
    categories: [
      { key: 'waters', label: 'Waters', emoji: '\u{1F4A7}', examples: 'Oma Water, Rose Water' },
      { key: 'oils', label: 'Oils', emoji: '\u{1FAD2}', examples: 'Castor, Neem, Mahua, Mustard' },
      { key: 'nutrition', label: 'Nutrition', emoji: '\u{1F36F}', examples: 'Glucose, Honey, Arrawat' },
      { key: 'wellness', label: 'Everyday Care', emoji: '\u{1F48A}', examples: 'Gripe Water, Cough Syrup, Liver Tonic' },
      { key: 'relief', label: 'Topical Care', emoji: '\u{1FA79}', examples: 'Noorthan Pain Balm' },
    ],
  },
  'neat-fresh': {
    id: 'neat-fresh',
    name: 'Neat & Fresh',
    tagline: 'Home Care · Cleaning · Hygiene',
    description:
      'A housekeeping and hygiene portfolio covering laundry, kitchen, floor-care, toilet-care, and pest-control product formats.',
    color: '#1A5C3A',
    colorLight: '#E6F5EE',
    categories: [
      { key: 'laundry', label: 'Laundry', emoji: '\u{1F9FA}', examples: 'Washing Liquid, Fabric Conditioner' },
      { key: 'toilet', label: 'Toilet Care', emoji: '\u{1F6BD}', examples: 'Glomax Toilet Cleaner' },
      { key: 'floor', label: 'Floor & Surface', emoji: '\u{1FA63}', examples: 'Lyrizol, Phynyl, Tile Cleaner' },
      { key: 'kitchen', label: 'Kitchen', emoji: '\u{1F37D}\uFE0F', examples: 'Dishwash Liquid, Brass Cleaner' },
      { key: 'pest', label: 'Pest Control', emoji: '\u{1FAB3}', examples: 'Ant Powder, Rat Killer, Fly Killer' },
    ],
  },
};

/* ─── FEMISON PRODUCTS (29 SKUs) ──────────────────────────────────────────── */

export const femisonProducts: Product[] = [
  // WATERS
  { id: 'f01', sl: 1, name: 'Oma Water', variant: 'Water Product', size: '120 ml', mrp: 25, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Oma water product', '120 ml pack', 'Compact bottle', 'Sealed packaging'] },
  { id: 'f02', sl: 2, name: 'Oma Water', variant: 'Water Product', size: '200 ml', mrp: 35, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Oma water product', '200 ml pack', 'Bottle format', 'Sealed packaging'] },
  { id: 'f03', sl: 3, name: 'Oma Water', variant: 'Water Product', size: '700 ml', mrp: 60, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Oma water product', '700 ml pack', 'Large bottle format', 'Sealed packaging'] },
  { id: 'f04', sl: 4, name: 'Rose Water', variant: 'Rose Water', size: '200 ml', mrp: 35, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Rose water product', '200 ml pack', 'Multi-purpose format', 'Sealed packaging'] },
  { id: 'f05', sl: 5, name: 'Rose Water', variant: 'Rose Water', size: '500 ml', mrp: 50, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Rose water product', '500 ml pack', 'Bottle format', 'Pack directions apply'] },
  { id: 'f06', sl: 6, name: 'Rose Water', variant: 'Rose Water', size: '1000 ml', mrp: 70, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Rose water product', '1000 ml pack', 'Large bottle format', 'Pack directions apply'] },

  // OILS
  { id: 'f07', sl: 7, name: 'Castor Oil', variant: 'Oil Product', size: '50 ml', mrp: 35, emoji: '\u{1FAD2}', category: 'oils', brand: 'femison', features: ['Castor oil product', '50 ml pack', 'Compact bottle', 'Sealed packaging'] },
  { id: 'f08', sl: 8, name: 'Castor Oil', variant: 'Oil Product', size: '100 ml', mrp: 50, emoji: '\u{1FAD2}', category: 'oils', brand: 'femison', features: ['Castor oil product', '100 ml pack', 'Regular-size bottle', 'Sealed packaging'] },
  { id: 'f09', sl: 9, name: 'Neem Oil', variant: 'Oil Product', size: '50 ml', mrp: 35, emoji: '\u{1F33F}', category: 'oils', brand: 'femison', features: ['Neem oil product', '50 ml pack', 'Compact bottle', 'Sealed packaging'] },
  { id: 'f10', sl: 10, name: 'Neem Oil', variant: 'Oil Product', size: '100 ml', mrp: 50, emoji: '\u{1F33F}', category: 'oils', brand: 'femison', features: ['Neem oil product', '100 ml pack', 'Regular-size bottle', 'Sealed packaging'] },
  { id: 'f11', sl: 11, name: 'Mahua Oil (Eluppai)', variant: 'Oil Product', size: '100 ml', mrp: 60, emoji: '\u{1F33E}', category: 'oils', brand: 'femison', features: ['Mahua (Eluppai) oil product', '100 ml pack', 'Bottle format', 'Sealed packaging'] },
  { id: 'f12', sl: 12, name: 'Mustard Oil', variant: 'Oil Product', size: '100 ml', mrp: 60, emoji: '\u{1F33B}', category: 'oils', brand: 'femison', features: ['Mustard oil product', '100 ml pack', 'Regular-size bottle', 'Sealed packaging'] },

  // NUTRITION
  { id: 'f13', sl: 13, name: 'Arrawat Powder', variant: 'Powder Format', size: '20 g', mrp: 20, emoji: '\u{1F33F}', category: 'nutrition', brand: 'femison', features: ['Arrawat powder product', '20 g pack', 'Powder format', 'Pack directions apply'] },
  { id: 'f14', sl: 14, name: 'Glucose', variant: 'Glucose Powder', size: '100 g', mrp: 50, emoji: '\u{26A1}', category: 'nutrition', brand: 'femison', features: ['Glucose product', '100 g pack', 'Powder format', 'Pack directions apply'] },
  { id: 'f15', sl: 15, name: 'Honey', variant: 'Honey', size: '100 g', mrp: 50, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['Honey product', '100 g pack', 'Bottle format', 'Sealed packaging'] },
  { id: 'f16', sl: 16, name: 'Honey', variant: 'Honey', size: '50 g', mrp: 40, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['Honey product', '50 g pack', 'Compact bottle', 'Sealed packaging'] },
  { id: 'f17', sl: 17, name: 'Honey', variant: 'Honey', size: '250 g', mrp: null, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['Honey product', '250 g pack', 'Family-size bottle', 'Sealed packaging'] },
  { id: 'f18', sl: 18, name: 'Honey', variant: 'Honey', size: '25 g', mrp: 17, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['Honey product', '25 g pack', 'Single-serve format', 'Sealed packaging'] },

  // WELLNESS
  { id: 'f19', sl: 19, name: 'Gripe Water (Chappai)', variant: 'Gripe Water', size: '120 ml', mrp: 60, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Gripe water product', '120 ml pack', 'Chappai bottle format', 'Use only as directed on the pack'] },
  { id: 'f20', sl: 20, name: 'Gripe Water', variant: 'Gripe Water', size: '200 ml', mrp: 90, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Gripe water product', '200 ml pack', 'Family-size bottle', 'Use only as directed on the pack'] },
  { id: 'f21', sl: 21, name: 'Gripe Water (Round)', variant: 'Gripe Water', size: '100 ml', mrp: 60, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Gripe water product', '100 ml pack', 'Round bottle format', 'Use only as directed on the pack'] },
  { id: 'f22', sl: 22, name: 'Gripe Water', variant: 'Gripe Water', size: '200 ml', mrp: 90, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Gripe water product', '200 ml pack', 'Bottle format', 'Use only as directed on the pack'] },
  { id: 'f23', sl: 23, name: 'Media Cough Syrup', variant: 'Liquid Formulation', size: '100 ml', mrp: 150, emoji: '\u{1F48A}', category: 'wellness', brand: 'femison', features: ['Media Cough Syrup product', '100 ml pack', 'Liquid format', 'Use only as directed on the pack'] },
  { id: 'f24', sl: 24, name: 'Media Cough Syrup', variant: 'Liquid Formulation', size: '200 ml', mrp: 250, emoji: '\u{1F48A}', category: 'wellness', brand: 'femison', features: ['Media Cough Syrup product', '200 ml pack', 'Liquid format', 'Use only as directed on the pack'] },
  { id: 'f25', sl: 25, name: 'Mediliv Liver Tonic', variant: 'Liquid Formulation', size: '100 ml', mrp: 150, emoji: '\u{1F49A}', category: 'wellness', brand: 'femison', features: ['Mediliv Liver Tonic product', '100 ml pack', 'Liquid format', 'Use only as directed on the pack'] },
  { id: 'f26', sl: 26, name: 'Mediliv Liver Tonic', variant: 'Liquid Formulation', size: '200 ml', mrp: 250, emoji: '\u{1F49A}', category: 'wellness', brand: 'femison', features: ['Mediliv Liver Tonic product', '200 ml pack', 'Liquid format', 'Use only as directed on the pack'] },

  // RELIEF
  { id: 'f27', sl: 27, name: 'Noorthan Pain Balm', variant: 'Topical Balm', size: '10 g', mrp: 45, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Noorthan Pain Balm product', '10 g pack', 'Topical balm format', 'Use only as directed on the pack'] },
  { id: 'f28', sl: 28, name: 'Noorthan Max Relief Pain Balm', variant: 'Topical Balm', size: '10 g', mrp: 45, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Noorthan Max Relief product', '10 g pack', 'Topical balm format', 'Use only as directed on the pack'] },
  { id: 'f29', sl: 29, name: 'Noorthan Max Relief Pain Balm', variant: 'Topical Balm', size: '5 g', mrp: 25, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Noorthan Max Relief product', '5 g pack', 'Compact balm format', 'Use only as directed on the pack'] },
];

/* ─── NEAT & FRESH PRODUCTS (26 SKUs) ─────────────────────────────────────── */

export const neatFreshProducts: Product[] = [
  // LAUNDRY
  { id: 'n01', sl: 30, name: 'Washing Liquid', variant: 'Laundry Care', size: '1 L', mrp: 120, emoji: '\u{1F9FA}', category: 'laundry', brand: 'neat-fresh', features: ['Washing liquid product', '1 L pack', 'Liquid format', 'Use as directed on the pack'] },
  { id: 'n02', sl: 31, name: 'Washing Liquid', variant: 'Laundry Care', size: '5 L', mrp: null, emoji: '\u{1F9FA}', category: 'laundry', brand: 'neat-fresh', features: ['Washing liquid product', '5 L pack', 'Bulk bottle format', 'Use as directed on the pack'] },
  { id: 'n03', sl: 48, name: 'Fabric Conditioner', variant: 'Laundry Care', size: '1 L', mrp: 80, emoji: '\u{1F338}', category: 'laundry', brand: 'neat-fresh', features: ['Fabric conditioner product', '1 L pack', 'Liquid format', 'Use as directed on the pack'] },
  { id: 'n04', sl: 49, name: 'Fabric Conditioner', variant: 'Laundry Care', size: '500 ml', mrp: 60, emoji: '\u{1F338}', category: 'laundry', brand: 'neat-fresh', features: ['Fabric conditioner product', '500 ml pack', 'Compact bottle', 'Use as directed on the pack'] },

  // TOILET
  { id: 'n05', sl: 32, name: 'Glomax Toilet Cleaner', variant: 'Toilet Care', size: '1 L', mrp: 80, emoji: '\u{1F6BD}', category: 'toilet', brand: 'neat-fresh', features: ['Toilet-cleaning product', '1 L pack', 'Angled nozzle bottle', 'Use as directed on the pack'] },
  { id: 'n06', sl: 33, name: 'Glomax Toilet Cleaner', variant: 'Toilet Care', size: '500 ml', mrp: 80, emoji: '\u{1F6BD}', category: 'toilet', brand: 'neat-fresh', features: ['Toilet-cleaning product', '500 ml pack', 'Compact bottle', 'Use as directed on the pack'] },
  { id: 'n07', sl: 50, name: 'Bleaching Powder', variant: 'Powder Format', size: '100 g', mrp: 15, emoji: '\u{2728}', category: 'toilet', brand: 'neat-fresh', features: ['Bleaching powder product', '100 g pack', 'Powder format', 'Use as directed on the pack'] },

  // FLOOR & SURFACE
  { id: 'n08', sl: 34, name: 'Lyrizol Floor Cleaner', variant: 'Floor Care', size: '1 L', mrp: 80, emoji: '\u{1F3E0}', category: 'floor', brand: 'neat-fresh', features: ['Floor-cleaning product', '1 L pack', 'Liquid format', 'Use as directed on the pack'] },
  { id: 'n09', sl: 35, name: 'Lyrizol Floor Cleaner', variant: 'Floor Care', size: '500 ml', mrp: 80, emoji: '\u{1F3E0}', category: 'floor', brand: 'neat-fresh', features: ['Floor-cleaning product', '500 ml pack', 'Compact bottle', 'Use as directed on the pack'] },
  { id: 'n10', sl: 40, name: 'Tile Cleaner', variant: 'Tile Care', size: '500 ml', mrp: 60, emoji: '\u{2728}', category: 'floor', brand: 'neat-fresh', features: ['Tile-cleaning product', '500 ml pack', 'Liquid format', 'Check surface compatibility on the pack'] },
  { id: 'n11', sl: 41, name: 'Tile Cleaner', variant: 'Tile Care', size: '1 L', mrp: 80, emoji: '\u{2728}', category: 'floor', brand: 'neat-fresh', features: ['Tile-cleaning product', '1 L pack', 'Liquid format', 'Check surface compatibility on the pack'] },
  { id: 'n12', sl: 42, name: 'Black Phynyl', variant: 'Floor Care', size: '500 ml', mrp: 60, emoji: '\u{1F5A4}', category: 'floor', brand: 'neat-fresh', features: ['Black phynyl product', '500 ml pack', 'Floor-care format', 'Use as directed on the pack'] },
  { id: 'n13', sl: 43, name: 'White Phynyl', variant: 'Floor Care', size: '750 ml', mrp: 60, emoji: '\u{1F90D}', category: 'floor', brand: 'neat-fresh', features: ['White phynyl product', '750 ml pack', 'Floor-care format', 'Use as directed on the pack'] },
  { id: 'n14', sl: 44, name: 'Rose Phynyl', variant: 'Floor Care', size: '750 ml', mrp: 60, emoji: '\u{1F339}', category: 'floor', brand: 'neat-fresh', features: ['Rose phynyl product', '750 ml pack', 'Floor-care format', 'Use as directed on the pack'] },
  { id: 'n15', sl: 45, name: 'Yellow Phynyl', variant: 'Floor Care', size: '750 ml', mrp: 60, emoji: '\u{1F7E1}', category: 'floor', brand: 'neat-fresh', features: ['Yellow phynyl product', '750 ml pack', 'Floor-care format', 'Use as directed on the pack'] },
  { id: 'n16', sl: 46, name: 'Green Phynyl', variant: 'Floor Care', size: '750 ml', mrp: 60, emoji: '\u{1F7E2}', category: 'floor', brand: 'neat-fresh', features: ['Green phynyl product', '750 ml pack', 'Floor-care format', 'Use as directed on the pack'] },

  // KITCHEN
  { id: 'n17', sl: 36, name: 'Dishwash Liquid', variant: 'Kitchen Care', size: '1 L', mrp: 100, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Dishwashing liquid product', '1 L pack', 'Liquid format', 'Use as directed on the pack'] },
  { id: 'n18', sl: 37, name: 'Dishwash Liquid', variant: 'Kitchen Care', size: '500 ml', mrp: 60, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Dishwashing liquid product', '500 ml pack', 'Compact bottle', 'Use as directed on the pack'] },
  { id: 'n19', sl: 38, name: 'Dishwash Liquid', variant: 'Kitchen Care', size: '250 ml', mrp: 35, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Dishwashing liquid product', '250 ml pack', 'Compact bottle', 'Use as directed on the pack'] },
  { id: 'n20', sl: 39, name: 'Brass Vessel Cleaner', variant: 'Metal Care', size: '100 ml', mrp: 35, emoji: '\u{2728}', category: 'kitchen', brand: 'neat-fresh', features: ['Brass vessel-cleaning product', '100 ml pack', 'Metal-care format', 'Check material compatibility on the pack'] },

  // PEST CONTROL
  { id: 'n21', sl: 47, name: 'Jet Ant Chalk Piece', variant: 'Chalk Format', size: '20 pcs', mrp: 20, emoji: '\u{1FAB3}', category: 'pest', brand: 'neat-fresh', features: ['Jet Ant Chalk product', '20-piece pack', 'Chalk format', 'Follow all pack safety directions'] },
  { id: 'n22', sl: 51, name: 'Gamaxine Ant Powder', variant: 'Powder Format', size: '100 g', mrp: 20, emoji: '\u{1FAB3}', category: 'pest', brand: 'neat-fresh', features: ['Gamaxine Ant Powder product', '100 g pack', 'Powder format', 'Follow all pack safety directions'] },
  { id: 'n23', sl: 52, name: 'S.B Rat Killer Powder', variant: 'Powder Format', size: '10 g', mrp: 20, emoji: '\u{1F400}', category: 'pest', brand: 'neat-fresh', features: ['S.B Rat Killer Powder product', '10 g pack', 'Powder format', 'Follow all pack safety directions'] },
  { id: 'n24', sl: 53, name: 'S.B Rat Killer Powder', variant: 'Powder Format', size: '20 g', mrp: 40, emoji: '\u{1F400}', category: 'pest', brand: 'neat-fresh', features: ['S.B Rat Killer Powder product', '20 g pack', 'Powder format', 'Follow all pack safety directions'] },
  { id: 'n25', sl: 54, name: 'S.B House Fly Killer Powder', variant: 'Powder Format', size: '10 g', mrp: 20, emoji: '\u{1FAB0}', category: 'pest', brand: 'neat-fresh', features: ['S.B House Fly Killer product', '10 g pack', 'Powder format', 'Follow all pack safety directions'] },
  { id: 'n26', sl: 55, name: 'S.B House Fly Killer Powder', variant: 'Powder Format', size: '20 g', mrp: 40, emoji: '\u{1FAB0}', category: 'pest', brand: 'neat-fresh', features: ['S.B House Fly Killer product', '20 g pack', 'Powder format', 'Follow all pack safety directions'] },
];

/* ─── COMBINED CATALOGUE ──────────────────────────────────────────────────── */

export const allProducts: Product[] = [...femisonProducts, ...neatFreshProducts];

export function getProductsByBrand(brand: BrochureBrand): Product[] {
  return brand === 'femison' ? femisonProducts : neatFreshProducts;
}

export function getProductsByCategory(brand: BrochureBrand, category: ProductCategory): Product[] {
  return getProductsByBrand(brand).filter((p) => p.category === category);
}
