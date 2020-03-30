import React, { useState, useMemo } from 'react';
import { useStyletron } from 'baseui';
import { ArrowLeft } from 'baseui/icon';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

import Flex from 'shared/components/flex/Flex';
import { CURRENCIES, CurrencyCode, Currencies } from 'shared/lib/currencies';

import { SectionParagraph } from './elements';
import { filterCountries } from './utils';
import CurrencyListItem from './CurrentListItem';

export type Props = {
  back: () => void;
  onSelected: (selected: CurrencyCode) => void;
  currencies?: Currencies;
  recents?: Set<CurrencyCode>;
};

const CurrencyPickerView = ({
  back,
  onSelected,
  currencies: allCurrencies = CURRENCIES,
  recents: recentCurrencies = new Set(),
}: Props) => {
  const [css, theme] = useStyletron();
  const [searchQuery, setSearchQuery] = useState('');

  const [recents, others] = useMemo(
    () => filterCountries(allCurrencies, searchQuery.toLowerCase(), recentCurrencies),
    [allCurrencies, recentCurrencies, searchQuery]
  );

  const renderCurrencies = (header: string, currencies: Currencies) => {
    const currencyKeys = Object.keys(currencies);
    if (currencyKeys.length === 0) {
      return null;
    }

    return (
      <div>
        <SectionParagraph>{header}</SectionParagraph>
        <ul className={css({ paddingLeft: 0, paddingRight: 0 })}>
          {currencyKeys.map((cc) => {
            return (
              <CurrencyListItem
                key={cc}
                currencyCode={cc as CurrencyCode}
                currencies={currencies}
                onClick={onSelected}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Flex>
        <Button kind="minimal" onClick={back}>
          <ArrowLeft size={24} />
        </Button>
        <Input
          autoFocus
          clearable
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          overrides={{
            Input: { style: { backgroundColor: theme.colors.white } },
            InputContainer: { style: { borderWidth: '0px' } },
            ClearIconContainer: { style: { backgroundColor: theme.colors.white } },
          }}
        />
      </Flex>
      <>
        {renderCurrencies('Recently used', recents)}
        {renderCurrencies('Others', others)}
      </>
    </>
  );
};

export default React.memo(CurrencyPickerView);
