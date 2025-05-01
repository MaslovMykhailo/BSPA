import MCC_METADATA from './mcc.json'

export const getCategoryByMcc = (numericMcc: number) =>
  MCC_METADATA.find(({ mcc }) => String(numericMcc) === mcc)?.shortDescription
