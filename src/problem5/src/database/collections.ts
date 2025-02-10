import { Db } from 'mongodb'
import mongoDB from './mongoDB.config'

export const collectionName = {
  token: 'token'
} as const

class CollectionManager {
  private static db: Db = mongoDB.Db

  private static getCollection<T>(name: (typeof collectionName)[keyof typeof collectionName]) {
    //@ts-ignore
    return this.db.collection<T>(name)
  }

  static get token() {
    return this.getCollection<any>(collectionName.token)
  }
}

const collections = CollectionManager

export default collections
