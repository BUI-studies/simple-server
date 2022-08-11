/**
 * TASK-01
 *
 * Створити екран адмін-панелі з відображенням користувачів у системі.
 *
 * У першу чергу користувач має бачити на екрані лише один інпут, де має ввести своє імʼя.
 *
 * Якщо користувач з таким імʼям у системі інсує - відрендерити на сторінці список усіх користувачів.
 * Якщо такого користувача нема - показати повідомлення про помилку під полем для вводу.
 *
 * на екрані відображаються картки користувачів у системі. Кожен користувач має:
 * - ім'я
 * - роль
 *
 * Якщо у користувача, під імʼям якого увійшли в систему є роль admin:
 * - відображати кнопку для видалення користувача на кожній картці
 * - відображати ролі усіх користувачів як поля для вводу даних, щоб мати можливість змінити роль будь якого користувача
 *
 * У якості API використовувати сервер - https://github.com/BUI-studies/simple-server
 * Для його запуску:
 * - клонувати репозиторій
 * - у теці репозиторію виконати команду npm install
 * - запустити команду npm dev або npm start
 */

// fetch('http://localhost:8080/api/users')
//   .then(res => res.json())
//   .then(users => {
//     console.log(users)
//   })

function User(name, role) {
  this.name = name
  this.role = role

  this.elements = {
    self: document.createElement('div'),
    name: document.createElement('h3'),
    role: document.createElement('p')
  }

  this.render = parent => {
    this.elements.self.classList.add('users__item')
    this.elements.name.classList.add('users__name')
    this.elements.role.classList.add('users__role')

    this.elements.name.innerText = this.name
    this.elements.role.innerText = this.role

    this.elements.self.append(this.elements.name, this.elements.role)

    parent.append(this.elements.self)
  }
}

const authInput = document.createElement('input')
const authBtn = document.createElement('button')
const container = document.querySelector('.container')
const usersWrapper = document.querySelector('.users')

const renderAllUsers = users => {
  users.forEach(user => {
    const userItem = new User(user.name, user.role)
    userItem.render(usersWrapper)
  })
}

authInput.type = 'text'
authInput.placeholder = 'Enter your name'

authBtn.textContent = 'ok'
// authBtn.addEventListener('click', () => {
//   fetch('http://localhost:8080/api/users')
//     .then(res => res.json())
//     .then(users => {
//       const foundUser = users.find(user => user.name === authInput.value)

//       if (!foundUser) {
//         return alert('User not found')
//       }

//       localStorage.setItem('user', JSON.stringify(foundUser))
//       authBtn.remove()
//       authInput.remove()
//       renderAllUsers(users)
//     })
// })

authBtn.addEventListener('click', async () => {
  const response = await fetch(
    `http://localhost:8080/api/users?name=${authInput.value}`
  )
  const users = await response.json()

  if (!users.length) {
    return alert('User not found')
  }

  if (users.length === 1 && users[0].role === 'admin') {
    localStorage.setItem('user', JSON.stringify(users[0]))
    authBtn.remove()
    authInput.remove()
    renderAllUsers(users)
  }
})

container.append(authInput, authBtn)
