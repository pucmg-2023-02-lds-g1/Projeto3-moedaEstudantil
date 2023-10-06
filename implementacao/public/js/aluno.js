function updateAluno() {
    let id = sessionStorage.getItem("usuario")
    if(id){
        id = JSON.parse(id).id
    }
    
    let nome, cpf, email, endereco, instituicao, curso;
    
    nome = document.getElementById("nome").value
    cpf = document.getElementById("cpf").value
    email = document.getElementById("email").value
    endereco = document.getElementById("endereco").value
    instituicao = document.getElementById("instituicao").value
    curso = document.getElementById("curso").value

    fetch("http://localhost:3000/updateAluno", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, cpf, email, endereco, instituicao, curso
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

    let nome = "", cpf = "", email = "", endereco = "", instituicao = "", curso = "", moeda = "";

    fetch("http://localhost:3000/viewAluno", {
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
                nome = data.aluno.nome, cpf = data.aluno.cpf, email = data.aluno.email, endereco = data.aluno.endereco, instituicao = data.aluno.instituicao, curso = data.aluno.curso, moeda = data.aluno.moeda;
            }

            document.getElementById("nome").value = nome
            document.getElementById("cpf").value = cpf
            document.getElementById("email").value = email
            document.getElementById("endereco").value = endereco
            document.getElementById("instituicao").value = instituicao
            document.getElementById("curso").value = curso
            document.getElementById("moeda").value = moeda
        })
    })
}