import { useState } from "react";

function FormTarefa({ onAdicionar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  function enviar(event) {
    event.preventDefault();

    const nomeLimpo = nome.trim();

    if (!nomeLimpo || preco === "") {
      return;
    }

    onAdicionar(nomeLimpo, preco);

    setNome("");
    setPreco("");
  }

  return (
    <form
      className="formulario"
      onSubmit={enviar}
    >
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(event) =>
          setNome(event.target.value)
        }
      />

      <input
        type="number"
        step="0.01"
        placeholder="Preço"
        value={preco}
        onChange={(event) =>
          setPreco(event.target.value)
        }
      />

      <button type="submit">
        Adicionar
      </button>
    </form>
  );
}

export default FormTarefa;