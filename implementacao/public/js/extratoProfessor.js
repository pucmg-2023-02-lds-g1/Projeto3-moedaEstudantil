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