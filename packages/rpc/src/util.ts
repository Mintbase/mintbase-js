import { NEAR_RPC_URL } from "./constants";
import fetch from "isomorphic-unfetch";

export const requestFromNearRpc = async (
  body: Record<string, any>
): Promise<Record<string, any> | undefined> => {
  const res = await fetch(NEAR_RPC_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json" },
  });

  return res.json();
};
