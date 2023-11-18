function updateAluno() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
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
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
                window.location.reload();
            }
        })
    })
}

function viewAluno() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    let nome = "", cpf = "", email = "", endereco = "", instituicao = "", curso = "", moeda = "", senha = "";

    fetch(`http://localhost:3000/viewAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.aluno) {
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
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
                window.location.assign("login.html");
            }
        })
    })
}

function viewAllAlunos() {
    fetch(`http://localhost:3000/viewAllAlunos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.alunos) {
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

function mostraExtrato() {
    let id = sessionStorage.getItem("usuario")
    if (id) {
        id = JSON.parse(id).id
    }

    fetch(`http://localhost:3000/viewAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.aluno) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                document.querySelector('#infoAluno').innerHTML = ` 
                    <h3 class="nome">Nome: ${data.aluno.nome}</h1>
                    <p class="moedas">Número de moedas: ${data.aluno.moeda}</p>
            `
            }

        })
    })


}


function pegarExtratoAluno() {
    var aluno = sessionStorage.getItem('usuario')
    var id;
    if (aluno) {
        id = JSON.parse(aluno).id
    }


    fetch(`http://localhost:3000/pesquisarExtratoAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.transacoes) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                var campo = document.getElementById('transacoes');
                for (let i = 0; i < data.transacoes.length; i++) {
                    campo.innerHTML += `
                    <div class="transacao">
                        <div class="infos">
                            <p><strong>Nome Professor:</strong> ${data.transacoes[i].nomeProfessor}</p>
                            <p><strong>Valor:</strong> ${data.transacoes[i].valor}</p>
                            <p><strong>Descrição:</strong> ${data.transacoes[i].descricao}</p>
                        </div>
                    </div>
                    `
                }

            }

        })
    })
}

function listarVantagens() {
    fetch(`http://localhost:3000/listarVantagens`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
        res.json().then(function (data) {
            if (data.tipo) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                var campo = document.getElementById('vantagens');
                for (let i = 0; i < data.length; i++) {
                    campo.innerHTML += `
                    <div id="vantagens[${data[i].idVantagem}]" class="vantagem"  style="height: auto;">
                        <div class="infos pb-1 row m-0">
                          <div class="col-4 p-0 align-items-center">
                            <img src="${data[i].foto}" alt="imagem da vantagem">
                          </div>
                          <div class="col-8">
                            <p id="nomeVantagem"><strong>Nome:</strong> ${data[i].nome}</p>
                            <p id="precoVantagem"><strong>Preço:</strong> ${data[i].preco}</p>
                            <p><strong>Descrição:</strong> ${data[i].descricao}</p>
                            <button type="button" class="btn btn-primary mt-2" onclick="comprarVantagem(${data[i].idVantagem})">Comprar</button>
                          </div>
                        </div>
                    </div>
                    `
                }

            }

        })
    })
    
}

function pegarVantagensAluno() {
    var aluno = sessionStorage.getItem('usuario')
    var id;
    if (aluno) {
        id = JSON.parse(aluno).id
    }


    fetch(`http://localhost:3000/vantagensDoAluno`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data.vantagens) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
                window.location.reload();
            } else {
                var campo = document.getElementById('compras');
                for (let i = 0; i < data.vantagens.length; i++) {
                    campo.innerHTML += `
                    <div class="transacao gasto">
                        <div class="infos">
                            <p><strong>Nome Vantagem:</strong> ${data.vantagens[i].vantagemInfo.nome}</p>
                            <p><strong>Valor:</strong> ${data.vantagens[i].vantagemInfo.Preco}</p>
                            <p><strong>Descrição:</strong> ${data.vantagens[i].vantagemInfo.descricao}</p>
                        </div>
                    </div>
                    `
                }

            }

        })
    })
}

async function pegarMoedas() {
    var aluno = sessionStorage.getItem('usuario')
    var idAluno;
    if (aluno) {
        idAluno = JSON.parse(aluno).id
    }
    let moedas = await fetch(`http://localhost:3000/pegarMoedas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: idAluno
        })
    }).then(response => response.json())
        .then(data => {
            return data.moeda
        })
    return moedas;
}

async function pegarPreco(idVantagem) {
    let preco = await fetch(`http://localhost:3000/pegarPreco`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idVantagem
        })
    }).then(response => response.json())
        .then(data => {
            return data.preco
        })
    return preco;
}




async function comprarVantagem(idVantagem) {

    const numeroAleatorio = Math.floor(Math.random() * 99999) + 1;
    var aluno = sessionStorage.getItem('usuario')
    var idAluno;
    if (aluno) {
        idAluno = JSON.parse(aluno).id
    }
    var email = await getEmailAluno()
    var moedas = await pegarMoedas()
    var preco = await pegarPreco(idVantagem)
    var nomeVantagem = document.getElementById("nomeVantagem").textContent
    if (moedas < preco) {
        window.alert("Saldo insuficiente")
    } else {
        var valorF = moedas - preco

        await fetch(`http://localhost:3000/comprarVantagem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idAluno, idVantagem, valorF
            })
        }).then(function (res) {
            res.json().then(function (data) {
                window.alert(`${data.tipo}`)
                if (data.tipo == "Vantagem comprada") {
                    envioEmail(email, "Compra de vantagem efetutuada!", `Parabens pelo resgate da vantagem. ${nomeVantagem}. Preço: ${preco}. Código pare resgate da vantagem: ${numeroAleatorio}`)
                }
                window.location.reload();
            })

        })
    }

}


async function envioEmail(destinatario, assunto, corpo) {
    try {
        
        const resposta = await fetch('http://localhost:3000/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario,
                assunto,
                corpo,
            }),
        });

        const dados = await resposta.json();
        console.log(dados.tipo);
    } catch (erro) {
        console.error('Erro ao chamar a API de envio de e-mail', erro);
    }
}

async function getEmailAluno() {
    let id = sessionStorage.getItem("usuario");
    if (id) {
        id = JSON.parse(id).id;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/viewAluno`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            })
        });

        const data = await resposta.json();

        if (!data.aluno) {
            window.alert(`${data.tipo} - ${data.mensagem}`);
            return 
        } else {
            const email = data.aluno.email;
            return email;
        }
    } catch (erro) {
        console.error('Erro ao obter o e-mail do aluno', erro);
        return null; 
    }
}
