import {
  CurrencyCode,
  calculateExchangeRate,
  calculateOriginValue,
  calculateTargetValue,
  Balances,
} from 'shared/lib/currencies';
import { UnreachableCaseError } from 'shared/lib/error';
import { useReducer, useEffect, useCallback } from 'react';
import { ExchangeRates } from 'api/openExchangeRates';
import useFocus from 'shared/hooks/useFocus';
import balanceApi from 'api/balance';

export const actionTypes = {
  SWITCH_CURRENCIES: 'SWITCH_CURRENCIES',
  UPDATE_ORIGIN_VALUE: 'UPDATE_ORIGIN_VALUE',
  UPDATE_ORIGIN_CURRENCY: 'UPDATE_ORIGIN_CURRENCY',
  UPDATE_TARGET_VALUE: 'UPDATE_TARGET_VALUE',
  UPDATE_TARGET_CURRENCY: 'UPDATE_TARGET_CURRENCY',
  UPDATE_RATES: 'UPDATE_RATES',
} as const;

type StateAction =
  | {
      type: typeof actionTypes.SWITCH_CURRENCIES;
    }
  | { type: typeof actionTypes.UPDATE_ORIGIN_VALUE; value: string }
  | { type: typeof actionTypes.UPDATE_ORIGIN_CURRENCY; currency: CurrencyCode }
  | { type: typeof actionTypes.UPDATE_TARGET_VALUE; value: string }
  | { type: typeof actionTypes.UPDATE_TARGET_CURRENCY; currency: CurrencyCode }
  | {
      type: typeof actionTypes.UPDATE_RATES;
      rates: ExchangeRates;
      targetCurrencyInputFocused: boolean;
    };

const getInitialState = (originCurrency: CurrencyCode, targetCurrency: CurrencyCode) => {
  return {
    originCurrency,
    originValue: '' as string,
    targetCurrency,
    targetValue: '' as string,
    rates: {} as ExchangeRates,
    exchangeRate: 1 as number,
    recents: new Set([originCurrency, targetCurrency]) as Set<CurrencyCode>,
  };
};

type State = ReturnType<typeof getInitialState>;

const stateReducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case 'UPDATE_RATES': {
      const { rates, targetCurrencyInputFocused } = action;
      const exchangeRate = calculateExchangeRate(rates, state.originCurrency, state.targetCurrency);

      let { originValue, targetValue } = state;
      if (originValue) {
        if (targetCurrencyInputFocused) {
          originValue = calculateOriginValue(targetValue, exchangeRate);
        } else {
          targetValue = calculateTargetValue(originValue, exchangeRate);
        }
      }

      return { ...state, rates, exchangeRate, originValue, targetValue };
    }
    case 'SWITCH_CURRENCIES': {
      const originCurrency = state.targetCurrency;
      const targetCurrency = state.originCurrency;
      const exchangeRate = calculateExchangeRate(state.rates, originCurrency, targetCurrency);

      return {
        ...state,
        originCurrency,
        originValue: state.targetValue,
        targetCurrency,
        targetValue: state.originValue,
        exchangeRate,
      };
    }
    case 'UPDATE_ORIGIN_VALUE': {
      const nextOriginValue = action.value;
      const nextTargetValue = calculateTargetValue(nextOriginValue, state.exchangeRate);
      return {
        ...state,
        originValue: nextOriginValue,
        targetValue: nextTargetValue,
      };
    }
    case 'UPDATE_TARGET_VALUE': {
      const nextTargetValue = action.value;
      const nextOriginValue = calculateOriginValue(nextTargetValue, state.exchangeRate);

      return {
        ...state,
        originValue: nextOriginValue,
        targetValue: nextTargetValue,
      };
    }
    case 'UPDATE_ORIGIN_CURRENCY': {
      const originCurrency = action.currency;
      let { targetCurrency } = state;
      if (targetCurrency === originCurrency) {
        targetCurrency = state.originCurrency;
      }

      const exchangeRate = calculateExchangeRate(state.rates, originCurrency, targetCurrency);

      return {
        ...state,
        originCurrency,
        targetCurrency,
        exchangeRate,
        recents: state.recents.add(originCurrency),
      };
    }
    case 'UPDATE_TARGET_CURRENCY': {
      const targetCurrency = action.currency;
      let { originCurrency } = state;

      if (targetCurrency === originCurrency) {
        originCurrency = state.targetCurrency;
      }

      const exchangeRate = calculateExchangeRate(state.rates, originCurrency, targetCurrency);

      return {
        ...state,
        originCurrency,
        targetCurrency,
        exchangeRate,
        recents: state.recents.add(targetCurrency),
      };
    }
    default: {
      throw new UnreachableCaseError(action);
    }
  }
};

export type UseExchangeOptions = {
  balances: Balances;
  rates: ExchangeRates;
  updateBalances: (newBalances: Balances) => void;
  origin: CurrencyCode;
  target: CurrencyCode;
};

const useExchange = ({ balances, rates, updateBalances, origin, target }: UseExchangeOptions) => {
  const [state, dispatch] = useReducer(stateReducer, getInitialState(origin, target));
  const [targetCurrencyInputFocused, targetCurrencyInputRefFallback] = useFocus<HTMLInputElement>();

  useEffect(() => {
    dispatch({ type: 'UPDATE_RATES', rates, targetCurrencyInputFocused });
  }, [rates, targetCurrencyInputFocused]);

  const currencies = Object.keys(state.rates);

  const onOriginValueChange = useCallback(
    (value: string) => dispatch({ type: 'UPDATE_ORIGIN_VALUE', value }),
    [dispatch]
  );

  const onTargetValueChange = useCallback(
    (value: string) => dispatch({ type: 'UPDATE_TARGET_VALUE', value }),
    [dispatch]
  );

  const switchCurrencies = useCallback(() => dispatch({ type: 'SWITCH_CURRENCIES' }), [dispatch]);

  const onOriginCurrencyUpdate = useCallback(
    (currency: CurrencyCode) => dispatch({ type: 'UPDATE_ORIGIN_CURRENCY', currency }),
    [dispatch]
  );

  const onTargetCurrencyUpdate = useCallback(
    (currency: CurrencyCode) => dispatch({ type: 'UPDATE_TARGET_CURRENCY', currency }),
    [dispatch]
  );

  const { originValue, originCurrency, targetCurrency, exchangeRate } = state;

  const originCurrencyBalance = balances?.[originCurrency] ?? 0;
  const targetCurrencyBalance = balances?.[targetCurrency] ?? 0;

  const doExchange = useCallback(() => {
    return balanceApi
      .exchange({
        exchangeRate,
        originCurrency,
        targetCurrency,
        originValue,
      })
      .then((response) => {
        updateBalances(response.balances);
        return response.targetExchanged;
      });
  }, [exchangeRate, updateBalances, originCurrency, originValue, targetCurrency]);

  return {
    originValue,
    originCurrency: state.originCurrency,
    originCurrencyBalance,
    onOriginValueChange,
    onOriginCurrencyUpdate,
    targetValue: state.targetValue,
    targetCurrency,
    targetCurrencyBalance,
    targetCurrencyInputRef: targetCurrencyInputRefFallback,
    onTargetValueChange,
    onTargetCurrencyUpdate,
    currencies,
    switchCurrencies,
    exchangeRate,
    recents: state.recents,
    doExchange,
  };
};

export default useExchange;
