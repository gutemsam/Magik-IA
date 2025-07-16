import React, { useEffect, useState } from "react";
import "./estilos.css";
import "./reset.css";
import "./responsivo.css";
import logo from "./imagens/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./pages/CartContext";



function TelaIncial() {
  
  
const { adicionarAoCarrinho, cart } = useContext(CartContext);
  const [cartas, setCartas] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");

  useEffect(() => {
    async function carregarCartas() {
      try {
        const response = await fetch("http://localhost:3333/");
        const dados = await response.json();
        setCartas(dados);
      } catch (err) {
        console.error("Erro ao carregar cartas:", err);
      }
    }

    carregarCartas();
  }, []);

  const cartasFiltradas = cartas.filter((carta) => {
    const categoriaOk = !filtroCategoria || carta.categoria?.toLowerCase() === filtroCategoria.toLowerCase();
    const precoOk = !filtroPreco || carta.preco <= parseFloat(filtroPreco);
    return categoriaOk && precoOk;
  });

  return (
    <div className="bodyindex">

    <header class="cabecalho">
      
    <img src={logo} alt="Logo MagickIA" />
      <Link to="/login" className="btn-admin">Login</Link>
      <Link to="/jogo" className="btn-jogo">Jogo</Link>
      <Link to="/compras" className="btn-compras">Compras
      {cart.length > 0 && <span className="contador">{cart.reduce((acc, item) => acc + item.quantidade, 0)}</span>}</Link>
    </header>
      <main className="container">
        <h1 className="produtos">Produtos</h1>

        <div className="filtros">
          <div className="categorias-cartas">
            <label>Categoria</label>
            <select onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value="">Todas</option>
              <option value="comum">Comum</option>
              <option value="rara">Rara</option>
              <option value="épica">Épica</option>
            </select>
          </div>
          <div className="preco-cartas">
            <label>Preço máximo (R$)</label>
            <input type="number" onChange={(e) => setFiltroPreco(e.target.value)} placeholder="Ex: 1000" />
          </div>
        </div>

        <ul className="cartas">
          {cartasFiltradas.map((carta) => (
            <li key={carta.nome} className="carta">
              <img src={carta.imagem || "/src/imagens/default.png"} alt={carta.nome} />
              <div className="informacoes">
                <h2 className="nome-personagem">{carta.nome}</h2>
                <span className="categoria">Categoria: {carta.categoria || "Não definida"}</span>
                <span className="preco">R$ {Number(carta.preco).toFixed(2)}</span>
                <button className="btn-comprar" onClick={() => adicionarAoCarrinho(carta)}>
                  Comprar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="rodape">@2025 - Todos os direitos reservados</footer>
    </div>
  );
}

export default TelaIncial;
