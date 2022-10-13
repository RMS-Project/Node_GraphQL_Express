import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import client from './plugins/apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

// ApolloProvider - Encapsula e permite que todo o contexto permita consumir os 
// dados. Que recebe uma instância do apollo client. 
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
