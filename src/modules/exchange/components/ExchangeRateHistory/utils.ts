import {
  format as baseFormat,
  subHours,
  differenceInSeconds,
  subWeeks,
  subMonths,
  subYears,
  subSeconds,
} from 'date-fns';
import { applyNoiseToValue } from 'test/mocks/exchangeRates';
import { UnreachableCaseError } from 'shared/lib/error';
import { Granularity } from './types';

const timeFormatter = (date: Date) => baseFormat(date, 'HH:mm');
const dayTimeFormatter = (date: Date) => baseFormat(date, 'dd MMMM, HH:mm');
const dayFormatter = (date: Date) => baseFormat(date, 'dd MMMM');

const dateFormatter = ({ unit, amount }: Granularity) => {
  switch (unit) {
    case 'd':
      return timeFormatter;
    case 'w':
    case 'm':
      return amount === 1 ? dayTimeFormatter : dayFormatter;
    default:
      return dayFormatter;
  }
};

const getIntervalStart = (date: Date, { unit, amount }: Granularity) => {
  switch (unit) {
    case 'd':
      return subHours(date, amount);
    case 'w':
      return subWeeks(date, amount);
    case 'm':
      return subMonths(date, amount);
    case 'y':
      return subYears(date, amount);
    default:
      throw new UnreachableCaseError(unit);
  }
};

const priceFormatter = (value: number) => value.toFixed(4);

/* mocking historical data because API is not accesible in free tier */
export const generateHistoricalData = (
  exchangeRate: number,
  granularity: Granularity,
  numTicks = 24
) => {
  const format = dateFormatter(granularity);
  let dateAcc = new Date();
  const dateIntervalStart = getIntervalStart(dateAcc, granularity);
  const intervalDiffSeconds = differenceInSeconds(dateAcc, dateIntervalStart);
  const ticksToGenerate = numTicks - 1;
  const tickDiffSeconds = intervalDiffSeconds / ticksToGenerate;

  let lowest = Number.MAX_SAFE_INTEGER;
  let highest = Number.MIN_SAFE_INTEGER;
  let priceAcc = exchangeRate;
  const data = [{ value: priceFormatter(exchangeRate), time: format(dateAcc) }];

  Array(ticksToGenerate)
    .fill(0)
    .forEach(() => {
      dateAcc = subSeconds(dateAcc, tickDiffSeconds);
      priceAcc = applyNoiseToValue(priceAcc, 0.05);

      if (priceAcc < lowest) {
        lowest = priceAcc;
      }
      if (priceAcc > highest) {
        highest = priceAcc;
      }

      data.unshift({ value: priceFormatter(priceAcc), time: format(dateAcc) });
    });

  return { data, lowest, highest };
};
