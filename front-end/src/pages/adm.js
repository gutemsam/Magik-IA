import React from "react";
import { useNavigate } from "react-router-dom";
import "./adm.css";
import logo from "../imagens/logo.png";
import suaFoto from "../imagens/samuel.png"; // <- adicione essa imagem à pasta /imagens

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="admin-container">
        <a href="https://www.instagram.com/sam.gutemberg06/" target="_blank" rel="noopener noreferrer">
          <img src={suaFoto} alt="Foto do Administrador" className="foto-admin" />
        </a>

        <h1 className="admin-title">Área do Administrador</h1>
        <p className="admin-subtitle">Escolha uma operação:</p>

        <div className="admin-buttons">
          <button onClick={() => navigate("/home")} className="admin-btn">Criar Carta</button>
          <button onClick={() => navigate("/list")} className="admin-btn">Listar Cartas</button>
          <button onClick={() => navigate("/list")} className="admin-btn">Editar Carta</button>
          <button onClick={() => navigate("/list")} className="admin-btn">Deletar Carta</button>
          <button onClick={() => navigate("/")} className="admin-btn">Tela Inicial</button>
          <button onClick={() => navigate("/jogo")} className="admin-btn">Jogo</button>
          <button onClick={() => navigate("/relatorio")} className="admin-btn">Relatório de Vendas</button>
        </div>
      </div>
    </>
  );
}

export default Admin;
