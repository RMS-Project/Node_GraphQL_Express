// Importa apenas a função gql.
import { gql } from 'apollo-server-express'
// * - Importa todas as funções.
import * as uuid from 'uuid'

import createRepository from '../../io/Database/createRepository'
import { ListSortmentEnum  } from '../List/List'

const clientRepository = createRepository('client')

// Criação dos Graphs
export const typeDefs = gql`
  # Types - São entidades
  # ! - Preenchimento obrigatório.
  type Client implements Node {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  # Como List implementa Node não é necessário
  # implementa-lo novamente.
  type ClientList implements List {
    items: [Client!]!
    totalItems: Int!
  }

  input ClientListFilter {
    name: String
    email: String
    disabled: Boolean
  }

  # input - Elementos que não vão ser retornados.
  # Utilizado como argumento.
  input ClientListOptions {
    take: Int
    skip: Int
    sort: ListSort
    filter: ClientListFilter
  }

  extend type Query {
    # Query com argumentos - id: ID!
    client(id: ID!): Client

    # Query que retorna um array de clientes.
    # Sendo obrigatório retornar pelo menos um cliente no array
    # sendo que este array é obrigatório.
    # clients: [Client!]!

    # Para implementar a paginação com foi criado ClientList
    # envia-se a lista.
    clients(options: ClientListOptions): ClientList
  }

  input CreateClientInput {
    name: String!
    email: String!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
  }
`

export const resolvers = {

  Query: {
    // Retorna um usuário a partir de um ID informado.
    client: async (
      _,// parent, // Indica que tem uma lista que acumula outros types. 
      { id }, // Objetos com argumentos. 
      //{   }, // Contexto, dados de contexto global. Ex: Verificar se o usuário esta autenticado.
      // info // Traz o ST (Árvore de sintaxe abstrata - todo o código gql na qual o javascript consegue interpreta-la) inteiro da query.
    ) => {
      const clients = await clientRepository.read()
      return clients.find((client) => client.id == id)
    },

    // Retorna todos os clientes.
    /*clients: async () => {
      const clients = await clientRepository.read()
      return clients
    }*/

    // Retorna todos os clientes da lista, criando a paginação.
    clients: async (_, args) => {

      // Retorna uma 
      const {
        take = 10,
        skip = 0,
        sort,
        filter
      } = args.options || {} // Ou vai vir um options ou um objeto vazio.

      const clients = await clientRepository.read()

      // Condição que ordena os dados.
      if (sort) {
        clients.sort((clientA, clientB) => {
          // Somente pode ser ordenado por name. email ou disable.
          if (!['name', 'email', 'disabled'].includes(sort.sorter))
            throw new Error(`Cannot sort by field "${sort.sorter}".`)

          const fieldA = clientA[sort.sorter]
          const fieldB = clientB[sort.sorter]

          if (typeof fieldA === 'string') {
            // Efetua a troca de posição dos elementos.
            if (sort.sortment === ListSortmentEnum.ASC)
              return fieldA.localeCompare(fieldB)
            else return fieldB.localeCompare(fieldA)
          }

          if (sort.sortment === ListSortmentEnum.ASC)
            return Number(fieldA) - Number(fieldB)
          else return Number(fieldB) - Number(fieldA)
        })
      }

      const filteredClients = clients.filter((client) => {
        if (!filter || Object.keys(filter).length === 0) return true

        return Object.entries(filter).every(([field, value]) => {
          if (client[field] === null || client[field] === undefined)
            return false
          if (typeof value === 'string') {
            // % - Qualquer coisa antes ou qualquer coisa depois.
            if (value.startsWith('%') && value.endsWith('%'))
              return client[field].includes(value.substr(1, value.length - 2))
            if (value.startsWith('%'))
              return client[field].endsWith(value.substr(1))
            if (value.endsWith('%'))
              return client[field].startsWith(
                value.substr(0, value.length - 1)
              )
            return client[field] === value
          }
          return client[field] === value
        })
      })

      return {
        // slice - Retorna valores entre "skip" e "take".
        items: filteredClients.slice(skip, skip + take),
        totalItems: filteredClients.length,
      }
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const clients = await clientRepository.read()

      const client = {
        id: uuid.v4(),
        name: input.name,
        email: input.email,
        disabled: false
      }

      // Escrever todos os clientes mais este que está sendo criado.
      await clientRepository.write([...client, client])

      return client
    }
  }
}