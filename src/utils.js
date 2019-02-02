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
