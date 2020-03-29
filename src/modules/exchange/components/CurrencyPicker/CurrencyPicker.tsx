import React, { useCallback } from 'react';
import { ChevronDown } from 'baseui/icon';
import { CurrencyCode } from 'shared/lib/currencies';
import VerticalAligned from 'shared/components/flex/VerticalAligned';
import useModal from 'shared/hooks/useModal';
import FullscreenModal from 'shared/components/modals/FullscreenModal';
import CurrencyPickerView from 'modules/exchange/components/CurrencyPickerView';

import { CurrencyTextContainer, CurrencyText } from './elements';

type Props = {
  currency: CurrencyCode;
  recents: Set<CurrencyCode>;
  onCurrencySelected: (currency: CurrencyCode) => void;
};

const CurrencyPicker = ({ currency, recents, onCurrencySelected }: Props) => {
  const { isOpen, close: closeModal, toggleIsOpen } = useModal();

  const onSelected = useCallback(
    (currencyCode: CurrencyCode) => {
      onCurrencySelected(currencyCode);
      closeModal();
    },
    [closeModal, onCurrencySelected]
  );

  return (
    <>
      <CurrencyTextContainer onClick={toggleIsOpen}>
        <CurrencyText>{currency}</CurrencyText>
        <VerticalAligned>
          <ChevronDown size={28} />
        </VerticalAligned>
      </CurrencyTextContainer>
      <FullscreenModal isOpen={isOpen} onClose={closeModal}>
        <CurrencyPickerView back={closeModal} recents={recents} onSelected={onSelected} />
      </FullscreenModal>
    </>
  );
};

export default React.memo(CurrencyPicker);
