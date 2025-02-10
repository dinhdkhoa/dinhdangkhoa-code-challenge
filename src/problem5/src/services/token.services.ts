import collections from '~/database/collections'

export const getTokens = async () => {
  const tokens = await collections.token.find().toArray()
  return tokens
}
