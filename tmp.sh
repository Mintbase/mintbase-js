args=$(echo '{"token_id":"1","balance":"10000","max_len_payout":100}' | base64)

echo "$args"

echo "$args" | base64 -d

read -r -d '' body <<EOF
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "run.mintbase1.near",
    "method_name": "nft_payout",
    "args_base64": "$args"
  }
}
EOF

echo "$body"

curl "https://rpc.mainnet.near.org" \
  -H 'Content-type: application/json' \
  -d "$body"
