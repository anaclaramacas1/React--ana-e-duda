const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORTA = 3000;


app.use(cors());
app.use(express.json());



const conexao = mysql.createConnection({
  host: "127.0.0.1",
  port: 3302,
  user: "root",
  password: "aluno",
  database: "aula_crud"
});

conexao.connect((erro) => {
  if (erro) {
    console.error("Erro ao conectar ao MySQL:", erro.message);
    return;
  }

  console.log("Conectado ao MySQL com sucesso!");
});



app.get("/produtos", (req, res) => {
  const sql = "CALL sp_listar_produtos()";

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: "Erro ao listar produtos"
      });
    }

    res.json(resultados[0]);
  });
});



app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      erro: "Nome e preço são obrigatórios"
    });
  }

  const sql = "CALL sp_cadastrar_produto(?, ?)";

  conexao.query(sql, [nome, preco], (erro, resultados) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: "Erro ao cadastrar produto"
      });
    }

    res.status(201).json({
      mensagem: "Produto cadastrado com sucesso"
    });
  });
});


app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      erro: "Nome e preço são obrigatórios"
    });
  }

  const sql = "CALL sp_atualizar_produto(?, ?, ?)";

  conexao.query(
    sql,
    [id, nome, preco],
    (erro, resultados) => {
      if (erro) {
        console.error(erro);

        return res.status(500).json({
          erro: "Erro ao atualizar produto"
        });
      }

      res.json({
        mensagem: "Produto atualizado com sucesso"
      });
    }
  );
});



app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "CALL sp_excluir_produto(?)";

  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error(erro);

      return res.status(500).json({
        erro: "Erro ao excluir produto"
      });
    }

    res.json({
      mensagem: "Produto excluído com sucesso"
    });
  });
});



app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});