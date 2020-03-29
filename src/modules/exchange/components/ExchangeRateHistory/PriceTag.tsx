import React from 'react';
import { useStyletron } from 'baseui';
import { Paragraph2 } from 'baseui/typography';
import FlexColumn from 'shared/components/flex/FlexColumn';

type Props = {
  price: number | string;
  tag: string;
};

const PriceTag = ({ price, tag }: Props) => {
  const [_, theme] = useStyletron();
  return (
    <FlexColumn $style={{ opacity: tag === 'current' ? 1 : 0.5, textAlign: 'center' }}>
      <Paragraph2 margin={0}>{Number(price).toFixed(4)}</Paragraph2>
      <Paragraph2 marginTop={theme.sizing.scale100} marginBottom={theme.sizing.scale100}>
        {tag}
      </Paragraph2>
    </FlexColumn>
  );
};

export default React.memo(PriceTag);
