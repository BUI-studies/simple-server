import Model from './index.model.js'
import {_TRANSACTIONS, _WALLETS} from '../stubs/index.js'
import {_TRANSACTION_TYPES} from "../emuns/index.js";

function Transaction(category, type, ownerId, wallet, amount, comment, optionalID) {
  this.id = optionalID || _TRANSACTIONS.length + 1
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
    const targetWallet = _WALLETS.find(w => w.id === transaction.wallet)

    switch (transaction.type) {
      case _TRANSACTION_TYPES.INCOME:
        targetWallet.balance += transaction.amount
        break
      case _TRANSACTION_TYPES.OUTCOME:
        targetWallet.balance -= transaction.amount
        break
      default:
        throw new TypeError('Invalid transaction type')
    }

    targetWallet.transactions.push(newTransaction)
    _TRANSACTIONS.push(newTransaction)


    return newTransaction
  }

  static async put(id, newEntity) {
    if (!id || !newEntity.name || !newEntity.owner || !newEntity.type)
      throw new TypeError('id is missed')

    const transaction = _TRANSACTIONS.find(t => t.id === id)

    if (!transaction) new Error('No such transaction')

    const index = _TRANSACTIONS.indexOf(transaction)
    const newTransaction = new Transaction(
      newEntity.name,
      newEntity.owner,
      newEntity.owner,
      newEntity.wallet,
      newEntity.amount,
      newEntity.comment,
      `${transaction.id}_1`
    )

    _TRANSACTIONS.splice(index, 1, newTransaction)

    _WALLETS.find(w => w.id === newTransaction.wallet).recalculateBalance()

    return _TRANSACTIONS[index]
  }

  static async patch(id, newEntity) {
    const transactionToUpdate = _TRANSACTIONS.find(t => t.id === id)

    Object.keys(newEntity).forEach(key => {
      transactionToUpdate[key] = newEntity[key]
    })

    _WALLETS.find(w => w.id === transactionToUpdate.wallet).recalculateBalance()

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
    const wallet = _WALLETS.find(w => w.id === tr.wallet)
    const walletIndex = wallet.transactions.findIndex(t => t.id === id)

    wallet.transactions.splice(walletIndex, 1)

    return _TRANSACTIONS.splice(index, 1)[0]
  }
}
