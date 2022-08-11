import UsersModel from '../models/users.model.js'

const getAll = async (req, res) => {
  if (Object.keys(req.params).length > 0) {
    res.status(200).send(await UsersModel.findAll(req.params))
  } else {
    res.status(200).send(await UsersModel.getAll())
  }
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
