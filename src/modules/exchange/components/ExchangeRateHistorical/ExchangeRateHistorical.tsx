import React, { useMemo, useState, useCallback, useRef } from 'react';
import { useStyletron } from 'baseui';
import { Paragraph1 } from 'baseui/typography';
import { ArrowLeft } from 'baseui/icon';
import { Button } from 'baseui/button';
import SpacedBetween from 'shared/components/flex/SpacedBetween';
import { CurrencyCode } from 'shared/lib/currencies';
import Link from 'shared/components/Link';

import ExchangeRateHistoricalStream from './ExchangeRateHistoricalStream';
import DateUnitTab from './DateUnitTab';
import { SUPPORTED_GRANULARITIES } from './constants';
import { generateHistoricalData } from './utils';
import PriceTag from './PriceTag';

type Props = {
  exchangeRate: number;
  origin: CurrencyCode;
  target: CurrencyCode;
};

const ExchangeRateHistorical = ({ exchangeRate, origin, target }: Props) => {
  const [granularity, setGranularity] = useState(SUPPORTED_GRANULARITIES[0]);
  const [css, theme] = useStyletron();
  const chartRef = useRef<{ element: HTMLDivElement; listener: () => void }>(null);

  const [data, lowest, highest] = useMemo(() => {
    const { data: nextData, lowest: nextLowest, highest: nextHighest } = generateHistoricalData(
      exchangeRate,
      granularity
    );
    return [nextData, nextLowest, nextHighest];
  }, [exchangeRate, granularity]);

  /*
   * We have to set it to avoid chart to reflow vertically in a flex layout
   * Unfortunately @nivo/stream doesn't provide any more Reactish way of styling its container
   */
  const chartWrapperCallback = useCallback((chartWrapper: HTMLDivElement | null) => {
    if (chartRef.current) {
      chartRef.current.element.removeEventListener('DOMSubtreeModified', chartRef.current.listener);
    }
    if (chartWrapper) {
      const listener = () => {
        const chartContainer = chartWrapper.firstElementChild
          .firstElementChild as HTMLElement | null;
        if (chartContainer) {
          chartContainer.style.display = 'flex';
        }
      };
      chartRef.current = { listener, element: chartWrapper };
      chartWrapper.addEventListener('DOMSubtreeModified', listener);
    }
  }, []);

  return (
    <>
      <Link to={`/?from=${origin}&to=${target}`}>
        <Button kind="minimal" $style={{ position: 'absolute' }} data-testid="navigate-back">
          <ArrowLeft size={theme.sizing.scale900} />
        </Button>
      </Link>
      <Paragraph1 $style={{ textAlign: 'center' }}>
        {origin} &#8594; {target}
      </Paragraph1>
      <SpacedBetween $style={{ padding: theme.sizing.scale800 }}>
        <PriceTag price={lowest} tag="lowest" />
        <PriceTag price={data[data.length - 1].value} tag="current" />
        <PriceTag price={highest} tag="highest" />
      </SpacedBetween>
      <div className={css({ flex: 1 })} ref={chartWrapperCallback}>
        <ExchangeRateHistoricalStream data={data} />
      </div>
      <SpacedBetween>
        {SUPPORTED_GRANULARITIES.map((current) => (
          <DateUnitTab
            {...current}
            active={granularity === current}
            key={`${current.amount}${current.unit}`}
            onClick={() => setGranularity(current)}
          />
        ))}
      </SpacedBetween>
    </>
  );
};

export default React.memo(ExchangeRateHistorical);
