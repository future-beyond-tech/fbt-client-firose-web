/* ──────────────────────────────────────────────────────────────────────────────
   FIROSE Group — Complete Product Catalogue
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
  isNew?: boolean;
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
    name: 'The Femison',
    tagline: 'Health · Herbal · Medicinal',
    description:
      'A trusted health and wellness line offering pure herbal waters, natural oils, nutrition essentials, and Ayurvedic remedies for the whole family.',
    color: '#8B2252',
    colorLight: '#F7E6EF',
    categories: [
      { key: 'waters', label: 'Waters', emoji: '\u{1F4A7}', examples: 'Oma Water, Rose Water' },
      { key: 'oils', label: 'Oils', emoji: '\u{1FAD2}', examples: 'Castor, Neem, Mahua, Mustard' },
      { key: 'nutrition', label: 'Nutrition', emoji: '\u{1F36F}', examples: 'Glucose, Honey, Arrawat' },
      { key: 'wellness', label: 'Wellness', emoji: '\u{1F48A}', examples: 'Gripe Water, Cough Syrup, Liver Tonic' },
      { key: 'relief', label: 'Pain Relief', emoji: '\u{1FA79}', examples: 'Noorthan Pain Balm' },
    ],
  },
  'neat-fresh': {
    id: 'neat-fresh',
    name: 'Neat & Fresh',
    tagline: 'Home Care · Cleaning · Hygiene',
    description:
      'A high-performance home care line delivering affordable, powerful cleaning solutions for laundry, kitchen, floors, and pest control.',
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
  { id: 'f01', sl: 1, name: 'Oma Water', variant: 'Pure Distilled', size: '120 ml', mrp: 25, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Pure distilled water', 'Traditional herbal preparation', 'Safe for daily use', 'Hygienic sealed packaging'] },
  { id: 'f02', sl: 2, name: 'Oma Water', variant: 'Pure Distilled', size: '200 ml', mrp: 35, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Pure distilled water', 'Family-size bottle', 'Trusted formulation', 'Shelf-stable'] },
  { id: 'f03', sl: 3, name: 'Oma Water', variant: 'Pure Distilled', size: '700 ml', mrp: 60, emoji: '\u{1F4A7}', category: 'waters', brand: 'femison', features: ['Pure distilled water', 'Economy pack', 'Value for money', 'Hygienic sealed packaging'] },
  { id: 'f04', sl: 4, name: 'Rose Water', variant: 'Natural Extract', size: '200 ml', mrp: 35, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Natural rose extract', 'Multi-purpose use', 'Skin-friendly', 'Food-grade quality'] },
  { id: 'f05', sl: 5, name: 'Rose Water', variant: 'Natural Extract', size: '500 ml', mrp: 50, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Natural rose extract', 'Large family bottle', 'Culinary and cosmetic use', 'Premium quality'] },
  { id: 'f06', sl: 6, name: 'Rose Water', variant: 'Natural Extract', size: '1000 ml', mrp: 70, emoji: '\u{1F339}', category: 'waters', brand: 'femison', features: ['Natural rose extract', 'Bulk economy size', 'Ideal for commercial use', 'Consistent quality'] },

  // OILS
  { id: 'f07', sl: 7, name: 'Castor Oil', variant: 'Cold Pressed', size: '50 ml', mrp: 35, emoji: '\u{1FAD2}', category: 'oils', brand: 'femison', features: ['Cold-pressed extraction', 'Hair and skin care', 'Pure and natural', 'Compact travel size'] },
  { id: 'f08', sl: 8, name: 'Castor Oil', variant: 'Cold Pressed', size: '100 ml', mrp: 50, emoji: '\u{1FAD2}', category: 'oils', brand: 'femison', features: ['Cold-pressed extraction', 'Regular use bottle', 'Promotes hair growth', 'Chemical-free'] },
  { id: 'f09', sl: 9, name: 'Neem Oil', variant: 'Natural Neem', size: '50 ml', mrp: 35, emoji: '\u{1F33F}', category: 'oils', brand: 'femison', features: ['Pure neem oil', 'Antimicrobial properties', 'Skin and hair care', 'Traditional remedy'] },
  { id: 'f10', sl: 10, name: 'Neem Oil', variant: 'Natural Neem', size: '100 ml', mrp: 50, emoji: '\u{1F33F}', category: 'oils', brand: 'femison', features: ['Pure neem oil', 'Family-size bottle', 'Multi-purpose wellness', 'Insect repellent properties'] },
  { id: 'f11', sl: 11, name: 'Mahua Oil (Eluppai)', variant: 'Traditional Extract', size: '100 ml', mrp: 60, emoji: '\u{1F33E}', category: 'oils', brand: 'femison', features: ['Traditional Eluppai oil', 'Deep moisturising', 'Heritage formulation', 'Natural and pure'] },
  { id: 'f12', sl: 12, name: 'Mustard Oil', variant: 'Pure Pressed', size: '100 ml', mrp: 60, emoji: '\u{1F33B}', category: 'oils', brand: 'femison', features: ['Pure pressed mustard oil', 'Hair and body massage', 'Warming properties', 'Traditional wellness oil'] },

  // NUTRITION
  { id: 'f13', sl: 13, name: 'Arrawat Powder', variant: 'Herbal Supplement', size: '20 g', mrp: 20, emoji: '\u{1F33F}', category: 'nutrition', brand: 'femison', features: ['Herbal supplement powder', 'Traditional formulation', 'Easy to consume', 'Daily wellness support'] },
  { id: 'f14', sl: 14, name: 'Glucose', variant: 'Instant Energy', size: '100 g', mrp: 50, emoji: '\u{26A1}', category: 'nutrition', brand: 'femison', features: ['Instant energy boost', 'Refreshing taste', 'Quick absorption', 'For all age groups'] },
  { id: 'f15', sl: 15, name: 'Honey', variant: 'Pure Natural', size: '100 g', mrp: 50, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['100% pure honey', 'Natural sweetener', 'Rich in antioxidants', 'Premium quality'] },
  { id: 'f16', sl: 16, name: 'Honey', variant: 'Pure Natural', size: '50 g', mrp: 40, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['100% pure honey', 'Travel-friendly size', 'Natural immunity booster', 'Sealed freshness'] },
  { id: 'f17', sl: 17, name: 'Honey', variant: 'Pure Natural', size: '250 g', mrp: null, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['100% pure honey', 'Family pack', 'Natural energy source', 'Premium quality'], isNew: true },
  { id: 'f18', sl: 18, name: 'Honey', variant: 'Pure Natural', size: '25 g', mrp: 17, emoji: '\u{1F36F}', category: 'nutrition', brand: 'femison', features: ['100% pure honey', 'Single-serve sachet', 'On-the-go convenience', 'Natural goodness'] },

  // WELLNESS
  { id: 'f19', sl: 19, name: 'Gripe Water (Chappai)', variant: 'Baby Comfort', size: '120 ml', mrp: 60, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Gentle baby formula', 'Relieves colic and gas', 'Ayurvedic ingredients', 'Paediatrician trusted'] },
  { id: 'f20', sl: 20, name: 'Gripe Water', variant: 'Baby Comfort', size: '200 ml', mrp: 90, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Extended relief formula', 'Family-size bottle', 'Safe from birth', 'Clinically gentle'] },
  { id: 'f21', sl: 21, name: 'Gripe Water (Round)', variant: 'Classic Formula', size: '100 ml', mrp: 60, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Classic round bottle', 'Time-tested formula', 'Soothes baby discomfort', 'Herbal composition'] },
  { id: 'f22', sl: 22, name: 'Gripe Water', variant: 'Classic Formula', size: '200 ml', mrp: 90, emoji: '\u{1F476}', category: 'wellness', brand: 'femison', features: ['Classic formula', 'Economy bottle', 'Trusted by mothers', 'Natural ingredients'] },
  { id: 'f23', sl: 23, name: 'Media Cough Syrup', variant: 'Herbal Relief', size: '100 ml', mrp: 150, emoji: '\u{1F48A}', category: 'wellness', brand: 'femison', features: ['Herbal cough relief', 'Non-drowsy formula', 'Soothes sore throat', 'For adults and children'] },
  { id: 'f24', sl: 24, name: 'Media Cough Syrup', variant: 'Herbal Relief', size: '200 ml', mrp: 250, emoji: '\u{1F48A}', category: 'wellness', brand: 'femison', features: ['Herbal cough relief', 'Value family size', 'Fast-acting formula', 'Sugar-free option'] },
  { id: 'f25', sl: 25, name: 'Mediliv Liver Tonic', variant: 'Liver Support', size: '100 ml', mrp: 150, emoji: '\u{1F49A}', category: 'wellness', brand: 'femison', features: ['Ayurvedic liver tonic', 'Detoxification support', 'Digestive wellness', 'Herbal composition'] },
  { id: 'f26', sl: 26, name: 'Mediliv Liver Tonic', variant: 'Liver Support', size: '200 ml', mrp: 250, emoji: '\u{1F49A}', category: 'wellness', brand: 'femison', features: ['Ayurvedic liver tonic', 'Extended course bottle', 'Promotes liver health', 'Natural detox'] },

  // RELIEF
  { id: 'f27', sl: 27, name: 'Noorthan Pain Balm', variant: 'Quick Relief', size: '10 g', mrp: 45, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Quick pain relief', 'Herbal formulation', 'Non-greasy texture', 'Headache and body pain'] },
  { id: 'f28', sl: 28, name: 'Noorthan Max Relief Pain Balm', variant: 'Max Strength', size: '10 g', mrp: 45, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Maximum strength formula', 'Deep muscle relief', 'Long-lasting effect', 'Ayurvedic ingredients'], isNew: true },
  { id: 'f29', sl: 29, name: 'Noorthan Max Relief Pain Balm', variant: 'Max Strength', size: '5 g', mrp: 25, emoji: '\u{1FA79}', category: 'relief', brand: 'femison', features: ['Maximum strength formula', 'Pocket-friendly size', 'On-the-go relief', 'Travel companion'] },
];

/* ─── NEAT & FRESH PRODUCTS (26 SKUs) ─────────────────────────────────────── */

export const neatFreshProducts: Product[] = [
  // LAUNDRY
  { id: 'n01', sl: 30, name: 'Washing Liquid', variant: 'Fabric Care', size: '1 L', mrp: 120, emoji: '\u{1F9FA}', category: 'laundry', brand: 'neat-fresh', features: ['Deep fabric cleaning', 'Colour protection', 'Pleasant fragrance', 'Front and top loader safe'] },
  { id: 'n02', sl: 31, name: 'Washing Liquid', variant: 'Fabric Care', size: '5 L', mrp: null, emoji: '\u{1F9FA}', category: 'laundry', brand: 'neat-fresh', features: ['Bulk economy pack', 'Commercial-grade cleaning', 'Cost-effective', 'Institutional supply ready'] },
  { id: 'n03', sl: 48, name: 'Fabric Conditioner', variant: 'Soft Touch', size: '1 L', mrp: 80, emoji: '\u{1F338}', category: 'laundry', brand: 'neat-fresh', features: ['Ultra-soft finish', 'Long-lasting fragrance', 'Reduces static', 'Gentle on fabrics'] },
  { id: 'n04', sl: 49, name: 'Fabric Conditioner', variant: 'Soft Touch', size: '500 ml', mrp: 60, emoji: '\u{1F338}', category: 'laundry', brand: 'neat-fresh', features: ['Ultra-soft finish', 'Compact bottle', 'Everyday freshness', 'Easy-pour design'] },

  // TOILET
  { id: 'n05', sl: 32, name: 'Glomax Toilet Cleaner', variant: 'Power Clean', size: '1 L', mrp: 80, emoji: '\u{1F6BD}', category: 'toilet', brand: 'neat-fresh', features: ['Powerful disinfection', 'Removes tough stains', 'Fresh fragrance', 'Angled nozzle bottle'] },
  { id: 'n06', sl: 33, name: 'Glomax Toilet Cleaner', variant: 'Power Clean', size: '500 ml', mrp: 80, emoji: '\u{1F6BD}', category: 'toilet', brand: 'neat-fresh', features: ['Powerful disinfection', 'Compact size', 'Kills 99.9% germs', 'Easy application'] },
  { id: 'n07', sl: 50, name: 'Bleaching Powder', variant: 'Sanitiser', size: '100 g', mrp: 15, emoji: '\u{2728}', category: 'toilet', brand: 'neat-fresh', features: ['Strong disinfectant', 'Multi-surface use', 'Affordable hygiene', 'Bulk-use ready'] },

  // FLOOR & SURFACE
  { id: 'n08', sl: 34, name: 'Lyrizol Floor Cleaner', variant: 'Antiseptic', size: '1 L', mrp: 80, emoji: '\u{1F3E0}', category: 'floor', brand: 'neat-fresh', features: ['Antiseptic floor cleaner', 'Pleasant fragrance', 'Kills germs on contact', 'Streak-free shine'] },
  { id: 'n09', sl: 35, name: 'Lyrizol Floor Cleaner', variant: 'Antiseptic', size: '500 ml', mrp: 80, emoji: '\u{1F3E0}', category: 'floor', brand: 'neat-fresh', features: ['Antiseptic floor cleaner', 'Compact bottle', 'Daily use formula', 'Fresh clean scent'] },
  { id: 'n10', sl: 40, name: 'Tile Cleaner', variant: 'Deep Clean', size: '500 ml', mrp: 60, emoji: '\u{2728}', category: 'floor', brand: 'neat-fresh', features: ['Removes tough tile grime', 'Restores tile shine', 'Grout cleaning action', 'Safe for all tiles'] },
  { id: 'n11', sl: 41, name: 'Tile Cleaner', variant: 'Deep Clean', size: '1 L', mrp: 80, emoji: '\u{2728}', category: 'floor', brand: 'neat-fresh', features: ['Removes tough tile grime', 'Economy size', 'Professional strength', 'Multi-surface safe'] },
  { id: 'n12', sl: 42, name: 'Black Phynyl', variant: 'Disinfectant', size: '500 ml', mrp: 60, emoji: '\u{1F5A4}', category: 'floor', brand: 'neat-fresh', features: ['Traditional disinfectant', 'Strong germicidal action', 'Industrial strength', 'Drainage and floor use'] },
  { id: 'n13', sl: 43, name: 'White Phynyl', variant: 'Disinfectant', size: '750 ml', mrp: 60, emoji: '\u{1F90D}', category: 'floor', brand: 'neat-fresh', features: ['Fragrant disinfectant', 'Multi-surface safe', 'Clean white formula', 'Pleasant scent'] },
  { id: 'n14', sl: 44, name: 'Rose Phynyl', variant: 'Disinfectant', size: '750 ml', mrp: 60, emoji: '\u{1F339}', category: 'floor', brand: 'neat-fresh', features: ['Rose-scented disinfectant', 'Premium fragrance', 'All-floor safe', 'Long-lasting freshness'] },
  { id: 'n15', sl: 45, name: 'Yellow Phynyl', variant: 'Disinfectant', size: '750 ml', mrp: 60, emoji: '\u{1F7E1}', category: 'floor', brand: 'neat-fresh', features: ['Citrus-scented disinfectant', 'Bright clean finish', 'Effective sanitisation', 'Household and commercial'] },
  { id: 'n16', sl: 46, name: 'Green Phynyl', variant: 'Disinfectant', size: '750 ml', mrp: 60, emoji: '\u{1F7E2}', category: 'floor', brand: 'neat-fresh', features: ['Herbal-scented disinfectant', 'Eco-friendly formula', 'Deep germ protection', 'Natural fragrance'] },

  // KITCHEN
  { id: 'n17', sl: 36, name: 'Dishwash Liquid', variant: 'Grease Cut', size: '1 L', mrp: 100, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Powerful grease cutting', 'Gentle on hands', 'Rich lather formula', 'Concentrated cleaning'] },
  { id: 'n18', sl: 37, name: 'Dishwash Liquid', variant: 'Grease Cut', size: '500 ml', mrp: 60, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Powerful grease cutting', 'Everyday kitchen use', 'Fresh lemon scent', 'Easy-squeeze bottle'] },
  { id: 'n19', sl: 38, name: 'Dishwash Liquid', variant: 'Grease Cut', size: '250 ml', mrp: 35, emoji: '\u{1F37D}\uFE0F', category: 'kitchen', brand: 'neat-fresh', features: ['Powerful grease cutting', 'Compact size', 'Travel and trial pack', 'Affordable entry'] },
  { id: 'n20', sl: 39, name: 'Brass Vessel Cleaner', variant: 'Metal Polish', size: '100 ml', mrp: 35, emoji: '\u{2728}', category: 'kitchen', brand: 'neat-fresh', features: ['Restores brass shine', 'Removes tarnish', 'Traditional metal care', 'Safe for copper and brass'] },

  // PEST CONTROL
  { id: 'n21', sl: 47, name: 'Jet Ant Chalk Piece', variant: 'Ant Barrier', size: '20 pcs', mrp: 20, emoji: '\u{1FAB3}', category: 'pest', brand: 'neat-fresh', features: ['Effective ant barrier', 'Easy line application', 'Long-lasting protection', 'Non-toxic around food'] },
  { id: 'n22', sl: 51, name: 'Gamaxine Ant Powder', variant: 'Ant Killer', size: '100 g', mrp: 20, emoji: '\u{1FAB3}', category: 'pest', brand: 'neat-fresh', features: ['Powerful ant elimination', 'Sprinkle application', 'Indoor and outdoor use', 'Quick acting formula'] },
  { id: 'n23', sl: 52, name: 'S.B Rat Killer Powder', variant: 'Rodent Control', size: '10 g', mrp: 20, emoji: '\u{1F400}', category: 'pest', brand: 'neat-fresh', features: ['Effective rodent control', 'Bait-ready powder', 'Safe placement use', 'Fast-acting'] },
  { id: 'n24', sl: 53, name: 'S.B Rat Killer Powder', variant: 'Rodent Control', size: '20 g', mrp: 40, emoji: '\u{1F400}', category: 'pest', brand: 'neat-fresh', features: ['Effective rodent control', 'Extended coverage area', 'Commercial-grade', 'Long shelf life'] },
  { id: 'n25', sl: 54, name: 'S.B House Fly Killer Powder', variant: 'Fly Control', size: '10 g', mrp: 20, emoji: '\u{1FAB0}', category: 'pest', brand: 'neat-fresh', features: ['Fly elimination powder', 'Quick knockdown effect', 'Indoor safe use', 'Easy application'] },
  { id: 'n26', sl: 55, name: 'S.B House Fly Killer Powder', variant: 'Fly Control', size: '20 g', mrp: 40, emoji: '\u{1FAB0}', category: 'pest', brand: 'neat-fresh', features: ['Fly elimination powder', 'Extended coverage', 'Bulk application size', 'Effective control'] },
];

/* ─── COMBINED CATALOGUE ──────────────────────────────────────────────────── */

export const allProducts: Product[] = [...femisonProducts, ...neatFreshProducts];

export function getProductsByBrand(brand: BrochureBrand): Product[] {
  return brand === 'femison' ? femisonProducts : neatFreshProducts;
}

export function getProductsByCategory(brand: BrochureBrand, category: ProductCategory): Product[] {
  return getProductsByBrand(brand).filter((p) => p.category === category);
}
