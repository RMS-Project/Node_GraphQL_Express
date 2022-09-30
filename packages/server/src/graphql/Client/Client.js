import { gql } from 'apollo-server-express'
import createRepository from '../../io/Database/createRepository'

const clientRepository = createRepository('client')

// Criação dos Graphs
export const typeDefs = gql`
  # Types - São entidades
  # ! - Preenchimento obrigatório.
  type Client {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  # Query com argumentos - id: ID!
  extend type Query {
    client(id: ID!): Client
    # clients: [Client!]!
  }

`

export const resolvers = {
  Query: {
    client: async (
      _,// parent, // Indica que tem uma lista que acumula outros types. 
      { id }, // Objetos com argumentos. 
      //{   }, // Contexto, dados de contexto global. Ex: Verificar se o usuário esta autenticado.
      // info // Traz o ST (Árvore de sintaxe abstrata - todo o código gql na qual o javascript consegue interpreta-la) inteiro da query.
    ) => {
      const clients = await clientRepository.read()
      return clients.find((client) => client.id == id)
    }
  }
}