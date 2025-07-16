import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import "./HistoricoCompras.css";
import logo from "../imagens/logo.png";

function HistoricoCompras() {
  const { comprasFinalizadas } = useContext(CartContext);

  return (
    <div className="historico-container">
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <h2>Histórico de Compras</h2>

      {(!comprasFinalizadas || comprasFinalizadas.length === 0) ? (
        <p>Você ainda não realizou nenhuma compra.</p>
      ) : (
        comprasFinalizadas.map((compra, index) => {
          const itens = Array.isArray(compra) ? compra : [compra];
          const totalCompra = itens.reduce((acc, item) => {
            const preco = parseFloat(item.preco || 0);
            const qtd = parseInt(item.quantidade || 1);
            return acc + preco * qtd;
          }, 0);

          return (
            <div key={index} className="bloco-compra">
              <h3>Compra #{index + 1}</h3>
              <ul>
                {itens.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.nome}</strong> - {item.categoria} - R$ {Number(item.preco || 0).toFixed(2)} x {item.quantidade || 1}
                  </li>
                ))}
              </ul>
              <p><strong>Total da compra:</strong> R$ {totalCompra.toFixed(2)}</p>
            </div>
          );
        })
      )}

      <Link to="/" className="btn-navegacao">🏠 Tela Inicial</Link>
    </div>
  );
}

export default HistoricoCompras;
