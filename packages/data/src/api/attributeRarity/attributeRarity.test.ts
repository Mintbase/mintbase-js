import { GraphQLClient } from 'graphql-request';
import { attributeRarityMock } from './attributeRarity.mock';
import { attributeRarity } from './attributeRarity';
import { AttributeRarityResults } from './attributeRarity.type';


jest.mock('graphql-request');

describe('attributeRarity', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return attribute rarity', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributeRarityResults> => Promise.resolve(attributeRarityMock),
    }));

    const result = await attributeRarity('test.mintbase1.near', 'head', 'big');

    expect(result?.data).toBe(
      '33.33%',
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributeRarityResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await attributeRarity('test.mintbase1.near', 'head', 'big');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
