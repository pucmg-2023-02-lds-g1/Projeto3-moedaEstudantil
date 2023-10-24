function visibilidadeDaSenha() {
    var input = document.getElementById("senha");
    var icon = document.getElementById("senhaIcon");
    if (input.type === "password") {
        icon.classList.remove("bi-eye-slash");
        input.type = "text";
        icon.classList.add("bi-eye-fill");
    } else {
        icon.classList.remove("bi-eye-fill");
        input.type = "password";
        icon.classList.add("bi-eye-slash");
    }
}

function estaLogado(tipo) {
    let usu = sessionStorage.getItem("usuario")
    if(!usu) {
        window.alert("Você não pode acessar essa página sem estar logado")
        window.location.assign("login.html")
    } else if(tipo == 1) {
        usu = JSON.parse(usu)
        if(usu.tipo != 1) {
            window.alert("Essa página não pode ser acessada por empresas")
            window.location.assign("index.html")
        }
    } else if(tipo == 2) {
        usu = JSON.parse(usu)
        if(usu.tipo != 2) {
            window.alert("Essa página não pode ser acessada por alunos")
            window.location.assign("index.html")
        }
    }
}

function login() {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const tipo = document.getElementById("tipo").value
    let tabela = "empresa"
    let id = "id"
    let url = "../views/empresa.html"

    if(tipo == 1) {
        tabela = "aluno"
        id = "idAluno"
        url = "../views/aluno.html"
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, tabela, email, senha
        })
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.s){
                window.alert(`${data.tipo} - ${data.mensagem}`)
            } else {
                sessionStorage.setItem("usuario",`{"id":${Number(data.id)}, "tipo":${tipo}}`)
                window.location.assign("index.html")
            }
        })
    })
}

function levarPerfil() {
    let usu = sessionStorage.getItem("usuario")
    if(usu) {
        usu = JSON.parse(usu)
        if(usu.tipo == 1) {
            window.location.assign("aluno.html")
        } else {
            window.location.assign("empresa.html")
        }
    } else {
        window.alert("Você precisa fazer login antes")
        window.location.assign("login.html")
    }
}

function levarCadastro() {
    const tipo = document.getElementById("tipo").value
    if(tipo == ""){
        window.alert("Selecione o campo de tipo do usuário para se redirecionado ao seu cadastro")
    } else if(tipo == 1) {
        window.location.assign("cadastroAluno.html")
    } else {
        window.location.assign("cadastroEmpresa.html")
    }
}

function levarHome() {
    window.location.assign("views/login.html")
}