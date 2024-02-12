import { GraphQLClient } from 'graphql-request';
import { attributeRarityMock } from './attributeRarity.mock';
import { attributeRarity } from './attributeRarity';
import { AttributeRarityResults } from './attributeRarity.type';


jest.mock('graphql-request');

const attributeRarityProps = {
  contractId: 'foo.testnet',
  attributeType: 'eyes',
  attributeValue: 'blue',
};

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

    const result = await attributeRarity(attributeRarityProps);

    expect(result?.data).toBe(
      '33.33%',
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributeRarityResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await attributeRarity(attributeRarityProps);

    expect(call).toStrictEqual({ error: errMessage });

  });
});
