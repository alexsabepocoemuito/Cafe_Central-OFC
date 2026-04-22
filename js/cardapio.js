const listaItensContainer = document.querySelector("#ListaItens");
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

        card.innerHTML = `
            <img src="${item.img}" alt="${item.titulo}" onerror="this.src='https://via.placeholder.com/300x200?text=Cafe+Central'">
            <h3>${item.titulo}</h3>
            <p>${item.desc}</p>
            <span class="preco">${item.preco}</span>
            <button class="btn-detalhes" onclick="alert('Detalhes de ${item.titulo} em breve!')">Ver detalhes</button>
        `;
        listaItensContainer.appendChild(card);
    });
}

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

carregarCardapio();
