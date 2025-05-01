import MCC_METADATA from './mcc.json'

export const getCategoryByMcc = (numericMcc: number) =>
  MCC_METADATA.find(({ mcc }) => String(numericMcc) === mcc)?.shortDescription

export const getRandomMcc = () => {
  const mccCodes = MCC_METADATA.map(({ mcc }) => mcc).map(Number)
  const randomIndex = Math.floor(Math.random() * mccCodes.length)
  return mccCodes[randomIndex]
}
