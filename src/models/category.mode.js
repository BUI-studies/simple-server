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
  static async create(category = {}) {
    if (!category.name) throw new TypeError('Required props missing')

    const newCategory = {
      id: this.getNextId(),
      name: category.name,
      owner: category.owner,
      type: category.type,
      wallet: category.wallet,
      amount: category.amount,
      comment: category.comment
    }

    this.categories.push(newCategory)

    return newCategory
  }
}
