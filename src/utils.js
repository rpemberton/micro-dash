export function isValidMeterData(data) {
  const { min, max, value } = data;

  if ([min, max, value].some(isNaN)) {
    return false;
  }
  if (min > max) {
    return false;
  }
  if (value < min || value > max) {
    return false;
  }
  return true;
}

export function formatCurency(unit, value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: unit,
    maximumSignificantDigits: 2
  }).format(value);
}

export function getRotateDeg(min, max, value) {
  const range = max - min;
  const valuePercOfRange = ((value - min) / range) * 100;
  const rotateDeg = Math.ceil(180 * (valuePercOfRange / 100));

  return rotateDeg;
}
