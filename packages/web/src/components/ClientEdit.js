import React, { useMemo, useState, useEffect } from 'react'

// useQuery - Carregar os dados detalhados um cliente.
// useMutation - Atualizar os dados do cliente.
import { useQuery, useMutation, gql } from '@apollo/client'
// import gql from 'graphql-tag'

const CLIENT = gql`
  query CLIENT($clientId: ID!) {
    client(id: $clientId) {
      id
      name
      email
    }
  }
`

const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT($id: ID!, $name: String!, $email: String!) {
    updateClient(input: { id: $id, name: $name, email: $email }) {
      id
      name
      email
    }
  }
`

export function ClientEdit({ clientId }) {

  // Caso exista clientId - vai buscar os dados do cliente.
  // data - É um objeto memorizado que causa um re-render do componente.
  const { data } = useQuery(CLIENT, {
    variables: {
      clientId,
    },

    // Impede a execução da query caso clientId esteja vazio.
    skip: !clientId,

    // Fetch Policy - Ligada ao cache do navegador.
    // Torna o carregamento mais rápido. "Como já tem no cache use o que está lá"
    fetchPolicy: 'cache-first',
  })

  const [updateClient] = useMutation(UPDATE_CLIENT)

  // "data" será um valor memorizado que será utilizado pela
  // função useMemo().
  const initialValues = useMemo(
    () => ({
      name: data?.client.name ?? '',
      email: data?.client.email ?? '',
    }),
    [data] // Acontece toda vez que o data funcionar.
  )

  // Estado controlável
  const [values, setValues] = useState(initialValues)

  useEffect(() => setValues(initialValues), [initialValues])

  const handleNameChange = (event) => {
    event.persist()

    // Campos que se deseja editar. 
    setValues((values) => ({
      ...values,
      name: event.target.value,
    }))
  }

  const handleEmailChange = (event) => {
    event.persist()

    setValues((values) => ({
      ...values,
      email: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Executa a atualização do cliente.
    updateClient({
      variables: {
        id: clientId,
        name: values.name,
        email: values.email,
      },
    }).then(console.log)
  }

  // Formulário apresentado quando for editar os dados de um cliente.
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input type="text" value={values.name} onChange={handleNameChange} />
      </fieldset>
      <fieldset>
        <input type="text" value={values.email} onChange={handleEmailChange} />
      </fieldset>
      <button type="submit">Salvar</button>
    </form>
  )
}

// Ver
// State Manager