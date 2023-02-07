export interface ContractAttributesDataResults  {
    nft_attributes: 
      {
        attribute_type: string;
      }[];
    nft_attributes_aggregate: {
      aggregate: {
        count: number;
      };
    };
}
