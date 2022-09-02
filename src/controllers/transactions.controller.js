import TransactionsModel from '../models/transactions.model.js'
import { _TRANSACTION_TYPES } from '../emuns/index.js'

const getAll = async (req, res) => {
  const ownerID = req.params.id

  if (Object.keys(req.query).length > 0) {
    res
      .status(200)
      .send(await TransactionsModel.findAll({ ...req.query, owner: ownerID }))
  } else {
    res.status(200).send(await TransactionsModel.getAll(ownerID))
  }
}

const save = async (req, res) => {
  const transaction = req.body

  if (
    !transaction.category ||
    !transaction.type ||
    !transaction.owner ||
    !transaction.wallet ||
    !transaction.amount
  )
    throw new TypeError(
      'Required properties missed: type, fromWallet, toWallet or amount'
    )

  if (!_TRANSACTION_TYPES[transaction.type])
    throw new TypeError('Invalid transaction type')

  res.send(await TransactionsModel.create(transaction))
}

const patch = async (req, res) => {
  const { id } = req.params
  const transaction = req.body

  if (transaction?.type && !_TRANSACTION_TYPES[transaction.type])
    throw new TypeError('Invalid transaction type')

  res.send(await TransactionsModel.patch(id, transaction))
}

const put = async (req, res) => {
  const { id } = req.params
  const transaction = req.body

  if (
    !transaction.category ||
    !transaction.type ||
    !transaction.owner ||
    !transaction.wallet ||
    !transaction.amount
  )
    throw new TypeError(
      'Required properties missed: type, fromWallet, toWallet or amount'
    )

  if (!_TRANSACTION_TYPES[transaction.type])
    throw new TypeError('Invalid transaction type')

  res.send(await TransactionsModel.put(id, wallet))
}

const del = async (req, res) => {
  const { id } = req.params

  if (!id) throw new TypeError('Required argument id is missing')

  res.send(await TransactionsModel.remove(id))
}

export default {
  getAll,
  save,
  patch,
  put,
  del
}
