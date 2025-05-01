export const normalizeExponential = (value: number, min: number, max: number) => {
  if (min === max) return (max = min + 1)
  const normalized = (value - min) / (max - min)
  return Math.exp(normalized * Math.log(1000))
}
export const normalizeProportional = (value: number, minValue: number, maxValue: number, min = 1, max = 1000) => {
  if (minValue === maxValue) return (maxValue = minValue + min)
  return min + ((value - minValue) / (maxValue - minValue)) * (max - min)
}
