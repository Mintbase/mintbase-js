// Returns cost in NEAR
export const calculateListCost = (amount: number): number => {
  const cost = 0.0044 * amount
  return cost
}