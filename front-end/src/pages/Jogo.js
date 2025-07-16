import React, { useState, useEffect } from 'react';
import './Jogo.css';
import logoJogador from '../imagens/logo-jogador.png.png';
import logoIA from '../imagens/logo-ia.png.png';
import { useParams, useNavigate } from "react-router-dom";

export default function Jogo() {
    const [cartasAPI, setCartasAPI] = useState([]);
    const [turno, setTurno] = useState(1);
    const [fase, setFase] = useState('compra');
    const [manaJogador, setManaJogador] = useState(1);
    const [manaIA, setManaIA] = useState(1);
    const [vidaJogador, setVidaJogador] = useState(20);
    const [vidaIA, setVidaIA] = useState(20);
    const [campoJogador, setCampoJogador] = useState([]);
    const [campoIA, setCampoIA] = useState([]);
    const [maoJogador, setMaoJogador] = useState([]);
    const [maoIA, setMaoIA] = useState([]);
    const [mostrarMao, setMostrarMao] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartas = async () => {
            try {
                const response = await fetch("http://localhost:3333");
                if (!response.ok) throw new Error("Erro ao carregar cartas");

                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Dados não são um array");

                const cartasValidas = data.filter(carta =>
                    carta && carta.id && carta.nome && carta.custo !== undefined &&
                    carta.ataque !== undefined && carta.defesa !== undefined &&
                    carta.deletado !== true
                );

                setCartasAPI(cartasValidas);
                if (cartasValidas.length > 0) {
                    setMaoJogador([randomCarta(cartasValidas)]);
                    setMaoIA([randomCarta(cartasValidas)]);
                }
            } catch (error) {
                console.error("Erro ao carregar cartas:", error);
            }
        };

        fetchCartas();
    }, []);

    const randomCarta = (lista = cartasAPI) => {
        if (!lista || lista.length === 0) return null;
        const shuffled = [...lista];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return { ...shuffled[0] };
    };

    const comprarCartas = () => {
        const novaCartaJogador = randomCarta();
        if (novaCartaJogador) setMaoJogador(prev => [...prev, { ...novaCartaJogador }]);
        const novaCartaIA = randomCarta();
        if (novaCartaIA) setMaoIA(prev => [...prev, { ...novaCartaIA }]);
    };

    const jogarCartasIA = () => {
        let currentManaIA = manaIA;
        let currentMaoIA = [...maoIA];
        let currentCampoIA = [...campoIA];

        const cartasJogaveis = currentMaoIA.filter(c => c.custo <= currentManaIA);
        const ordenadas = cartasJogaveis.map(c => ({
            ...c,
            powerScore: (c.ataque || 0) * 2 + (c.defesa || 0)
        })).sort((a, b) => b.powerScore - a.powerScore || b.custo - a.custo);

        for (const carta of ordenadas) {
            if (carta.custo <= currentManaIA) {
                currentCampoIA.push({ ...carta });
                currentManaIA -= carta.custo;
                const index = currentMaoIA.findIndex(c => c.id === carta.id);
                if (index !== -1) currentMaoIA.splice(index, 1);
            }
        }

        setManaIA(currentManaIA);
        setMaoIA(currentMaoIA);
        setCampoIA(currentCampoIA);
    };

    const atacar = (alvoArray, atacante) => {
        if (alvoArray.length > 0) {
            const novoAlvo = alvoArray.map(c => ({ ...c }));
            novoAlvo[0].defesa -= atacante.ataque;
            if (novoAlvo[0].defesa <= 0) return novoAlvo.slice(1);
            return novoAlvo;
        }
        return null;
    };

    const faseCombate = () => {
        let cIA = [...campoIA], cJ = [...campoJogador];
        let vIA = vidaIA, vJ = vidaJogador;

        cJ.forEach(c => {
            const resultado = atacar(cIA, c);
            if (resultado === null) vIA -= c.ataque;
            else cIA = resultado;
        });

        cIA.forEach(c => {
            const resultado = atacar(cJ, c);
            if (resultado === null) vJ -= c.ataque;
            else cJ = resultado;
        });

        setVidaIA(vIA);
        setVidaJogador(vJ);
        setCampoIA(cIA);
        setCampoJogador(cJ);
    };

    const proximaFase = () => {
        if (fase === 'compra') {
            setFase('invocacao');
            jogarCartasIA();
        } else if (fase === 'invocacao') {
            setFase('combate');
        } else if (fase === 'combate') {
            setFase('fim');
        } else if (fase === 'fim') {
            const novoTurno = turno + 1;
            setTurno(novoTurno);
            setManaJogador(novoTurno);
            setManaIA(novoTurno);
            setFase('compra');
            comprarCartas();
        }
    };

    useEffect(() => {
        if (fase === 'combate') faseCombate();
    }, [fase]);

    const jogarCarta = (carta, index) => {
        if (fase !== 'invocacao' || carta.custo > manaJogador) return;
        setCampoJogador(prev => [...prev, { ...carta }]);
        setManaJogador(m => m - carta.custo);
        setMaoJogador(prev => prev.filter((_, i) => i !== index));
    };

    const resetarJogo = () => {
        setTurno(1);
        setManaJogador(1);
        setManaIA(1);
        setVidaJogador(20);
        setVidaIA(20);
        setCampoJogador([]);
        setCampoIA([]);
        setMaoJogador([]);
        setMaoIA([]);
        setFase('compra');
    };

    useEffect(() => {
        if (vidaJogador <= 0) {
            alert("❌ Você perdeu!");
            resetarJogo();
        } else if (vidaIA <= 0) {
            alert("🎉 Você venceu!");
            resetarJogo();
        }
    }, [vidaJogador, vidaIA]);

    return (
        <div className="game-container">
            <div className="top-bar">
                <div>
                    <img src={logoJogador} alt="Jogador" className="avatar-jogador" />
                    <div className="turno">❤️ {vidaJogador} | 🔷 {manaJogador}</div>
                </div>
                <div>
                    <button onClick={() => navigate("/")} className="btn-inicio">Tela Inicial</button>
                    <div className="vs">VS</div>
                    <div className="turno">Turno {turno} | {fase.toUpperCase()}</div>
                </div>
                <div>
                    <img src={logoIA} alt="IA" className="avatar-ia" />
                    <div className="turno">❤️ {vidaIA} | 🔷 {manaIA}</div>
                </div>
                <button className="btn-turno" onClick={proximaFase}>
                    {fase === 'compra' && '➡️ Invocar'}
                    {fase === 'invocacao' && '⚔️ Combater'}
                    {fase === 'combate' && '🔚 Fim do turno'}
                    {fase === 'fim' && '🔄 Novo turno'}
                </button>
            </div>

            <div className="tabuleiro">
                <div className="lado">
                    <h4>🧙 Jogador</h4>
                    <div className="linha-campo">
                        {campoJogador.map((c, i) => (
                            <div key={i} className="carta-grande">
                                {c.imagem && <img src={c.imagem} alt={c.nome} style={{ width: "100%" }} />}
                                <strong>{c.nome}</strong><br />ATK: {c.ataque} DEF: {c.defesa}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lado">
                    <h4>🤖 IA</h4>
                    <div className="linha-campo">
                        {campoIA.map((c, i) => (
                            <div key={i} className="carta-grande">
                                {c.imagem && <img src={c.imagem} alt={c.nome} style={{ width: "100%" }} />}
                                <strong>{c.nome}</strong><br />ATK: {c.ataque} DEF: {c.defesa}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="controle-mao">
                <button className="botao-toggle-mao" onClick={() => setMostrarMao(m => !m)}>
                {mostrarMao ? '🔽 Ocultar Mão' : '🔼 Mostrar Mão'}
            </button>
                </div>


            {mostrarMao && (
                <div className="mao-jogador">
                    {maoJogador.map((carta, index) => (
                        <div
                            key={index}
                            className={`carta-jogo ${fase === 'invocacao' && manaJogador >= carta.custo ? 'jogavel' : 'desabilitada'}`}
                            onClick={() => jogarCarta(carta, index)}
                        >
                            <div className="carta-custo">{carta.custo}</div>
                            <div className="carta-imagem-container">
                                <img
                                    src={carta.imagem || 'https://via.placeholder.com/100x150?text=Carta'}
                                    alt={carta.nome}
                                    className="carta-imagem"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100x150?text=Carta';
                                    }}
                                />
                            </div>
                            <div className="carta-info">
                                <strong>{carta.nome}</strong><br />
                                ATK: {carta.ataque} DEF: {carta.defesa}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
