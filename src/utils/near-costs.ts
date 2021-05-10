const COST_PER_BYTE = 1e-5
const MARKET_LIST_COST = 0.0036
const APPROVAL_STORAGE = 0.0008

export const calculateListCost = (amount: number): number => {
  // return (APPROVAL_STORAGE * COST_PER_BYTE + MARKET_LIST_COST) * amount
  return 0.1
}
