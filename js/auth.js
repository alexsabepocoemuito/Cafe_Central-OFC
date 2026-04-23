const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");
const API_URL = "https://cafe-central-ofc-mbgd.onrender.com";

if (formCadastro) {
    formCadastro.addEventListener("submit", async function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmaSenha = document.getElementById("confirmaSenha").value;
        const mensagemCadastro = document.getElementById("mensagemCadastro");
        
        if (!nome || !email || !senha || !confirmaSenha) {
            mensagemCadastro.textContent = "Preencha todos os campos.";
            return;
        }
        if (senha !== confirmaSenha) {
            mensagemCadastro.textContent = "As senhas não coincidem.";
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/cadastro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha })
            });

            const dados = await resposta.json();
            mensagemCadastro.textContent = dados.mensagem || dados.error;
            if (resposta.ok) {
                formCadastro.reset();
                setTimeout(() => window.location.href = "login.html", 2000);
            }
        } catch (error) {
            mensagemCadastro.textContent = "Erro ao conectar com o servidor.";
        }
    });
}

if (formLogin) {
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("emailLogin").value.trim();
        const senha = document.getElementById("senhaLogin").value;
        const mensagemLogin = document.getElementById("mensagemLogin");
        
        if (!email || !senha) {
            mensagemLogin.textContent = "Preencha os campos.";
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({email, senha})
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                window.location.href = "cardapio.html";
                console.log("O script carregou com sucesso!");
            } else {
                mensagemLogin.textContent = dados.mensagemLogin || dados.error;
            }
        } catch (error) {
            console.error(error);
            mensagemLogin.textContent = "Erro ao conectar com o servidor.";
        }
    });
}
