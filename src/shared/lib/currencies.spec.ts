import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';
import { calculateExchangeRate, calculateOriginValue, calculateTargetValue } from './currencies';

describe('currencies', () => {
  describe('calculateExchangeRate', () => {
    test('EUR -> NOK', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'EUR', 'NOK')).toEqual(
        11.659324059772063
      );
    });

    test('NOK -> EUR', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'NOK', 'EUR')).toEqual(
        0.08576826537056984
      );
    });

    test('EUR -> USD', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'EUR', 'USD')).toEqual(
        1.0985896306321943
      );
    });

    test('USD -> EUR', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'USD', 'EUR')).toEqual(0.910258);
    });

    test('USD -> TWD', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'USD', 'TWD')).toEqual(30.236);
    });

    test('EUR -> CAD', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'EUR', 'CAD')).toEqual(
        1.5510712347488294
      );
    });

    test('NOK -> CAD', () => {
      expect(calculateExchangeRate(USD_BASE_EXCHANGE_RATES, 'NOK', 'CAD')).toEqual(
        0.133032689270595
      );
    });
  });

  describe('calculateOriginValue', () => {
    test('1:1', () => {
      expect(calculateOriginValue('1', 1)).toEqual('1.00');
    });

    test('1:0.5', () => {
      expect(calculateOriginValue('1', 0.5)).toEqual('2.00');
    });

    test('1:0.25', () => {
      expect(calculateOriginValue('1', 0.25)).toEqual('4.00');
    });
  });

  describe('calculateTargetValue', () => {
    test('1:1', () => {
      expect(calculateTargetValue('1', 1)).toEqual('1.00');
    });

    test('0.5:1', () => {
      expect(calculateTargetValue('1', 0.5)).toEqual('0.50');
    });

    test('0.25:1', () => {
      expect(calculateTargetValue('1', 0.25)).toEqual('0.25');
    });
  });
});
