import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Update from "./pages/Update";
import Admin from "./pages/adm";
import TelaIncial from "./TelaInicial";
import Jogo from "./pages/Jogo";
import Compras from "./pages/compras";
import HistoricoCompras from "./pages/HistoricoCompras";
import Relatorio from "./pages/relatorio";
import Login from "./pages/login";
import User from "./pages/user";
import Cadastro from "./pages/cadastro";

function RoutesApp() {
  return (
    <Routes>
      <Route index Component={TelaIncial } />
      <Route path="/home" Component={Home } />
      <Route path="/list" Component={List} />
      <Route path="/edit/:id" Component={Update} />
      <Route path="/adm" Component={Admin} />
      <Route path="/jogo" Component={Jogo} />
      <Route path="/compras" Component={Compras} />
      <Route path="/historico" Component={HistoricoCompras} />
      <Route path="/relatorio" Component={Relatorio} />
      <Route path="/login" Component={Login} />
      <Route path="/user" Component={User} />
      <Route path="/cadastro" Component={Cadastro}/>

    </Routes>
  );
}

export default RoutesApp;
