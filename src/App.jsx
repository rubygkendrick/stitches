import { Route, Routes } from "react-router-dom"
import "./App.css"
import React from "react"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"


export const App = () => {
  return <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized> 
          <ApplicationViews /> 
        </Authorized>
      }>
      </Route>
    </Routes>
  </>
}


export default App
