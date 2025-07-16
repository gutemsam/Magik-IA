const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const cartas = require("./cartas")

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });




// GET com filtro por nome 
app.get("/", function (req, res) {
    const nome = req.query.nome || "";
    const cartasFiltradas = [];

    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].deletado == false && cartas[i].nome.toLowerCase().includes(nome.toLowerCase())) {
            cartasFiltradas.push(cartas[i]);
        }
    }

    return res.json(cartasFiltradas);
});

// GET por ID 
app.get("/:id", function (req, res) {
    const id = Number(req.params.id);

    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].deletado == false && id == cartas[i].id) {
            return res.json(cartas[i]);
        }
    }

    return res.status(404).json({ mensagem: "Carta não encontrada" });
});

// DELETE por ID (soft delete)
app.delete("/:id", function (req, res) {
    const id = Number(req.params.id);

    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].deletado == false && id == cartas[i].id) {
            cartas[i].deletado = true;
            console.log(cartas);
            return res.json({ message: "Carta deletada com sucesso" });
        }
    }

    return res.status(404).json({ mensagem: "Carta não encontrada" });
});

// POST (criação de carta)

app.post("/", upload.single("imagem"), function (req, res) {
  const { nome, ataque, defesa, efeito, categoria, preco, custo } = req.body;
  let imagemBase64 = "";

  if (req.file) {
    const imagemBuffer = fs.readFileSync(req.file.path);
    imagemBase64 = `data:${req.file.mimetype};base64,${imagemBuffer.toString("base64")}`;

    // Limpa o arquivo temporário
    fs.unlinkSync(req.file.path);
  }

  const novaCarta = {
    id: cartas.length + 1,
    nome,
    ataque: Number(ataque),
    defesa: Number(defesa),
    efeito,
    categoria,
    preco: Number(preco),
    custo: Number(custo),
    deletado: false,
    imagem: imagemBase64,
  };

  cartas.push(novaCarta);
  return res.json({ mensagem: "Carta criada com sucesso", cartas: novaCarta });
});

// PUT (atualização de carta)
app.put("/:id", function (req, res) {
    const id = Number(req.params.id);
    const nome = req.body.nome;
    const ataque = req.body.ataque;
    const defesa = req.body.defesa;
    const efeito = req.body.efeito;
    const custo = req.body.custo;
    const categoria = req.body.categoria;
    const preco = req.body.preco;

    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].deletado == false && id == cartas[i].id) {
            if (nome) cartas[i].nome = nome;
            if (ataque) cartas[i].ataque = Number(ataque);
            if (defesa) cartas[i].defesa = Number(defesa);
            if (efeito) cartas[i].efeito = efeito;
            if (categoria) cartas[i].categoria = categoria;
            if (preco) cartas[i].preco = Number(preco);
            if (custo) cartas[i].custo = Number(custo);

            return res.json(cartas[i]);
        }
    }

    return res.status(404).json({ mensagem: "Carta não encontrada" });
});

// Iniciar servidor
app.listen(3333, function () {
    console.log("servidor subiuuuu");
});
