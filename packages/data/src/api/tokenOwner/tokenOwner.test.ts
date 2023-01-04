import { GraphQLClient } from "graphql-request";
import { tokenOwner, TokenOwnerQueryResult } from "./tokenOwner";

jest.mock("graphql-request");

describe("tokenListingCountsByMetaId", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it("returns data", async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnerQueryResult> =>
        Promise.resolve({
          tokens: [
            {
              tokenId: "foo",
              contractId: "foo",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ],
        }),
    }));
    const result = await tokenOwner("test.id", "contract.id");
    expect(result?.data?.length).toBeGreaterThan(0);
  });

  it("should handle errors", async () => {
    const errMessage = "exploded";
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnerQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenOwner("test.id", "contract.id");

    expect(call).toStrictEqual({ error: errMessage });
  });
});
