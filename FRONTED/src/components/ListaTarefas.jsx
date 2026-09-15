function ListaTarefas({
  produtos,
  onExcluir,
  onEditar
}) {
  if (produtos.length === 0) {
    return (
      <p>
        Nenhum produto cadastrado.
      </p>
    );
  }

  return (
    <section className="lista">

      {produtos.map((produto) => (

        <article
          className="tarefa"
          key={produto.id}
        >

          <div>

            <h2>
              {produto.nome}
            </h2>

            <span>
              R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
            </span>

          </div>

          <div className="acoes">

            <button
              type="button"
              onClick={() =>
                onEditar(produto)
              }
            >
              Editar
            </button>

            <button
              type="button"
              className="botao-excluir"
              onClick={() =>
                onExcluir(produto.id)
              }
            >
              Excluir
            </button>

          </div>

        </article>

      ))}

    </section>
  );
}

export default ListaTarefas;