import React from 'react';
import { useStyletron } from 'baseui';
import { ResponsiveStream } from '@nivo/stream';
import { Paragraph4 } from 'baseui/typography';

type Props = {
  data: { value: string; time: string }[];
};

type TooltipFormatProps = { index: number; value: string };

const ExchangeRateHistoryStream = ({ data }: Props) => {
  const [css, theme] = useStyletron();

  const tooltipFormat = ({ index, value }: TooltipFormatProps) => {
    return (
      <div className={css({ display: 'flex', position: 'relative' })}>
        <Paragraph4 $style={{ opacity: 0.5 }} padding={theme.sizing.scale100}>
          {data[index].time}
        </Paragraph4>
        <div
          className={css({
            width: '1px',
            top: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary100,
          })}
        />
        <Paragraph4 marginLeft={theme.sizing.scale300} padding={theme.sizing.scale100}>
          {value}
        </Paragraph4>
      </div>
    );
  };

  return (
    <ResponsiveStream
      data={data}
      keys={['value']}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      tooltipLabel={() => null}
      offsetType="none"
      enableGridX={false}
      dotColor={theme.colors.accent400}
      animate
      theme={{ tooltip: { container: { padding: '0px' }, tableCell: { padding: '0px' } } }}
      tooltipFormat={(opts) => {
        const { value, index } = (opts as unknown) as TooltipFormatProps;
        return tooltipFormat({ value, index });
      }}
      defs={[
        {
          id: 'primary',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: theme.colors.accent400 },
            { offset: 100, color: theme.colors.accent100 },
          ],
        },
      ]}
      fill={[{ match: '*', id: 'primary' }]}
    />
  );
};

export default ExchangeRateHistoryStream;
