import UsersModel from '../models/users.model.js'

const getAll = async (_, res) => {
  const allUsers = await UsersModel.getAll()

  res.status(200).send(allUsers)
}

const save = async (req, res) => {
  const user = req.body

  if (!user.name) throw new TypeError('Name is required')

  res.send(await UsersModel.create(user))
}

const patch = async (req, res) => {
  const { id } = req.params
  const user = req.body

  if (!id || !user) throw new TypeError('Required arguments is missing')

  res.send(await UsersModel.patch(id, user))
}

const put = async (req, res) => {
  const { id } = req.params
  const user = req.body

  if (!id || !user) throw new TypeError('Required arguments is missing')

  res.send(await UsersModel.put(id, user))
}

const del = async (req, res) => {
  const { id } = req.params

  if (!id) throw new TypeError('Required arguments is missing')

  res.send(await UsersModel.remove(id))
}

export default {
  getAll,
  save,
  patch,
  put,
  del
}
