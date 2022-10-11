import { ApolloLink, Observable } from 'apollo-link'

// Link fim
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

// Evolução da aplicação - Utilizar um cabeçalho JWT
// Para fazer este tipo de requisição autenticada é utilizando o apollo-link-context
import { setContext } from 'apollo-link-context'

// Link específico que serve para logar resultados
const loggerLink = new ApolloLink(
  // Parâmetros - AST com a operação e "forward" que vai enviar para o próximo link
  // é um observable, assim que for chamado será executado.

  (operation, forward) =>
    // Necessário criar um observable e ele terá uma função callback. 
    new Observable((observer) => {
      // forward - Que chama a operação que vai passar para frente ( Executar a 
      //           próxima chamada ).
      const subscription = forward(operation).subscribe({

        // Vai retornar os dados da API.
        next: (result) => {
          // result - Dados retornados da API.
          console.log('Log', result)

          // Passa para o próximo.
          observer.next(result)
        },

        // Só irá chamar e executar a função padrão.
        error: observer.error.bind(observer),

        // Só irá chamar e executar a função padrão.
        complete: observer.complete.bind(observer),
      })

      return () => subscription.unsubscribe()
    })
)

// Se trabalhar com Axios - Todas as funções dentro de link seriam interceptors.

// Link Final
const link = ApolloLink.from([
  // ApolloLink.empty() // Não faz nada, apenas passa para frente.
  // ApolloLink.split(()=>{}) // Utilizado para olhar o link e realizar operações diferentes.
  // Lista lincada - melhor forma é fazer com array.
  loggerLink,

  // Erros
  // Se ocorrer erro no GraphQL esta função será executada.
  // Possui várias formas de lidar com erros. Procurar saber mais.
  onError((error) => {
    console.error('GraphQLError', error)
  }),

  // Modificar Cabeçalhos.
  // Requisição autenticada
  // Recebe uma função render que recebe o AST do graphQL "_"(não foi utilizado),
  // e recebe um objeto com o contexto atual "headers". que retornará um novo
  // context "headers". 
  setContext((_, { headers }) => {
    // Aqui pode ser feita a validação. Pois esta função sempre será executada
    // quando ocorrer uma requisição GraphQL.

    return {
      headers
      /*headers: {
        ...headers,
        // Aqui entra as rotas autenticadas que podem vir de um cooker ou
        // local storage.
        Authorization: `Bearer ${}`
      },*/
    }
  }),

  // Lista Fim - Para ter um link que usa fetch.
  createHttpLink({
    // URI do servidor GraphQL.
    uri: 'http://127.0.0.1:8080/graphql',
    
    // fetch padrão do Javascript, não sendo necessário configurar pois já é o
    // padrão do GraphQL podendo ser utilizado o atributo fetch para definir uma
    // bibliotecas para browsers antigos como o unfetch ou Node fetch.
    // fetch: window.fetch

    // Biblioteca unfetch - É um polyfill - Para suporte a navegadores antigos.
    // fetch: unfetch

    // Para fares um client em um servidor para consumir os dados
    // GraphQL de outro servidor.
    // fetch: Node fetch
    
  }),
])

export default link;
