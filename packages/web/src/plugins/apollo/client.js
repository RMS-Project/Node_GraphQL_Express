import { ApolloClient } from "@apollo/client"

// Cache para o Apollo.
import { InMemoryCache } from 'apollo-cache-inmemory'

import link from './link'

// Muito utilizado para trocar nomes de atributos.
// Alterando o comportamento do Apollo e como ele vai lidar com isso.
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,

  // Em produção definir um flag tipo:
  //connectToDevTools: process.env // Que seja diferente de production

  // Em desenvolvimento deixar apenas true.
  connectToDevTools: true,
})

// Aqui já é possível implementar as queries.
/*client.query({
  query: gql``,
  variables: {},
  error: {}
})*/

export default client
