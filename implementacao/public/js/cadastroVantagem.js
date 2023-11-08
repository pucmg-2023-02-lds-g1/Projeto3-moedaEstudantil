
function cadastrarVantagem() {

    let idEmpresa = sessionStorage.getItem("usuario")
    if (idEmpresa) {
        idEmpresa = JSON.parse(idEmpresa).id
    }

    let nome = document.getElementById("nome").value
    let desc = document.getElementById("desc").value
    let preco = document.getElementById("preco").value
    let url = document.getElementById("url").value
    preco = parseFloat(preco)


    fetch(`http://localhost:3000/cadastrarVantagem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, desc, preco, idEmpresa, url
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (!data) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            }else{
                window.alert("Vantagem cadastrada")
            }
        })
    })
}