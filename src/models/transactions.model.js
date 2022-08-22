import Model from './index.model.js'
import { _TRANSACTIONS } from '../stubs/index.js'

function Transaction(category, type, ownerId, wallet, amount, comment) {
  this.id = _TRANSACTIONS.length + 1
  this.type = type
  this.category = category
  this.owner = ownerId
  this.wallet = wallet
  this.amount = amount
  this.comment = comment
}

export default class TransactionsModel extends Model {
  static async create(transaction = {}) {
    if (
      !transaction.category ||
      !transaction.type ||
      !transaction.owner ||
      !transaction.wallet ||
      !transaction.amount
    )
      throw new TypeError('Required props missing')

    const newTransaction = new Transaction(
      transaction.category,
      transaction.type,
      transaction.owner,
      transaction.wallet,
      transaction.amount,
      transaction.comment
    )

    _TRANSACTIONS.push(newTransaction)

    return newTransaction
  }

  static async put(id, newEntity) {
    if (!id || !newEntity.name || !newEntity.owner || !newEntity.type)
      throw new TypeError('id is missed')

    const transaction = _TRANSACTIONS.find(t => t.id === id)

    if (!transaction) new Error('No such transaction')

    const index = _TRANSACTIONS.indexOf(transaction)

    _TRANSACTIONS[index] = new User(
      newEntity.name,
      newEntity.owner,
      `${transaction.id}_1`
    )

    return _TRANSACTIONS[index]
  }

  static async patch(id, newEntity) {
    const transactionToUpdate = _TRANSACTIONS.find(t => t.id === id)

    Object.keys(newEntity).forEach(key => {
      transactionToUpdate[key] = newEntity[key]
    })

    return transactionToUpdate
  }

  static async getAll() {
    return _TRANSACTIONS
  }

  static async getById(id) {
    return _TRANSACTIONS.find(t => t.id === id)
  }

  static async findAll(query) {
    return _TRANSACTIONS.filter(t => {
      return Object.keys(query).every(key => t[key] === query[key])
    })
  }

  static async remove(id) {
    const tr = _TRANSACTIONS.find(t => t.id === id)
    const index = _TRANSACTIONS.indexOf(tr)

    tr.fromWallet.transactions.splice(
      tr.fromWallet.transactions.findIndex(t => t.id === id),
      1
    )
    tr.toWallet.transactions.splice(
      tr.toWallet.transactions.findIndex(t => t.id === id),
      1
    )

    return _TRANSACTIONS.splice(index, 1)[0]
  }
}
