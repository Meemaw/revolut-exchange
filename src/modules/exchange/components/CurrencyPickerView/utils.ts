import { CurrencyCode, Currencies } from 'shared/lib/currencies';

export const filterCountries = (
  currencies: Currencies,
  searchQuery: string,
  recentCurrencies: Set<CurrencyCode>
) => {
  const recentsAcc = {} as Currencies;
  const othersAcc = {} as Currencies;

  Object.keys(currencies).forEach((cc) => {
    const currencyCode = cc as CurrencyCode;
    const { name } = currencies[currencyCode];
    if (
      currencyCode.toLowerCase().includes(searchQuery) ||
      name.toLowerCase().includes(searchQuery)
    ) {
      if (recentCurrencies.has(currencyCode)) {
        recentsAcc[currencyCode] = currencies[currencyCode];
      } else {
        othersAcc[currencyCode] = currencies[currencyCode];
      }
    }
  });

  return [recentsAcc, othersAcc];
};
