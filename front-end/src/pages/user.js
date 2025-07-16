import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import "./user.css";
import logo from "../imagens/logo.png";
import userAvatar from "../imagens/logo-jogador.png.png"; 

function User() {
  const { comprasFinalizadas = [] } = useContext(CartContext);

 
  const userInfo = {
    nome: "Usuário",
    email: "usuario.padrao@email.com",
    foto: userAvatar
  };

  const cartasAgrupadas = {};

  comprasFinalizadas.forEach((compra) => {
    const itens = Array.isArray(compra) ? compra : [compra];
    itens.forEach((item) => {
      const chave = item.nome;
      if (cartasAgrupadas[chave]) {
        cartasAgrupadas[chave].quantidade += item.quantidade;
      } else {
        cartasAgrupadas[chave] = { ...item };
      }
    });
  });

  const cartas = Object.values(cartasAgrupadas);

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="user-profile">
        <img src={userInfo.foto} alt="Foto do Usuário" className="user-avatar" />
        <div className="user-info">
          <h3>{userInfo.nome}</h3>
          <p>{userInfo.email}</p>
        </div>
      </div>

      <div className="minhas-cartas-container">
        <h2>Minhas Cartas Adquiridas</h2>

        {cartas.length === 0 ? (
          <p>Você ainda não adquiriu nenhuma carta.</p>
        ) : (
          <div className="cartas-grid">
            {cartas.map((carta, index) => (
              <div key={index} className="carta-card">
                {carta.imagem && (
                  <img src={carta.imagem} alt={carta.nome} className="carta-imagem" />
                )}
                <div className="carta-info">
                  <h3>{carta.nome}</h3>
                  <p><strong>Categoria:</strong> {carta.categoria}</p>
                  <p><strong>Ataque:</strong> {carta.ataque}</p>
                  <p><strong>Defesa:</strong> {carta.defesa}</p>
                  <p><strong>Efeito:</strong> {carta.efeito}</p>
                  <p><strong>Custo:</strong> {carta.custo}</p>
                  <p><strong>Preço:</strong> R$ {carta.preco.toFixed(2)}</p>
                  <p><strong>Quantidade:</strong> {carta.quantidade}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to="/" className="btn-navegacao">🏠 Tela Inicial</Link>
      </div>
    </>
  );
}

export default User;
