import express from 'express'
import http from 'http'

import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'

// ---------------------- Server Apollo com Express ----------------------
async function startApolloServer(typeDefs, resolvers) {
  // Instância do Express
  const app = express()
  const httpServer = http.createServer(app)
  // Instância do Apollo Server 
  const server = new ApolloServer({
      /* Criação dos Graphs */
      typeDefs: gql`
        # Types - São entidades
        # ! - Preenchimento obrigatório.
        type Client {
          id: ID!
          name: String!
        }

        type Demand {
          id: ID!
          name: String!
          client: Client!
          deadline: String
        }

        # Lista de demandas obrigatório.
        # Más pode estar vazia.
        # Para ser obrigatório ter demandas ex: demands: [Demand!]!
        type Query {
          demands: [Demand]!
        }
      `,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })

  await server.start()
  
  // Faz o Apollo Serve funcionar com o Express.
  server.applyMiddleware({ 
    app, 
    cors: {
      origin: 'http://localhost:3000',
    }
  })

  // Configuração de interface (porta) para alterar configurações via 
  // variável de ambiente. Caso exista use senão porta default 8080.
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080

  // Configuração do Hostname para alterar configurações via variável 
  // de ambiente. Se não existir um HOSTNAME definido fai atribuir false
  // aplicando então o endereço padrão 127.0.0.1.
  const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

  // Executa o servidor.
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://${HOSTNAME}${PORT}${server.graphqlPath}`)
}

startApolloServer()

// ---------------------- Routes ----------------------

/*server.get('/status', (request, response) => {getStatus(request, response)})

// Habilitar cors para a requisição do formulário. 
const enableCors = cors({origin: 'http://localhost:3000'})

// Antes de realizar uma requisição POST a aplicação executa uma requisição OPTIONS.
// Desta forma é necessário adiciona-la na restrição do CORS

server
  .options('/authenticate', enableCors)
  .post(
    '/authenticate',
    enableCors,
    express.json(),
    (request, response) => {getAuthentication(request, response)}
  )*/

// ---------------------- Functions routes ----------------------

// Retorna JSON
/*function getStatus(request, response) {
  response.send({
    status:'OK'
  })
}

// Realiza a autenticação de um usuário.
function getAuthentication(request, response) {
  console.log(
    'E-mail', request.body.email,
    'Senha', request.body.password
  )

  response.send({
    OK: true
  })
}

function invalidRoutes(request, response) {
  response.writeHead(404)
  response.write('This page does not exist!')
  response.end()
}*/