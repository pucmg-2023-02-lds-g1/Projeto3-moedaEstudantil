function visibilidadeDaSenha() {
    var input = document.getElementById("senha");
    var icon = document.getElementById("senhaIcon");
    if (input.type === "password") {
      icon.classList.remove("bi-eye-slash");
      input.type = "text";
      icon.classList.add("bi-eye-fill");
    } else {
      icon.classList.remove("bi-eye-fill");
      input.type = "password";
      icon.classList.add("bi-eye-slash");
    }
  }
  
  function estaLogado(tipo) {
    let usu = sessionStorage.getItem("usuario")
    if (!usu) {
      window.alert("Você não pode acessar essa página sem estar logado")
      window.location.assign("login.html")
    } else if (tipo == 1) {
      usu = JSON.parse(usu)
      if (usu.tipo != 1) {
        window.alert("Essa página não pode ser acessada por empresas")
        window.location.assign("index.html")
      }
    } else if (tipo == 2) {
      usu = JSON.parse(usu)
      if (usu.tipo != 2) {
        window.alert("Essa página não pode ser acessada por alunos")
        window.location.assign("index.html")
      }
    }
  }
  
  function login() {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const tipo = document.getElementById("tipo").value
    let tabela = "empresa"
    let id = "id"
    let url = "../views/empresa.html"
  
    if (tipo == 1) {
      tabela = "aluno"
      id = "idAluno"
      url = "../views/aluno.html"
    }
  
    if (tipo == 3) {
      tabela = "Professor"
      id = "idProfessor"
      url = "../views/index.html"
    }
  
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id, tabela, email, senha
      })
    }).then(function (res) {
      res.json().then(function (data) {
        if (!data.s) {
          window.alert(`${data.tipo} - ${data.mensagem}`)
        } else {
          sessionStorage.setItem("usuario", `{"id":${Number(data.id)}, "tipo":${tipo}}`)
          window.location.assign("index.html")
        }
      })
    })
  }
  
  function levarPerfil() {
    let usu = sessionStorage.getItem("usuario")
    if (usu) {
      usu = JSON.parse(usu)
      if (usu.tipo == 1) {
        window.location.assign("aluno.html")
      } else if (usu.tipo == 2) {
        window.location.assign("empresa.html")
      } else {
        window.location.assign("professor.html")
      }
    } else {
      window.alert("Você precisa fazer login antes")
      window.location.assign("login.html")
    }
  }
  
  function levarCadastro() {
    const tipo = document.getElementById("tipo").value
    if (tipo == "") {
      window.alert("Selecione o campo de tipo do usuário para se redirecionado ao seu cadastro")
    } else if (tipo == 1) {
      window.location.assign("cadastroAluno.html")
    } else {
      window.location.assign("cadastroEmpresa.html")
    }
  }
  
  function levarHome() {
    window.location.assign("views/login.html")
  }
  
  
  async function alunosDoProfessor() {
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    let id = usuario.id;
  
  //   console.log(id);
  
    try {
      const response = await fetch("http://localhost:3000/viewAlunosDoProfessor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // console.log(data.alunos[0].idAluno);
  
      const alunos_do_professor = document.getElementById("alunos_do_professor");
  
      data.alunos.forEach(async (aluno) => {
        const moedas = await moedasDoAluno(aluno.idAluno);
      //   let idAluno = aluno.idAluno
      //   console.log(idAluno)
  
        alunos_do_professor.innerHTML += `
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Nome: ${aluno.nome}</h5>
                <p class="card-text">Email: ${aluno.email}</p>
                <p class="card-text">Moedas:<b> ${moedas} </b></p>
                <p class="card-text">Transferir moedas: <input name="idAlunoValor_${aluno.idAluno}" class="input_val" type="number" step="1"></p>
                <p class="card-text">Descrição: <input name="idAlunoValor_${aluno.idAluno}" class="input_desc" step="1"></p>
                <div class="btn_box">
                  <button onclick="transferirMoedas(${aluno.idAluno})" href="#" class="btn btn-primary">Transferir</button>
                </div>
              </div>
            </div>
          `;
      });
  
      sessionStorage.setItem("parceiro", JSON.stringify(data.parceiro));
    } catch (error) {
      console.error("Erro ao buscar alunos do professor:", error);
    }
  }
  
  async function moedasDoAluno(id) {
    try {
      const response = await fetch("http://localhost:3000/viewMoedasAluno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // console.log(data.alunos[0].moeda);
      return data.alunos[0].moeda;
    } catch (error) {
      console.error("Erro ao buscar moedas do aluno:", error);
      return 0; // Retorna um valor padrão (por exemplo, 0) em caso de erro
    }
  }
  
  document.getElementById('form').addEventListener('submit', function (event) {
      event.preventDefault(); // Impede o envio do formulário
      // Faça o que desejar aqui
    });
  
  function transferirMoedas(alunoId) {
  
      // console.log(document.getElementById("idAlunoValor_"+alunoId))
      console.log(alunoId)

      const inputs = document.getElementsByName("idAlunoValor_"+alunoId);
      const meuInput = inputs[0];
      const quantidadeS = meuInput.value;

      const meuInput2 = inputs[1];
      const descricao = meuInput2.value; 
      console.log(descricao)

      var quantidade = Number(quantidadeS);


      console.log(quantidade);
      // console.log(valor)
  
    //   let quantidade = document.getElementById("idAlunoValor_"+alunoId);
      let usuario = JSON.parse(sessionStorage.getItem('usuario'));
      let professorId = usuario.id;
  
      fetch('http://localhost:3000/transferirMoedas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ professorId, alunoId, quantidade, descricao }),
      })
        .then(response => response.text())
        .then(data => alert(data))
        .catch((error) => {
          console.error('Erro:', error);
        });

        console.log("aluno"+alunoId)
        console.log("professor"+professorId)
        console.log("quantidade"+quantidade)

        // console.log("morte")

    }

    function modificaMenu() {
      let usuario = JSON.parse(sessionStorage.getItem('usuario'));
      let tipoUsu = usuario.tipo;

      if(tipoUsu==1) {
        document.getElementById("menu_opc_5").style.display = "none";
        document.getElementById("menu_opc_7").style.display = "none";
        document.getElementById("menu_opc_9").style.display = "none";
      }
      if(tipoUsu==3) {
        document.getElementById("menu_opc_6").style.display = "none";
        document.getElementById("menu_opc_8").style.display = "none";
        document.getElementById("menu_opc_9").style.display = "none";
      }
      if(tipoUsu==2) {
        document.getElementById("menu_opc_5").style.display = "none";
        document.getElementById("menu_opc_6").style.display = "none";
        document.getElementById("menu_opc_7").style.display = "none";
        document.getElementById("menu_opc_8").style.display = "none";
      }
    }