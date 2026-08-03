import {
    pegarCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerCarrinho,
    calcularTotal,
    limparCarrinho
} from "./carrinho.js";

const lista = document.getElementById("listaCarrinho");
const total = document.getElementById("valorTotal");

function renderizarCarrinho() {
    const carrinho = pegarCarrinho();

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<h3>Seu carrinho está vazio.</h3>";
        total.innerHTML = "R$ 0,00";
        return;
    }

    carrinho.forEach(produto => {
        const subtotal = (produto.preco * produto.quantidade).toFixed(2);
        
        lista.innerHTML += `
            <div class="produtoCarrinho">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="informacoes">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <div class="quantidade">
                        <button onclick="diminuir(${produto.id})">-</button>
                        <span>${produto.quantidade}</span>
                        <button onclick="aumentar(${produto.id})">+</button>
                    </div>
                    <p class="subtotal">Subtotal: R$ ${subtotal}</p>
                    <button class="remover" onclick="remover(${produto.id})">
                        Remover
                    </button>
                </div>
            </div>
        `;
    });

    const totalFormatado = calcularTotal().toFixed(2);
    total.innerHTML = `R$ ${totalFormatado}`;
}

window.aumentar = (id) => {
    aumentarQuantidade(id);
    renderizarCarrinho();
};

window.diminuir = (id) => {
    diminuirQuantidade(id);
    renderizarCarrinho();
};

window.remover = (id) => {
    removerCarrinho(id);
    renderizarCarrinho();
};

document.getElementById("btnLimpar").onclick = () => {
    if (confirm("Deseja limpar o carrinho?")) {
        limparCarrinho();
        renderizarCarrinho();
    }
};

document.getElementById("btnFinalizar").onclick = () => {
    if (pegarCarrinho().length == 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    alert("Pedido realizado com sucesso!");
    limparCarrinho();
    renderizarCarrinho();
};

renderizarCarrinho();