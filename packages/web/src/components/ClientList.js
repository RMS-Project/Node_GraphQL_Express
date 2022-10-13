import React from "react"
import gql from "graphql-tag"

// Wrapper component com render próprio do React.
// Pode ser que já esteja obsoleto, pois hoje existe os Hooks.
// Este é do próprio apollo.
import { useQuery } from "react-apollo"

// Grapho de consulta.
const GET_CLIENT_LIST = gql`
  query GET_CLIENT_LIST {
    clients {
      items {
        id
        name
        email
      }
      totalItens
    }
  }
`

export function ClientList() {
  // Aqui pode-se utilizar as mesmas funções que temos no, método Query
  // que existe na instancia do Apollo Client.
  // São eles: Fetch police, erro police, variáveis. Conseguindo enviar
  // todos por aqui.
  const {
    // Obter os dados.
    data,

    // Tratar casos de erro.
    error,

    // Enquanto estiver carregando. "Boolean"
    loading,

    // 
    //refetch,

    // É uma função e é possível atualizar os dados.
    //fetchMore

    // startPolling e stopPolling - Ficam fazendo requisições várias vezes para 
    // o server para carregar os dados. Sendo mais fácil utilizar um subscribeToMore.

    // subscribeToMore - Carregar os dados em tempo real. Quando um novo dado entrar 
    // ele atualiza automaticamente a lista. Independente se foi você ou outro usuário
    // que está utilizando a plicação.

  } = useQuery(GET_CLIENT_LIST, {
    // Determina como ocorrerá a busca dos dados.
    // cache-and-network - Dados que estão em cache para a query bater.
    // Enquanto isso acontece ele vai buscar os novos dados do servidor,
    // atualizando o estado no componente.

    // cache-first - vai tentar pegar no cache local e se estiver nele vai utilizar.
    // senão ele vai buscar no servidor.

    // cache-only - Ele vai obiter os dados apenas no cache local.
    // Não indo buscar no servidor.

    // Este cache é do Apollo, é aquele que conseguimos obter a partir do "Apollo Dev Tools".

    // network-only - Só vai buscar no servidor. Não verifica o cache.

    // no-cache - Quando não quero salvar no cache.

    // standby - Fica no aguardo de outra query para chamar algo que tenha os dados
    // que estou pedindo aqui. Quando esta condição ocorrer então terei os dados aqui.

    fetchPolicy: "cache-and-network",
  })

  // data vai começar null
  // ? - Optional chaining - Consigo encadear de forma opcional.
  //     Se tiver pegue data se não tiver retorne vazio.
  // ??  - Se não tiver nenhum destes valores (data ou clients) retorne um
  //       array vazio.
  const clients = data?.clients.itens ?? []

  if (error)
    return (
      <section>
        <strong>Erro ao buscar os clientes</strong>
      </section>
    )

  if (loading)
    return (
      <section>
        <p>Carregando ...</p>
      </section>
    )

  return (
    <section>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <p>{client.name}</p>
              <p>{client.email}</p>
            </li>
          )
        })}
      </ul>
      <button disabled={loading}>Carregar mais</button>
    </section>
  )
}
