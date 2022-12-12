/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';
import { Attribute, attributesByMetaId, NftAttributesQueryResult } from './attributesByMetaId';

jest.mock('graphql-request');

describe('attributesByMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  test('should handle errors', async () => {
    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<Attribute[]> => Promise.reject(errMessage),
    }));
    await expect(attributesByMetaId('test.id')).rejects.toThrow(exploded);
  });

  test('should get attributes', async () => {
    const attributes: Attribute[] =  [{
      'attribute_display_type': 'BidText',
      'attribute_value': 'Glowing metal near Submarine',
      'attribute_type': 'BidText',
    },
    {
      'attribute_display_type': 'date',
      'attribute_value': null,
      'attribute_type': 'Start Date',
    },
    {
      'attribute_display_type': 'date',
      'attribute_value': null,
      'attribute_type': 'End Date',
    },
    {
      'attribute_display_type': 'BidAmount',
      'attribute_value': '3.6 N',
      'attribute_type': 'BidAmount',
    }];
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<NftAttributesQueryResult> =>
        Promise.resolve({
          nft_attributes: attributes,
        }),
    }));
    const result = await attributesByMetaId('test.id');
    await expect(result).toStrictEqual(attributes);
  });

});

