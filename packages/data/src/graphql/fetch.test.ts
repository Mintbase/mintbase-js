import { GRAPHQL_ENDPOINTS, RPC_ENDPOINTS } from '@mintbase-js/sdk';
import { GraphQLClient, gql } from 'graphql-request';
import { fetchGraphQl } from './fetch';
import { mbjs } from '@mintbase-js/sdk';


type FakeData = {
  foo: string;
}

const fakeQuery = gql`query data(){}`;

describe('graphql/fetch', () => {
 

  // it('should return no Network Error Message if no network is passed', async () => {
   
  //   mbjs.keys = {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //   // @ts-ignore
  //     network: '',
  //   };
  //   const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery });
  //   expect(error).toBeDefined();
  //   expect(error).toBe('Please set a network.');
  // });

  it('should return invalid Network Error Message if network is wrong', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery, network: 'aaaa' });
    expect(error).toBeDefined();
    expect(error).toBe('Please add a valid Network');
  });

  it('returns data prop of type T when things go well, setting network on the method', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.resolve({ foo: 'bar' }),
    }));
    const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery, network: 'testnet' });
    expect(data).toBeDefined();
    expect(error).not.toBeDefined();
    expect(data?.foo).toBe('bar');
  });


  it('returns data prop of type T when things go well, setting network on mbjs.config method', async () => {

    mbjs.keys = {
      isSet: true,
      network: 'testnet',
      graphqlUrl: GRAPHQL_ENDPOINTS['testnet'],
      nearRpcUrl: RPC_ENDPOINTS['testnet'],
      contractAddress: 'bbb',
    },
    
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.resolve({ foo: 'bar' }),
    }));
    const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery  });
    expect(error).not.toBeDefined();
    expect(data).toBeDefined();
    expect(data?.foo).toBe('bar');
  });

  it('returns error in error prop', async () => {
    const boom = 'boom!';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.reject(new Error(boom)),
    }));
    const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery });
    expect(data).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toBe(boom);
  });
});
