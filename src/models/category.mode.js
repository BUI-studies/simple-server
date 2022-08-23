import { _CATEGORIES } from '../stubs'
import Model from './index.model'

function Category(owner, name, icon, comment) {
  this.id = _CATEGORIES.length + 1
  this.owner = owner
  this.name = name
  this.icon = icon
  this.comment = comment
}

export default class CategoryModel extends Model {
  static async getAll(ownerId) {
    return _CATEGORIES.filter(c => c.owner === ownerId)
  }

  static async getById(id) {
    return _CATEGORIES.find(t => t.id === id)
  }

  static async findAll (query) {
    return _CATEGORIES.filter(c => Object.keys(query).every(key => c[key] === query[key]))
  }

  static async create(category = {}) {
    if (!category.owner || !category.name || !category.icon)
      throw new TypeError('Required props missing')

    const newCategory = new Category(
      category.owner,
      category.name,
      category.icon,
      category.comment
    )

    _CATEGORIES.push(newCategory)

    return newCategory
  }

  static async patch(id, newEntity) {
    const categoryToUpdate = _CATEGORIES.find(t => t.id === id)

    if (!categoryToUpdate) new Error('No such category')

    const index = _CATEGORIES.indexOf(categoryToUpdate)

    _CATEGORIES[index] = new Category(
      newEntity.owner,
      newEntity.name,
      newEntity.icon,
      newEntity.comment
    )

    return _CATEGORIES[index]
  }

  static async remove(id) {
    const categoryToDelete = _CATEGORIES.find(t => t.id === id)

    if (!categoryToDelete) new Error('No such category')

    const index = _CATEGORIES.indexOf(categoryToDelete)

    _CATEGORIES.splice(index, 1)

    return _CATEGORIES
  }
}
