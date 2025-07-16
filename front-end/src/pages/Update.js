import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Update.css";
import logo from "../imagens/logo.png";

function Update() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [ataque, setAtaque] = useState("");
  const [defesa, setDefesa] = useState("");
  const [efeito, setEfeito] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put("http://localhost:3333/" + id, {
        nome,
        ataque: Number(ataque),
        defesa: Number(defesa),
        custo: Number(custo),
        efeito,
        categoria,
        preco: Number(preco),
      })
      .then(() => {
        alert("Carta atualizada com sucesso");
        navigate("/list");
      })
      .catch((error) => {
        alert("Erro ao atualizar carta");
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3333/" + id)
      .then((response) => {
        setNome(response.data.nome);
        setAtaque(response.data.ataque);
        setDefesa(response.data.defesa);
        setEfeito(response.data.efeito);
        setCusto(response.data.custo);
        setCategoria(response.data.categoria || "");
        setPreco(response.data.preco || "");
      })
      .catch(() => alert("Erro ao carregar dados da carta"));
  }, [id]);

  return (
    <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

      <div className="update-container">
        <h2>Atualizar Carta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label><br />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /><br />

          <label>Ataque:</label><br />
          <input type="number" value={ataque} onChange={(e) => setAtaque(e.target.value)} /><br />

          <label>Defesa:</label><br />
          <input type="number" value={defesa} onChange={(e) => setDefesa(e.target.value)} /><br />

          <label>Efeito:</label><br />
          <input type="text" value={efeito} onChange={(e) => setEfeito(e.target.value)} /><br />

          <label>Custo:</label><br />
          <input type="number" value={custo} onChange={(e) => setCusto(e.target.value)} /><br />

          <label>Categoria:</label><br />
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} /><br />

          <label>Preço (R$):</label><br />
          <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} /><br />

          <input type="submit" value="Enviar" />
        </form>
      </div>
    </>
  );
}

export default Update;
