/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  jsonb: any;
  numeric: any;
  timestamp: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "blocks" */
export type Blocks = {
  __typename?: 'blocks';
  synced_height: Scalars['bigint'];
};

/** aggregated selection of "blocks" */
export type BlocksAggregate = {
  __typename?: 'blocks_aggregate';
  aggregate?: Maybe<BlocksAggregateFields>;
  nodes: Array<Blocks>;
};

/** aggregate fields of "blocks" */
export type BlocksAggregateFields = {
  __typename?: 'blocks_aggregate_fields';
  avg?: Maybe<BlocksAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<BlocksMaxFields>;
  min?: Maybe<BlocksMinFields>;
  stddev?: Maybe<BlocksStddevFields>;
  stddev_pop?: Maybe<BlocksStddevPopFields>;
  stddev_samp?: Maybe<BlocksStddevSampFields>;
  sum?: Maybe<BlocksSumFields>;
  var_pop?: Maybe<BlocksVarPopFields>;
  var_samp?: Maybe<BlocksVarSampFields>;
  variance?: Maybe<BlocksVarianceFields>;
};


/** aggregate fields of "blocks" */
export type BlocksAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<BlocksSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type BlocksAvgFields = {
  __typename?: 'blocks_avg_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "blocks". All fields are combined with a logical 'AND'. */
export type BlocksBoolExp = {
  _and?: InputMaybe<Array<BlocksBoolExp>>;
  _not?: InputMaybe<BlocksBoolExp>;
  _or?: InputMaybe<Array<BlocksBoolExp>>;
  synced_height?: InputMaybe<BigintComparisonExp>;
};

/** aggregate max on columns */
export type BlocksMaxFields = {
  __typename?: 'blocks_max_fields';
  synced_height?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type BlocksMinFields = {
  __typename?: 'blocks_min_fields';
  synced_height?: Maybe<Scalars['bigint']>;
};

/** Ordering options when selecting data from "blocks". */
export type BlocksOrderBy = {
  synced_height?: InputMaybe<OrderBy>;
};

/** select columns of table "blocks" */
export enum BlocksSelectColumn {
  /** column name */
  SyncedHeight = 'synced_height'
}

/** aggregate stddev on columns */
export type BlocksStddevFields = {
  __typename?: 'blocks_stddev_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type BlocksStddevPopFields = {
  __typename?: 'blocks_stddev_pop_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type BlocksStddevSampFields = {
  __typename?: 'blocks_stddev_samp_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "blocks" */
export type BlocksStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: BlocksStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type BlocksStreamCursorValueInput = {
  synced_height?: InputMaybe<Scalars['bigint']>;
};

/** aggregate sum on columns */
export type BlocksSumFields = {
  __typename?: 'blocks_sum_fields';
  synced_height?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type BlocksVarPopFields = {
  __typename?: 'blocks_var_pop_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type BlocksVarSampFields = {
  __typename?: 'blocks_var_samp_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type BlocksVarianceFields = {
  __typename?: 'blocks_variance_fields';
  synced_height?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "mb_store_minters" */
export type MbStoreMinters = {
  __typename?: 'mb_store_minters';
  minter_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
};

/** aggregated selection of "mb_store_minters" */
export type MbStoreMintersAggregate = {
  __typename?: 'mb_store_minters_aggregate';
  aggregate?: Maybe<MbStoreMintersAggregateFields>;
  nodes: Array<MbStoreMinters>;
};

/** aggregate fields of "mb_store_minters" */
export type MbStoreMintersAggregateFields = {
  __typename?: 'mb_store_minters_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<MbStoreMintersMaxFields>;
  min?: Maybe<MbStoreMintersMinFields>;
};


/** aggregate fields of "mb_store_minters" */
export type MbStoreMintersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbStoreMintersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "mb_store_minters". All fields are combined with a logical 'AND'. */
export type MbStoreMintersBoolExp = {
  _and?: InputMaybe<Array<MbStoreMintersBoolExp>>;
  _not?: InputMaybe<MbStoreMintersBoolExp>;
  _or?: InputMaybe<Array<MbStoreMintersBoolExp>>;
  minter_id?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
};

/** aggregate max on columns */
export type MbStoreMintersMaxFields = {
  __typename?: 'mb_store_minters_max_fields';
  minter_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbStoreMintersMinFields = {
  __typename?: 'mb_store_minters_min_fields';
  minter_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_store_minters". */
export type MbStoreMintersOrderBy = {
  minter_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
};

/** select columns of table "mb_store_minters" */
export enum MbStoreMintersSelectColumn {
  /** column name */
  MinterId = 'minter_id',
  /** column name */
  NftContractId = 'nft_contract_id'
}

/** Streaming cursor of the table "mb_store_minters" */
export type MbStoreMintersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbStoreMintersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbStoreMintersStreamCursorValueInput = {
  minter_id?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "mb_views.active_listings" */
export type MbViewsActiveListings = {
  __typename?: 'mb_views_active_listings';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  offers: Array<NftOffers>;
  /** An aggregate relationship */
  offers_aggregate: NftOffersAggregate;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  /** An object relationship */
  token?: Maybe<MbViewsNftTokens>;
  token_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.active_listings" */
export type MbViewsActiveListingsOffersArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


/** columns and relationships of "mb_views.active_listings" */
export type MbViewsActiveListingsOffersAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


/** columns and relationships of "mb_views.active_listings" */
export type MbViewsActiveListingsReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.active_listings" */
export type MbViewsActiveListingsAggregate = {
  __typename?: 'mb_views_active_listings_aggregate';
  aggregate?: Maybe<MbViewsActiveListingsAggregateFields>;
  nodes: Array<MbViewsActiveListings>;
};

/** aggregate fields of "mb_views.active_listings" */
export type MbViewsActiveListingsAggregateFields = {
  __typename?: 'mb_views_active_listings_aggregate_fields';
  avg?: Maybe<MbViewsActiveListingsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsActiveListingsMaxFields>;
  min?: Maybe<MbViewsActiveListingsMinFields>;
  stddev?: Maybe<MbViewsActiveListingsStddevFields>;
  stddev_pop?: Maybe<MbViewsActiveListingsStddevPopFields>;
  stddev_samp?: Maybe<MbViewsActiveListingsStddevSampFields>;
  sum?: Maybe<MbViewsActiveListingsSumFields>;
  var_pop?: Maybe<MbViewsActiveListingsVarPopFields>;
  var_samp?: Maybe<MbViewsActiveListingsVarSampFields>;
  variance?: Maybe<MbViewsActiveListingsVarianceFields>;
};


/** aggregate fields of "mb_views.active_listings" */
export type MbViewsActiveListingsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "mb_views.active_listings" */
export type MbViewsActiveListingsAggregateOrderBy = {
  avg?: InputMaybe<MbViewsActiveListingsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<MbViewsActiveListingsMaxOrderBy>;
  min?: InputMaybe<MbViewsActiveListingsMinOrderBy>;
  stddev?: InputMaybe<MbViewsActiveListingsStddevOrderBy>;
  stddev_pop?: InputMaybe<MbViewsActiveListingsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<MbViewsActiveListingsStddevSampOrderBy>;
  sum?: InputMaybe<MbViewsActiveListingsSumOrderBy>;
  var_pop?: InputMaybe<MbViewsActiveListingsVarPopOrderBy>;
  var_samp?: InputMaybe<MbViewsActiveListingsVarSampOrderBy>;
  variance?: InputMaybe<MbViewsActiveListingsVarianceOrderBy>;
};

/** aggregate avg on columns */
export type MbViewsActiveListingsAvgFields = {
  __typename?: 'mb_views_active_listings_avg_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsAvgOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "mb_views.active_listings". All fields are combined with a logical 'AND'. */
export type MbViewsActiveListingsBoolExp = {
  _and?: InputMaybe<Array<MbViewsActiveListingsBoolExp>>;
  _not?: InputMaybe<MbViewsActiveListingsBoolExp>;
  _or?: InputMaybe<Array<MbViewsActiveListingsBoolExp>>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  base_uri?: InputMaybe<StringComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  listed_by?: InputMaybe<StringComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  offers?: InputMaybe<NftOffersBoolExp>;
  price?: InputMaybe<NumericComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token?: InputMaybe<MbViewsNftTokensBoolExp>;
  token_id?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsActiveListingsMaxFields = {
  __typename?: 'mb_views_active_listings_max_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsMaxOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  base_uri?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type MbViewsActiveListingsMinFields = {
  __typename?: 'mb_views_active_listings_min_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsMinOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  base_uri?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "mb_views.active_listings". */
export type MbViewsActiveListingsOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  base_uri?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  offers_aggregate?: InputMaybe<NftOffersAggregateOrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token?: InputMaybe<MbViewsNftTokensOrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** columns and relationships of "mb_views.active_listings_rollup" */
export type MbViewsActiveListingsRollup = {
  __typename?: 'mb_views_active_listings_rollup';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.active_listings_rollup" */
export type MbViewsActiveListingsRollupReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.active_listings_rollup" */
export type MbViewsActiveListingsRollupAggregate = {
  __typename?: 'mb_views_active_listings_rollup_aggregate';
  aggregate?: Maybe<MbViewsActiveListingsRollupAggregateFields>;
  nodes: Array<MbViewsActiveListingsRollup>;
};

/** aggregate fields of "mb_views.active_listings_rollup" */
export type MbViewsActiveListingsRollupAggregateFields = {
  __typename?: 'mb_views_active_listings_rollup_aggregate_fields';
  avg?: Maybe<MbViewsActiveListingsRollupAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsActiveListingsRollupMaxFields>;
  min?: Maybe<MbViewsActiveListingsRollupMinFields>;
  stddev?: Maybe<MbViewsActiveListingsRollupStddevFields>;
  stddev_pop?: Maybe<MbViewsActiveListingsRollupStddevPopFields>;
  stddev_samp?: Maybe<MbViewsActiveListingsRollupStddevSampFields>;
  sum?: Maybe<MbViewsActiveListingsRollupSumFields>;
  var_pop?: Maybe<MbViewsActiveListingsRollupVarPopFields>;
  var_samp?: Maybe<MbViewsActiveListingsRollupVarSampFields>;
  variance?: Maybe<MbViewsActiveListingsRollupVarianceFields>;
};


/** aggregate fields of "mb_views.active_listings_rollup" */
export type MbViewsActiveListingsRollupAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsActiveListingsRollupSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsActiveListingsRollupAvgFields = {
  __typename?: 'mb_views_active_listings_rollup_avg_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.active_listings_rollup". All fields are combined with a logical 'AND'. */
export type MbViewsActiveListingsRollupBoolExp = {
  _and?: InputMaybe<Array<MbViewsActiveListingsRollupBoolExp>>;
  _not?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
  _or?: InputMaybe<Array<MbViewsActiveListingsRollupBoolExp>>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  base_uri?: InputMaybe<StringComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  listed_by?: InputMaybe<StringComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<NumericComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsActiveListingsRollupMaxFields = {
  __typename?: 'mb_views_active_listings_rollup_max_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsActiveListingsRollupMinFields = {
  __typename?: 'mb_views_active_listings_rollup_min_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.active_listings_rollup". */
export type MbViewsActiveListingsRollupOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  base_uri?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.active_listings_rollup" */
export enum MbViewsActiveListingsRollupSelectColumn {
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Kind = 'kind',
  /** column name */
  ListedBy = 'listed_by',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  Media = 'media',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id'
}

/** aggregate stddev on columns */
export type MbViewsActiveListingsRollupStddevFields = {
  __typename?: 'mb_views_active_listings_rollup_stddev_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsActiveListingsRollupStddevPopFields = {
  __typename?: 'mb_views_active_listings_rollup_stddev_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsActiveListingsRollupStddevSampFields = {
  __typename?: 'mb_views_active_listings_rollup_stddev_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_active_listings_rollup" */
export type MbViewsActiveListingsRollupStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsActiveListingsRollupStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsActiveListingsRollupStreamCursorValueInput = {
  approval_id?: InputMaybe<Scalars['numeric']>;
  base_uri?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  listed_by?: InputMaybe<Scalars['String']>;
  market_id?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsActiveListingsRollupSumFields = {
  __typename?: 'mb_views_active_listings_rollup_sum_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsActiveListingsRollupVarPopFields = {
  __typename?: 'mb_views_active_listings_rollup_var_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsActiveListingsRollupVarSampFields = {
  __typename?: 'mb_views_active_listings_rollup_var_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsActiveListingsRollupVarianceFields = {
  __typename?: 'mb_views_active_listings_rollup_variance_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** select columns of table "mb_views.active_listings" */
export enum MbViewsActiveListingsSelectColumn {
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Kind = 'kind',
  /** column name */
  ListedBy = 'listed_by',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  Media = 'media',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id'
}

/** aggregate stddev on columns */
export type MbViewsActiveListingsStddevFields = {
  __typename?: 'mb_views_active_listings_stddev_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsStddevOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type MbViewsActiveListingsStddevPopFields = {
  __typename?: 'mb_views_active_listings_stddev_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsStddevPopOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type MbViewsActiveListingsStddevSampFields = {
  __typename?: 'mb_views_active_listings_stddev_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsStddevSampOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "mb_views_active_listings" */
export type MbViewsActiveListingsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsActiveListingsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsActiveListingsStreamCursorValueInput = {
  approval_id?: InputMaybe<Scalars['numeric']>;
  base_uri?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  listed_by?: InputMaybe<Scalars['String']>;
  market_id?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsActiveListingsSumFields = {
  __typename?: 'mb_views_active_listings_sum_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsSumOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type MbViewsActiveListingsVarPopFields = {
  __typename?: 'mb_views_active_listings_var_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsVarPopOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type MbViewsActiveListingsVarSampFields = {
  __typename?: 'mb_views_active_listings_var_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsVarSampOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type MbViewsActiveListingsVarianceFields = {
  __typename?: 'mb_views_active_listings_variance_fields';
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "mb_views.active_listings" */
export type MbViewsActiveListingsVarianceOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** columns and relationships of "mb_views.auctions_with_offer" */
export type MbViewsAuctionsWithOffer = {
  __typename?: 'mb_views_auctions_with_offer';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  listing_receipt_id?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  nft_token?: Maybe<MbViewsNftTokens>;
  offer_accepted_at?: Maybe<Scalars['timestamp']>;
  offer_expires_at?: Maybe<Scalars['timestamp']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  offer_receipt_id?: Maybe<Scalars['String']>;
  offer_withdrawn_at?: Maybe<Scalars['timestamp']>;
  offered_at?: Maybe<Scalars['timestamp']>;
  offered_by?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.auctions_with_offer" */
export type MbViewsAuctionsWithOfferReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.auctions_with_offer" */
export type MbViewsAuctionsWithOfferAggregate = {
  __typename?: 'mb_views_auctions_with_offer_aggregate';
  aggregate?: Maybe<MbViewsAuctionsWithOfferAggregateFields>;
  nodes: Array<MbViewsAuctionsWithOffer>;
};

/** aggregate fields of "mb_views.auctions_with_offer" */
export type MbViewsAuctionsWithOfferAggregateFields = {
  __typename?: 'mb_views_auctions_with_offer_aggregate_fields';
  avg?: Maybe<MbViewsAuctionsWithOfferAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsAuctionsWithOfferMaxFields>;
  min?: Maybe<MbViewsAuctionsWithOfferMinFields>;
  stddev?: Maybe<MbViewsAuctionsWithOfferStddevFields>;
  stddev_pop?: Maybe<MbViewsAuctionsWithOfferStddevPopFields>;
  stddev_samp?: Maybe<MbViewsAuctionsWithOfferStddevSampFields>;
  sum?: Maybe<MbViewsAuctionsWithOfferSumFields>;
  var_pop?: Maybe<MbViewsAuctionsWithOfferVarPopFields>;
  var_samp?: Maybe<MbViewsAuctionsWithOfferVarSampFields>;
  variance?: Maybe<MbViewsAuctionsWithOfferVarianceFields>;
};


/** aggregate fields of "mb_views.auctions_with_offer" */
export type MbViewsAuctionsWithOfferAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsAuctionsWithOfferSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsAuctionsWithOfferAvgFields = {
  __typename?: 'mb_views_auctions_with_offer_avg_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.auctions_with_offer". All fields are combined with a logical 'AND'. */
export type MbViewsAuctionsWithOfferBoolExp = {
  _and?: InputMaybe<Array<MbViewsAuctionsWithOfferBoolExp>>;
  _not?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
  _or?: InputMaybe<Array<MbViewsAuctionsWithOfferBoolExp>>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  base_uri?: InputMaybe<StringComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  listed_by?: InputMaybe<StringComparisonExp>;
  listing_receipt_id?: InputMaybe<StringComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_token?: InputMaybe<MbViewsNftTokensBoolExp>;
  offer_accepted_at?: InputMaybe<TimestampComparisonExp>;
  offer_expires_at?: InputMaybe<TimestampComparisonExp>;
  offer_id?: InputMaybe<BigintComparisonExp>;
  offer_price?: InputMaybe<NumericComparisonExp>;
  offer_receipt_id?: InputMaybe<StringComparisonExp>;
  offer_withdrawn_at?: InputMaybe<TimestampComparisonExp>;
  offered_at?: InputMaybe<TimestampComparisonExp>;
  offered_by?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<NumericComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsAuctionsWithOfferMaxFields = {
  __typename?: 'mb_views_auctions_with_offer_max_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  listing_receipt_id?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_accepted_at?: Maybe<Scalars['timestamp']>;
  offer_expires_at?: Maybe<Scalars['timestamp']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  offer_receipt_id?: Maybe<Scalars['String']>;
  offer_withdrawn_at?: Maybe<Scalars['timestamp']>;
  offered_at?: Maybe<Scalars['timestamp']>;
  offered_by?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsAuctionsWithOfferMinFields = {
  __typename?: 'mb_views_auctions_with_offer_min_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  listing_receipt_id?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_accepted_at?: Maybe<Scalars['timestamp']>;
  offer_expires_at?: Maybe<Scalars['timestamp']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  offer_receipt_id?: Maybe<Scalars['String']>;
  offer_withdrawn_at?: Maybe<Scalars['timestamp']>;
  offered_at?: Maybe<Scalars['timestamp']>;
  offered_by?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.auctions_with_offer". */
export type MbViewsAuctionsWithOfferOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  base_uri?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  listing_receipt_id?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_token?: InputMaybe<MbViewsNftTokensOrderBy>;
  offer_accepted_at?: InputMaybe<OrderBy>;
  offer_expires_at?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
  offer_receipt_id?: InputMaybe<OrderBy>;
  offer_withdrawn_at?: InputMaybe<OrderBy>;
  offered_at?: InputMaybe<OrderBy>;
  offered_by?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.auctions_with_offer" */
export enum MbViewsAuctionsWithOfferSelectColumn {
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Kind = 'kind',
  /** column name */
  ListedBy = 'listed_by',
  /** column name */
  ListingReceiptId = 'listing_receipt_id',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  Media = 'media',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  OfferAcceptedAt = 'offer_accepted_at',
  /** column name */
  OfferExpiresAt = 'offer_expires_at',
  /** column name */
  OfferId = 'offer_id',
  /** column name */
  OfferPrice = 'offer_price',
  /** column name */
  OfferReceiptId = 'offer_receipt_id',
  /** column name */
  OfferWithdrawnAt = 'offer_withdrawn_at',
  /** column name */
  OfferedAt = 'offered_at',
  /** column name */
  OfferedBy = 'offered_by',
  /** column name */
  Price = 'price',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id'
}

/** aggregate stddev on columns */
export type MbViewsAuctionsWithOfferStddevFields = {
  __typename?: 'mb_views_auctions_with_offer_stddev_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsAuctionsWithOfferStddevPopFields = {
  __typename?: 'mb_views_auctions_with_offer_stddev_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsAuctionsWithOfferStddevSampFields = {
  __typename?: 'mb_views_auctions_with_offer_stddev_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_auctions_with_offer" */
export type MbViewsAuctionsWithOfferStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsAuctionsWithOfferStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsAuctionsWithOfferStreamCursorValueInput = {
  approval_id?: InputMaybe<Scalars['numeric']>;
  base_uri?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  listed_by?: InputMaybe<Scalars['String']>;
  listing_receipt_id?: InputMaybe<Scalars['String']>;
  market_id?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  offer_accepted_at?: InputMaybe<Scalars['timestamp']>;
  offer_expires_at?: InputMaybe<Scalars['timestamp']>;
  offer_id?: InputMaybe<Scalars['bigint']>;
  offer_price?: InputMaybe<Scalars['numeric']>;
  offer_receipt_id?: InputMaybe<Scalars['String']>;
  offer_withdrawn_at?: InputMaybe<Scalars['timestamp']>;
  offered_at?: InputMaybe<Scalars['timestamp']>;
  offered_by?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsAuctionsWithOfferSumFields = {
  __typename?: 'mb_views_auctions_with_offer_sum_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsAuctionsWithOfferVarPopFields = {
  __typename?: 'mb_views_auctions_with_offer_var_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsAuctionsWithOfferVarSampFields = {
  __typename?: 'mb_views_auctions_with_offer_var_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsAuctionsWithOfferVarianceFields = {
  __typename?: 'mb_views_auctions_with_offer_variance_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.nft_activities" */
export type MbViewsNftActivities = {
  __typename?: 'mb_views_nft_activities';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  reference_hash?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  tx_sender?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_activities" */
export type MbViewsNftActivitiesReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_activities" */
export type MbViewsNftActivitiesAggregate = {
  __typename?: 'mb_views_nft_activities_aggregate';
  aggregate?: Maybe<MbViewsNftActivitiesAggregateFields>;
  nodes: Array<MbViewsNftActivities>;
};

/** aggregate fields of "mb_views.nft_activities" */
export type MbViewsNftActivitiesAggregateFields = {
  __typename?: 'mb_views_nft_activities_aggregate_fields';
  avg?: Maybe<MbViewsNftActivitiesAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftActivitiesMaxFields>;
  min?: Maybe<MbViewsNftActivitiesMinFields>;
  stddev?: Maybe<MbViewsNftActivitiesStddevFields>;
  stddev_pop?: Maybe<MbViewsNftActivitiesStddevPopFields>;
  stddev_samp?: Maybe<MbViewsNftActivitiesStddevSampFields>;
  sum?: Maybe<MbViewsNftActivitiesSumFields>;
  var_pop?: Maybe<MbViewsNftActivitiesVarPopFields>;
  var_samp?: Maybe<MbViewsNftActivitiesVarSampFields>;
  variance?: Maybe<MbViewsNftActivitiesVarianceFields>;
};


/** aggregate fields of "mb_views.nft_activities" */
export type MbViewsNftActivitiesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftActivitiesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsNftActivitiesAvgFields = {
  __typename?: 'mb_views_nft_activities_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_activities". All fields are combined with a logical 'AND'. */
export type MbViewsNftActivitiesBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftActivitiesBoolExp>>;
  _not?: InputMaybe<MbViewsNftActivitiesBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftActivitiesBoolExp>>;
  action_receiver?: InputMaybe<StringComparisonExp>;
  action_sender?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  media_hash?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<NumericComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  reference_hash?: InputMaybe<StringComparisonExp>;
  timestamp?: InputMaybe<TimestampComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  tx_sender?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftActivitiesMaxFields = {
  __typename?: 'mb_views_nft_activities_max_fields';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  tx_sender?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsNftActivitiesMinFields = {
  __typename?: 'mb_views_nft_activities_min_fields';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  tx_sender?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.nft_activities". */
export type MbViewsNftActivitiesOrderBy = {
  action_receiver?: InputMaybe<OrderBy>;
  action_sender?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  media_hash?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  reference_hash?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  tx_sender?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_activities" */
export enum MbViewsNftActivitiesSelectColumn {
  /** column name */
  ActionReceiver = 'action_receiver',
  /** column name */
  ActionSender = 'action_sender',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Kind = 'kind',
  /** column name */
  Media = 'media',
  /** column name */
  MediaHash = 'media_hash',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  ReferenceHash = 'reference_hash',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TxSender = 'tx_sender'
}

/** aggregate stddev on columns */
export type MbViewsNftActivitiesStddevFields = {
  __typename?: 'mb_views_nft_activities_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsNftActivitiesStddevPopFields = {
  __typename?: 'mb_views_nft_activities_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsNftActivitiesStddevSampFields = {
  __typename?: 'mb_views_nft_activities_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_nft_activities" */
export type MbViewsNftActivitiesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftActivitiesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftActivitiesStreamCursorValueInput = {
  action_receiver?: InputMaybe<Scalars['String']>;
  action_sender?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  media_hash?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  reference_hash?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  tx_sender?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsNftActivitiesSumFields = {
  __typename?: 'mb_views_nft_activities_sum_fields';
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsNftActivitiesVarPopFields = {
  __typename?: 'mb_views_nft_activities_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsNftActivitiesVarSampFields = {
  __typename?: 'mb_views_nft_activities_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsNftActivitiesVarianceFields = {
  __typename?: 'mb_views_nft_activities_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.nft_metadata" */
export type MbViewsNftMetadata = {
  __typename?: 'mb_views_nft_metadata';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  /** An array relationship */
  listings: Array<MbViewsActiveListings>;
  /** An aggregate relationship */
  listings_aggregate: MbViewsActiveListingsAggregate;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_is_mintbase?: Maybe<Scalars['Boolean']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_metadata" */
export type MbViewsNftMetadataListingsArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_metadata" */
export type MbViewsNftMetadataListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_metadata" */
export type MbViewsNftMetadataReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_metadata" */
export type MbViewsNftMetadataAggregate = {
  __typename?: 'mb_views_nft_metadata_aggregate';
  aggregate?: Maybe<MbViewsNftMetadataAggregateFields>;
  nodes: Array<MbViewsNftMetadata>;
};

/** aggregate fields of "mb_views.nft_metadata" */
export type MbViewsNftMetadataAggregateFields = {
  __typename?: 'mb_views_nft_metadata_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftMetadataMaxFields>;
  min?: Maybe<MbViewsNftMetadataMinFields>;
};


/** aggregate fields of "mb_views.nft_metadata" */
export type MbViewsNftMetadataAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftMetadataSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_metadata". All fields are combined with a logical 'AND'. */
export type MbViewsNftMetadataBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftMetadataBoolExp>>;
  _not?: InputMaybe<MbViewsNftMetadataBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftMetadataBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  listings?: InputMaybe<MbViewsActiveListingsBoolExp>;
  media?: InputMaybe<StringComparisonExp>;
  media_hash?: InputMaybe<StringComparisonExp>;
  nft_contract_created_at?: InputMaybe<TimestampComparisonExp>;
  nft_contract_icon?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contract_is_mintbase?: InputMaybe<BooleanComparisonExp>;
  nft_contract_name?: InputMaybe<StringComparisonExp>;
  nft_contract_owner_id?: InputMaybe<StringComparisonExp>;
  nft_contract_reference?: InputMaybe<StringComparisonExp>;
  nft_contract_spec?: InputMaybe<StringComparisonExp>;
  nft_contract_symbol?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftMetadataMaxFields = {
  __typename?: 'mb_views_nft_metadata_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsNftMetadataMinFields = {
  __typename?: 'mb_views_nft_metadata_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.nft_metadata". */
export type MbViewsNftMetadataOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  listings_aggregate?: InputMaybe<MbViewsActiveListingsAggregateOrderBy>;
  media?: InputMaybe<OrderBy>;
  media_hash?: InputMaybe<OrderBy>;
  nft_contract_created_at?: InputMaybe<OrderBy>;
  nft_contract_icon?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contract_is_mintbase?: InputMaybe<OrderBy>;
  nft_contract_name?: InputMaybe<OrderBy>;
  nft_contract_owner_id?: InputMaybe<OrderBy>;
  nft_contract_reference?: InputMaybe<OrderBy>;
  nft_contract_spec?: InputMaybe<OrderBy>;
  nft_contract_symbol?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_metadata" */
export enum MbViewsNftMetadataSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Id = 'id',
  /** column name */
  Media = 'media',
  /** column name */
  MediaHash = 'media_hash',
  /** column name */
  NftContractCreatedAt = 'nft_contract_created_at',
  /** column name */
  NftContractIcon = 'nft_contract_icon',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  NftContractIsMintbase = 'nft_contract_is_mintbase',
  /** column name */
  NftContractName = 'nft_contract_name',
  /** column name */
  NftContractOwnerId = 'nft_contract_owner_id',
  /** column name */
  NftContractReference = 'nft_contract_reference',
  /** column name */
  NftContractSpec = 'nft_contract_spec',
  /** column name */
  NftContractSymbol = 'nft_contract_symbol',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title'
}

/** Streaming cursor of the table "mb_views_nft_metadata" */
export type MbViewsNftMetadataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftMetadataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftMetadataStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  media_hash?: InputMaybe<Scalars['String']>;
  nft_contract_created_at?: InputMaybe<Scalars['timestamp']>;
  nft_contract_icon?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  nft_contract_is_mintbase?: InputMaybe<Scalars['Boolean']>;
  nft_contract_name?: InputMaybe<Scalars['String']>;
  nft_contract_owner_id?: InputMaybe<Scalars['String']>;
  nft_contract_reference?: InputMaybe<Scalars['String']>;
  nft_contract_spec?: InputMaybe<Scalars['String']>;
  nft_contract_symbol?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "mb_views.nft_metadata_unburned" */
export type MbViewsNftMetadataUnburned = {
  __typename?: 'mb_views_nft_metadata_unburned';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_metadata_unburned" */
export type MbViewsNftMetadataUnburnedReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_metadata_unburned" */
export type MbViewsNftMetadataUnburnedAggregate = {
  __typename?: 'mb_views_nft_metadata_unburned_aggregate';
  aggregate?: Maybe<MbViewsNftMetadataUnburnedAggregateFields>;
  nodes: Array<MbViewsNftMetadataUnburned>;
};

/** aggregate fields of "mb_views.nft_metadata_unburned" */
export type MbViewsNftMetadataUnburnedAggregateFields = {
  __typename?: 'mb_views_nft_metadata_unburned_aggregate_fields';
  avg?: Maybe<MbViewsNftMetadataUnburnedAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftMetadataUnburnedMaxFields>;
  min?: Maybe<MbViewsNftMetadataUnburnedMinFields>;
  stddev?: Maybe<MbViewsNftMetadataUnburnedStddevFields>;
  stddev_pop?: Maybe<MbViewsNftMetadataUnburnedStddevPopFields>;
  stddev_samp?: Maybe<MbViewsNftMetadataUnburnedStddevSampFields>;
  sum?: Maybe<MbViewsNftMetadataUnburnedSumFields>;
  var_pop?: Maybe<MbViewsNftMetadataUnburnedVarPopFields>;
  var_samp?: Maybe<MbViewsNftMetadataUnburnedVarSampFields>;
  variance?: Maybe<MbViewsNftMetadataUnburnedVarianceFields>;
};


/** aggregate fields of "mb_views.nft_metadata_unburned" */
export type MbViewsNftMetadataUnburnedAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftMetadataUnburnedSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsNftMetadataUnburnedAvgFields = {
  __typename?: 'mb_views_nft_metadata_unburned_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_metadata_unburned". All fields are combined with a logical 'AND'. */
export type MbViewsNftMetadataUnburnedBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftMetadataUnburnedBoolExp>>;
  _not?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftMetadataUnburnedBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  minted_timestamp?: InputMaybe<TimestampComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<NumericComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftMetadataUnburnedMaxFields = {
  __typename?: 'mb_views_nft_metadata_unburned_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsNftMetadataUnburnedMinFields = {
  __typename?: 'mb_views_nft_metadata_unburned_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  title?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.nft_metadata_unburned". */
export type MbViewsNftMetadataUnburnedOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  minted_timestamp?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_metadata_unburned" */
export enum MbViewsNftMetadataUnburnedSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  Description = 'description',
  /** column name */
  Media = 'media',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  MintedTimestamp = 'minted_timestamp',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title'
}

/** aggregate stddev on columns */
export type MbViewsNftMetadataUnburnedStddevFields = {
  __typename?: 'mb_views_nft_metadata_unburned_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsNftMetadataUnburnedStddevPopFields = {
  __typename?: 'mb_views_nft_metadata_unburned_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsNftMetadataUnburnedStddevSampFields = {
  __typename?: 'mb_views_nft_metadata_unburned_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_nft_metadata_unburned" */
export type MbViewsNftMetadataUnburnedStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftMetadataUnburnedStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftMetadataUnburnedStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  minted_timestamp?: InputMaybe<Scalars['timestamp']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsNftMetadataUnburnedSumFields = {
  __typename?: 'mb_views_nft_metadata_unburned_sum_fields';
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsNftMetadataUnburnedVarPopFields = {
  __typename?: 'mb_views_nft_metadata_unburned_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsNftMetadataUnburnedVarSampFields = {
  __typename?: 'mb_views_nft_metadata_unburned_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsNftMetadataUnburnedVarianceFields = {
  __typename?: 'mb_views_nft_metadata_unburned_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokens = {
  __typename?: 'mb_views_nft_owned_tokens';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  listings: Array<NftListings>;
  /** An aggregate relationship */
  listings_aggregate: NftListingsAggregate;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_is_mintbase?: Maybe<Scalars['Boolean']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties?: Maybe<Scalars['jsonb']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  splits?: Maybe<Scalars['jsonb']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensListingsArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensRoyaltiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensSplitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensAggregate = {
  __typename?: 'mb_views_nft_owned_tokens_aggregate';
  aggregate?: Maybe<MbViewsNftOwnedTokensAggregateFields>;
  nodes: Array<MbViewsNftOwnedTokens>;
};

/** aggregate fields of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensAggregateFields = {
  __typename?: 'mb_views_nft_owned_tokens_aggregate_fields';
  avg?: Maybe<MbViewsNftOwnedTokensAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftOwnedTokensMaxFields>;
  min?: Maybe<MbViewsNftOwnedTokensMinFields>;
  stddev?: Maybe<MbViewsNftOwnedTokensStddevFields>;
  stddev_pop?: Maybe<MbViewsNftOwnedTokensStddevPopFields>;
  stddev_samp?: Maybe<MbViewsNftOwnedTokensStddevSampFields>;
  sum?: Maybe<MbViewsNftOwnedTokensSumFields>;
  var_pop?: Maybe<MbViewsNftOwnedTokensVarPopFields>;
  var_samp?: Maybe<MbViewsNftOwnedTokensVarSampFields>;
  variance?: Maybe<MbViewsNftOwnedTokensVarianceFields>;
};


/** aggregate fields of "mb_views.nft_owned_tokens" */
export type MbViewsNftOwnedTokensAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftOwnedTokensSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsNftOwnedTokensAvgFields = {
  __typename?: 'mb_views_nft_owned_tokens_avg_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_owned_tokens". All fields are combined with a logical 'AND'. */
export type MbViewsNftOwnedTokensBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftOwnedTokensBoolExp>>;
  _not?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftOwnedTokensBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  burned_receipt_id?: InputMaybe<StringComparisonExp>;
  burned_timestamp?: InputMaybe<TimestampComparisonExp>;
  copies?: InputMaybe<BigintComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  expires_at?: InputMaybe<TimestampComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  issued_at?: InputMaybe<TimestampComparisonExp>;
  last_transfer_receipt_id?: InputMaybe<StringComparisonExp>;
  last_transfer_timestamp?: InputMaybe<TimestampComparisonExp>;
  listings?: InputMaybe<NftListingsBoolExp>;
  media?: InputMaybe<StringComparisonExp>;
  media_hash?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  mint_memo?: InputMaybe<StringComparisonExp>;
  minted_receipt_id?: InputMaybe<StringComparisonExp>;
  minted_timestamp?: InputMaybe<TimestampComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_created_at?: InputMaybe<TimestampComparisonExp>;
  nft_contract_icon?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contract_is_mintbase?: InputMaybe<BooleanComparisonExp>;
  nft_contract_name?: InputMaybe<StringComparisonExp>;
  nft_contract_owner_id?: InputMaybe<StringComparisonExp>;
  nft_contract_reference?: InputMaybe<StringComparisonExp>;
  nft_contract_spec?: InputMaybe<StringComparisonExp>;
  nft_contract_symbol?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  reference_hash?: InputMaybe<StringComparisonExp>;
  royalties?: InputMaybe<JsonbComparisonExp>;
  royalties_percent?: InputMaybe<IntComparisonExp>;
  splits?: InputMaybe<JsonbComparisonExp>;
  starts_at?: InputMaybe<TimestampComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftOwnedTokensMaxFields = {
  __typename?: 'mb_views_nft_owned_tokens_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type MbViewsNftOwnedTokensMinFields = {
  __typename?: 'mb_views_nft_owned_tokens_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "mb_views.nft_owned_tokens". */
export type MbViewsNftOwnedTokensOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  burned_receipt_id?: InputMaybe<OrderBy>;
  burned_timestamp?: InputMaybe<OrderBy>;
  copies?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  issued_at?: InputMaybe<OrderBy>;
  last_transfer_receipt_id?: InputMaybe<OrderBy>;
  last_transfer_timestamp?: InputMaybe<OrderBy>;
  listings_aggregate?: InputMaybe<NftListingsAggregateOrderBy>;
  media?: InputMaybe<OrderBy>;
  media_hash?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  mint_memo?: InputMaybe<OrderBy>;
  minted_receipt_id?: InputMaybe<OrderBy>;
  minted_timestamp?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_created_at?: InputMaybe<OrderBy>;
  nft_contract_icon?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contract_is_mintbase?: InputMaybe<OrderBy>;
  nft_contract_name?: InputMaybe<OrderBy>;
  nft_contract_owner_id?: InputMaybe<OrderBy>;
  nft_contract_reference?: InputMaybe<OrderBy>;
  nft_contract_spec?: InputMaybe<OrderBy>;
  nft_contract_symbol?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  reference_hash?: InputMaybe<OrderBy>;
  royalties?: InputMaybe<OrderBy>;
  royalties_percent?: InputMaybe<OrderBy>;
  splits?: InputMaybe<OrderBy>;
  starts_at?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_owned_tokens" */
export enum MbViewsNftOwnedTokensSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  BurnedReceiptId = 'burned_receipt_id',
  /** column name */
  BurnedTimestamp = 'burned_timestamp',
  /** column name */
  Copies = 'copies',
  /** column name */
  Description = 'description',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Extra = 'extra',
  /** column name */
  IssuedAt = 'issued_at',
  /** column name */
  LastTransferReceiptId = 'last_transfer_receipt_id',
  /** column name */
  LastTransferTimestamp = 'last_transfer_timestamp',
  /** column name */
  Media = 'media',
  /** column name */
  MediaHash = 'media_hash',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  MintMemo = 'mint_memo',
  /** column name */
  MintedReceiptId = 'minted_receipt_id',
  /** column name */
  MintedTimestamp = 'minted_timestamp',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractCreatedAt = 'nft_contract_created_at',
  /** column name */
  NftContractIcon = 'nft_contract_icon',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  NftContractIsMintbase = 'nft_contract_is_mintbase',
  /** column name */
  NftContractName = 'nft_contract_name',
  /** column name */
  NftContractOwnerId = 'nft_contract_owner_id',
  /** column name */
  NftContractReference = 'nft_contract_reference',
  /** column name */
  NftContractSpec = 'nft_contract_spec',
  /** column name */
  NftContractSymbol = 'nft_contract_symbol',
  /** column name */
  Owner = 'owner',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  ReferenceHash = 'reference_hash',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  RoyaltiesPercent = 'royalties_percent',
  /** column name */
  Splits = 'splits',
  /** column name */
  StartsAt = 'starts_at',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type MbViewsNftOwnedTokensStddevFields = {
  __typename?: 'mb_views_nft_owned_tokens_stddev_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsNftOwnedTokensStddevPopFields = {
  __typename?: 'mb_views_nft_owned_tokens_stddev_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsNftOwnedTokensStddevSampFields = {
  __typename?: 'mb_views_nft_owned_tokens_stddev_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_nft_owned_tokens" */
export type MbViewsNftOwnedTokensStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftOwnedTokensStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftOwnedTokensStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  burned_receipt_id?: InputMaybe<Scalars['String']>;
  burned_timestamp?: InputMaybe<Scalars['timestamp']>;
  copies?: InputMaybe<Scalars['bigint']>;
  description?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['timestamp']>;
  extra?: InputMaybe<Scalars['String']>;
  issued_at?: InputMaybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: InputMaybe<Scalars['String']>;
  last_transfer_timestamp?: InputMaybe<Scalars['timestamp']>;
  media?: InputMaybe<Scalars['String']>;
  media_hash?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  mint_memo?: InputMaybe<Scalars['String']>;
  minted_receipt_id?: InputMaybe<Scalars['String']>;
  minted_timestamp?: InputMaybe<Scalars['timestamp']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_created_at?: InputMaybe<Scalars['timestamp']>;
  nft_contract_icon?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  nft_contract_is_mintbase?: InputMaybe<Scalars['Boolean']>;
  nft_contract_name?: InputMaybe<Scalars['String']>;
  nft_contract_owner_id?: InputMaybe<Scalars['String']>;
  nft_contract_reference?: InputMaybe<Scalars['String']>;
  nft_contract_spec?: InputMaybe<Scalars['String']>;
  nft_contract_symbol?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  reference_hash?: InputMaybe<Scalars['String']>;
  royalties?: InputMaybe<Scalars['jsonb']>;
  royalties_percent?: InputMaybe<Scalars['Int']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  starts_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type MbViewsNftOwnedTokensSumFields = {
  __typename?: 'mb_views_nft_owned_tokens_sum_fields';
  copies?: Maybe<Scalars['bigint']>;
  royalties_percent?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type MbViewsNftOwnedTokensVarPopFields = {
  __typename?: 'mb_views_nft_owned_tokens_var_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsNftOwnedTokensVarSampFields = {
  __typename?: 'mb_views_nft_owned_tokens_var_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsNftOwnedTokensVarianceFields = {
  __typename?: 'mb_views_nft_owned_tokens_variance_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokens = {
  __typename?: 'mb_views_nft_tokens';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  listings?: Array<NftListings>;
  /** An aggregate relationship */
  listings_aggregate?: NftListingsAggregate;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_is_mintbase?: Maybe<Scalars['Boolean']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties?: Maybe<Scalars['jsonb']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  splits?: Maybe<Scalars['jsonb']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokensListingsArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokensListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokensReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokensRoyaltiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_tokens" */
export type MbViewsNftTokensSplitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_tokens" */
export type MbViewsNftTokensAggregate = {
  __typename?: 'mb_views_nft_tokens_aggregate';
  aggregate?: Maybe<MbViewsNftTokensAggregateFields>;
  nodes: Array<MbViewsNftTokens>;
};

/** aggregate fields of "mb_views.nft_tokens" */
export type MbViewsNftTokensAggregateFields = {
  __typename?: 'mb_views_nft_tokens_aggregate_fields';
  avg?: Maybe<MbViewsNftTokensAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftTokensMaxFields>;
  min?: Maybe<MbViewsNftTokensMinFields>;
  stddev?: Maybe<MbViewsNftTokensStddevFields>;
  stddev_pop?: Maybe<MbViewsNftTokensStddevPopFields>;
  stddev_samp?: Maybe<MbViewsNftTokensStddevSampFields>;
  sum?: Maybe<MbViewsNftTokensSumFields>;
  var_pop?: Maybe<MbViewsNftTokensVarPopFields>;
  var_samp?: Maybe<MbViewsNftTokensVarSampFields>;
  variance?: Maybe<MbViewsNftTokensVarianceFields>;
};


/** aggregate fields of "mb_views.nft_tokens" */
export type MbViewsNftTokensAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftTokensSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsNftTokensAvgFields = {
  __typename?: 'mb_views_nft_tokens_avg_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_tokens". All fields are combined with a logical 'AND'. */
export type MbViewsNftTokensBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftTokensBoolExp>>;
  _not?: InputMaybe<MbViewsNftTokensBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftTokensBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  burned_receipt_id?: InputMaybe<StringComparisonExp>;
  burned_timestamp?: InputMaybe<TimestampComparisonExp>;
  copies?: InputMaybe<BigintComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  expires_at?: InputMaybe<TimestampComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  issued_at?: InputMaybe<TimestampComparisonExp>;
  last_transfer_receipt_id?: InputMaybe<StringComparisonExp>;
  last_transfer_timestamp?: InputMaybe<TimestampComparisonExp>;
  listings?: InputMaybe<NftListingsBoolExp>;
  media?: InputMaybe<StringComparisonExp>;
  media_hash?: InputMaybe<StringComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  mint_memo?: InputMaybe<StringComparisonExp>;
  minted_receipt_id?: InputMaybe<StringComparisonExp>;
  minted_timestamp?: InputMaybe<TimestampComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_created_at?: InputMaybe<TimestampComparisonExp>;
  nft_contract_icon?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contract_is_mintbase?: InputMaybe<BooleanComparisonExp>;
  nft_contract_name?: InputMaybe<StringComparisonExp>;
  nft_contract_owner_id?: InputMaybe<StringComparisonExp>;
  nft_contract_reference?: InputMaybe<StringComparisonExp>;
  nft_contract_spec?: InputMaybe<StringComparisonExp>;
  nft_contract_symbol?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  reference_hash?: InputMaybe<StringComparisonExp>;
  royalties?: InputMaybe<JsonbComparisonExp>;
  royalties_percent?: InputMaybe<IntComparisonExp>;
  splits?: InputMaybe<JsonbComparisonExp>;
  starts_at?: InputMaybe<TimestampComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftTokensMaxFields = {
  __typename?: 'mb_views_nft_tokens_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type MbViewsNftTokensMinFields = {
  __typename?: 'mb_views_nft_tokens_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  description?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  extra?: Maybe<Scalars['String']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_created_at?: Maybe<Scalars['timestamp']>;
  nft_contract_icon?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  nft_contract_name?: Maybe<Scalars['String']>;
  nft_contract_owner_id?: Maybe<Scalars['String']>;
  nft_contract_reference?: Maybe<Scalars['String']>;
  nft_contract_spec?: Maybe<Scalars['String']>;
  nft_contract_symbol?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "mb_views.nft_tokens". */
export type MbViewsNftTokensOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  burned_receipt_id?: InputMaybe<OrderBy>;
  burned_timestamp?: InputMaybe<OrderBy>;
  copies?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  issued_at?: InputMaybe<OrderBy>;
  last_transfer_receipt_id?: InputMaybe<OrderBy>;
  last_transfer_timestamp?: InputMaybe<OrderBy>;
  listings_aggregate?: InputMaybe<NftListingsAggregateOrderBy>;
  media?: InputMaybe<OrderBy>;
  media_hash?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  mint_memo?: InputMaybe<OrderBy>;
  minted_receipt_id?: InputMaybe<OrderBy>;
  minted_timestamp?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_created_at?: InputMaybe<OrderBy>;
  nft_contract_icon?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contract_is_mintbase?: InputMaybe<OrderBy>;
  nft_contract_name?: InputMaybe<OrderBy>;
  nft_contract_owner_id?: InputMaybe<OrderBy>;
  nft_contract_reference?: InputMaybe<OrderBy>;
  nft_contract_spec?: InputMaybe<OrderBy>;
  nft_contract_symbol?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  reference_hash?: InputMaybe<OrderBy>;
  royalties?: InputMaybe<OrderBy>;
  royalties_percent?: InputMaybe<OrderBy>;
  splits?: InputMaybe<OrderBy>;
  starts_at?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_tokens" */
export enum MbViewsNftTokensSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  BurnedReceiptId = 'burned_receipt_id',
  /** column name */
  BurnedTimestamp = 'burned_timestamp',
  /** column name */
  Copies = 'copies',
  /** column name */
  Description = 'description',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Extra = 'extra',
  /** column name */
  IssuedAt = 'issued_at',
  /** column name */
  LastTransferReceiptId = 'last_transfer_receipt_id',
  /** column name */
  LastTransferTimestamp = 'last_transfer_timestamp',
  /** column name */
  Media = 'media',
  /** column name */
  MediaHash = 'media_hash',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  MintMemo = 'mint_memo',
  /** column name */
  MintedReceiptId = 'minted_receipt_id',
  /** column name */
  MintedTimestamp = 'minted_timestamp',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractCreatedAt = 'nft_contract_created_at',
  /** column name */
  NftContractIcon = 'nft_contract_icon',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  NftContractIsMintbase = 'nft_contract_is_mintbase',
  /** column name */
  NftContractName = 'nft_contract_name',
  /** column name */
  NftContractOwnerId = 'nft_contract_owner_id',
  /** column name */
  NftContractReference = 'nft_contract_reference',
  /** column name */
  NftContractSpec = 'nft_contract_spec',
  /** column name */
  NftContractSymbol = 'nft_contract_symbol',
  /** column name */
  Owner = 'owner',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  ReferenceHash = 'reference_hash',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  RoyaltiesPercent = 'royalties_percent',
  /** column name */
  Splits = 'splits',
  /** column name */
  StartsAt = 'starts_at',
  /** column name */
  Title = 'title',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type MbViewsNftTokensStddevFields = {
  __typename?: 'mb_views_nft_tokens_stddev_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsNftTokensStddevPopFields = {
  __typename?: 'mb_views_nft_tokens_stddev_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsNftTokensStddevSampFields = {
  __typename?: 'mb_views_nft_tokens_stddev_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_nft_tokens" */
export type MbViewsNftTokensStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftTokensStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftTokensStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  burned_receipt_id?: InputMaybe<Scalars['String']>;
  burned_timestamp?: InputMaybe<Scalars['timestamp']>;
  copies?: InputMaybe<Scalars['bigint']>;
  description?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['timestamp']>;
  extra?: InputMaybe<Scalars['String']>;
  issued_at?: InputMaybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: InputMaybe<Scalars['String']>;
  last_transfer_timestamp?: InputMaybe<Scalars['timestamp']>;
  media?: InputMaybe<Scalars['String']>;
  media_hash?: InputMaybe<Scalars['String']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  mint_memo?: InputMaybe<Scalars['String']>;
  minted_receipt_id?: InputMaybe<Scalars['String']>;
  minted_timestamp?: InputMaybe<Scalars['timestamp']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_created_at?: InputMaybe<Scalars['timestamp']>;
  nft_contract_icon?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  nft_contract_is_mintbase?: InputMaybe<Scalars['Boolean']>;
  nft_contract_name?: InputMaybe<Scalars['String']>;
  nft_contract_owner_id?: InputMaybe<Scalars['String']>;
  nft_contract_reference?: InputMaybe<Scalars['String']>;
  nft_contract_spec?: InputMaybe<Scalars['String']>;
  nft_contract_symbol?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  reference_hash?: InputMaybe<Scalars['String']>;
  royalties?: InputMaybe<Scalars['jsonb']>;
  royalties_percent?: InputMaybe<Scalars['Int']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  starts_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type MbViewsNftTokensSumFields = {
  __typename?: 'mb_views_nft_tokens_sum_fields';
  copies?: Maybe<Scalars['bigint']>;
  royalties_percent?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type MbViewsNftTokensVarPopFields = {
  __typename?: 'mb_views_nft_tokens_var_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsNftTokensVarSampFields = {
  __typename?: 'mb_views_nft_tokens_var_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsNftTokensVarianceFields = {
  __typename?: 'mb_views_nft_tokens_variance_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.nft_tokens_with_listing" */
export type MbViewsNftTokensWithListing = {
  __typename?: 'mb_views_nft_tokens_with_listing';
  metadata_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  token_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "mb_views.nft_tokens_with_listing" */
export type MbViewsNftTokensWithListingReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "mb_views.nft_tokens_with_listing" */
export type MbViewsNftTokensWithListingAggregate = {
  __typename?: 'mb_views_nft_tokens_with_listing_aggregate';
  aggregate?: Maybe<MbViewsNftTokensWithListingAggregateFields>;
  nodes: Array<MbViewsNftTokensWithListing>;
};

/** aggregate fields of "mb_views.nft_tokens_with_listing" */
export type MbViewsNftTokensWithListingAggregateFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_aggregate_fields';
  avg?: Maybe<MbViewsNftTokensWithListingAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsNftTokensWithListingMaxFields>;
  min?: Maybe<MbViewsNftTokensWithListingMinFields>;
  stddev?: Maybe<MbViewsNftTokensWithListingStddevFields>;
  stddev_pop?: Maybe<MbViewsNftTokensWithListingStddevPopFields>;
  stddev_samp?: Maybe<MbViewsNftTokensWithListingStddevSampFields>;
  sum?: Maybe<MbViewsNftTokensWithListingSumFields>;
  var_pop?: Maybe<MbViewsNftTokensWithListingVarPopFields>;
  var_samp?: Maybe<MbViewsNftTokensWithListingVarSampFields>;
  variance?: Maybe<MbViewsNftTokensWithListingVarianceFields>;
};


/** aggregate fields of "mb_views.nft_tokens_with_listing" */
export type MbViewsNftTokensWithListingAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsNftTokensWithListingSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsNftTokensWithListingAvgFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.nft_tokens_with_listing". All fields are combined with a logical 'AND'. */
export type MbViewsNftTokensWithListingBoolExp = {
  _and?: InputMaybe<Array<MbViewsNftTokensWithListingBoolExp>>;
  _not?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
  _or?: InputMaybe<Array<MbViewsNftTokensWithListingBoolExp>>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<StringComparisonExp>;
  price?: InputMaybe<NumericComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsNftTokensWithListingMaxFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_max_fields';
  metadata_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  token_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MbViewsNftTokensWithListingMinFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_min_fields';
  metadata_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  token_id?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "mb_views.nft_tokens_with_listing". */
export type MbViewsNftTokensWithListingOrderBy = {
  metadata_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  owner?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.nft_tokens_with_listing" */
export enum MbViewsNftTokensWithListingSelectColumn {
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Owner = 'owner',
  /** column name */
  Price = 'price',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  TokenId = 'token_id'
}

/** aggregate stddev on columns */
export type MbViewsNftTokensWithListingStddevFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsNftTokensWithListingStddevPopFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsNftTokensWithListingStddevSampFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_nft_tokens_with_listing" */
export type MbViewsNftTokensWithListingStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsNftTokensWithListingStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsNftTokensWithListingStreamCursorValueInput = {
  metadata_id?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  token_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type MbViewsNftTokensWithListingSumFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_sum_fields';
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsNftTokensWithListingVarPopFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsNftTokensWithListingVarSampFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsNftTokensWithListingVarianceFields = {
  __typename?: 'mb_views_nft_tokens_with_listing_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "mb_views.top_stores" */
export type MbViewsTopStores = {
  __typename?: 'mb_views_top_stores';
  date?: Maybe<Scalars['timestamp']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['numeric']>;
};

/** aggregated selection of "mb_views.top_stores" */
export type MbViewsTopStoresAggregate = {
  __typename?: 'mb_views_top_stores_aggregate';
  aggregate?: Maybe<MbViewsTopStoresAggregateFields>;
  nodes: Array<MbViewsTopStores>;
};

/** aggregate fields of "mb_views.top_stores" */
export type MbViewsTopStoresAggregateFields = {
  __typename?: 'mb_views_top_stores_aggregate_fields';
  avg?: Maybe<MbViewsTopStoresAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MbViewsTopStoresMaxFields>;
  min?: Maybe<MbViewsTopStoresMinFields>;
  stddev?: Maybe<MbViewsTopStoresStddevFields>;
  stddev_pop?: Maybe<MbViewsTopStoresStddevPopFields>;
  stddev_samp?: Maybe<MbViewsTopStoresStddevSampFields>;
  sum?: Maybe<MbViewsTopStoresSumFields>;
  var_pop?: Maybe<MbViewsTopStoresVarPopFields>;
  var_samp?: Maybe<MbViewsTopStoresVarSampFields>;
  variance?: Maybe<MbViewsTopStoresVarianceFields>;
};


/** aggregate fields of "mb_views.top_stores" */
export type MbViewsTopStoresAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MbViewsTopStoresSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type MbViewsTopStoresAvgFields = {
  __typename?: 'mb_views_top_stores_avg_fields';
  total?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "mb_views.top_stores". All fields are combined with a logical 'AND'. */
export type MbViewsTopStoresBoolExp = {
  _and?: InputMaybe<Array<MbViewsTopStoresBoolExp>>;
  _not?: InputMaybe<MbViewsTopStoresBoolExp>;
  _or?: InputMaybe<Array<MbViewsTopStoresBoolExp>>;
  date?: InputMaybe<TimestampComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  total?: InputMaybe<NumericComparisonExp>;
};

/** aggregate max on columns */
export type MbViewsTopStoresMaxFields = {
  __typename?: 'mb_views_top_stores_max_fields';
  date?: Maybe<Scalars['timestamp']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type MbViewsTopStoresMinFields = {
  __typename?: 'mb_views_top_stores_min_fields';
  date?: Maybe<Scalars['timestamp']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['numeric']>;
};

/** Ordering options when selecting data from "mb_views.top_stores". */
export type MbViewsTopStoresOrderBy = {
  date?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  total?: InputMaybe<OrderBy>;
};

/** select columns of table "mb_views.top_stores" */
export enum MbViewsTopStoresSelectColumn {
  /** column name */
  Date = 'date',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Total = 'total'
}

/** aggregate stddev on columns */
export type MbViewsTopStoresStddevFields = {
  __typename?: 'mb_views_top_stores_stddev_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MbViewsTopStoresStddevPopFields = {
  __typename?: 'mb_views_top_stores_stddev_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MbViewsTopStoresStddevSampFields = {
  __typename?: 'mb_views_top_stores_stddev_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "mb_views_top_stores" */
export type MbViewsTopStoresStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: MbViewsTopStoresStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MbViewsTopStoresStreamCursorValueInput = {
  date?: InputMaybe<Scalars['timestamp']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  total?: InputMaybe<Scalars['numeric']>;
};

/** aggregate sum on columns */
export type MbViewsTopStoresSumFields = {
  __typename?: 'mb_views_top_stores_sum_fields';
  total?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type MbViewsTopStoresVarPopFields = {
  __typename?: 'mb_views_top_stores_var_pop_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MbViewsTopStoresVarSampFields = {
  __typename?: 'mb_views_top_stores_var_samp_fields';
  total?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MbViewsTopStoresVarianceFields = {
  __typename?: 'mb_views_top_stores_variance_fields';
  total?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "nft_activities" */
export type NftActivities = {
  __typename?: 'nft_activities';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id: Scalars['String'];
  timestamp: Scalars['timestamp'];
  token_id: Scalars['String'];
  tx_sender: Scalars['String'];
};

/** aggregated selection of "nft_activities" */
export type NftActivitiesAggregate = {
  __typename?: 'nft_activities_aggregate';
  aggregate?: Maybe<NftActivitiesAggregateFields>;
  nodes: Array<NftActivities>;
};

/** aggregate fields of "nft_activities" */
export type NftActivitiesAggregateFields = {
  __typename?: 'nft_activities_aggregate_fields';
  avg?: Maybe<NftActivitiesAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<NftActivitiesMaxFields>;
  min?: Maybe<NftActivitiesMinFields>;
  stddev?: Maybe<NftActivitiesStddevFields>;
  stddev_pop?: Maybe<NftActivitiesStddevPopFields>;
  stddev_samp?: Maybe<NftActivitiesStddevSampFields>;
  sum?: Maybe<NftActivitiesSumFields>;
  var_pop?: Maybe<NftActivitiesVarPopFields>;
  var_samp?: Maybe<NftActivitiesVarSampFields>;
  variance?: Maybe<NftActivitiesVarianceFields>;
};


/** aggregate fields of "nft_activities" */
export type NftActivitiesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftActivitiesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type NftActivitiesAvgFields = {
  __typename?: 'nft_activities_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "nft_activities". All fields are combined with a logical 'AND'. */
export type NftActivitiesBoolExp = {
  _and?: InputMaybe<Array<NftActivitiesBoolExp>>;
  _not?: InputMaybe<NftActivitiesBoolExp>;
  _or?: InputMaybe<Array<NftActivitiesBoolExp>>;
  action_receiver?: InputMaybe<StringComparisonExp>;
  action_sender?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  memo?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  price?: InputMaybe<NumericComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  timestamp?: InputMaybe<TimestampComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  tx_sender?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type NftActivitiesMaxFields = {
  __typename?: 'nft_activities_max_fields';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
  tx_sender?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type NftActivitiesMinFields = {
  __typename?: 'nft_activities_min_fields';
  action_receiver?: Maybe<Scalars['String']>;
  action_sender?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
  tx_sender?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "nft_activities". */
export type NftActivitiesOrderBy = {
  action_receiver?: InputMaybe<OrderBy>;
  action_sender?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  memo?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  tx_sender?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_activities" */
export enum NftActivitiesSelectColumn {
  /** column name */
  ActionReceiver = 'action_receiver',
  /** column name */
  ActionSender = 'action_sender',
  /** column name */
  Kind = 'kind',
  /** column name */
  Memo = 'memo',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  TxSender = 'tx_sender'
}

/** aggregate stddev on columns */
export type NftActivitiesStddevFields = {
  __typename?: 'nft_activities_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type NftActivitiesStddevPopFields = {
  __typename?: 'nft_activities_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type NftActivitiesStddevSampFields = {
  __typename?: 'nft_activities_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "nft_activities" */
export type NftActivitiesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftActivitiesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftActivitiesStreamCursorValueInput = {
  action_receiver?: InputMaybe<Scalars['String']>;
  action_sender?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
  token_id?: InputMaybe<Scalars['String']>;
  tx_sender?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type NftActivitiesSumFields = {
  __typename?: 'nft_activities_sum_fields';
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type NftActivitiesVarPopFields = {
  __typename?: 'nft_activities_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type NftActivitiesVarSampFields = {
  __typename?: 'nft_activities_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type NftActivitiesVarianceFields = {
  __typename?: 'nft_activities_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "nft_contracts" */
export type NftContracts = {
  __typename?: 'nft_contracts';
  base_uri?: Maybe<Scalars['String']>;
  content_flag?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_receipt_id?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  is_mintbase: Scalars['Boolean'];
  name: Scalars['String'];
  owner_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  spec: Scalars['String'];
  symbol?: Maybe<Scalars['String']>;
};

/** aggregated selection of "nft_contracts" */
export type NftContractsAggregate = {
  __typename?: 'nft_contracts_aggregate';
  aggregate?: Maybe<NftContractsAggregateFields>;
  nodes: Array<NftContracts>;
};

/** aggregate fields of "nft_contracts" */
export type NftContractsAggregateFields = {
  __typename?: 'nft_contracts_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<NftContractsMaxFields>;
  min?: Maybe<NftContractsMinFields>;
};


/** aggregate fields of "nft_contracts" */
export type NftContractsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftContractsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "nft_contracts". All fields are combined with a logical 'AND'. */
export type NftContractsBoolExp = {
  _and?: InputMaybe<Array<NftContractsBoolExp>>;
  _not?: InputMaybe<NftContractsBoolExp>;
  _or?: InputMaybe<Array<NftContractsBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  content_flag?: InputMaybe<StringComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  created_receipt_id?: InputMaybe<StringComparisonExp>;
  icon?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  is_mintbase?: InputMaybe<BooleanComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  owner_id?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_hash?: InputMaybe<StringComparisonExp>;
  spec?: InputMaybe<StringComparisonExp>;
  symbol?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type NftContractsMaxFields = {
  __typename?: 'nft_contracts_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  content_flag?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_receipt_id?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  spec?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type NftContractsMinFields = {
  __typename?: 'nft_contracts_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  content_flag?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_receipt_id?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  spec?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "nft_contracts". */
export type NftContractsOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  content_flag?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  created_receipt_id?: InputMaybe<OrderBy>;
  icon?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  is_mintbase?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_hash?: InputMaybe<OrderBy>;
  spec?: InputMaybe<OrderBy>;
  symbol?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_contracts" */
export enum NftContractsSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  ContentFlag = 'content_flag',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedReceiptId = 'created_receipt_id',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  IsMintbase = 'is_mintbase',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceHash = 'reference_hash',
  /** column name */
  Spec = 'spec',
  /** column name */
  Symbol = 'symbol'
}

/** Streaming cursor of the table "nft_contracts" */
export type NftContractsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftContractsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftContractsStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  content_flag?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_receipt_id?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  is_mintbase?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_hash?: InputMaybe<Scalars['String']>;
  spec?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "nft_earnings" */
export type NftEarnings = {
  __typename?: 'nft_earnings';
  amount: Scalars['numeric'];
  approval_id: Scalars['numeric'];
  currency: Scalars['String'];
  is_referral: Scalars['Boolean'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  /** An object relationship */
  nft_token?: Maybe<MbViewsNftTokens>;
  /** An object relationship */
  offer?: Maybe<NftOffers>;
  offer_id: Scalars['bigint'];
  receipt_id: Scalars['String'];
  receiver_id: Scalars['String'];
  timestamp: Scalars['timestamp'];
  token_id: Scalars['String'];
};

/** aggregated selection of "nft_earnings" */
export type NftEarningsAggregate = {
  __typename?: 'nft_earnings_aggregate';
  aggregate?: Maybe<NftEarningsAggregateFields>;
  nodes: Array<NftEarnings>;
};

/** aggregate fields of "nft_earnings" */
export type NftEarningsAggregateFields = {
  __typename?: 'nft_earnings_aggregate_fields';
  avg?: Maybe<NftEarningsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<NftEarningsMaxFields>;
  min?: Maybe<NftEarningsMinFields>;
  stddev?: Maybe<NftEarningsStddevFields>;
  stddev_pop?: Maybe<NftEarningsStddevPopFields>;
  stddev_samp?: Maybe<NftEarningsStddevSampFields>;
  sum?: Maybe<NftEarningsSumFields>;
  var_pop?: Maybe<NftEarningsVarPopFields>;
  var_samp?: Maybe<NftEarningsVarSampFields>;
  variance?: Maybe<NftEarningsVarianceFields>;
};


/** aggregate fields of "nft_earnings" */
export type NftEarningsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftEarningsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type NftEarningsAvgFields = {
  __typename?: 'nft_earnings_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "nft_earnings". All fields are combined with a logical 'AND'. */
export type NftEarningsBoolExp = {
  _and?: InputMaybe<Array<NftEarningsBoolExp>>;
  _not?: InputMaybe<NftEarningsBoolExp>;
  _or?: InputMaybe<Array<NftEarningsBoolExp>>;
  amount?: InputMaybe<NumericComparisonExp>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  is_referral?: InputMaybe<BooleanComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  nft_token?: InputMaybe<MbViewsNftTokensBoolExp>;
  offer?: InputMaybe<NftOffersBoolExp>;
  offer_id?: InputMaybe<BigintComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  receiver_id?: InputMaybe<StringComparisonExp>;
  timestamp?: InputMaybe<TimestampComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type NftEarningsMaxFields = {
  __typename?: 'nft_earnings_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  approval_id?: Maybe<Scalars['numeric']>;
  currency?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['bigint']>;
  receipt_id?: Maybe<Scalars['String']>;
  receiver_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type NftEarningsMinFields = {
  __typename?: 'nft_earnings_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  approval_id?: Maybe<Scalars['numeric']>;
  currency?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['bigint']>;
  receipt_id?: Maybe<Scalars['String']>;
  receiver_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "nft_earnings". */
export type NftEarningsOrderBy = {
  amount?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  is_referral?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  nft_token?: InputMaybe<MbViewsNftTokensOrderBy>;
  offer?: InputMaybe<NftOffersOrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  receiver_id?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_earnings" */
export enum NftEarningsSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  Currency = 'currency',
  /** column name */
  IsReferral = 'is_referral',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  OfferId = 'offer_id',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  ReceiverId = 'receiver_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'token_id'
}

/** aggregate stddev on columns */
export type NftEarningsStddevFields = {
  __typename?: 'nft_earnings_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type NftEarningsStddevPopFields = {
  __typename?: 'nft_earnings_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type NftEarningsStddevSampFields = {
  __typename?: 'nft_earnings_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "nft_earnings" */
export type NftEarningsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftEarningsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftEarningsStreamCursorValueInput = {
  amount?: InputMaybe<Scalars['numeric']>;
  approval_id?: InputMaybe<Scalars['numeric']>;
  currency?: InputMaybe<Scalars['String']>;
  is_referral?: InputMaybe<Scalars['Boolean']>;
  market_id?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  offer_id?: InputMaybe<Scalars['bigint']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  receiver_id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
  token_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type NftEarningsSumFields = {
  __typename?: 'nft_earnings_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  approval_id?: Maybe<Scalars['numeric']>;
  offer_id?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type NftEarningsVarPopFields = {
  __typename?: 'nft_earnings_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type NftEarningsVarSampFields = {
  __typename?: 'nft_earnings_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type NftEarningsVarianceFields = {
  __typename?: 'nft_earnings_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "nft_listings" */
export type NftListings = {
  __typename?: 'nft_listings';
  accepted_at?: Maybe<Scalars['timestamp']>;
  accepted_offer_id?: Maybe<Scalars['bigint']>;
  approval_id: Scalars['numeric'];
  created_at: Scalars['timestamp'];
  currency: Scalars['String'];
  kind: Scalars['String'];
  listed_by: Scalars['String'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id: Scalars['String'];
  token_id: Scalars['String'];
  unlisted_at?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "nft_listings" */
export type NftListingsAggregate = {
  __typename?: 'nft_listings_aggregate';
  aggregate?: Maybe<NftListingsAggregateFields>;
  nodes: Array<NftListings>;
};

/** aggregate fields of "nft_listings" */
export type NftListingsAggregateFields = {
  __typename?: 'nft_listings_aggregate_fields';
  avg?: Maybe<NftListingsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<NftListingsMaxFields>;
  min?: Maybe<NftListingsMinFields>;
  stddev?: Maybe<NftListingsStddevFields>;
  stddev_pop?: Maybe<NftListingsStddevPopFields>;
  stddev_samp?: Maybe<NftListingsStddevSampFields>;
  sum?: Maybe<NftListingsSumFields>;
  var_pop?: Maybe<NftListingsVarPopFields>;
  var_samp?: Maybe<NftListingsVarSampFields>;
  variance?: Maybe<NftListingsVarianceFields>;
};


/** aggregate fields of "nft_listings" */
export type NftListingsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftListingsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "nft_listings" */
export type NftListingsAggregateOrderBy = {
  avg?: InputMaybe<NftListingsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<NftListingsMaxOrderBy>;
  min?: InputMaybe<NftListingsMinOrderBy>;
  stddev?: InputMaybe<NftListingsStddevOrderBy>;
  stddev_pop?: InputMaybe<NftListingsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<NftListingsStddevSampOrderBy>;
  sum?: InputMaybe<NftListingsSumOrderBy>;
  var_pop?: InputMaybe<NftListingsVarPopOrderBy>;
  var_samp?: InputMaybe<NftListingsVarSampOrderBy>;
  variance?: InputMaybe<NftListingsVarianceOrderBy>;
};

/** aggregate avg on columns */
export type NftListingsAvgFields = {
  __typename?: 'nft_listings_avg_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "nft_listings" */
export type NftListingsAvgOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "nft_listings". All fields are combined with a logical 'AND'. */
export type NftListingsBoolExp = {
  _and?: InputMaybe<Array<NftListingsBoolExp>>;
  _not?: InputMaybe<NftListingsBoolExp>;
  _or?: InputMaybe<Array<NftListingsBoolExp>>;
  accepted_at?: InputMaybe<TimestampComparisonExp>;
  accepted_offer_id?: InputMaybe<BigintComparisonExp>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  kind?: InputMaybe<StringComparisonExp>;
  listed_by?: InputMaybe<StringComparisonExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  price?: InputMaybe<NumericComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  unlisted_at?: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type NftListingsMaxFields = {
  __typename?: 'nft_listings_max_fields';
  accepted_at?: Maybe<Scalars['timestamp']>;
  accepted_offer_id?: Maybe<Scalars['bigint']>;
  approval_id?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  unlisted_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "nft_listings" */
export type NftListingsMaxOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  unlisted_at?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type NftListingsMinFields = {
  __typename?: 'nft_listings_min_fields';
  accepted_at?: Maybe<Scalars['timestamp']>;
  accepted_offer_id?: Maybe<Scalars['bigint']>;
  approval_id?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamp']>;
  currency?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listed_by?: Maybe<Scalars['String']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  receipt_id?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  unlisted_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "nft_listings" */
export type NftListingsMinOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  unlisted_at?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "nft_listings". */
export type NftListingsOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  kind?: InputMaybe<OrderBy>;
  listed_by?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  price?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  unlisted_at?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_listings" */
export enum NftListingsSelectColumn {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  AcceptedOfferId = 'accepted_offer_id',
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Kind = 'kind',
  /** column name */
  ListedBy = 'listed_by',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Price = 'price',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UnlistedAt = 'unlisted_at'
}

/** aggregate stddev on columns */
export type NftListingsStddevFields = {
  __typename?: 'nft_listings_stddev_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "nft_listings" */
export type NftListingsStddevOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type NftListingsStddevPopFields = {
  __typename?: 'nft_listings_stddev_pop_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "nft_listings" */
export type NftListingsStddevPopOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type NftListingsStddevSampFields = {
  __typename?: 'nft_listings_stddev_samp_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "nft_listings" */
export type NftListingsStddevSampOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "nft_listings" */
export type NftListingsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftListingsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftListingsStreamCursorValueInput = {
  accepted_at?: InputMaybe<Scalars['timestamp']>;
  accepted_offer_id?: InputMaybe<Scalars['bigint']>;
  approval_id?: InputMaybe<Scalars['numeric']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  currency?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  listed_by?: InputMaybe<Scalars['String']>;
  market_id?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  unlisted_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type NftListingsSumFields = {
  __typename?: 'nft_listings_sum_fields';
  accepted_offer_id?: Maybe<Scalars['bigint']>;
  approval_id?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "nft_listings" */
export type NftListingsSumOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type NftListingsVarPopFields = {
  __typename?: 'nft_listings_var_pop_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "nft_listings" */
export type NftListingsVarPopOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type NftListingsVarSampFields = {
  __typename?: 'nft_listings_var_samp_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "nft_listings" */
export type NftListingsVarSampOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type NftListingsVarianceFields = {
  __typename?: 'nft_listings_variance_fields';
  accepted_offer_id?: Maybe<Scalars['Float']>;
  approval_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "nft_listings" */
export type NftListingsVarianceOrderBy = {
  accepted_offer_id?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  price?: InputMaybe<OrderBy>;
};

/** columns and relationships of "nft_metadata" */
export type NftMetadata = {
  __typename?: 'nft_metadata';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  reference?: Maybe<Scalars['String']>;
  reference_blob?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
};


/** columns and relationships of "nft_metadata" */
export type NftMetadataReferenceBlobArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "nft_metadata" */
export type NftMetadataAggregate = {
  __typename?: 'nft_metadata_aggregate';
  aggregate?: Maybe<NftMetadataAggregateFields>;
  nodes: Array<NftMetadata>;
};

/** aggregate fields of "nft_metadata" */
export type NftMetadataAggregateFields = {
  __typename?: 'nft_metadata_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<NftMetadataMaxFields>;
  min?: Maybe<NftMetadataMinFields>;
};


/** aggregate fields of "nft_metadata" */
export type NftMetadataAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftMetadataSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "nft_metadata". All fields are combined with a logical 'AND'. */
export type NftMetadataBoolExp = {
  _and?: InputMaybe<Array<NftMetadataBoolExp>>;
  _not?: InputMaybe<NftMetadataBoolExp>;
  _or?: InputMaybe<Array<NftMetadataBoolExp>>;
  base_uri?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  media?: InputMaybe<StringComparisonExp>;
  media_hash?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_blob?: InputMaybe<JsonbComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type NftMetadataMaxFields = {
  __typename?: 'nft_metadata_max_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type NftMetadataMinFields = {
  __typename?: 'nft_metadata_min_fields';
  base_uri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  media_hash?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "nft_metadata". */
export type NftMetadataOrderBy = {
  base_uri?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  media?: InputMaybe<OrderBy>;
  media_hash?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_blob?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_metadata" */
export enum NftMetadataSelectColumn {
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  Description = 'description',
  /** column name */
  Extra = 'extra',
  /** column name */
  Id = 'id',
  /** column name */
  Media = 'media',
  /** column name */
  MediaHash = 'media_hash',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceBlob = 'reference_blob',
  /** column name */
  Title = 'title'
}

/** Streaming cursor of the table "nft_metadata" */
export type NftMetadataStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftMetadataStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftMetadataStreamCursorValueInput = {
  base_uri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['String']>;
  media_hash?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_blob?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "nft_offers" */
export type NftOffers = {
  __typename?: 'nft_offers';
  accepted_at?: Maybe<Scalars['timestamp']>;
  approval_id: Scalars['numeric'];
  currency: Scalars['String'];
  expires_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  listing?: Maybe<NftListings>;
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  /** An object relationship */
  nft_token?: Maybe<MbViewsNftTokens>;
  offer_id: Scalars['bigint'];
  offer_price: Scalars['numeric'];
  offered_at: Scalars['timestamp'];
  offered_by: Scalars['String'];
  receipt_id: Scalars['String'];
  referral_amount?: Maybe<Scalars['String']>;
  referrer_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  token?: Maybe<NftTokens>;
  token_id: Scalars['String'];
  withdrawn_at?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "nft_offers" */
export type NftOffersAggregate = {
  __typename?: 'nft_offers_aggregate';
  aggregate?: Maybe<NftOffersAggregateFields>;
  nodes: Array<NftOffers>;
};

/** aggregate fields of "nft_offers" */
export type NftOffersAggregateFields = {
  __typename?: 'nft_offers_aggregate_fields';
  avg?: Maybe<NftOffersAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<NftOffersMaxFields>;
  min?: Maybe<NftOffersMinFields>;
  stddev?: Maybe<NftOffersStddevFields>;
  stddev_pop?: Maybe<NftOffersStddevPopFields>;
  stddev_samp?: Maybe<NftOffersStddevSampFields>;
  sum?: Maybe<NftOffersSumFields>;
  var_pop?: Maybe<NftOffersVarPopFields>;
  var_samp?: Maybe<NftOffersVarSampFields>;
  variance?: Maybe<NftOffersVarianceFields>;
};


/** aggregate fields of "nft_offers" */
export type NftOffersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftOffersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "nft_offers" */
export type NftOffersAggregateOrderBy = {
  avg?: InputMaybe<NftOffersAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<NftOffersMaxOrderBy>;
  min?: InputMaybe<NftOffersMinOrderBy>;
  stddev?: InputMaybe<NftOffersStddevOrderBy>;
  stddev_pop?: InputMaybe<NftOffersStddevPopOrderBy>;
  stddev_samp?: InputMaybe<NftOffersStddevSampOrderBy>;
  sum?: InputMaybe<NftOffersSumOrderBy>;
  var_pop?: InputMaybe<NftOffersVarPopOrderBy>;
  var_samp?: InputMaybe<NftOffersVarSampOrderBy>;
  variance?: InputMaybe<NftOffersVarianceOrderBy>;
};

/** aggregate avg on columns */
export type NftOffersAvgFields = {
  __typename?: 'nft_offers_avg_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "nft_offers" */
export type NftOffersAvgOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "nft_offers". All fields are combined with a logical 'AND'. */
export type NftOffersBoolExp = {
  _and?: InputMaybe<Array<NftOffersBoolExp>>;
  _not?: InputMaybe<NftOffersBoolExp>;
  _or?: InputMaybe<Array<NftOffersBoolExp>>;
  accepted_at?: InputMaybe<TimestampComparisonExp>;
  approval_id?: InputMaybe<NumericComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  expires_at?: InputMaybe<TimestampComparisonExp>;
  listing?: InputMaybe<NftListingsBoolExp>;
  market_id?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  nft_token?: InputMaybe<MbViewsNftTokensBoolExp>;
  offer_id?: InputMaybe<BigintComparisonExp>;
  offer_price?: InputMaybe<NumericComparisonExp>;
  offered_at?: InputMaybe<TimestampComparisonExp>;
  offered_by?: InputMaybe<StringComparisonExp>;
  receipt_id?: InputMaybe<StringComparisonExp>;
  referral_amount?: InputMaybe<StringComparisonExp>;
  referrer_id?: InputMaybe<StringComparisonExp>;
  token?: InputMaybe<NftTokensBoolExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  withdrawn_at?: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type NftOffersMaxFields = {
  __typename?: 'nft_offers_max_fields';
  accepted_at?: Maybe<Scalars['timestamp']>;
  approval_id?: Maybe<Scalars['numeric']>;
  currency?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  offered_at?: Maybe<Scalars['timestamp']>;
  offered_by?: Maybe<Scalars['String']>;
  receipt_id?: Maybe<Scalars['String']>;
  referral_amount?: Maybe<Scalars['String']>;
  referrer_id?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  withdrawn_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "nft_offers" */
export type NftOffersMaxOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
  offered_at?: InputMaybe<OrderBy>;
  offered_by?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  referral_amount?: InputMaybe<OrderBy>;
  referrer_id?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  withdrawn_at?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type NftOffersMinFields = {
  __typename?: 'nft_offers_min_fields';
  accepted_at?: Maybe<Scalars['timestamp']>;
  approval_id?: Maybe<Scalars['numeric']>;
  currency?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  market_id?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
  offered_at?: Maybe<Scalars['timestamp']>;
  offered_by?: Maybe<Scalars['String']>;
  receipt_id?: Maybe<Scalars['String']>;
  referral_amount?: Maybe<Scalars['String']>;
  referrer_id?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  withdrawn_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "nft_offers" */
export type NftOffersMinOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
  offered_at?: InputMaybe<OrderBy>;
  offered_by?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  referral_amount?: InputMaybe<OrderBy>;
  referrer_id?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  withdrawn_at?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "nft_offers". */
export type NftOffersOrderBy = {
  accepted_at?: InputMaybe<OrderBy>;
  approval_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  listing?: InputMaybe<NftListingsOrderBy>;
  market_id?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  nft_token?: InputMaybe<MbViewsNftTokensOrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
  offered_at?: InputMaybe<OrderBy>;
  offered_by?: InputMaybe<OrderBy>;
  receipt_id?: InputMaybe<OrderBy>;
  referral_amount?: InputMaybe<OrderBy>;
  referrer_id?: InputMaybe<OrderBy>;
  token?: InputMaybe<NftTokensOrderBy>;
  token_id?: InputMaybe<OrderBy>;
  withdrawn_at?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_offers" */
export enum NftOffersSelectColumn {
  /** column name */
  AcceptedAt = 'accepted_at',
  /** column name */
  ApprovalId = 'approval_id',
  /** column name */
  Currency = 'currency',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  OfferId = 'offer_id',
  /** column name */
  OfferPrice = 'offer_price',
  /** column name */
  OfferedAt = 'offered_at',
  /** column name */
  OfferedBy = 'offered_by',
  /** column name */
  ReceiptId = 'receipt_id',
  /** column name */
  ReferralAmount = 'referral_amount',
  /** column name */
  ReferrerId = 'referrer_id',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  WithdrawnAt = 'withdrawn_at'
}

/** aggregate stddev on columns */
export type NftOffersStddevFields = {
  __typename?: 'nft_offers_stddev_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "nft_offers" */
export type NftOffersStddevOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type NftOffersStddevPopFields = {
  __typename?: 'nft_offers_stddev_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "nft_offers" */
export type NftOffersStddevPopOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type NftOffersStddevSampFields = {
  __typename?: 'nft_offers_stddev_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "nft_offers" */
export type NftOffersStddevSampOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "nft_offers" */
export type NftOffersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftOffersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftOffersStreamCursorValueInput = {
  accepted_at?: InputMaybe<Scalars['timestamp']>;
  approval_id?: InputMaybe<Scalars['numeric']>;
  currency?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['timestamp']>;
  market_id?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  offer_id?: InputMaybe<Scalars['bigint']>;
  offer_price?: InputMaybe<Scalars['numeric']>;
  offered_at?: InputMaybe<Scalars['timestamp']>;
  offered_by?: InputMaybe<Scalars['String']>;
  receipt_id?: InputMaybe<Scalars['String']>;
  referral_amount?: InputMaybe<Scalars['String']>;
  referrer_id?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  withdrawn_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type NftOffersSumFields = {
  __typename?: 'nft_offers_sum_fields';
  approval_id?: Maybe<Scalars['numeric']>;
  offer_id?: Maybe<Scalars['bigint']>;
  offer_price?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "nft_offers" */
export type NftOffersSumOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type NftOffersVarPopFields = {
  __typename?: 'nft_offers_var_pop_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "nft_offers" */
export type NftOffersVarPopOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type NftOffersVarSampFields = {
  __typename?: 'nft_offers_var_samp_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "nft_offers" */
export type NftOffersVarSampOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type NftOffersVarianceFields = {
  __typename?: 'nft_offers_variance_fields';
  approval_id?: Maybe<Scalars['Float']>;
  offer_id?: Maybe<Scalars['Float']>;
  offer_price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "nft_offers" */
export type NftOffersVarianceOrderBy = {
  approval_id?: InputMaybe<OrderBy>;
  offer_id?: InputMaybe<OrderBy>;
  offer_price?: InputMaybe<OrderBy>;
};

/** columns and relationships of "nft_tokens" */
export type NftTokens = {
  __typename?: 'nft_tokens';
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id: Scalars['String'];
  /** An object relationship */
  nft_contracts?: Maybe<NftContracts>;
  /** An array relationship */
  nft_listings: Array<NftListings>;
  /** An aggregate relationship */
  nft_listings_aggregate: NftListingsAggregate;
  owner: Scalars['String'];
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties?: Maybe<Scalars['jsonb']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  splits?: Maybe<Scalars['jsonb']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  token_id: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "nft_tokens" */
export type NftTokensNftListingsArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "nft_tokens" */
export type NftTokensNftListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


/** columns and relationships of "nft_tokens" */
export type NftTokensRoyaltiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "nft_tokens" */
export type NftTokensSplitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "nft_tokens" */
export type NftTokensAggregate = {
  __typename?: 'nft_tokens_aggregate';
  aggregate?: Maybe<NftTokensAggregateFields>;
  nodes: Array<NftTokens>;
};

/** aggregate fields of "nft_tokens" */
export type NftTokensAggregateFields = {
  __typename?: 'nft_tokens_aggregate_fields';
  avg?: Maybe<NftTokensAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<NftTokensMaxFields>;
  min?: Maybe<NftTokensMinFields>;
  stddev?: Maybe<NftTokensStddevFields>;
  stddev_pop?: Maybe<NftTokensStddevPopFields>;
  stddev_samp?: Maybe<NftTokensStddevSampFields>;
  sum?: Maybe<NftTokensSumFields>;
  var_pop?: Maybe<NftTokensVarPopFields>;
  var_samp?: Maybe<NftTokensVarSampFields>;
  variance?: Maybe<NftTokensVarianceFields>;
};


/** aggregate fields of "nft_tokens" */
export type NftTokensAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<NftTokensSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type NftTokensAvgFields = {
  __typename?: 'nft_tokens_avg_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "nft_tokens". All fields are combined with a logical 'AND'. */
export type NftTokensBoolExp = {
  _and?: InputMaybe<Array<NftTokensBoolExp>>;
  _not?: InputMaybe<NftTokensBoolExp>;
  _or?: InputMaybe<Array<NftTokensBoolExp>>;
  burned_receipt_id?: InputMaybe<StringComparisonExp>;
  burned_timestamp?: InputMaybe<TimestampComparisonExp>;
  copies?: InputMaybe<BigintComparisonExp>;
  expires_at?: InputMaybe<TimestampComparisonExp>;
  issued_at?: InputMaybe<TimestampComparisonExp>;
  last_transfer_receipt_id?: InputMaybe<StringComparisonExp>;
  last_transfer_timestamp?: InputMaybe<TimestampComparisonExp>;
  metadata_id?: InputMaybe<StringComparisonExp>;
  mint_memo?: InputMaybe<StringComparisonExp>;
  minted_receipt_id?: InputMaybe<StringComparisonExp>;
  minted_timestamp?: InputMaybe<TimestampComparisonExp>;
  minter?: InputMaybe<StringComparisonExp>;
  nft_contract_id?: InputMaybe<StringComparisonExp>;
  nft_contracts?: InputMaybe<NftContractsBoolExp>;
  nft_listings?: InputMaybe<NftListingsBoolExp>;
  owner?: InputMaybe<StringComparisonExp>;
  reference?: InputMaybe<StringComparisonExp>;
  reference_hash?: InputMaybe<StringComparisonExp>;
  royalties?: InputMaybe<JsonbComparisonExp>;
  royalties_percent?: InputMaybe<IntComparisonExp>;
  splits?: InputMaybe<JsonbComparisonExp>;
  starts_at?: InputMaybe<TimestampComparisonExp>;
  token_id?: InputMaybe<StringComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type NftTokensMaxFields = {
  __typename?: 'nft_tokens_max_fields';
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type NftTokensMinFields = {
  __typename?: 'nft_tokens_min_fields';
  burned_receipt_id?: Maybe<Scalars['String']>;
  burned_timestamp?: Maybe<Scalars['timestamp']>;
  copies?: Maybe<Scalars['bigint']>;
  expires_at?: Maybe<Scalars['timestamp']>;
  issued_at?: Maybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: Maybe<Scalars['String']>;
  last_transfer_timestamp?: Maybe<Scalars['timestamp']>;
  metadata_id?: Maybe<Scalars['String']>;
  mint_memo?: Maybe<Scalars['String']>;
  minted_receipt_id?: Maybe<Scalars['String']>;
  minted_timestamp?: Maybe<Scalars['timestamp']>;
  minter?: Maybe<Scalars['String']>;
  nft_contract_id?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  reference_hash?: Maybe<Scalars['String']>;
  royalties_percent?: Maybe<Scalars['Int']>;
  starts_at?: Maybe<Scalars['timestamp']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "nft_tokens". */
export type NftTokensOrderBy = {
  burned_receipt_id?: InputMaybe<OrderBy>;
  burned_timestamp?: InputMaybe<OrderBy>;
  copies?: InputMaybe<OrderBy>;
  expires_at?: InputMaybe<OrderBy>;
  issued_at?: InputMaybe<OrderBy>;
  last_transfer_receipt_id?: InputMaybe<OrderBy>;
  last_transfer_timestamp?: InputMaybe<OrderBy>;
  metadata_id?: InputMaybe<OrderBy>;
  mint_memo?: InputMaybe<OrderBy>;
  minted_receipt_id?: InputMaybe<OrderBy>;
  minted_timestamp?: InputMaybe<OrderBy>;
  minter?: InputMaybe<OrderBy>;
  nft_contract_id?: InputMaybe<OrderBy>;
  nft_contracts?: InputMaybe<NftContractsOrderBy>;
  nft_listings_aggregate?: InputMaybe<NftListingsAggregateOrderBy>;
  owner?: InputMaybe<OrderBy>;
  reference?: InputMaybe<OrderBy>;
  reference_hash?: InputMaybe<OrderBy>;
  royalties?: InputMaybe<OrderBy>;
  royalties_percent?: InputMaybe<OrderBy>;
  splits?: InputMaybe<OrderBy>;
  starts_at?: InputMaybe<OrderBy>;
  token_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** select columns of table "nft_tokens" */
export enum NftTokensSelectColumn {
  /** column name */
  BurnedReceiptId = 'burned_receipt_id',
  /** column name */
  BurnedTimestamp = 'burned_timestamp',
  /** column name */
  Copies = 'copies',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  IssuedAt = 'issued_at',
  /** column name */
  LastTransferReceiptId = 'last_transfer_receipt_id',
  /** column name */
  LastTransferTimestamp = 'last_transfer_timestamp',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  MintMemo = 'mint_memo',
  /** column name */
  MintedReceiptId = 'minted_receipt_id',
  /** column name */
  MintedTimestamp = 'minted_timestamp',
  /** column name */
  Minter = 'minter',
  /** column name */
  NftContractId = 'nft_contract_id',
  /** column name */
  Owner = 'owner',
  /** column name */
  Reference = 'reference',
  /** column name */
  ReferenceHash = 'reference_hash',
  /** column name */
  Royalties = 'royalties',
  /** column name */
  RoyaltiesPercent = 'royalties_percent',
  /** column name */
  Splits = 'splits',
  /** column name */
  StartsAt = 'starts_at',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type NftTokensStddevFields = {
  __typename?: 'nft_tokens_stddev_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type NftTokensStddevPopFields = {
  __typename?: 'nft_tokens_stddev_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type NftTokensStddevSampFields = {
  __typename?: 'nft_tokens_stddev_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "nft_tokens" */
export type NftTokensStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: NftTokensStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type NftTokensStreamCursorValueInput = {
  burned_receipt_id?: InputMaybe<Scalars['String']>;
  burned_timestamp?: InputMaybe<Scalars['timestamp']>;
  copies?: InputMaybe<Scalars['bigint']>;
  expires_at?: InputMaybe<Scalars['timestamp']>;
  issued_at?: InputMaybe<Scalars['timestamp']>;
  last_transfer_receipt_id?: InputMaybe<Scalars['String']>;
  last_transfer_timestamp?: InputMaybe<Scalars['timestamp']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  mint_memo?: InputMaybe<Scalars['String']>;
  minted_receipt_id?: InputMaybe<Scalars['String']>;
  minted_timestamp?: InputMaybe<Scalars['timestamp']>;
  minter?: InputMaybe<Scalars['String']>;
  nft_contract_id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  reference_hash?: InputMaybe<Scalars['String']>;
  royalties?: InputMaybe<Scalars['jsonb']>;
  royalties_percent?: InputMaybe<Scalars['Int']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  starts_at?: InputMaybe<Scalars['timestamp']>;
  token_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type NftTokensSumFields = {
  __typename?: 'nft_tokens_sum_fields';
  copies?: Maybe<Scalars['bigint']>;
  royalties_percent?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type NftTokensVarPopFields = {
  __typename?: 'nft_tokens_var_pop_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type NftTokensVarSampFields = {
  __typename?: 'nft_tokens_var_samp_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type NftTokensVarianceFields = {
  __typename?: 'nft_tokens_variance_fields';
  copies?: Maybe<Scalars['Float']>;
  royalties_percent?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: BlocksAggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table: "mb_store_minters" */
  mb_store_minters: Array<MbStoreMinters>;
  /** fetch aggregated fields from the table: "mb_store_minters" */
  mb_store_minters_aggregate: MbStoreMintersAggregate;
  /** fetch data from the table: "mb_store_minters" using primary key columns */
  mb_store_minters_by_pk?: Maybe<MbStoreMinters>;
  /** fetch data from the table: "mb_views.active_listings" */
  mb_views_active_listings: Array<MbViewsActiveListings>;
  /** fetch aggregated fields from the table: "mb_views.active_listings" */
  mb_views_active_listings_aggregate: MbViewsActiveListingsAggregate;
  /** fetch data from the table: "mb_views.active_listings_rollup" */
  mb_views_active_listings_rollup: Array<MbViewsActiveListingsRollup>;
  /** fetch aggregated fields from the table: "mb_views.active_listings_rollup" */
  mb_views_active_listings_rollup_aggregate: MbViewsActiveListingsRollupAggregate;
  /** fetch data from the table: "mb_views.auctions_with_offer" */
  mb_views_auctions_with_offer: Array<MbViewsAuctionsWithOffer>;
  /** fetch aggregated fields from the table: "mb_views.auctions_with_offer" */
  mb_views_auctions_with_offer_aggregate: MbViewsAuctionsWithOfferAggregate;
  /** fetch data from the table: "mb_views.nft_activities" */
  mb_views_nft_activities: Array<MbViewsNftActivities>;
  /** fetch aggregated fields from the table: "mb_views.nft_activities" */
  mb_views_nft_activities_aggregate: MbViewsNftActivitiesAggregate;
  /** fetch data from the table: "mb_views.nft_metadata" */
  mb_views_nft_metadata: Array<MbViewsNftMetadata>;
  /** fetch aggregated fields from the table: "mb_views.nft_metadata" */
  mb_views_nft_metadata_aggregate: MbViewsNftMetadataAggregate;
  /** fetch data from the table: "mb_views.nft_metadata_unburned" */
  mb_views_nft_metadata_unburned: Array<MbViewsNftMetadataUnburned>;
  /** fetch aggregated fields from the table: "mb_views.nft_metadata_unburned" */
  mb_views_nft_metadata_unburned_aggregate: MbViewsNftMetadataUnburnedAggregate;
  /** fetch data from the table: "mb_views.nft_owned_tokens" */
  mb_views_nft_owned_tokens: Array<MbViewsNftOwnedTokens>;
  /** fetch aggregated fields from the table: "mb_views.nft_owned_tokens" */
  mb_views_nft_owned_tokens_aggregate: MbViewsNftOwnedTokensAggregate;
  /** fetch data from the table: "mb_views.nft_tokens" */
  mb_views_nft_tokens: Array<MbViewsNftTokens>;
  /** fetch aggregated fields from the table: "mb_views.nft_tokens" */
  mb_views_nft_tokens_aggregate: MbViewsNftTokensAggregate;
  /** fetch data from the table: "mb_views.nft_tokens_with_listing" */
  mb_views_nft_tokens_with_listing: Array<MbViewsNftTokensWithListing>;
  /** fetch aggregated fields from the table: "mb_views.nft_tokens_with_listing" */
  mb_views_nft_tokens_with_listing_aggregate: MbViewsNftTokensWithListingAggregate;
  /** fetch data from the table: "mb_views.top_stores" */
  mb_views_top_stores: Array<MbViewsTopStores>;
  /** fetch aggregated fields from the table: "mb_views.top_stores" */
  mb_views_top_stores_aggregate: MbViewsTopStoresAggregate;
  /** fetch data from the table: "nft_activities" */
  nft_activities: Array<NftActivities>;
  /** fetch aggregated fields from the table: "nft_activities" */
  nft_activities_aggregate: NftActivitiesAggregate;
  /** fetch data from the table: "nft_activities" using primary key columns */
  nft_activities_by_pk?: Maybe<NftActivities>;
  /** fetch data from the table: "nft_contracts" */
  nft_contracts: Array<NftContracts>;
  /** fetch aggregated fields from the table: "nft_contracts" */
  nft_contracts_aggregate: NftContractsAggregate;
  /** fetch data from the table: "nft_contracts" using primary key columns */
  nft_contracts_by_pk?: Maybe<NftContracts>;
  /** fetch data from the table: "nft_earnings" */
  nft_earnings: Array<NftEarnings>;
  /** fetch aggregated fields from the table: "nft_earnings" */
  nft_earnings_aggregate: NftEarningsAggregate;
  /** fetch data from the table: "nft_earnings" using primary key columns */
  nft_earnings_by_pk?: Maybe<NftEarnings>;
  /** An array relationship */
  nft_listings: Array<NftListings>;
  /** An aggregate relationship */
  nft_listings_aggregate: NftListingsAggregate;
  /** fetch data from the table: "nft_listings" using primary key columns */
  nft_listings_by_pk?: Maybe<NftListings>;
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: Array<NftMetadata>;
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: NftMetadataAggregate;
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk?: Maybe<NftMetadata>;
  /** fetch data from the table: "nft_offers" */
  nft_offers: Array<NftOffers>;
  /** fetch aggregated fields from the table: "nft_offers" */
  nft_offers_aggregate: NftOffersAggregate;
  /** fetch data from the table: "nft_offers" using primary key columns */
  nft_offers_by_pk?: Maybe<NftOffers>;
  /** fetch data from the table: "nft_tokens" */
  nft_tokens: Array<NftTokens>;
  /** fetch aggregated fields from the table: "nft_tokens" */
  nft_tokens_aggregate: NftTokensAggregate;
  /** fetch data from the table: "nft_tokens" using primary key columns */
  nft_tokens_by_pk?: Maybe<NftTokens>;
};


export type QueryRootBlocksArgs = {
  distinct_on?: InputMaybe<Array<BlocksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BlocksOrderBy>>;
  where?: InputMaybe<BlocksBoolExp>;
};


export type QueryRootBlocksAggregateArgs = {
  distinct_on?: InputMaybe<Array<BlocksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BlocksOrderBy>>;
  where?: InputMaybe<BlocksBoolExp>;
};


export type QueryRootBlocksByPkArgs = {
  synced_height: Scalars['bigint'];
};


export type QueryRootMbStoreMintersArgs = {
  distinct_on?: InputMaybe<Array<MbStoreMintersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbStoreMintersOrderBy>>;
  where?: InputMaybe<MbStoreMintersBoolExp>;
};


export type QueryRootMbStoreMintersAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbStoreMintersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbStoreMintersOrderBy>>;
  where?: InputMaybe<MbStoreMintersBoolExp>;
};


export type QueryRootMbStoreMintersByPkArgs = {
  minter_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
};


export type QueryRootMbViewsActiveListingsArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


export type QueryRootMbViewsActiveListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


export type QueryRootMbViewsActiveListingsRollupArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsRollupSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsRollupOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
};


export type QueryRootMbViewsActiveListingsRollupAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsRollupSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsRollupOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
};


export type QueryRootMbViewsAuctionsWithOfferArgs = {
  distinct_on?: InputMaybe<Array<MbViewsAuctionsWithOfferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsAuctionsWithOfferOrderBy>>;
  where?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
};


export type QueryRootMbViewsAuctionsWithOfferAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsAuctionsWithOfferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsAuctionsWithOfferOrderBy>>;
  where?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
};


export type QueryRootMbViewsNftActivitiesArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftActivitiesOrderBy>>;
  where?: InputMaybe<MbViewsNftActivitiesBoolExp>;
};


export type QueryRootMbViewsNftActivitiesAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftActivitiesOrderBy>>;
  where?: InputMaybe<MbViewsNftActivitiesBoolExp>;
};


export type QueryRootMbViewsNftMetadataArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataBoolExp>;
};


export type QueryRootMbViewsNftMetadataAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataBoolExp>;
};


export type QueryRootMbViewsNftMetadataUnburnedArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataUnburnedSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataUnburnedOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
};


export type QueryRootMbViewsNftMetadataUnburnedAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataUnburnedSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataUnburnedOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
};


export type QueryRootMbViewsNftOwnedTokensArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftOwnedTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftOwnedTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
};


export type QueryRootMbViewsNftOwnedTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftOwnedTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftOwnedTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
};


export type QueryRootMbViewsNftTokensArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensBoolExp>;
};


export type QueryRootMbViewsNftTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensBoolExp>;
};


export type QueryRootMbViewsNftTokensWithListingArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensWithListingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensWithListingOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
};


export type QueryRootMbViewsNftTokensWithListingAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensWithListingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensWithListingOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
};


export type QueryRootMbViewsTopStoresArgs = {
  distinct_on?: InputMaybe<Array<MbViewsTopStoresSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsTopStoresOrderBy>>;
  where?: InputMaybe<MbViewsTopStoresBoolExp>;
};


export type QueryRootMbViewsTopStoresAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsTopStoresSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsTopStoresOrderBy>>;
  where?: InputMaybe<MbViewsTopStoresBoolExp>;
};


export type QueryRootNftActivitiesArgs = {
  distinct_on?: InputMaybe<Array<NftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftActivitiesOrderBy>>;
  where?: InputMaybe<NftActivitiesBoolExp>;
};


export type QueryRootNftActivitiesAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftActivitiesOrderBy>>;
  where?: InputMaybe<NftActivitiesBoolExp>;
};


export type QueryRootNftActivitiesByPkArgs = {
  kind: Scalars['String'];
  nft_contract_id: Scalars['String'];
  receipt_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type QueryRootNftContractsArgs = {
  distinct_on?: InputMaybe<Array<NftContractsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftContractsOrderBy>>;
  where?: InputMaybe<NftContractsBoolExp>;
};


export type QueryRootNftContractsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftContractsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftContractsOrderBy>>;
  where?: InputMaybe<NftContractsBoolExp>;
};


export type QueryRootNftContractsByPkArgs = {
  id: Scalars['String'];
};


export type QueryRootNftEarningsArgs = {
  distinct_on?: InputMaybe<Array<NftEarningsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftEarningsOrderBy>>;
  where?: InputMaybe<NftEarningsBoolExp>;
};


export type QueryRootNftEarningsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftEarningsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftEarningsOrderBy>>;
  where?: InputMaybe<NftEarningsBoolExp>;
};


export type QueryRootNftEarningsByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  receiver_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type QueryRootNftListingsArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


export type QueryRootNftListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


export type QueryRootNftListingsByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type QueryRootNftMetadataArgs = {
  distinct_on?: InputMaybe<Array<NftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftMetadataOrderBy>>;
  where?: InputMaybe<NftMetadataBoolExp>;
};


export type QueryRootNftMetadataAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftMetadataOrderBy>>;
  where?: InputMaybe<NftMetadataBoolExp>;
};


export type QueryRootNftMetadataByPkArgs = {
  id: Scalars['String'];
};


export type QueryRootNftOffersArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


export type QueryRootNftOffersAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


export type QueryRootNftOffersByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  offer_id: Scalars['bigint'];
  token_id: Scalars['String'];
};


export type QueryRootNftTokensArgs = {
  distinct_on?: InputMaybe<Array<NftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftTokensOrderBy>>;
  where?: InputMaybe<NftTokensBoolExp>;
};


export type QueryRootNftTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftTokensOrderBy>>;
  where?: InputMaybe<NftTokensBoolExp>;
};


export type QueryRootNftTokensByPkArgs = {
  nft_contract_id: Scalars['String'];
  token_id: Scalars['String'];
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: BlocksAggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table in a streaming manner : "blocks" */
  blocks_stream: Array<Blocks>;
  /** fetch data from the table: "mb_store_minters" */
  mb_store_minters: Array<MbStoreMinters>;
  /** fetch aggregated fields from the table: "mb_store_minters" */
  mb_store_minters_aggregate: MbStoreMintersAggregate;
  /** fetch data from the table: "mb_store_minters" using primary key columns */
  mb_store_minters_by_pk?: Maybe<MbStoreMinters>;
  /** fetch data from the table in a streaming manner : "mb_store_minters" */
  mb_store_minters_stream: Array<MbStoreMinters>;
  /** fetch data from the table: "mb_views.active_listings" */
  mb_views_active_listings: Array<MbViewsActiveListings>;
  /** fetch aggregated fields from the table: "mb_views.active_listings" */
  mb_views_active_listings_aggregate: MbViewsActiveListingsAggregate;
  /** fetch data from the table: "mb_views.active_listings_rollup" */
  mb_views_active_listings_rollup: Array<MbViewsActiveListingsRollup>;
  /** fetch aggregated fields from the table: "mb_views.active_listings_rollup" */
  mb_views_active_listings_rollup_aggregate: MbViewsActiveListingsRollupAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.active_listings_rollup" */
  mb_views_active_listings_rollup_stream: Array<MbViewsActiveListingsRollup>;
  /** fetch data from the table in a streaming manner : "mb_views.active_listings" */
  mb_views_active_listings_stream: Array<MbViewsActiveListings>;
  /** fetch data from the table: "mb_views.auctions_with_offer" */
  mb_views_auctions_with_offer: Array<MbViewsAuctionsWithOffer>;
  /** fetch aggregated fields from the table: "mb_views.auctions_with_offer" */
  mb_views_auctions_with_offer_aggregate: MbViewsAuctionsWithOfferAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.auctions_with_offer" */
  mb_views_auctions_with_offer_stream: Array<MbViewsAuctionsWithOffer>;
  /** fetch data from the table: "mb_views.nft_activities" */
  mb_views_nft_activities: Array<MbViewsNftActivities>;
  /** fetch aggregated fields from the table: "mb_views.nft_activities" */
  mb_views_nft_activities_aggregate: MbViewsNftActivitiesAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_activities" */
  mb_views_nft_activities_stream: Array<MbViewsNftActivities>;
  /** fetch data from the table: "mb_views.nft_metadata" */
  mb_views_nft_metadata: Array<MbViewsNftMetadata>;
  /** fetch aggregated fields from the table: "mb_views.nft_metadata" */
  mb_views_nft_metadata_aggregate: MbViewsNftMetadataAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_metadata" */
  mb_views_nft_metadata_stream: Array<MbViewsNftMetadata>;
  /** fetch data from the table: "mb_views.nft_metadata_unburned" */
  mb_views_nft_metadata_unburned: Array<MbViewsNftMetadataUnburned>;
  /** fetch aggregated fields from the table: "mb_views.nft_metadata_unburned" */
  mb_views_nft_metadata_unburned_aggregate: MbViewsNftMetadataUnburnedAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_metadata_unburned" */
  mb_views_nft_metadata_unburned_stream: Array<MbViewsNftMetadataUnburned>;
  /** fetch data from the table: "mb_views.nft_owned_tokens" */
  mb_views_nft_owned_tokens: Array<MbViewsNftOwnedTokens>;
  /** fetch aggregated fields from the table: "mb_views.nft_owned_tokens" */
  mb_views_nft_owned_tokens_aggregate: MbViewsNftOwnedTokensAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_owned_tokens" */
  mb_views_nft_owned_tokens_stream: Array<MbViewsNftOwnedTokens>;
  /** fetch data from the table: "mb_views.nft_tokens" */
  mb_views_nft_tokens: Array<MbViewsNftTokens>;
  /** fetch aggregated fields from the table: "mb_views.nft_tokens" */
  mb_views_nft_tokens_aggregate: MbViewsNftTokensAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_tokens" */
  mb_views_nft_tokens_stream: Array<MbViewsNftTokens>;
  /** fetch data from the table: "mb_views.nft_tokens_with_listing" */
  mb_views_nft_tokens_with_listing: Array<MbViewsNftTokensWithListing>;
  /** fetch aggregated fields from the table: "mb_views.nft_tokens_with_listing" */
  mb_views_nft_tokens_with_listing_aggregate: MbViewsNftTokensWithListingAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.nft_tokens_with_listing" */
  mb_views_nft_tokens_with_listing_stream: Array<MbViewsNftTokensWithListing>;
  /** fetch data from the table: "mb_views.top_stores" */
  mb_views_top_stores: Array<MbViewsTopStores>;
  /** fetch aggregated fields from the table: "mb_views.top_stores" */
  mb_views_top_stores_aggregate: MbViewsTopStoresAggregate;
  /** fetch data from the table in a streaming manner : "mb_views.top_stores" */
  mb_views_top_stores_stream: Array<MbViewsTopStores>;
  /** fetch data from the table: "nft_activities" */
  nft_activities: Array<NftActivities>;
  /** fetch aggregated fields from the table: "nft_activities" */
  nft_activities_aggregate: NftActivitiesAggregate;
  /** fetch data from the table: "nft_activities" using primary key columns */
  nft_activities_by_pk?: Maybe<NftActivities>;
  /** fetch data from the table in a streaming manner : "nft_activities" */
  nft_activities_stream: Array<NftActivities>;
  /** fetch data from the table: "nft_contracts" */
  nft_contracts: Array<NftContracts>;
  /** fetch aggregated fields from the table: "nft_contracts" */
  nft_contracts_aggregate: NftContractsAggregate;
  /** fetch data from the table: "nft_contracts" using primary key columns */
  nft_contracts_by_pk?: Maybe<NftContracts>;
  /** fetch data from the table in a streaming manner : "nft_contracts" */
  nft_contracts_stream: Array<NftContracts>;
  /** fetch data from the table: "nft_earnings" */
  nft_earnings: Array<NftEarnings>;
  /** fetch aggregated fields from the table: "nft_earnings" */
  nft_earnings_aggregate: NftEarningsAggregate;
  /** fetch data from the table: "nft_earnings" using primary key columns */
  nft_earnings_by_pk?: Maybe<NftEarnings>;
  /** fetch data from the table in a streaming manner : "nft_earnings" */
  nft_earnings_stream: Array<NftEarnings>;
  /** An array relationship */
  nft_listings: Array<NftListings>;
  /** An aggregate relationship */
  nft_listings_aggregate: NftListingsAggregate;
  /** fetch data from the table: "nft_listings" using primary key columns */
  nft_listings_by_pk?: Maybe<NftListings>;
  /** fetch data from the table in a streaming manner : "nft_listings" */
  nft_listings_stream: Array<NftListings>;
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: Array<NftMetadata>;
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: NftMetadataAggregate;
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk?: Maybe<NftMetadata>;
  /** fetch data from the table in a streaming manner : "nft_metadata" */
  nft_metadata_stream: Array<NftMetadata>;
  /** fetch data from the table: "nft_offers" */
  nft_offers: Array<NftOffers>;
  /** fetch aggregated fields from the table: "nft_offers" */
  nft_offers_aggregate: NftOffersAggregate;
  /** fetch data from the table: "nft_offers" using primary key columns */
  nft_offers_by_pk?: Maybe<NftOffers>;
  /** fetch data from the table in a streaming manner : "nft_offers" */
  nft_offers_stream: Array<NftOffers>;
  /** fetch data from the table: "nft_tokens" */
  nft_tokens: Array<NftTokens>;
  /** fetch aggregated fields from the table: "nft_tokens" */
  nft_tokens_aggregate: NftTokensAggregate;
  /** fetch data from the table: "nft_tokens" using primary key columns */
  nft_tokens_by_pk?: Maybe<NftTokens>;
  /** fetch data from the table in a streaming manner : "nft_tokens" */
  nft_tokens_stream: Array<NftTokens>;
};


export type SubscriptionRootBlocksArgs = {
  distinct_on?: InputMaybe<Array<BlocksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BlocksOrderBy>>;
  where?: InputMaybe<BlocksBoolExp>;
};


export type SubscriptionRootBlocksAggregateArgs = {
  distinct_on?: InputMaybe<Array<BlocksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BlocksOrderBy>>;
  where?: InputMaybe<BlocksBoolExp>;
};


export type SubscriptionRootBlocksByPkArgs = {
  synced_height: Scalars['bigint'];
};


export type SubscriptionRootBlocksStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BlocksStreamCursorInput>>;
  where?: InputMaybe<BlocksBoolExp>;
};


export type SubscriptionRootMbStoreMintersArgs = {
  distinct_on?: InputMaybe<Array<MbStoreMintersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbStoreMintersOrderBy>>;
  where?: InputMaybe<MbStoreMintersBoolExp>;
};


export type SubscriptionRootMbStoreMintersAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbStoreMintersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbStoreMintersOrderBy>>;
  where?: InputMaybe<MbStoreMintersBoolExp>;
};


export type SubscriptionRootMbStoreMintersByPkArgs = {
  minter_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
};


export type SubscriptionRootMbStoreMintersStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbStoreMintersStreamCursorInput>>;
  where?: InputMaybe<MbStoreMintersBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsRollupArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsRollupSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsRollupOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsRollupAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsActiveListingsRollupSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsActiveListingsRollupOrderBy>>;
  where?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsRollupStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsActiveListingsRollupStreamCursorInput>>;
  where?: InputMaybe<MbViewsActiveListingsRollupBoolExp>;
};


export type SubscriptionRootMbViewsActiveListingsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsActiveListingsStreamCursorInput>>;
  where?: InputMaybe<MbViewsActiveListingsBoolExp>;
};


export type SubscriptionRootMbViewsAuctionsWithOfferArgs = {
  distinct_on?: InputMaybe<Array<MbViewsAuctionsWithOfferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsAuctionsWithOfferOrderBy>>;
  where?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
};


export type SubscriptionRootMbViewsAuctionsWithOfferAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsAuctionsWithOfferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsAuctionsWithOfferOrderBy>>;
  where?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
};


export type SubscriptionRootMbViewsAuctionsWithOfferStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsAuctionsWithOfferStreamCursorInput>>;
  where?: InputMaybe<MbViewsAuctionsWithOfferBoolExp>;
};


export type SubscriptionRootMbViewsNftActivitiesArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftActivitiesOrderBy>>;
  where?: InputMaybe<MbViewsNftActivitiesBoolExp>;
};


export type SubscriptionRootMbViewsNftActivitiesAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftActivitiesOrderBy>>;
  where?: InputMaybe<MbViewsNftActivitiesBoolExp>;
};


export type SubscriptionRootMbViewsNftActivitiesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftActivitiesStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftActivitiesBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftMetadataStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftMetadataBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataUnburnedArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataUnburnedSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataUnburnedOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataUnburnedAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftMetadataUnburnedSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftMetadataUnburnedOrderBy>>;
  where?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
};


export type SubscriptionRootMbViewsNftMetadataUnburnedStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftMetadataUnburnedStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftMetadataUnburnedBoolExp>;
};


export type SubscriptionRootMbViewsNftOwnedTokensArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftOwnedTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftOwnedTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftOwnedTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftOwnedTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftOwnedTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftOwnedTokensStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftOwnedTokensStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftOwnedTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftTokensStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftTokensBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensWithListingArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensWithListingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensWithListingOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensWithListingAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsNftTokensWithListingSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsNftTokensWithListingOrderBy>>;
  where?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
};


export type SubscriptionRootMbViewsNftTokensWithListingStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsNftTokensWithListingStreamCursorInput>>;
  where?: InputMaybe<MbViewsNftTokensWithListingBoolExp>;
};


export type SubscriptionRootMbViewsTopStoresArgs = {
  distinct_on?: InputMaybe<Array<MbViewsTopStoresSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsTopStoresOrderBy>>;
  where?: InputMaybe<MbViewsTopStoresBoolExp>;
};


export type SubscriptionRootMbViewsTopStoresAggregateArgs = {
  distinct_on?: InputMaybe<Array<MbViewsTopStoresSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MbViewsTopStoresOrderBy>>;
  where?: InputMaybe<MbViewsTopStoresBoolExp>;
};


export type SubscriptionRootMbViewsTopStoresStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MbViewsTopStoresStreamCursorInput>>;
  where?: InputMaybe<MbViewsTopStoresBoolExp>;
};


export type SubscriptionRootNftActivitiesArgs = {
  distinct_on?: InputMaybe<Array<NftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftActivitiesOrderBy>>;
  where?: InputMaybe<NftActivitiesBoolExp>;
};


export type SubscriptionRootNftActivitiesAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftActivitiesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftActivitiesOrderBy>>;
  where?: InputMaybe<NftActivitiesBoolExp>;
};


export type SubscriptionRootNftActivitiesByPkArgs = {
  kind: Scalars['String'];
  nft_contract_id: Scalars['String'];
  receipt_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type SubscriptionRootNftActivitiesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftActivitiesStreamCursorInput>>;
  where?: InputMaybe<NftActivitiesBoolExp>;
};


export type SubscriptionRootNftContractsArgs = {
  distinct_on?: InputMaybe<Array<NftContractsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftContractsOrderBy>>;
  where?: InputMaybe<NftContractsBoolExp>;
};


export type SubscriptionRootNftContractsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftContractsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftContractsOrderBy>>;
  where?: InputMaybe<NftContractsBoolExp>;
};


export type SubscriptionRootNftContractsByPkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRootNftContractsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftContractsStreamCursorInput>>;
  where?: InputMaybe<NftContractsBoolExp>;
};


export type SubscriptionRootNftEarningsArgs = {
  distinct_on?: InputMaybe<Array<NftEarningsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftEarningsOrderBy>>;
  where?: InputMaybe<NftEarningsBoolExp>;
};


export type SubscriptionRootNftEarningsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftEarningsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftEarningsOrderBy>>;
  where?: InputMaybe<NftEarningsBoolExp>;
};


export type SubscriptionRootNftEarningsByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  receiver_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type SubscriptionRootNftEarningsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftEarningsStreamCursorInput>>;
  where?: InputMaybe<NftEarningsBoolExp>;
};


export type SubscriptionRootNftListingsArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


export type SubscriptionRootNftListingsAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftListingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftListingsOrderBy>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


export type SubscriptionRootNftListingsByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type SubscriptionRootNftListingsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftListingsStreamCursorInput>>;
  where?: InputMaybe<NftListingsBoolExp>;
};


export type SubscriptionRootNftMetadataArgs = {
  distinct_on?: InputMaybe<Array<NftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftMetadataOrderBy>>;
  where?: InputMaybe<NftMetadataBoolExp>;
};


export type SubscriptionRootNftMetadataAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftMetadataSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftMetadataOrderBy>>;
  where?: InputMaybe<NftMetadataBoolExp>;
};


export type SubscriptionRootNftMetadataByPkArgs = {
  id: Scalars['String'];
};


export type SubscriptionRootNftMetadataStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftMetadataStreamCursorInput>>;
  where?: InputMaybe<NftMetadataBoolExp>;
};


export type SubscriptionRootNftOffersArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


export type SubscriptionRootNftOffersAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftOffersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftOffersOrderBy>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


export type SubscriptionRootNftOffersByPkArgs = {
  approval_id: Scalars['numeric'];
  market_id: Scalars['String'];
  nft_contract_id: Scalars['String'];
  offer_id: Scalars['bigint'];
  token_id: Scalars['String'];
};


export type SubscriptionRootNftOffersStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftOffersStreamCursorInput>>;
  where?: InputMaybe<NftOffersBoolExp>;
};


export type SubscriptionRootNftTokensArgs = {
  distinct_on?: InputMaybe<Array<NftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftTokensOrderBy>>;
  where?: InputMaybe<NftTokensBoolExp>;
};


export type SubscriptionRootNftTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<NftTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<NftTokensOrderBy>>;
  where?: InputMaybe<NftTokensBoolExp>;
};


export type SubscriptionRootNftTokensByPkArgs = {
  nft_contract_id: Scalars['String'];
  token_id: Scalars['String'];
};


export type SubscriptionRootNftTokensStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<NftTokensStreamCursorInput>>;
  where?: InputMaybe<NftTokensBoolExp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type TimestampComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};
