import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'; 

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleCadastro = (e) => {
        e.preventDefault();


        const novoUsuario = { nome, email, senha };
        console.log("Usuário cadastrado:", novoUsuario);

        alert("Cadastro realizado com sucesso!");
        navigate("/"); 
    };

    return (
        <div className="login-container">
            <form onSubmit={handleCadastro} className="login-form">
                <h2 className="login-title">Cadastro</h2>

                <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
