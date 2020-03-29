import React from 'react';
import { action } from '@storybook/addon-actions';
import { configureStory } from 'storybook/utils';
import fullHeightDecorator from 'storybook/utils/fullHeightDecorator';
import ExchangeCompletedScreen, { Props } from './ExchangeCompletedScreen';

export default {
  title: 'ExchangeCompletedScreen',
};

const baseProps = {
  onDone: action('onDone'),
};

type StoryProps = Pick<Props, 'onDone'>;

export const Base = (storyProps: StoryProps) => {
  return (
    <ExchangeCompletedScreen
      {...baseProps}
      {...storyProps}
      origin={{ value: '1', currency: 'NOK' }}
      target={{ currency: 'EUR', value: '0.08' }}
    />
  );
};
Base.story = configureStory({
  decorators: [fullHeightDecorator],
});
