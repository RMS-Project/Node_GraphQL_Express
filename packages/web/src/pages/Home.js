import React from "react"
import { Link} from "react-router-dom";

import logo from '../logo.svg';
import '../App.css';

export default function Home() {
  return (
    <div className="App-div">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Home</h1>
      <Link
        className="App-link"
        to="/sign-in"
        rel="noopener noreferrer"
      >
        Entrar
      </Link>
    </div>
  )
}

