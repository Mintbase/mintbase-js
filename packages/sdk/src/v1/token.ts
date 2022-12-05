// Mintbase token contract JS implementation

import { TransactionArgs, TransactionAttachments } from '../execute';
import {
  TOKEN_METHOD_NAMES,
  GAS_CONSTANTS,
  DEPOSIT_CONSTANTS,
} from '../constants';
import {
  RevokeAccountArgs,
} from './token.types';


// TODO: do we want this method? How can we reuse `mint` instead of having an extra method
export const mintMore = (): void => {
  return;
};


