async function getProfessor() {
    let dados;
    try {
        const response = await fetch('http://localhost:3000/getProfessor');
        dados = await response.json();
        console.log(dados);
    } catch (error) {
        console.error('Erro:', error);
    }
    return dados;
}

async function getAlunos() {
    let dados;
    try {
        const response = await fetch('http://localhost:3000/viewAllAlunos');
        dados = await response.json();
        console.log(dados);
    } catch (error) {
        console.error('Erro:', error);
    }
    return dados;
}

async function infoProfessor() {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    var dados = await getProfessor();
    var dadosProfessor = dados.empresas.find(professor => professor.idProfessor == usuario.id);
    return dadosProfessor;
}

async function extratoProfessor(){
    var dadosProfessor = await infoProfessor();

    document.querySelector('#infoProfessor').innerHTML = ` 
        <div id="infoProfessor">
            <h3 class="nome">Nome: ${dadosProfessor.nome}</h1>
            <p class="moedas">Número de moedas: ${dadosProfessor.moeda}</p>
        </div>
    `
}

async function viewTransacoesProfessor() {
    let idProfessor = sessionStorage.getItem("usuario")
    if(idProfessor){
        idProfessor = JSON.parse(idProfessor).id
    }

    await fetch(`http://localhost:3000/viewTransacoesProfessor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idProfessor
        })
    }).then(function(res) {
        res.json().then(function(data) {
            if(!data.transacoes){
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                innerHTMLTransacoes(data.transacoes);
                console.log(data.transacoes);
            }
        })
    })
}

async function innerHTMLTransacoes(data) {
    

    for(var i=0; i< data.length; i++){
        var dadosAluno = await infoAluno(data[i].Aluno_idAluno);
        document.querySelector('#listaTransacoes').innerHTML += ` 
      <div class="transacao">
        <h4>Nome aluno: ${dadosAluno.nome}</h4>
        <div class="infos">
          <p><strong>Valor:</strong> ${data[i].valor}</p>
          <p><strong>Descrição:</strong> ${data[i].descricao}</p>
        </div>
      </div>
        `
    }
}
async function infoAluno(id) {
    var dados = await getAlunos();
    var dadosAluno = dados.alunos.find(aluno => aluno.idAluno == id);
    return dadosAluno;
}
