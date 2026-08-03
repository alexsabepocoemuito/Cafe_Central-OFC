const CHAVE_CARRINHO = "carrinhoCafeCentral";

export function pegarCarrinho() {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

export function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

export function adicionarCarrinho(produto) {

    let carrinho = pegarCarrinho();

    const existe = carrinho.find(item => item.id === produto.id);

    if (existe) {
        existe.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    atualizarQuantidadeCarrinho();

    alert(`${produto.nome} adicionado ao carrinho!`);
}

export function removerCarrinho(id){

    let carrinho = pegarCarrinho();

    carrinho = carrinho.filter(item => item.id != id);

    salvarCarrinho(carrinho);

    atualizarQuantidadeCarrinho();
}

export function aumentarQuantidade(id){

    let carrinho = pegarCarrinho();

    const item = carrinho.find(produto=>produto.id==id);

    if(item){

        item.quantidade++;

        salvarCarrinho(carrinho);

        atualizarQuantidadeCarrinho();
    }

}

export function diminuirQuantidade(id){

    let carrinho = pegarCarrinho();

    const item = carrinho.find(produto=>produto.id==id);

    if(item){

        item.quantidade--;

        if(item.quantidade<=0){

            carrinho = carrinho.filter(produto=>produto.id!=id);

        }

        salvarCarrinho(carrinho);

        atualizarQuantidadeCarrinho();

    }

}

export function calcularTotal(){

    const carrinho = pegarCarrinho();

    let total = 0;

    carrinho.forEach(item=>{

        total += item.preco * item.quantidade;

    });

    return total;

}

export function quantidadeItens(){

    const carrinho = pegarCarrinho();

    let total=0;

    carrinho.forEach(item=>{

        total += item.quantidade;

    });

    return total;

}

export function limparCarrinho(){

    localStorage.removeItem(CHAVE_CARRINHO);

    atualizarQuantidadeCarrinho();

}

export function atualizarQuantidadeCarrinho(){

    const contador = document.querySelector("#contadorCarrinho");

    if(contador){

        contador.innerHTML = quantidadeItens();

    }

}