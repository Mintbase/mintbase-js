export type KeyActivityQueryResults = {
  keyActivity: {
    timestamp: string;
    receiptId: string;
    publicKey: string;
    kind: string;
  }[];
};
