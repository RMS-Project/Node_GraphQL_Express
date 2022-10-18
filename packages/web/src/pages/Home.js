import React, { useState } from "react"
import { Link } from "react-router-dom"

import logo from '../logo.svg'
import '../App.css'
import { ClientList } from "../components/ClientList"
import { ClientEdit } from "../components/ClientEdit"

export default function Home() {
  // Guarda o Id do cliente quando houver click.
  // Quando for necessário ser editado.
  const [clientId, setClientId] = useState()

  return (
    <main className="App-div">

      <section>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Home</h1>
        <Link
          className="App-link"
          to="/sign-in"
          rel="noopener noreferrer"
        >
          Entrar
        </Link>
      </section>

      <ClientList onSelectClient={setClientId}/>
      <ClientEdit clientId={clientId} />

    </main>
  )
}

