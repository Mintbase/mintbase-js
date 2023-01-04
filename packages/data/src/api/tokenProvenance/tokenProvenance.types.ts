export interface TokenProvenanceData {
    nft_activities: 
        {
          price: number;
          action_receiver: string;
          action_sender: string;
          tx_sender: string;
          kind: string;
          timestamp: string;
          receipt_id: string;
        }[];

    nft_activities_aggregate: {
        aggregate: {
          count: number;
        };
    };
}
