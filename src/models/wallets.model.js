import Model from './index.model.js'
import { _WALLETS} from '../stubs/index.js'

function Wallet(name, owner, optId) {
  this.id = optId || (_WALLETS.length + 1).toString()
  this.name = name
  this.owner = owner
  this.transactions = []
  this.balance = 0
}

export default class WalletsModel extends Model {
  static async create(wallet = {}) {
    const newWallet = new Wallet(wallet.name, wallet.owner)

    _WALLETS.push(newWallet)

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

  static async getAll() {
    return _WALLETS
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
