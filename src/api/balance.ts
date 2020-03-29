import { DEFAULT_BALANCES, Balances, CurrencyCode, calculateTarget } from 'shared/lib/currencies';
import { MOCK_API_TIMEOUT_MILLIS } from './base';

type ExchangeRequestParams = {
  originCurrency: CurrencyCode;
  originValue: string;
  targetCurrency: CurrencyCode;
  exchangeRate: number;
};

type ExchangeResponse = {
  balances: Balances;
  targetExchanged: number;
};

type BalanceApi = {
  latest: () => Promise<Balances>;
  exchange: (params: ExchangeRequestParams) => Promise<ExchangeResponse>;
};

class InMemoryBalanceApi implements BalanceApi {
  private balances: Balances = DEFAULT_BALANCES;

  public latest = () => {
    return new Promise<Balances>((resolve) => {
      setTimeout(() => resolve(this.balances), MOCK_API_TIMEOUT_MILLIS);
    });
  };

  public exchange = async ({
    exchangeRate,
    originCurrency,
    targetCurrency,
    originValue,
  }: ExchangeRequestParams) => {
    const balances = await this.latest();
    const originSubtract = Number(originValue);

    if (balances[originCurrency] < originSubtract) {
      throw new Error('Balance to low');
    }

    /*
     * In a real backend we would probably re-fetch the exchangeRate to see
     * if it has changed significantly
     */
    const targetExchanged = calculateTarget(originSubtract, exchangeRate);

    const originBalance = balances[originCurrency];
    const targetBalance = balances[targetCurrency];

    const updatedBalances = {
      ...balances,
      [originCurrency]: Number((originBalance - originSubtract).toFixed(2)),
      [targetCurrency]: Number((targetBalance + targetExchanged).toFixed(2)),
    };

    this.balances = updatedBalances;
    return { targetExchanged, balances: updatedBalances };
  };
}

export default new InMemoryBalanceApi();
