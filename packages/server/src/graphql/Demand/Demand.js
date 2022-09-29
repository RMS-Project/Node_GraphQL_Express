import { gql } from 'apollo-server-express'

// Criação dos Graphs
export const typeDefs = gql`
  type Demand {
    id: ID!
    name: String!
    client: Client!
    deadline: String
  }

  # Permite extender o tipo Query e adicionar funcionalidades para ele.
  # Não sendo necessário bibliotecas que fazem merge de GraphQL.
  extend type Query {
    demands: [Demand]!
  }
`
export const resolvers = {
  Query: {
    demands: () => [],
  }
};