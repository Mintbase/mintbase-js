import { Network } from '@mintbase-js/sdk';

export interface AttributeRarityResults {
    amountValues: {aggregate: {
        count: number;
      };
    };
      totalTypes: {aggregate: {
        count: number;
      };
    };
  }


export interface AttributeRarityProps {
    contractId: string;
    attributeType: string;
    attributeValue: string;
    network?: Network;
  }
