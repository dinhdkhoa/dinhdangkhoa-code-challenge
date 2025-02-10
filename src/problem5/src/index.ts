import express from 'express'
import mongoDB from './database/mongoDB.config'
import cors from 'cors'
import routes from './routes'
import { errorHandlerMiddleware } from './middlewares/errors-handler.middleware'

mongoDB.connect()

const app = express()
app.use(cors())
app.use(express.json())

const port = 4000

app.use('/', routes)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
