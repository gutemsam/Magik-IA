import React, { useState } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import "./Home.css";
import logo from "../imagens/logo.png";

function Home() {
    const [nome, setNome] = useState("");
    const [ataque, setAtaque] = useState("");
    const [defesa, setDefesa] = useState("");
    const [efeito, setEfeito] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [custo, setCusto] = useState("");
    const [imagem, setImagem] = useState(null);
    const navigate = useNavigate();

    function handleFileChange(e) {
        setImagem(e.target.files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("ataque", ataque);
        formData.append("defesa", defesa);
        formData.append("custo",custo);
        formData.append("efeito", efeito);
        formData.append("categoria",categoria);

        if (imagem) {
            formData.append("imagem", imagem);
        }

        axios.post("http://localhost:3333/", formData)
            .then(() => {
                alert("Carta cadastrada com sucesso!");
                setNome(""); setAtaque(""); setDefesa("");setCusto(""); setEfeito("");setCategoria(""); setImagem(null);
                navigate("/");

            })
            .catch((error) => {
                alert("Erro ao cadastrar carta");
                console.error(error);
            });
    }

    return (
            <>
      <header className="cabecalho">
        <img src={logo} alt="Logo MagickIA" />
      </header>

        <div className="fundo">
        <div className="home-container">
            <h1>Sistema de gerenciamento de Cartas - MAGIK IA</h1>

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
                <input type="number" name="custo" value={custo} onChange={(e) => setCusto(e.target.value)}/><br />
               

                <label>Categoria:</label><br />
                <input type="text" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}/><br />

                <label>Preço:</label><br />
                <input type="number" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)}/><br />

                
                <label>Imagem da carta:</label><br />
                <input type="file" accept="image/*" onChange={handleFileChange} /><br />

                <input type="submit" value="Enviar" />
            </form>
        </div>
    </div>
    </>
    );
}

export default Home;
