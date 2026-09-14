import { useEffect, useState } from "react";

import FormTarefa from "./components/FormTarefa.jsx";
import ListaTarefas from "./components/ListaTarefas.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import {
  buscarProdutos,
  criarProduto,
  excluirProduto,
  atualizarProduto
} from "./services/tarefaService.js";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarProdutos();

      setProdutos(dados);
    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível carregar os produtos. Verifique se o servidor está rodando."
      );
    } finally {
      setCarregando(false);
    }
  }



  async function adicionarProduto(nome, preco) {
    try {
      setErro("");

      await criarProduto({
        nome: nome,
        preco: Number(preco)
      });

      await carregarProdutos();
    } catch (error) {
      console.error(error);

      setErro("Não foi possível cadastrar o produto.");
    }
  }

 

  async function removerProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await excluirProduto(id);

      await carregarProdutos();
    } catch (error) {
      console.error(error);

      setErro("Não foi possível excluir o produto.");
    }
  }



  async function editarProduto(produto) {
    const novoNome = window.prompt(
      "Digite o novo nome do produto:",
      produto.nome
    );

    if (novoNome === null) {
      return;
    }

    const novoPreco = window.prompt(
      "Digite o novo preço:",
      produto.preco
    );

    if (novoPreco === null) {
      return;
    }

    if (!novoNome.trim() || novoPreco === "") {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      setErro("");

      await atualizarProduto(produto.id, {
        nome: novoNome.trim(),
        preco: Number(novoPreco)
      });

      await carregarProdutos();
    } catch (error) {
      console.error(error);

      setErro("Não foi possível atualizar o produto.");
    }
  }

  return (
    <>
      <Header />

      <main className="container">

        <section className="apresentacao">

          <h1>Gerenciador de Produtos</h1>

          <p>
            React consumindo a API de Produtos
            (Node + Express + MySQL)
          </p>

        </section>

        <FormTarefa
          onAdicionar={adicionarProduto}
        />

        {erro && (
          <p className="erro">
            {erro}
          </p>
        )}

        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <ListaTarefas
            produtos={produtos}
            onExcluir={removerProduto}
            onEditar={editarProduto}
          />
        )}

      </main>

      <Footer />
    </>
  );
}

export default App;