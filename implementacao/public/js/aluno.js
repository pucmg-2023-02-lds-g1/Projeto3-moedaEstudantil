function updateAluno() {
    let nome, cpf, email, endereco, instituicao, curso;
    // Adicionar os 'var = document.getElementById("").value'

    fetch("http://localhost:3000/updateAluno", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, cpf, email, endereco, instituicao, curso
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

function viewAluno(id) {
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

            // Adicionar os 'document.getElementById("").value = var'
        })
    })
}