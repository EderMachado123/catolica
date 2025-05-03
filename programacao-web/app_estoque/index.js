import { addProduto, listar, remover, editar } from "./app.js"; // Usando import no lugar de require
import express from "express";

const app = express();
var estoque = [];

app.get("/", (req, res) => {
  let html = "<h1>App estoque</h1>";
  html += "<h3>Rotas disponíveis</h3>";
  html +=
    '<p>/adicionar/:id/:nome/:qtd (<a href="adicionar/3/Arroz/32">adicionar/3/Arroz/32</a>)</p>';
  html += '<p>/listar (<a href="listar">listar estoque</a>)</p>';
  html += '<p>/remover/:id (<a href="remover/1">remover/1</a>)</p>';
  html += '<p>/editar/:id/:qtd (<a href="editar/1/48">editar/1/48</a>)</p>';
  res.send(html);
});

app.get("/adicionar/:id/:nome/:qtd", (req, res) => {
  let idProd = parseInt(req.params.id);
  let nomeProd = req.params.nome;
  let qtdProd = parseInt(req.params.qtd);

  const produto = {
    id: idProd,
    nome: nomeProd,
    quantidade: qtdProd,
  };

  addProduto(estoque, produto);
  res.send(`Produto adicionado com sucesso!`);
});

app.get("/listar", (req, res) => {
  res.send(`Estoque: ${listar(estoque)}`);
});

app.get("/remover/:id", (req, res) => {
  let idProd = parseInt(req.params.id);

  remover(idProd, estoque);
  res.send("Produto excluído com sucesso!");
});

app.get("/editar/:id/:qtd", (req, res) => {
  let idProd = parseInt(req.params.id);
  let qtdProd = parseInt(req.params.qtd);

  editar(idProd, qtdProd, estoque);
  res.send("Produto alterado com sucesso!");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});