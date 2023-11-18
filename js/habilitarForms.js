document.addEventListener('DOMContentLoaded', function () {
    // Aguarda o DOM ser totalmente carregado

    // Seleciona o link usando o id
    var linkCriarConta = document.getElementById('linkCriarConta');
    var linkLogin = document.getElementById('linkLogin');

    // Adiciona um ouvinte de evento de clique
    linkCriarConta.addEventListener('click', function (event) {
        // Impede o comportamento padrão do link (neste caso, evitar seguir o href="#" e recarregar a página)
        event.preventDefault();

        // Chama a função desejada
        document.getElementById('registroForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';

    });

    // Adiciona um ouvinte de evento de clique
    linkLogin.addEventListener('click', function (event) {
        // Impede o comportamento padrão do link (neste caso, evitar seguir o href="#" e recarregar a página)
        event.preventDefault();

        // Chama a função desejada
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registroForm').style.display = 'none';

    });    
});