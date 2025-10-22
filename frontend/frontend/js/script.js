// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona os elementos do formulário pelos IDs que adicionamos
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const errorMessage = document.getElementById("error-message");

    // Adiciona um "ouvinte" para o evento de "submit" (envio) do formulário
    loginForm.addEventListener("submit", async (event) => {
        // Previne o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // Limpa mensagens de erro anteriores
        errorMessage.textContent = "";

        // Pega os valores digitados pelo usuário
        const email = emailInput.value;
        const senha = senhaInput.value;

        // Define a URL do seu backend. 
        // Estou assumindo http://localhost:3001 com base no seu arquivo src/server.js
        const backendUrl = "http://localhost:3001/funcionarios/login";

        try {
            // Usa a API 'fetch' para enviar os dados para o backend
            const response = await fetch(backendUrl, {
                method: "POST", // Método HTTP
                headers: {
                    // Informa ao backend que estamos enviando dados no formato JSON
                    "Content-Type": "application/json",
                },
                // Converte os dados do JavaScript para uma string JSON
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            // Converte a resposta do backend (que é JSON) para um objeto JavaScript
            const data = await response.json();

            // 'response.ok' é verdadeiro se o status for 2xx (sucesso)
            if (response.ok) {
                // Sucesso! O backend enviou um token
                console.log("Login bem-sucedido:", data.token);
                
                // Salva o token no localStorage do navegador para usar em outras páginas
                localStorage.setItem("authToken", data.token);

                 // Redireciona o usuário para a página principal (ex: dashboard)
                window.location.href = 'logado.html'; 
                

            } else {
                // Se o status não for 'ok', o backend enviou um erro
                // Exibe a mensagem de erro (ex: "Credenciais inválidas")
                errorMessage.textContent = data.erro || "Erro ao fazer login.";
            }

        } catch (error) {
            // Captura erros de rede (ex: backend desligado)
            console.error("Erro na requisição:", error);
            errorMessage.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
        }
    });
});