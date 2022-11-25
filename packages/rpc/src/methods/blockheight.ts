import { NEAR_RPC_URL } from "../constants";
import superagent from "superagent";

export const getBlockHeight = async () => {
  const res = await superagent
    .post(NEAR_RPC_URL)
    .send({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "status",
      params: [],
    })
    .set("Content-type", "application/json");
  return res._body.result.sync_info.latest_block_height;
};