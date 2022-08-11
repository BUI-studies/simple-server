import Model from './index.model.js'
import { _USERS } from '../stubs/index.js'

function User(name, wallets = [], transactions = [], optId) {
  this.id = optId || (_USERS.length + 1).toString()
  this.name = name
  this.wallets = wallets
  this.transactions = transactions
}

export default class UsersModel extends Model {
  static async create(user = {}) {
    const newUser = new User(user.name, user.wallets, user.transactions)

    _USERS.push(newUser)

    return newUser
  }

  static async put(id, newEntity) {
    if (!id || !newEntity.name)
      throw new TypeError('Required properties missed: id or name')

    const user = _USERS.find(user => user.id === id)
    console.log(id, 'user', user)

    if (!user) new Error('No such user')

    const index = _USERS.indexOf(user)

    _USERS[index] = new User(
      newEntity.name,
      newEntity.wallets,
      newEntity.transactions,
      `${user.id}_1`
    )
    console.log(_USERS)

    return _USERS[index]
  }

  static async patch(id, newEntity) {
    const userToUpdate = _USERS.find(user => user.id === id)

    Object.keys(newEntity).forEach(key => {
      userToUpdate[key] = newEntity[key]
    })

    return userToUpdate
  }

  static async getAll() {
    return _USERS
  }

  static async getById(id) {
    return _USERS.find(user => user.id === id)
  }

  static async find(query) {
    return _USERS.filter(user => {
      return Object.keys(query).every(key => user[key] === query[key])
    })
  }

  static async remove(id) {
    const removed = _USERS.splice(
      _USERS.findIndex(user => user.id === id),
      1
    )

    return removed[0]
  }
}
