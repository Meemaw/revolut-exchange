/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useCallback } from 'react';
import FullscreenModal from 'shared/components/modals/FullscreenModal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { CurrencyCode } from 'shared/lib/currencies';
import ExchangeCompletedScreen from 'modules/exchange/components/ExchangeCompletedScreen';

type Props = {
  originValue: string;
  originCurrency: CurrencyCode;
  originCurrencyBalance: number;
  targetCurrency: CurrencyCode;
  onExchange: () => Promise<number>;
};

const ExchangeButton = ({
  originValue,
  originCurrency,
  originCurrencyBalance,
  targetCurrency,
  onExchange,
}: Props) => {
  const [exchanging, setExchanging] = useState(false);
  const balanceExceeded = Number(originValue) > originCurrencyBalance;
  const [exchangedAmount, setExchangedAmount] = useState<number>(NaN);
  const isOpen = useMemo(() => !isNaN(exchangedAmount), [exchangedAmount]);

  const closeModal = useCallback(() => setExchangedAmount(NaN), []);

  const onExchangeClick = () => {
    setExchanging(true);
    onExchange().then((nextExchangedAmount) => {
      setExchangedAmount(nextExchangedAmount);
      setExchanging(false);
    });
  };

  return (
    <>
      <FullscreenModal isOpen={isOpen} onClose={closeModal}>
        <ExchangeCompletedScreen
          onDone={closeModal}
          origin={{ value: originValue, currency: originCurrency }}
          target={{
            value: exchangedAmount.toFixed(2),
            currency: targetCurrency,
          }}
        />
      </FullscreenModal>
      <PrimaryButton
        type="submit"
        disabled={balanceExceeded || !originValue}
        isLoading={exchanging}
        onClick={onExchangeClick}
      >
        Exchange
      </PrimaryButton>
    </>
  );
};
export default React.memo(ExchangeButton);
