const CHAVE_CARRINHO = "carrinhoCafeCentral";

export function pegarCarrinho() {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

export function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

export function adicionarCarrinho(produto) {
    let carrinho = pegarCarrinho();
    
    // Normalizar produto (converter titulo para nome)
    const produtoNormalizado = {
        id: produto.id,
        nome: produto.titulo || produto.nome,
        preco: typeof produto.preco === 'string' ? parseFloat(produto.preco) : produto.preco,
        imagem: produto.img || produto.imagem,
        categoria: produto.categoria
    };
    
    const existe = carrinho.find(item => item.id === produtoNormalizado.id);
    
    if (existe) {
        existe.quantidade++;
    } else {
        carrinho.push({
            ...produtoNormalizado,
            quantidade: 1
        });
    }
    
    salvarCarrinho(carrinho);
    atualizarQuantidadeCarrinho();
    
    return produtoNormalizado.nome;
}

export function removerCarrinho(id) {
    let carrinho = pegarCarrinho();
    carrinho = carrinho.filter(item => item.id != id);
    salvarCarrinho(carrinho);
    atualizarQuantidadeCarrinho();
}

export function aumentarQuantidade(id) {
    let carrinho = pegarCarrinho();
    const item = carrinho.find(produto => produto.id == id);
    
    if (item) {
        item.quantidade++;
        salvarCarrinho(carrinho);
        atualizarQuantidadeCarrinho();
    }
}

export function diminuirQuantidade(id) {
    let carrinho = pegarCarrinho();
    const item = carrinho.find(produto => produto.id == id);
    
    if (item) {
        item.quantidade--;
        
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id != id);
        }
        
        salvarCarrinho(carrinho);
        atualizarQuantidadeCarrinho();
    }
}

export function calcularTotal() {
    const carrinho = pegarCarrinho();
    let total = 0;
    
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });
    
    return total;
}

export function quantidadeItens() {
    const carrinho = pegarCarrinho();
    let total = 0;
    
    carrinho.forEach(item => {
        total += item.quantidade;
    });
    
    return total;
}

export function limparCarrinho() {
    localStorage.removeItem(CHAVE_CARRINHO);
    atualizarQuantidadeCarrinho();
}

export function atualizarQuantidadeCarrinho() {
    const contador = document.querySelector("#contadorCarrinho");
    
    if (contador) {
        const quantidade = quantidadeItens();
        contador.innerHTML = quantidade;
        contador.style.display = quantidade > 0 ? 'flex' : 'none';
    }
}