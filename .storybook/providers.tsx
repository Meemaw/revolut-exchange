import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { Client as Styletron } from 'styletron-engine-atomic';
import AppProviders from '../src/shared/containers/AppProviders';

/* Share Styletron instance across stories to keep css in sync */
const engine = new Styletron();
const APP_PROVIDERS_PARAMETER_NAME = 'withAppProviders';

type CustomWrapperOptions = {
  parameters: {};
};

export default makeDecorator({
  name: 'AppProviders',
  parameterName: APP_PROVIDERS_PARAMETER_NAME,
  skipIfNoParametersOrOptions: false,
  wrapper: (story, context, { parameters = {} }: CustomWrapperOptions) => {
    return <AppProviders engine={engine}>{story(context)}</AppProviders>;
  },
});
