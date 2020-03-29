import React from 'react';
import ExchangeRate from 'modules/exchange/components/ExchangeRate';
import CurrencySwitch from 'modules/exchange/components/CurrencySwitch';
import ExchangeButton from 'modules/exchange/components/ExchangeButton';

import useExchange, { UseExchangeOptions } from './useExchange';
import { StyledBottom, StyledExchangeRateOverlay, PullDown } from './elements';
import OriginCurrencyView from './OriginCurrencyView';
import TargetCurrencyView from './TargetCurrencyView';

type Props = UseExchangeOptions;

const ExchangeView = (props: Props) => {
  const {
    originValue,
    originCurrency,
    originCurrencyBalance,
    onOriginValueChange,
    onOriginCurrencyUpdate,
    targetValue,
    targetCurrency,
    targetCurrencyBalance,
    targetCurrencyInputRef,
    onTargetValueChange,
    onTargetCurrencyUpdate,
    switchCurrencies,
    exchangeRate,
    recents,
    doExchange,
  } = useExchange(props);

  return (
    <>
      <OriginCurrencyView
        value={originValue}
        onValueChange={onOriginValueChange}
        currency={originCurrency}
        balance={originCurrencyBalance}
        recents={recents}
        onCurrencySelected={onOriginCurrencyUpdate}
      />

      <StyledBottom>
        <CurrencySwitch onClick={switchCurrencies} />

        <StyledExchangeRateOverlay>
          <ExchangeRate from={originCurrency} to={targetCurrency} exchangeRate={exchangeRate} />
        </StyledExchangeRateOverlay>

        <TargetCurrencyView
          value={targetValue}
          onValueChange={onTargetValueChange}
          currency={targetCurrency}
          balance={targetCurrencyBalance}
          inputRef={targetCurrencyInputRef}
          onCurrencySelected={onTargetCurrencyUpdate}
          recents={recents}
        />

        <PullDown>
          <ExchangeButton
            originValue={originValue}
            originCurrency={originCurrency}
            originCurrencyBalance={originCurrencyBalance}
            targetCurrency={targetCurrency}
            onExchange={doExchange}
          />
        </PullDown>
      </StyledBottom>
    </>
  );
};

export default ExchangeView;
