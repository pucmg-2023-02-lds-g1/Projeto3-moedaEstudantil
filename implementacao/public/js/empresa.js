function updateEmpresa() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    let nome, cnpj, email, senha;

    nome = document.getElementById("nome").value
    cnpj = document.getElementById("cnpj").value
    email = document.getElementById("email").value
    senha = document.getElementById("senha").value

    fetch("http://localhost:3000/updateEmpresa", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, cnpj, email, senha
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
                window.location.reload();
            }
        })
    })
}

function viewEmpresa() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    let nome = "", cnpj = "", email = "", senha = "";

    fetch("http://localhost:3000/viewEmpresa", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.empresa) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                nome = data.empresa.nome, cnpj = data.empresa.cnpj, email = data.empresa.email, senha = data.empresa.senha;
            }

            document.getElementById("nome").value = nome
            document.getElementById("cnpj").value = cnpj
            document.getElementById("email").value = email
            document.getElementById("senha").value = senha
        })
    })
}

function deletarEmpresa() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    fetch("http://localhost:3000/deleteEmpresa", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (data.tipo) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.assign("../public/views/index.html")
            }
        })
    })
}

function viewAllEmpresas() {
    fetch("http://localhost:3000/viewAllEmpresas", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.empresas){
                window.alert(`${data.tipo} - ${data.mensagem}`)
            } else {
                data.empresas.forEach(empresa => {
                    console.log(`Nome: ${empresa.nome}, CNPJ: ${empresa.cnpj}, Email: ${empresa.email}`);
                });
            }
        })
    })
}

function cadastrarEmpresa() {
    let nome = document.getElementById("nome").value
    let cnpj = document.getElementById("cnpj").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    fetch("http://localhost:3000/cadastrarEmpresa", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, cnpj, email, senha
        })
    }).then(function(res) {
        res.json().then(function(data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if(data.s){
                window.location.reload();
            }
        })
    })
}
