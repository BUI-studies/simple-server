import Model from './index.model.js'
import { _TRANSACTIONS } from '../stubs/index.js'

function Transaction(category, ownerId, wallet, amount, comment) {
  this.id = _TRANSACTIONS.length + 1
  this.category = category
  this.owner = ownerId
  this.wallet = wallet
  this.amount = amount
  this.comment = comment
}

export default class TransactionsModel extends Model {
  static create(transaction = {}) {
    if (
      !transaction.category ||
      !transaction.owner ||
      !transaction.wallet ||
      !transaction.amount
    )
      throw new TypeError('Required props missing')

    const newTransaction = new Transaction(
      transaction.category,
      transaction.owner,
      transaction.wallet,
      transaction.amount,
      transaction.comment
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
