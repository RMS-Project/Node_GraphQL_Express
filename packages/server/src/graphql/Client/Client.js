import { gql } from 'apollo-server-express'

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

  extend type Query {
    client(id: ID!): Client
    clients: [Client!]!
  }
`