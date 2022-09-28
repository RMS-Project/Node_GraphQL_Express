import React, { useState } from "react"
import { Link } from "react-router-dom";

import logo from '../logo.svg';
import '../App.css';

export default function SignIn() {
  // userState - Hook do react.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Evento sintético que encapsula o evento padrão do JavaScript do browser.
  // Ele consegue executar alguns eventos padrões.
  const handleSubmit = (event) => {
    // Evento padrão.
    event.preventDefault()
    fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(email, password)
        console.log('Success!', data)
      })
  }

  // Ver a biblioteca Form que abstrai a manipulação de formulários quando
  // ficam mais complexos.
  const handleEmailChange = event => setEmail(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  // onChange - Neste caso serve para controlar melhor o evento.
  return (
    <div className="App-div">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Sign In</h1>

      <form onSubmit={ handleSubmit }>
      
        <fieldset className="App-fieldset">
          <label htmlFor="email">E-mail</label>
          <input 
            className="App-input" 
            id="email"
            type="email" 
            inputMode="email" 
            autocomplete="username"

            onChange={handleEmailChange}
            value={email}
          />
        </fieldset>
        
        <fieldset className="App-fieldset">
          <label htmlFor="password">Password</label>
          <input 
            className="App-input" 
            id="password"
            type="password" 
            inputMode="password"
            autocomplete="current-password"
          
            onChange={handlePasswordChange}
            value={password}

          />
        </fieldset>

        <button className="App-button" type="submit">Entrar</button>

      </form>

      <Link
        className="App-link"
        to="/"
        rel="noopener noreferrer"
      >
        Home
      </Link>
    </div>
  )
}