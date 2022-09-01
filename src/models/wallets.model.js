import Model from './index.model.js'
import { _WALLETS } from '../stubs/index.js'
import {_TRANSACTION_TYPES} from "../emuns/index.js";

export function Wallet(name, owner, balance, optId) {
  this.id = optId || (_WALLETS.length + 1).toString()
  this.name = name
  this.owner = owner
  this.transactions = []
  this.initialBalance = balance || 0
  this.balance = balance || 0
}

Wallet.prototype.recalculateBalance = function() {
  this.balance = this.transactions.reduce((acc, curr) => {
    if(curr.type === _TRANSACTION_TYPES.INCOME) {
      return acc + curr.amount
    } else if(curr.type === _TRANSACTION_TYPES.OUTCOME) {
      return acc - curr.amount
    }
    throw new TypeError('Invalid transaction type found')
  }, this.initialBalance)
}

export default class WalletsModel extends Model {
  static async create(wallet = {}) {
    const newWallet = new Wallet(wallet.name, wallet.owner, wallet.balance)

    _WALLETS.push(newWallet)
    console.log(_WALLETS)

    return newWallet
  }

  static async put(id, newEntity) {
    if (!id || !newEntity.name || !newEntity.owner)
      throw new TypeError('Required properties missed: id, name or owner')

    const wallet = _WALLETS.find(w => w.id === id)

    if (!wallet) new Error('No such wallet')

    const index = _WALLETS.indexOf(wallet)

    _WALLETS[index] = new User(
      newEntity.name,
      newEntity.owner,
      `${wallet.id}_1`
    )

    return _WALLETS[index]
  }

  static async patch(id, newEntity) {
    const walletToUpdate = _WALLETS.find(w => w.id === id)

    Object.keys(newEntity).forEach(key => {
      walletToUpdate[key] = newEntity[key]
    })

    return walletToUpdate
  }

  static async getAll(ownerId) {
    return _WALLETS.filter(w => w.owner === ownerId)
  }

  static async getById(id) {
    return _WALLETS.find(w => w.id === id)
  }

  static async findAll(query) {
    return _WALLETS.filter(w => {
      return Object.keys(query).every(key => w[key] === query[key])
    })
  }

  static async remove(id) {
    const removed = _WALLETS.splice(
      _WALLETS.findIndex(w => w.id === id),
      1
    )

    return removed[0]
  }
}
