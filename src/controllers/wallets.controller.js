import WalletsModel from '../models/wallets.model.js'

const getAll = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    res.status(200).send(await WalletsModel.findAll(req.query))
  } else {
    res.status(200).send(await WalletsModel.getAll(req.params.id))
  }
}

const save = async (req, res) => {
  const wallet = req.body

  if (!wallet.name || !wallet.owner)
    throw new TypeError('Required arguments missing: name, owner')
  const newWallet = await WalletsModel.create(wallet)

  res.send(newWallet)
}

const patch = async (req, res) => {
  const {id} = req.params
  const wallet = req.body

  res.send(await WalletsModel.patch(id, wallet))
}

const put = async (req, res) => {
  const {id} = req.params
  const wallet = req.body

  if (!wallet.name || !wallet.owner)
    throw new TypeError('Required arguments missing: name, owner')

  res.send(await WalletsModel.put(id, wallet))
}

const del = async (req, res) => {
  const {id} = req.params

  if (!id) throw new TypeError('Required argument id is missing')

  res.send(await WalletsModel.remove(id))
}

export default {
  getAll,
  save,
  patch,
  put,
  del
}
