import CategoryModel from "../models/category.model.js";

const getAll = async (req, res) => {
  const ownerID = req.params.userID

  if (Object.keys(req.query).length > 0) {
    res.status(200).send(await CategoryModel.findAll({...req.query, owner: ownerID}))
  } else {
    res.status(200).send(await CategoryModel.getAll(ownerID))
  }
}

const save = async (req, res) => {
  const category = req.body

  if (!category.name || !category.owner || !category.icon) throw new TypeError('Required arguments missing: name, owner or icon')

  res.send(await CategoryModel.create(category))
}

const patch = async (req, res) => {
  const {id} = req.params
  const category = req.body

  res.send(await CategoryModel.patch(id, category))
}

const put = async (req, res) => {
  const {id} = req.params
  const category = req.body

  if (!category.name || !category.owner || !category.icon) throw new TypeError('Required arguments missing: name, owner')

  res.send(await CategoryModel.put(id, category))
}

const del = async (req, res) => {
  const {id} = req.params

  if (!id) throw new TypeError('Required argument id is missing')

  res.send(await CategoryModel.remove(id))
}

export default {
  getAll,
  save,
  patch,
  put,
  del
}
