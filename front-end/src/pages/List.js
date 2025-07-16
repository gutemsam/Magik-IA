import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./List.css";
import logo from "../imagens/logo.png";

function List() {
  const [nome, setNome] = useState("");
  const [cartas, setCartas] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:3333/?nome=" + nome)
      .then((response) => setCartas(response.data))
      .catch((error) => {
        alert("Ops! Algo deu errado. Tente de novo.");
        console.log(error);
      });
  }

  function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja deletar?")) return;

    axios
      .delete("http://localhost:3333/" + id)
      .then(() => {
        alert("Carta deletada com sucesso");
        setCartas(cartas.filter((carta) => carta.id !== id));
      })
      .catch((error) => {
        alert("Ops! Algo de errado não está certo");
        console.log(error);
      });
  }

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="list-container">
        <button onClick={() => navigate("/")} className="admin-btn">Tela Inicial</button>
        <h2>Relatório de criação de cartas</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da carta"
          />
          <input type="submit" value="Pesquisar" />
        </form>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Ataque</th>
              <th>Defesa</th>
              <th>Efeito</th>
              <th>Custo</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cartas.map((carta, index) => (
              <tr key={index}>
                <td>{carta.id}</td>
                <td>
                  {carta.imagem ? (
                    <img src={carta.imagem} alt={carta.nome} width="100" />
                  ) : (
                    "Sem imagem"
                  )}
                </td>
                <td>{carta.nome}</td>
                <td>{carta.ataque}</td>
                <td>{carta.defesa}</td>
                <td>{carta.efeito}</td>
                <td>{carta.custo}</td>
                <td>{carta.categoria || "-"}</td>
                <td>{carta.preco != null ? `R$ ${carta.preco}` : "-"}</td>
                <td>
                  <button onClick={() => handleDelete(carta.id)}>Deletar</button>
                  <Link to={`/edit/${carta.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;
