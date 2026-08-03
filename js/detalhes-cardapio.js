import { adicionarCarrinho } from "./carrinho.js";

const conteudoCardapio = document.querySelector("#conteudoCardapio");
const mensagemDetalhes = document.querySelector("#mensagemDetalhes");

// Lê o identificador enviado na URL
const parametros = new URLSearchParams(window.location.search);
const idItem = Number(parametros.get("id"));

// Função que carrega o item do cardápio
async function carregarDetalhes() {
    try {
        const resposta = await fetch("../data/cardapio.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os itens!");
        }

        const items = await resposta.json();
        const itemEncontrado = items.find(item => item.id === idItem);

        if (!itemEncontrado) {
            mostrarItemNaoEncontrado();
            return;
        }

        mostrarItem(itemEncontrado);

    } catch (erro) {
        console.error("Erro ao carregar o item!", erro);
        mensagemDetalhes.textContent = "Não foi possível carregar o item!";
    }
}

function mostrarItem(item) {
    mensagemDetalhes.textContent = "";
    const preco = item.preco.toFixed(2);

    conteudoCardapio.innerHTML = `
        <div class="detalhe-container">
            <img src="${item.img}" alt="${item.titulo}" class="detalhe-imagem">
            <div class="detalhe-info">
                <h1>${item.titulo}</h1>
                <p class="detalhe-desc">${item.desc}</p>
                <span class="preco">R$ ${preco}</span>
                <div class="detalhe-acoes">
                    <button class="btn-carrinho" onclick="adicionarAoCarrinho(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        🛒 Adicionar ao Carrinho
                    </button>
                    <a href="cardapio.html">
                        <button class="btn-voltar">← Voltar ao Cardápio</button>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function mostrarItemNaoEncontrado() {
    mensagemDetalhes.textContent = "";

    conteudoCardapio.innerHTML = `
        <div class="detalheCardapio">
            <h1>Item não encontrado!</h1>
            <p>O item não existe ou não está disponível</p>
            <a href="cardapio.html">
                <button class="btn-voltar">← Voltar ao Cardápio</button>
            </a>
        </div>
    `;
}

// Função global para adicionar ao carrinho
window.adicionarAoCarrinho = function(produto) {
    const nome = adicionarCarrinho(produto);
    alert(`${nome} adicionado ao carrinho!`);
};

// Inicia o carregamento
carregarDetalhes();