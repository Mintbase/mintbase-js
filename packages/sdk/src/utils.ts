import { mbjs } from './config/config';
import { ERROR_MESSAGES } from './errorMessages';
import { Splits } from './types';

export function isStoreV1(name: string): boolean {
  return !mbjs.keys.checkVersions || name.endsWith(`.${mbjs.keys.mbContract}`);
}

export function isStoreV2(name: string): boolean {
  return !mbjs.keys.checkVersions || name.endsWith(`.${mbjs.keys.mbContractV2}`);
}

export function standardizeString(name: string): string {
  return name.replace(/[^a-z0-9]+/gim, '').toLowerCase();
}

export function isIntString(x: string): boolean {
  return parseInt(x).toString() === x;
}

export function processRoyalties(
  royalties: Splits | null | undefined,
): {
  royaltyTotal: number;
  roundedRoyalties: Splits;
} | null {
  if (!royalties) {
    return { royaltyTotal: null, roundedRoyalties: null };
  }

  // royalties adjustments to make devx better
  const royaltyTotal = getRoyaltyTotal(royalties);
  const adjustedRoyalties = adjustRoyaltiesForContract(royalties, royaltyTotal);
  const roundedRoyalties = roundRoyalties(adjustedRoyalties);

  // if royalties exist they need to be populated
  if (Object.keys(royalties).length < 1) {
    throw new Error(ERROR_MESSAGES.MIN_ROYALTIES);
  }

  // must not have more than 50 royalty owners
  if (Object.keys(royalties).length > 50) {
    throw new Error(ERROR_MESSAGES.MAX_ROYALTIES);
  }

  return { royaltyTotal, roundedRoyalties };
}

function getRoyaltyTotal(royalties: Record<string, number>): number {
  let royaltyTotal = 0;
  Object.values(royalties).forEach(value => {
    royaltyTotal += value;
  });

  if (royaltyTotal <= 0 || royaltyTotal > 0.5) {
    throw new Error(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }
  return royaltyTotal;
}

function adjustRoyaltiesForContract(royalties: Record<string, number>, royaltyTotal): Splits {
  let counter = 0;
  const result: Splits = {};
  Object.keys(royalties).forEach(key => {
    if (royalties[key] <= 0) {
      throw new Error(ERROR_MESSAGES.NEGATIVE_ROYALTIES);
    }
    const adjustedAmount = royalties[key] / royaltyTotal * 10000;
    result[key] = adjustedAmount;
    counter += adjustedAmount;
  });
  if (counter != 10000) {
    throw new Error(ERROR_MESSAGES.ROYALTIES_PERCENTAGE);
  }

  return result;
}

function roundRoyalties(royalties: Record<string, number>): Record<string, number> {
  let roundedCounter = 0;
  const result: Splits = {};
  const firstKey = Object.keys(royalties)[0];
  Object.keys(royalties).forEach((key) => {
    const roundedVal = Math.round(royalties[key]);
    result[key] = roundedVal;
    roundedCounter += roundedVal;
  });

  if (roundedCounter != 10000) {
    result[firstKey] += 10000 - roundedCounter;
  }
  return result;
}
