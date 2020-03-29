import React from 'react';
import { render, sandbox } from 'test/utils';
import { clickElement } from 'test/utils/events';
import { Base } from './ExchangeCompletedScreen.stories';

describe('<ExchangeComletedScreen />', () => {
  it('Should display the exchanged value', () => {
    const onDone = sandbox.stub();
    const { queryByText, getByText } = render(<Base onDone={onDone} />);
    expect(queryByText('You exchanged kr1 to €0.08')).toBeInTheDocument();

    clickElement(getByText('Done'));

    sandbox.assert.calledOnce(onDone);
  });
});
