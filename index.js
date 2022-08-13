import express, { json, urlencoded } from 'express'
import path from 'path'

import {
  usersRoutes,
  walletsRoutes,
  transactionsRoutes
} from './src/routes/index.js'

const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname('')) + '/public/'))

app.use('/api/users', usersRoutes)
app.use('/api/wallets', walletsRoutes)
app.use('/api/transactions', transactionsRoutes)

app.listen(8080, () => {
  console.log(`Server is running on port: 8080`)
})
