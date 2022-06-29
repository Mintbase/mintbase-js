import { transactions } from 'near-api-js'
import {
  createTransaction,
  functionCall,
  Transaction,
  Action,
} from 'near-api-js/lib/transaction'

const executeMultipleTransactions = async ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const nearTransactions = await Promise.all(
    transactions.map((tx, i) => {
      return _createTransaction({
        receiverId: tx.receiverId,
        actions: tx.functionCalls.map((fc) =>
          functionCall(fc.methodName, fc.args, fc.gas, fc.attachedDeposit)
        ),
        nonceOffset: i + 1,
      })
    })
  )

  return transactions
}

const _createTransaction = ({
  receiverId,
  actions,
  nonceOffset,
}: {
  receiverId: any
  actions: Action[]
  nonceOffset: number
}) => {
  return
}
