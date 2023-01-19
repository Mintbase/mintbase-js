
type Numerator = {
  numerator: string;
}

type Payouts = {
  royalty: {
    split_between: Record<string, Numerator>;
    percentage: Numerator;
  };
};

export const payouts = (): null => null;
