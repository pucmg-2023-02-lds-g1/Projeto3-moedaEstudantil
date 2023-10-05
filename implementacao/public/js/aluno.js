function updateAluno() {
    let nome, cpf, email, endereco, instituicao, curso, moeda;

    fetch("http://localhost:3000/updateAluno", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, cpf, email, endereco, instituicao, curso, moeda
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