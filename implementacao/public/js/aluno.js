function updateAluno() {
    let id = sessionStorage.getItem("usuario")
    if(id){
        id = JSON.parse(id).id
    }
    
    let nome, cpf, email, endereco, instituicao, curso, senha;
    
    nome = document.getElementById("nome").value
    cpf = document.getElementById("cpf").value
    email = document.getElementById("email").value
    senha = document.getElementById("senha").value
    endereco = document.getElementById("endereco").value
    instituicao = document.getElementById("instituicao").value
    curso = document.getElementById("curso").value

    fetch(`http://localhost:3000/updateAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, cpf, email, endereco, instituicao, curso, senha
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

function viewAluno() {
    let id = sessionStorage.getItem("usuario")
    if(id){
        id = JSON.parse(id).id
    }

    let nome = "", cpf = "", email = "", endereco = "", instituicao = "", curso = "", moeda = "", senha = "";

    fetch(`http://localhost:3000/viewAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.aluno){
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                nome = data.aluno.nome, cpf = data.aluno.cpf, email = data.aluno.email, senha = data.aluno.senha, endereco = data.aluno.endereco, instituicao = data.aluno.instituicao, curso = data.aluno.curso, moeda = data.aluno.moeda;
            }

            document.getElementById("nome").value = nome
            document.getElementById("cpf").value = cpf
            document.getElementById("email").value = email
            document.getElementById("senha").value = senha
            document.getElementById("endereco").value = endereco
            document.getElementById("instituicao").value = instituicao
            document.getElementById("curso").value = curso
            document.getElementById("moeda").value = moeda
        })
    })
}

function deletarAluno() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    fetch(`http://localhost:3000/deleteAluno`, {
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

function cadastrarAluno() {
    
    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let endereco = document.getElementById("endereco").value
    let instituicao = document.getElementById("instituicao").value
    let curso = document.getElementById("curso").value

    fetch(`http://localhost:3000/cadastrarAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, cpf, email, endereco, instituicao, curso, senha
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

function viewAllAlunos() {
    fetch(`http://localhost:3000/viewAllAlunos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.alunos){
                window.alert(`${data.tipo} - ${data.mensagem}`)
            } else {
                data.alunos.forEach(aluno => {
                    console.log(`Nome: ${aluno.nome}, CPF: ${aluno.cpf}, Email: ${aluno.email}, Endereço: ${aluno.endereco}, Instituição: ${aluno.Instituicao_id}, Curso: ${aluno.Curso_idCurso}`);
                });
            }
        })
    })
}

function pesquisarInstituicoes() {

    const dropdown = document.getElementById("instituicao")
    $("#instituicao").html(``)
    // Recebe a resposta enviada pela rota de pesquisa no banco de dados
    fetch(`http://localhost:3000/pesquisarInstituicoes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
        $("#instituicao").append(`<option value="null">Instituições</option>`)
        res.json().then(function (data) {
            for (let i = 0; i < data.length; i++) {
                $("#instituicao").append('<option value="' + data[i].id + '">' + data[i].nome + '</option>');
            }
        })
    })
}
