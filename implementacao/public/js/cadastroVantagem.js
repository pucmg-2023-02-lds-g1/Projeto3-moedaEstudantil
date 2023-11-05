
function cadastrarVantagem(){

    let idEmpresa = sessionStorage.getItem("usuario")
    if (idEmpresa) {
        idEmpresa = JSON.parse(idEmpresa).id
    }

    let nome = document.getElementById("nome").value
    let desc = document.getElementById("desc").value
    let preco = document.getElementById("preco").value
    preco = parseFloat(preco)


    fetch(`http://localhost:3000/cadastrarVantagem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, desc, preco, idEmpresa
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
        })
    })
}