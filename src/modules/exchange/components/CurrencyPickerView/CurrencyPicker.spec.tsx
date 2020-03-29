import React from 'react';
import { render as renerImpl } from '@testing-library/react';
import { CURRENCIES } from 'shared/lib/currencies';
import { typeText, clickElement } from 'test/utils/events';

import { sandbox } from 'test/utils';
import { Base, WithRecents } from './CurrencyPicker.stories';

const render = (ui: React.ReactElement) => {
  const renderResult = renerImpl(ui);

  const clearIcon = () =>
    renderResult.container.querySelector('[aria-label="Clear value"]') as HTMLElement;

  const searchInput = renderResult.container.querySelector('input') as HTMLInputElement;

  return { ...renderResult, clearIcon, searchInput };
};

describe('<CurrencyPicker />', () => {
  it('should render all countries in others section', () => {
    const back = sandbox.stub();

    const { container, queryByText, clearIcon, searchInput } = render(<Base back={back} />);

    expect(queryByText('Recently used')).toBeNull();
    expect(queryByText('Others')).toBeInTheDocument();
    expect(clearIcon()).toBeNull();

    const listElement = container.querySelector('ul') as HTMLUListElement;
    expect(listElement.childElementCount).toEqual(Object.keys(CURRENCIES).length);
    const searchQuery = 'AM';
    typeText(searchInput, searchQuery);

    expect(listElement.childElementCount).toEqual(2);
    expect(searchInput.value).toEqual(searchQuery);

    expect(queryByText('United Arab Emirates Dirham')).toBeInTheDocument();
    expect(queryByText('Armenian Dram')).toBeInTheDocument();

    clickElement(clearIcon());

    expect(searchInput.value).toEqual('');
    expect(listElement.childElementCount).toEqual(Object.keys(CURRENCIES).length);
  });

  it('should render countries in recents section as well', () => {
    const back = sandbox.stub();

    const { container, queryByText, clearIcon, searchInput } = render(<WithRecents back={back} />);

    expect(queryByText('Recently used')).toBeInTheDocument();
    expect(queryByText('Others')).toBeInTheDocument();
    expect(clearIcon()).toBeNull();

    const listElements = container.querySelectorAll('ul');
    const recentsListElement = listElements.item(0);
    const othersListElement = listElements.item(1);

    expect(recentsListElement.childElementCount).toEqual(2);
    expect(othersListElement.childElementCount).toEqual(Object.keys(CURRENCIES).length - 2);

    const searchQuery = 'AM';
    typeText(searchInput, searchQuery);

    expect(container.querySelectorAll('ul').length).toEqual(1); // recents list went away
    expect(othersListElement.childElementCount).toEqual(2);
    expect(searchInput.value).toEqual(searchQuery);

    expect(queryByText('United Arab Emirates Dirham')).toBeInTheDocument();
    expect(queryByText('Armenian Dram')).toBeInTheDocument();

    clickElement(clearIcon());

    expect(searchInput.value).toEqual('');
    expect(container.querySelectorAll('ul').length).toEqual(2); // recents list came back
    expect(othersListElement.childElementCount).toEqual(Object.keys(CURRENCIES).length - 2);
  });
});
