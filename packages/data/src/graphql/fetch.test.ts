import { GraphQLClient, gql } from 'graphql-request';
import { fetchGraphQl } from './fetch';


type FakeData = {
  foo: string;
}

const fakeQuery = gql`query data(){}`;

describe('graphql/fetch', () => {
  it('returns data prop of type T when things go well', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.resolve({ foo: 'bar' }),
    }));
    const { data, error } = await fetchGraphQl<FakeData>({ query: fakeQuery });
    expect(data).toBeDefined();
    expect(error).not.toBeDefined();
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
