import { ExchangeRates } from 'api/openExchangeRates';

export const USD_BASE_EXCHANGE_RATES = {
  AED: 3.6732,
  AFN: 76.22674,
  ALL: 114.387004,
  AMD: 496.335888,
  ANG: 1.790276,
  AOA: 536.68,
  ARS: 64.1366,
  AUD: 1.659861,
  AWG: 1.8,
  AZN: 1.7025,
  BAM: 1.777292,
  BBD: 2,
  BDT: 84.852365,
  BGN: 1.777777,
  BHD: 0.376751,
  BIF: 1889.471224,
  BMD: 1,
  BND: 1.433861,
  BOB: 6.88597,
  BRL: 5.083,
  BSD: 1,
  BTC: 0.000150490462,
  BTN: 75.210572,
  BWP: 11.850098,
  BYN: 2.581185,
  BZD: 2.000264,
  CAD: 1.411875,
  CDF: 1710.770715,
  CHF: 0.963882,
  CLF: 0.030901,
  CLP: 830,
  CNH: 7.113747,
  CNY: 7.0947,
  COP: 3987.840736,
  CRC: 577.833871,
  CUC: 1,
  CUP: 25.75,
  CVE: 101.25,
  CZK: 24.799833,
  DJF: 178.05,
  DKK: 6.79125,
  DOP: 53.837726,
  DZD: 124.067775,
  EGP: 15.7495,
  ERN: 14.999679,
  ETB: 33.100153,
  EUR: 0.910258,
  FJD: 2.32392,
  FKP: 0.816279,
  GBP: 0.816279,
  GEL: 3.43,
  GGP: 0.816279,
  GHS: 5.750855,
  GIP: 0.816279,
  GMD: 50.915,
  GNF: 9542.595753,
  GTQ: 7.787143,
  GYD: 208.61556,
  HKD: 7.751652,
  HNL: 24.70887,
  HRK: 6.9322,
  HTG: 94.943454,
  HUF: 323.214663,
  IDR: 16312.5,
  ILS: 3.59155,
  IMP: 0.816279,
  INR: 75.190003,
  IQD: 1193.988905,
  IRR: 42131.214988,
  ISK: 140,
  JEP: 0.816279,
  JMD: 134.96085,
  JOD: 0.709,
  JPY: 108.78735294,
  KES: 104.46,
  KGS: 80.201495,
  KHR: 4034.67589,
  KMF: 450.875304,
  KPW: 900,
  KRW: 1225.06,
  KWD: 0.30903,
  KYD: 0.833481,
  KZT: 446.100541,
  LAK: 8929.477108,
  LBP: 1512.464269,
  LKR: 188.277363,
  LRD: 197.650004,
  LSL: 17.548719,
  LYD: 1.420049,
  MAD: 9.930801,
  MDL: 18.101278,
  MGA: 3759.305575,
  MKD: 56.563038,
  MMK: 1401.206213,
  MNT: 2762.513581,
  MOP: 7.984788,
  MRO: 357,
  MRU: 37.630799,
  MUR: 39.205691,
  MVR: 15.41,
  MWK: 735.748131,
  MXN: 23.561343,
  MYR: 4.344999,
  MZN: 66.61,
  NAD: 17.39,
  NGN: 386.807262,
  NIO: 33.739682,
  NOK: 10.612993,
  NPR: 120.335656,
  NZD: 1.690375,
  OMR: 0.385159,
  PAB: 1,
  PEN: 3.40853,
  PGK: 3.470323,
  PHP: 51.016,
  PKR: 161.464385,
  PLN: 4.116294,
  PYG: 6574.859377,
  QAR: 3.641,
  RON: 4.4033,
  RSD: 106.965,
  RUB: 78.595,
  RWF: 952.386739,
  SAR: 3.757033,
  SBD: 8.254337,
  SCR: 13.729159,
  SDG: 55.3,
  SEK: 10.013194,
  SGD: 1.435875,
  SHP: 0.816279,
  SLL: 7598.83184,
  SOS: 578.578123,
  SRD: 7.458,
  SSP: 130.26,
  STD: 22134.769315,
  STN: 22.65,
  SVC: 8.750926,
  SYP: 515.082703,
  SZL: 17.546175,
  THB: 32.577023,
  TJS: 10.196695,
  TMT: 3.51,
  TND: 2.88,
  TOP: 2.371742,
  TRY: 6.454102,
  TTD: 6.757721,
  TWD: 30.236,
  TZS: 2310.3,
  UAH: 27.999401,
  UGX: 3812.52638,
  USD: 1,
  UYU: 44.498535,
  UZS: 9514.965689,
  VEF: 248487.642241,
  VES: 73719.610128,
  VND: 23667.856729,
  VUV: 121.515988,
  WST: 2.732951,
  XAF: 597.090257,
  XAG: 0.06997658,
  XAU: 0.00061588,
  XCD: 2.70255,
  XDR: 0.73772,
  XOF: 597.090257,
  XPD: 0.00042728,
  XPF: 108.6227,
  XPT: 0.00136241,
  YER: 250.349961,
  ZAR: 17.60369,
  ZMW: 17.877605,
  ZWL: 322.000001,
} as ExchangeRates;

export const applyNoiseToValue = (value: number, factor) => {
  const appliedFactor = Math.random() < 0.5 ? 1 - factor : 1 + factor;
  return appliedFactor * value;
};

export const applyNoise = (rates: ExchangeRates, factor: number) => {
  return Object.keys(rates).reduce((acc, currency) => {
    return { ...acc, [currency]: applyNoiseToValue(rates[currency], factor) };
  }, {} as ExchangeRates);
};
