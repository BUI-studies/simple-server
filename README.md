# це простенький сервер для відпрацювання роботи із запитами

Створений для використання у навчанні та домашках. Імітуємо серверну частину додатку для ведення сімейних фінансів.

### Перелік основних сутностей:

- User: користувач
- Transaction: будь яка операція з грошима
- Wallet: грошовий гаманець

## Як робити запити?

### отримати сутність по ID:

```javascript
const request = fetch(`/${entityName}/${entityID}`)
```

### отримати усі сутністі якогось типу:

```javascript
const request = fetch(`/${entityName}/`)
```

### створити новий екземпляр сутності:

```javascript
const newEntity = {
  // ...
}
const request = fetch(`/${entityName}/`, {
  method: 'POST',
  body: JSON.stringify(newEntity)
})
```

### змінити сутність:

```javascript
const modifyedEntity = {
  // ...
}
const request = fetch(`/${entityName}/${entityID}`, {
  method: 'PUT',
  body: JSON.stringify(modifyedEntity)
})
```

або

```javascript
const modifyedEntity = {
  // ...
}
const request = fetch(`/${entityName}/${entityID}`, {
  method: 'PATCH',
  body: JSON.stringify(modifyedEntity)
})
```

### видалити сутність:

```javascript
const newEntity = {
  // ...
}
const request = fetch(`/${entityName}/${entityID}`, {
  method: 'DELETE'
})
```
