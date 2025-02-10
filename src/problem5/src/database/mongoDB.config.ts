import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'

config()

const uri = process.env.MONGO_URI as string

class MongoInstance {
  private client: MongoClient
  public Db: Db

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.Db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.Db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }
}

const mongoDB = new MongoInstance()

export default mongoDB
