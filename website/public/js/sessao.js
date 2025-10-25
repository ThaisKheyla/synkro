// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function validarSessaoSynkro() {
    if (sessionStorage.EMAIL_USUARIO == undefined) {
        sessionStorage.clear();
        window.location = "./login.html";
        return;
    }

    // pega os elementos do HTML
    var nome_login = document.getElementById("nome_login");
    var email_login = document.getElementById("email_login");

    if (nome_login) nome_login.innerHTML = sessionStorage.NOME_USUARIO;
    if (email_login) email_login.innerHTML = sessionStorage.EMAIL_USUARIO;
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if(divAguardar) divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if(divAguardar) divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto && divErrosLogin) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
