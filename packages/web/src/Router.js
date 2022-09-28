import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"


export default function RoutesAPP() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
    </Routes>
  );
}