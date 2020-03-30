import { Granularity } from './types';

export const SUPPORTED_GRANULARITIES: Granularity[] = [
  { unit: 'd', amount: 1 },
  { unit: 'w', amount: 1 },
  { unit: 'm', amount: 1 },
  { unit: 'm', amount: 3 },
  { unit: 'm', amount: 6 },
  { unit: 'y', amount: 1 },
];
