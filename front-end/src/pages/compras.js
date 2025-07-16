import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import "./compras.css";
import logo from "../imagens/logo.png"; // ajuste o caminho conforme a estrutura do seu projeto

function Compras() {
  const { cart, alterarQuantidade, finalizarCompra } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="compras-container">
        <div className="botoes-navegacao">
          <Link to="/" className="btn-navegacao">🏠 Tela Inicial</Link>
          <Link to="/historico" className="btn-navegacao">📜 Histórico de Compras</Link>
        </div>

        <h2>Seu Carrinho</h2>

        {cart.length === 0 ? (
          <p className="vazio">Nenhum item no carrinho.</p>
        ) : (
          <ul className="compras-lista">
            {cart.map((item) => (
              <li key={item.id}>
                <div className="item-info">
                  <span><strong>{item.nome}</strong></span>
                  <span>{item.categoria}</span>
                  <span>R$ {item.preco.toFixed(2)} x {item.quantidade}</span>
                </div>
                <div className="item-botoes">
                  <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                  <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="total"><strong>Total: R$ {total.toFixed(2)}</strong></p>

        {cart.length > 0 && (
        <button
            className="btn-finalizar"
            onClick={() => {
            const confirmar = window.confirm("Tem certeza que deseja finalizar a compra?");
            if (confirmar) {
                finalizarCompra();
                alert("Compra finalizada com sucesso!");
            }
            }}
        >
            Finalizar Compra
        </button>
        )}
      </div>
    </>
  );
}

export default Compras;
