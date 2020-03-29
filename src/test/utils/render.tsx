import React, { JSXElementConstructor } from 'react';
import { render as renderImpl } from '@testing-library/react';
import { StoryConfiguration } from 'storybook/utils/configureStory';
import AppProviders from 'shared/containers/AppProviders';

type RenderableComponent<Props, T, S extends StoryConfiguration<T>> = React.ReactElement<
  Props,
  JSXElementConstructor<Props> & { story?: S }
>;

const render = <Props, T, S extends StoryConfiguration<T>>(
  component: RenderableComponent<Props, T, S>
) => {
  const renderResult = renderImpl(<AppProviders>{component}</AppProviders>);
  return renderResult;
};

export default render;
