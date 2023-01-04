import { GraphQLClient } from "graphql-request";
import { tokenOwner, TokenOwnerQueryResult } from "./tokenOwner";
import { tokenOwnerMock } from "./tokenOwner.mock";

jest.mock("graphql-request");

describe("getTokenOwnerByTokenIdAndContractId", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it("returns data", async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnerQueryResult> =>
        Promise.resolve(tokenOwnerMock),
    }));
    const result = await tokenOwner("test.id", "contract.id");
    expect(result?.data).toStrictEqual("test.near");
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
