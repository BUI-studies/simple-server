import { _ROLES } from '../emuns/index.js'

export const _USERS = [
  {
    id: '1',
    name: 'Gogi Doe',
    password: '!123123',
    role: _ROLES.ADMIN,
    wallets: [],
    transactions: []
  },
  {
    id: '2',
    name: 'Josefina Altsberg',
    password: '!123123',
    role: _ROLES.USER,
    wallets: [],
    transactions: []
  }
]
export const _TRANSACTIONS = []
export const _WALLETS = [
  {
    id: '1',
    name: 'cash',
    owner: '1',
    transactions: [],
    balance: 300
  }
]
export const _CATEGORIES = [
  {
    id: '1',
    name: 'Sudden',
    icon: '😉',
    comment: 'some comment',
    owner: '1'
  },
  {
    id: '2',
    name: 'Odd',
    icon: '👀',
    comment: 'some comment',
    owner: '1'
  }
]
