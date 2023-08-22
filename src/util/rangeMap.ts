const clamp = (val: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, val));
};

const rangeMap = (
  input: number,
  inLow: number,
  inHigh: number,
  outLow: number,
  outHigh: number,
  clampValue = false
) => {
  const value =
    ((input - inLow) / (inHigh - inLow)) * (outHigh - outLow) + outLow;

  return clampValue ? clamp(value, outLow, outHigh) : value;
};

export default rangeMap;
