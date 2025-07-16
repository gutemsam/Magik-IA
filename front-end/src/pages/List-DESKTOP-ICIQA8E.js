import React, { useState } from "react";
import axios from "axios";

function List() {
    const [nome, setNome] = useState("");
    const [cartas, setCartas] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .get("http://localhost:3333/?nome=" + nome)
            .then(function (response) {
                setCartas(response.data);
            })
            .catch(function (error) {
                alert("Ops! Algo deu errado. Tente de novo.");
                console.log(error);
            });
    }


    function handleDelete (id){

        if(!window.confirm("Tem certeza que deseja deletar ?")){
            return;
        }
        axios
        .delete("http://localhost:3333/"+id)
        .then(function(response){
            alert("Cartas deletadas com scuesso");
            const cartasFiltradas = [];
            for (let i=0; i < cartas.length; i++) {
                if (cartas[i].id != id) {
                    cartasFiltradas.push(cartas[i]);
                }
            }
            setCartas(cartasFiltradas);
        })
        .catch(function(error) {
            alert("Ops! Algo de errado não está certo");
            console.log (error);
        });
    }

    return (
        <div>
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
                        <th> Ações </th>
                    </tr>
                </thead>
                <tbody>
                    {cartas.map((carta, index) => (
                        <tr key={index.toString}>
                            <td>{carta.id}</td>
                            <td>
                                {carta.imagem ? (
                                    <img
                                        src={carta.imagem}
                                        alt={carta.nome}
                                        width="100"
                                    />
                                ) : (
                                    "Sem imagem"
                                )}
                            </td>
                            <td>{carta.nome}</td>
                            <td>{carta.ataque}</td>
                            <td>{carta.defesa}</td>
                            <td>{carta.efeito}</td>
                            <td> <button onClick ={() => handleDelete(carta.id)}>Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
