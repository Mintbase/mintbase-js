NODE_URL='https://rpc.ankr.com/eth'

txHash() {
  # Check if exactly two arguments are provided
  if [ "$#" -ne 2 ]; then
    echo "Usage: txHash block_number tx_index"
    return 1
  fi

  # Extract block_number and tx_index from function arguments
  block_number="$1"
  tx_index="$2"

  # Convert block_number and tx_index to hex
  hex_block_number=$(printf "0x%x" "$block_number")
  hex_tx_index=$(printf "0x%x" "$tx_index")

  # Make the curl POST request
  curl -s -X POST "$NODE_URL" \
    --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["'"$hex_block_number"'", "'"$hex_tx_index"'"],"id":1}' | jq
}

txHash 15000143 9 | jq -r '.result.hash'
