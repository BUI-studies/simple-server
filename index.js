import express, { json, urlencoded } from 'express'
import path from 'path'
import cors from 'cors'

import {
  usersRoutes,
  walletsRoutes,
  transactionsRoutes,
  categoryRoutes
} from './src/routes/index.js'

const app = express()

app.use(json())
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname('')) + '/public/'))

app.use('/api/users', usersRoutes)
app.use('/api/wallets', walletsRoutes)
app.use('/api/transactions', transactionsRoutes)
app.use('/api/categories', categoryRoutes)

app.listen(8080, () => {
  console.log(`Server is running on port: 8080`)
})
