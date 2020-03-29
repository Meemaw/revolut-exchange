import {
  getAllByPlaceholderText,
  getByText,
  queryByText,
  getByTestId,
} from '@testing-library/testcafe';

import config from '../config';
import { getLocation } from '../utils';

fixture('<IndexPage />').page(config.baseURL);

test('Can execute a simple exchange via origin input', async (t) => {
  const exchangeButton = getByText('Exchange');
  const inputSelector = getAllByPlaceholderText('0');
  const originInput = inputSelector.nth(0);
  const targetInput = inputSelector.nth(1);

  await t
    .expect(getByText('Balance: kr10,000').visible)
    .ok('Displays Kronas')
    .expect(getByText('Balance: €10,000').visible)
    .ok('Displays Euros')
    .expect(exchangeButton.hasAttribute('disabled'))
    .ok('Exchange button should be disabled')
    .typeText(originInput, '100')
    .expect(exchangeButton.hasAttribute('disabled'))
    .notOk('Exchange button should be enabled')
    .expect(getByText('1kr = €0.08', { exact: false }).visible)
    .ok('Should display exchange rate');

  /* Should calculate target input value based on exchange rate */
  const targetInputValue = await targetInput.value;
  const targetInputValueNumeric = Number(targetInputValue);
  await t
    .expect(targetInputValueNumeric)
    .gt(8.0, 'Should be greater than 8')
    .expect(targetInputValueNumeric)
    .lt(9.0, 'Should be lower than 9');

  const newTargetAmount = Number((10000 + targetInputValueNumeric).toFixed(2)).toLocaleString();

  /* Execute an exchange */
  await t
    .click(exchangeButton)
    .expect(getByText(`You exchanged kr100 to €${targetInputValue}`).visible)
    .ok('Should display amount exchanged')
    .click(getByText('Done'))
    .expect(getByText('Balance: kr9,900').visible)
    .ok('Should subtract from origin amount')
    .expect(getByText(`Balance: €${newTargetAmount}`).visible)
    .ok('Should add to target amount');
});

test('Can execute an exchange from a different currency via target input', async (t) => {
  const inputSelector = getAllByPlaceholderText('0');
  const originInput = inputSelector.nth(0);
  const targetInput = inputSelector.nth(1);

  await t
    .click(getByText('NOK'))
    .typeText(getAllByPlaceholderText('').nth(0), 'United')
    .click(getByText('United Arab Emirates Dirham'))
    .wait(500)
    .expect(getByText('AED').visible)
    .ok('Origin currency should change')
    .expect(queryByText('NOK').exists)
    .notOk('Origin currency should change')
    .expect(getByText('Balance: AED10,000').visible)
    .ok('Displays Dirhams');

  await t
    .expect(getByText('1AED = €', { exact: false }).visible)
    .ok('Should display exchange rate')
    .typeText(targetInput, '100');

  /* Should calculate origin input value based on exchange rate */
  const originInputValue = await originInput.value;
  const originInputValueNumeric = Number(originInputValue);

  await t
    .expect(originInputValueNumeric)
    .gt(395.0, 'Should be around 400')
    .expect(originInputValueNumeric)
    .lt(410.0, 'Should be around 400');

  const newOriginAmount = Number((10000 - originInputValueNumeric).toFixed(2)).toLocaleString();

  /* Execute an exchange */
  await t
    .click(getByText('Exchange'))
    .expect(getByText(`You exchanged AED${originInputValue} to €100.00`).visible)
    .ok('Should display amount exchanged')
    .click(getByText('Done'))
    .expect(getByText(`Balance: AED${newOriginAmount}`).visible)
    .ok('Should subtract from origin amount')
    .expect(getByText('Balance: €10,100').visible)
    .ok('Should add to target amount');
});

test('Can execute an exchange via full balance currency switch', async (t) => {
  const inputSelector = getAllByPlaceholderText('0');
  const originInput = inputSelector.nth(0);
  const targetInput = inputSelector.nth(1);

  await t
    .click(getByText('Balance: kr10,000'))
    .expect(originInput.value)
    .eql('10000', 'Should fill origin input with balance');

  const targetInputValue = await targetInput.value;
  const targetInputValueNumeric = Number(targetInputValue);

  /* Switches values in inputs */
  await t
    .click(getByTestId('currency-switch'))
    .expect(targetInput.value)
    .eql('10000', 'Target input takes the origin value')
    .expect(originInput.value)
    .eql(targetInputValue, 'Origin input takes the target value');

  const newOriginAmount = Number((10000 - targetInputValueNumeric).toFixed(2)).toLocaleString();

  /* Execute an exchange */
  await t
    .click(getByText('Exchange'))
    .expect(getByText(`You exchanged €${targetInputValue} to kr9999.97`).visible)
    .ok('Should display amount exchanged')
    .click(getByText('Done'))
    .expect(getByText(`Balance: €${newOriginAmount}`).visible)
    .ok('Should subtract from origin amount')
    .expect(getByText('Balance: kr19,999.97').visible)
    .ok('Should add to target amount');
});

test.only('Can execute multiple sequential trades', async (t) => {
  const exchangeButton = getByText('Exchange');
  const doneButton = getByText('Done');
  const inputSelector = getAllByPlaceholderText('0');
  const originInput = inputSelector.nth(0);
  const targetInput = inputSelector.nth(1);

  await t
    .typeText(originInput, '100')
    .click(exchangeButton)
    .click(doneButton)
    .expect(getByText('Balance: kr9,900').visible)
    .ok('Should subtract from balance')
    .click(originInput)
    .selectText(originInput)
    .pressKey('delete')
    .typeText(originInput, '200')
    .click(exchangeButton)
    .click(doneButton)
    .expect(getByText('Balance: kr9,700').visible)
    .ok('Should subtract from balance')
    .click(getByText('EUR'))
    .typeText(getAllByPlaceholderText('').nth(0), 'United')
    .click(getByText('United Arab Emirates Dirham'))
    .click(getByTestId('currency-switch'))
    .click(targetInput)
    .selectText(targetInput)
    .pressKey('delete')
    .typeText(targetInput, '300.01')
    .click(exchangeButton)
    .click(doneButton)
    .expect(getByText('Balance: kr10,000', { exact: false }).visible)
    .ok('Should come back to original balance');
});

test('Can not exchange amounts that exceed balance', async (t) => {
  const exchangeButton = getByText('Exchange');
  const inputSelector = getAllByPlaceholderText('0');
  const originInput = inputSelector.nth(0);

  await t
    .typeText(originInput, '100')
    .expect(exchangeButton.hasAttribute('disabled'))
    .notOk('Exchange button should be enabled')
    .typeText(originInput, '01')
    .expect(exchangeButton.hasAttribute('disabled'))
    .ok('Exchange button should be disabled');
});

test('Can navigate to historical and back', async (t) => {
  await t
    .click(getByText('NOK'))
    .typeText(getAllByPlaceholderText('').nth(0), 'United')
    .click(getByText('United Arab Emirates Dirham'))
    .click(getByText('1AED = €0.24', { exact: false }))
    .expect(getLocation())
    .eql(`${config.baseURL}/historical?from=AED&to=EUR`, 'URL address should indicate currencies')
    .expect(queryByText('AED → EUR').visible)
    .ok('Should display appropriate exchange')
    .click(getByTestId('navigate-back'))
    .expect(queryByText('Balance: AED10,000').visible)
    .ok('Should still display AED currency');
});
