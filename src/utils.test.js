import { isValidMeterData } from './utils';

describe('isValidMeterData()', () => {
  it('returns true given valid data', () => {
    const meterData = {
      value: 34,
      min: 0,
      max: 200,
      format: 'currency',
      unit: 'GBP'
    };

    expect(isValidMeterData(meterData)).toBeTruthy();
  });

  it('returns false given value > max', () => {
    const meterData = {
      value: 201,
      min: 0,
      max: 200,
      format: 'currency',
      unit: 'GBP'
    };

    expect(isValidMeterData(meterData)).toBeFalsy();
  });

  it('returns false given min > max', () => {
    const meterData = {
      value: 34,
      min: 201,
      max: 200,
      format: 'currency',
      unit: 'GBP'
    };

    expect(isValidMeterData(meterData)).toBeFalsy();
  });
});
