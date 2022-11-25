import { getBlockHeight } from "./blockheight";

describe("getBlockHeight", () => {
  it("should return a numeric, non-negative block height", async () => {
    const h = await getBlockHeight();
    expect(typeof h).toBe("number");
    expect(h > 0).toBe(true);
  });
});
