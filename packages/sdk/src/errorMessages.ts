const DEFAULT_SUPPORT = '- read more on: https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk , further help available on our telegram channel: https://t.me/mintdev';
const SUPPORT = '- further help available on our telegram channel: https://t.me/mintdev';

export const ERROR_MESSAGES = {
  CONTRACT_ADDRESS: `You must provide a contractAddress, define contractAddress on mbjs.config,or a CONTRACT_ADDRESS enviroment variable to default to ${DEFAULT_SUPPORT}`,
  INVALID_ROYALTY_PERCENTAGE: `Invalid royalty percentage, it must be between 0 and 0.5 ${SUPPORT}`,
  SPLITS_PERCENTAGE: `Splits percentages must add up to 1 ${SUPPORT}`,
  MAX_AMOUT: `It is not possible to mint more than 99 copies of this token using this method ${SUPPORT}`,
  MIN_SPLITS: `There must be at least 2 accounts in splits ${SUPPORT}`,
  MIN_ROYALTIES: `There must be at least 1 account in royalties ${SUPPORT}`,
  MAX_ROYALTIES_SPLITS: `Royalties and splits cannot have more than combined 50 entries ${SUPPORT}`,
  BURN_TOKEN_IDS: `Burn contract call should not have an empty array of tokens ids ${SUPPORT}`,
  TOKEN_NOT_ARRAY: `tokenIds must be an array ${SUPPORT}`,
  TOKEN_LENGTH: `tokenIds must have more than one element ${SUPPORT}`,
  TRANSFER:  `You must transfer at least one token ${SUPPORT}`,
  NO_MINTERS: `There are no minters being provided to the batchChangeMinters method to be changed, try adding account Ids to at least one of the minter fields ${SUPPORT}`,
  NO_REFERENCE: `You must provide a reference when minting or explicitly opt out ${SUPPORT}`,
  NO_MEDIA: `You must provide media when minting or explicitly opt out ${SUPPORT}`,
  ROYALTY_PERCENTAGE_WITHOUT_RECIPIENTS:`Cannot specifiy royalty percentage without splits or royalties ${SUPPORT}`,
  ROYALTY_RECIPIENTS_WITHOUT_PERCENTAGE:`Cannot specify royalties without royalty percentage ${SUPPORT}`,
  TOKEN_IDS_TO_MINT_LEN:`Token ids to mint must not be included or have a length greater than 0 ${SUPPORT}`,
  NEGATIVE_ROYALTIES:`Royalties cant be negative or 0 ${SUPPORT}`,
  EMPTY_TOKEN_IDS:`Empty array passed into tokenIdsToMint field. If trying to specify this, add values to the array, otherwise remove the optional argument ${SUPPORT}`,
  MUTUAL_EXCLUSIVE_AMOUNT:`When defining tokenIdsToMint the amount of tokens is given by the length of the provided array. amount and tokenIdsToMint are mutually exclusive ${SUPPORT},  `,
};
