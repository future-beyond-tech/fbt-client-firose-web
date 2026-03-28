import type { DivisionDefinition } from './divisions';

type DivisionMessageKey = {
  name: string;
  category: string;
  description: string;
};

export const divisionMessageKeys: Record<DivisionDefinition['id'], DivisionMessageKey> = {
  'ar-perfumes': {
    name: 'arPerfumes',
    category: 'arPerfumesCategory',
    description: 'arPerfumesDesc',
  },
  femison: {
    name: 'femison',
    category: 'femisonCategory',
    description: 'femisonDesc',
  },
  'neat-fresh': {
    name: 'neatFresh',
    category: 'neatFreshCategory',
    description: 'neatFreshDesc',
  },
  'future-beyond-technology': {
    name: 'fbt',
    category: 'fbtCategory',
    description: 'fbtDesc',
  },
};
