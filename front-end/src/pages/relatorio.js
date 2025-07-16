import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import "./relatorio.css";
import logo from "../imagens/logo.png";

function Relatorio() {
  const { comprasFinalizadas = [] } = useContext(CartContext);

  // Cálculo do valor total geral
  const valorTotalGeral = comprasFinalizadas.reduce((totalGeral, compra) => {
    const itens = Array.isArray(compra) ? compra : [compra];
    const totalCompra = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    return totalGeral + totalCompra;
  }, 0);

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="relatorio-container">
        <h2>Relatório de Vendas</h2>

        {comprasFinalizadas.length === 0 ? (
          <p>Nenhuma venda foi realizada ainda.</p>
        ) : (
          comprasFinalizadas.map((compra, index) => {
            const itens = Array.isArray(compra) ? compra : [compra];
            const totalCompra = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

            return (
              <div key={index} className="bloco-compra">
                <h3>Compra #{index + 1}</h3>
                <ul>
                  {itens.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.nome}</strong> - {item.categoria} - R$ {item.preco.toFixed(2)} x {item.quantidade}
                    </li>
                  ))}
                </ul>
                <p><strong>Total da compra:</strong> R$ {totalCompra.toFixed(2)}</p>
              </div>
            );
          })
        )}

        {/* Exibe o total geral abaixo das compras */}
        {comprasFinalizadas.length > 0 && (
          <div className="total-geral">
            <h3>Valor Total Obtido: R$ {valorTotalGeral.toFixed(2)}</h3>
          </div>
        )}

        <Link to="/adm" className="btn-voltar">⬅ Voltar ao Admin</Link>
      </div>
    </>
  );
}

export default Relatorio;
