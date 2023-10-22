function updateProfessor() {
    let id = sessionStorage.getItem("usuario")
    if(id){
        id = JSON.parse(id).id
    }
    
    let nome, cpf, email, endereco, instituicao, rg, senha, moedas;
    
    nome = document.getElementById("nome").value
    cpf = document.getElementById("cpf").value
    email = document.getElementById("email").value
    senha = document.getElementById("senha").value
    endereco = document.getElementById("endereco").value
    instituicao = document.getElementById("instituicao").value
    rg = document.getElementById("rg").value
    moedas = document.getElementById("moedas").value

    fetch(`http://localhost:3000/updateProfessor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, cpf, email, endereco, instituicao, rg, senha, moedas
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

function viewProfessor() {
    let id = sessionStorage.getItem("usuario")
    if(id){
        id = JSON.parse(id).id
    }

    let nome = "", cpf = "", email = "", endereco = "", instituicao = "", rg = "", moeda = "", senha = "";

    fetch(`http://localhost:3000/viewProfessor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.professor){
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                nome = data.professor.nome;
                cpf = data.professor.cpf;
                email = data.professor.email;
                senha = data.professor.senha;
                endereco = data.professor.endereco;
                instituicao = data.professor.instituicao;
                rg = data.professor.rg;
                moeda = data.professor.moeda;
            }

            document.getElementById("nome").value = nome;
            document.getElementById("cpf").value = cpf;
            document.getElementById("email").value = email;
            document.getElementById("senha").value = senha;
            document.getElementById("endereco").value = endereco;
            document.getElementById("instituicao").value = instituicao;
            document.getElementById("rg").value = rg;
            document.getElementById("moeda").value = moeda;
        })
    })
}
