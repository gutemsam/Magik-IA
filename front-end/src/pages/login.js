import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import './login.css'; 

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha]= useState("");
    const navigate = useNavigate();


    const emailAdmin = "thesam0606@gmail.com"; 
    const senhaAdmin = "123";

    const handleLogin = (e) => {
        e.preventDefault();

        if (email.toLowerCase() === emailAdmin.toLowerCase()&& senha.toLowerCase()===senhaAdmin) {
            navigate("/adm");
        } else {
            navigate("/user"); 
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-title">Login</h2>
                <input
                    type="email"
                    placeholder="E-mail de acesso"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Entrar</button>

                <p className="cadastro-link">
                    Não tem uma conta? <Link to="/cadastro">Crie uma aqui</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;