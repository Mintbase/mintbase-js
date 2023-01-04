export interface TokenProvenanceData {
    nft_activities: 
        {
          price: number | null;
          action_receiver: string | null;
          action_sender: string | null;
          tx_sender: string | null;
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
