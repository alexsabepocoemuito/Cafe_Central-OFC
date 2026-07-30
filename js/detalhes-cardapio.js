// Captura os elementos da página "detalhes-cardapio"
const conteudoCardapio = document.querySelector("#conteudoCardapio");
const mensagemDetalhes = document.querySelector("#mensagemDetalhes");

// Lê o identificador enviado na URL
const parametros = new URLSearchParams(window.location.search);
const idItem = Number(parametros.get("id"));

// Função que carrega o item do cardápio
async function carregarDetalhes() {
    try{
        const resposta = await fetch("../data/curso.json");

        if(!resposta){
            console.error("Não foi possível carregar os itens!")
            mensagemDetalhes.textContent = "Não foi possível carregar os itens!"
        };

        const items = await resposta.json();

        const itemEncontrado = items.find(item => item.id === idItem);

    if(!itemEncontrado){
        mostrarItemNaoEncontrado();
        return;
    };

    mostrarItem(itemEncontrado);

    } catch(erro){
        console.error("Erro ao carregar o item!", erro)
        mensagemDetalhes.textContent = "Não foi possível carregar o item!"
    };
};

function mostrarItem(item){
    mensagemDetalhes.textContent = "";

    conteudoCardapio.innerHTML = `
        <h3>${item.titulo}</h3>
        <img src="${item.img}">
        <p>${item.desc}</p>
        <span class="preco">${item.preco}</span>
        <button class="btn-detalhes" href="../pages/cardapio">Voltar para cardapio</button>
    `
};

function mostrarItemNaoEncontrado(){
    mensagemDetalhes.textContent = "";

    conteudoCardapio.innerHTML = `
        <div class="detalheCardapio">
          <h1> Item não encontrado!</h1>
          <p> O item não existe ou não está disponível </p>
        </div>
    `
};

// Inicia o carregamento
carregarDetalhes();