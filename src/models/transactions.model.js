import Model from './index.model.js'
import { _TRANSACTIONS } from '../stubs/index.js'

function Transaction(
  type,
  senderId,
  senderWalletId,
  recipientId,
  recipientWalletId,
  amount
) {
  this.id = _TRANSACTIONS.length + 1
  this.from = senderId
  this.to = recipientId
  this.fromWallet = senderWalletId
  this.toWallet = recipientWalletId
  this.amount = amount
}

export default class TransactionsModel extends Model {
  static create(transaction = {}) {
    if (
      !transaction.from ||
      !transaction.to ||
      !transaction.fromWallet ||
      !transaction.toWallet ||
      !transaction.amount
    )
      throw new TypeError('Required props missing')

    const newTransaction = new Transaction(
      transaction.id,
      transaction.from,
      transaction.to,
      transaction.fromWallet,
      transaction.toWallet,
      transaction.amount
    )

    _TRANSACTIONS.push(newUser)

    return newTransaction
  }

  static async getAll() {
    return _TRANSACTIONS
  }

  static async getById(id) {
    return _TRANSACTIONS.find(tr => tr.id === id)
  }

  static async find(query) {
    return _TRANSACTIONS.filter(tr => {
      return Object.keys(query).every(key => tr[key] === query[key])
    })
  }

  static async remove(id) {
    const removed = _TRANSACTIONS.find(tr => tr.id === id)
    _TRANSACTIONS = _TRANSACTIONS.filter(tr => tr.id !== id)

    return removed
  }
}
