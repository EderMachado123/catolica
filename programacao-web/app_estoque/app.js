export function addProduto(estoque, produto) {
    produto.id = estoque.length + 1;
    estoque.push(produto);
  
    return estoque;
  }
  
  export function listar(estoque) {
    return estoque
      .map(
        (produto) =>
          `${produto.nome} (ID: ${produto.id}, Quantidade: ${produto.quantidade})`
      )
      .join("\n");
  }
  
  export function remover(id, estoque) {
    const indexRemove = estoque.findIndex((p) => p.id === id);
  
    if (indexRemove !== -1) {
      estoque.splice(indexRemove, 1);
    } else {
      console.log("Id inexistente...");
    }
    return estoque;
  }
  
  export function editar(id, qtd, estoque) {
    const indexEdit = estoque.findIndex((p) => p.id === id);
  
    if (indexEdit !== -1) {
      estoque[indexEdit].quantidade = qtd;
    } else {
      console.log("Id inexistente...");
    }
    return estoque;
  }