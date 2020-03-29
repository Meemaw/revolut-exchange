import React from 'react';
import { ListItem, ListItemLabel, OverridesT as ListItemOverides } from 'baseui/list';
import { CurrencyCode, Currencies } from 'shared/lib/currencies';
import { useStyletron } from 'baseui';

import { flagComponent } from './elements';

type Props = {
  currencies: Currencies;
  currencyCode: CurrencyCode;
  onClick: (currencyCode: CurrencyCode) => void;
};

const CurrencyListItem = ({ currencies, currencyCode, onClick }: Props) => {
  const [_, theme] = useStyletron();
  const artwork = flagComponent(currencies, currencyCode);
  const { name: description } = currencies[currencyCode];

  return (
    <ListItem
      artwork={artwork}
      overrides={
        ({
          Root: {
            props: { onClick: () => onClick(currencyCode) },
            style: {
              cursor: 'pointer',
              ':hover': { background: theme.colors.buttonMinimalHover },
            },
          },
        } as unknown) as ListItemOverides
      }
    >
      <ListItemLabel description={description}>{currencyCode}</ListItemLabel>
    </ListItem>
  );
};

export default React.memo(CurrencyListItem);
