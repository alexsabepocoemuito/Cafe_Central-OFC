import { adicionarCarrinho } from "./carrinho.js";

const listaItensContainer = document.querySelector("#ListaItens");
const botoesCategoria = document.querySelectorAll(".btnCategoria");
const buscaInput = document.querySelector("#BuscarItens");

let itensCardapio = [];

async function carregarCardapio() {
    try {
        const resposta = await fetch("../data/cardapio.json");
        if (!resposta.ok) throw new Error("Erro ao carregar o cardápio");
        
        itensCardapio = await resposta.json();
        renderizarItens(itensCardapio);
    } catch (error) {
        console.error("Erro:", error);
        listaItensContainer.innerHTML = "<p>Não foi possível carregar o cardápio no momento.</p>";
    }
}

function renderizarItens(lista) {
    listaItensContainer.innerHTML = "";

    if (lista.length === 0) {
        listaItensContainer.innerHTML = "<p>Nenhum item encontrado.</p>";
        return;
    }

    lista.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        const preco = item.preco.toFixed(2);

        card.innerHTML = `
            <img src="${item.img}" alt="${item.titulo}">
            <h3>${item.titulo}</h3>
            <p>${item.desc}</p>
            <span class="preco">R$ ${preco}</span>
            <div class="card-acoes">
                <a href="detalhes-cardapio.html?id=${item.id}">
                    <button class="btn-detalhes">Ver detalhes</button>
                </a>
                <button class="btn-carrinho" onclick="adicionarAoCarrinho(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                    Adicionar
                </button>
            </div>
        `;
        listaItensContainer.appendChild(card);
    });
}

// Função global para adicionar ao carrinho
window.adicionarAoCarrinho = function(produto) {
    const nome = adicionarCarrinho(produto);
    alert(`${nome} adicionado ao carrinho!`);
};

// Busca
if (buscaInput) {
    buscaInput.addEventListener("input", function() {
        const texto = buscaInput.value.toLowerCase();
        const filtrados = itensCardapio.filter(item => 
            item.titulo.toLowerCase().includes(texto) || 
            item.desc.toLowerCase().includes(texto)
        );
        renderizarItens(filtrados);
    });
}

// Filtro por categoria
botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;

        if (categoria === "todos") {
            renderizarItens(itensCardapio);
        } else {
            const filtrados = itensCardapio.filter(item =>
                item.categoria === categoria
            );
            renderizarItens(filtrados);
        }
    });
});

carregarCardapio();