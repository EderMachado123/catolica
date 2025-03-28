const express = require("express");
const app = express();

// Basic calculator functions
const calc = {
    somar: (a, b) => a + b,
    subtrair: (a, b) => a - b,
    multiplicar: (a, b) => a * b,
    dividir: (a, b) => b !== 0 ? a / b : "Divisão por zero não permitida"
};

app.get("/", (req, res) => {
    let html = "<h1>app_calculadora</h1>";
    html += "<h3>Rotas disponíveis</h3>";
    html += '<p><a href="/somar/2/3">/somar/2/3</a> (Somar)</p>';
    html += '<p><a href="/subtrair/5/3">/subtrair/5/3</a> (Subtrair)</p>';
    html += '<p><a href="/multiplicar/2/3">/multiplicar/2/3</a> (Multiplicar)</p>';
    html += '<p><a href="/dividir/6/3">/dividir/6/3</a> (Dividir)</p>';
    res.send(html);
});

app.get("/somar/:a/:b", (req, res) => {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    let resultado = calc.somar(a, b);
    res.send(`${a} + ${b} = ${resultado}`);
});

app.get("/subtrair/:a/:b", (req, res) => {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    let resultado = calc.subtrair(a, b);
    res.send(`${a} - ${b} = ${resultado}`);
});

app.get("/multiplicar/:a/:b", (req, res) => {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    let resultado = calc.multiplicar(a, b);
    res.send(`${a} * ${b} = ${resultado}`);
});

app.get("/dividir/:a/:b", (req, res) => {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    let resultado = calc.dividir(a, b);
    res.send(`${a} / ${b} = ${resultado}`);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT}`);
});
