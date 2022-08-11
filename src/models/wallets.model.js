import Model from './index.model.js'
import { _WALLETS } from '../stubs/index.js'

function Wallet(name, userId) {
  this.id = _WALLETS.length + 1
  this.name = name
  this.userId = userId
  this.transactions = []
}

export default class WalletsModel extends Model {
  static create(wallet = {}) {
    if (!wallet.name || !wallet.userId)
      throw new TypeError('Required props missing')

    const newWallet = new Wallet(wallet.name, wallet.userId)

    _WALLETS.push(newWallet)

    return newWallet
  }

  static async getAll() {
    return _WALLETS
  }

  static async getById(id) {
    return _WALLETS.find(WalletsModel => WalletsModel.id === id)
  }

  static async find(query) {
    return _WALLETS.filter(wallet => {
      return Object.keys(query).every(key => wallet[key] === query[key])
    })
  }

  static async remove(id) {
    const removed = _WALLETS.find(wallet => wallet.id === id)
    _WALLETS = _WALLETS.filter(wallet => wallet.id !== id)

    return removed
  }
}
