// SERVER CONFIG
const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
const PORT = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use(express.static("public"))

// CONNECTION DATABASE CONFIG
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "coxinha",
    database: "moedaestudantil",
});

//INICIALIZATION CONNECTION WITH DATABASE
connection.connect()

//CONNECTION TEST
connection.query("SELECT 1+1 AS solution", (err, rows, fields) => {
    if (err) throw err;

    console.log("The solution is: ", rows[0].solution)
});

app.use(cors({ origin: "*", }));

// INICIALIZE NODE SERVER
app.listen(PORT, function(err) {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})

// ROTES
app.post("/cadastro", function (req, res) {
    connection.query(
      `INSERT INTO elogio VALUES("${req.body.elogio}")`,
      (err, rows, fields) => {
        // Operação simples para testar o funcionamento
        if (err) {
          return res.json({
            tipo: "Erro de cadastro",
            mensagem: err,
          });
        }
      }
    );
});


app.post("/updateAluno", function(req, res){
  connection.query(`UPDATE aluno SET nome = "${req.body.nome}", cpf = "${req.body.cpf}", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${req.body.endereco}", Instituicao_id = ${Number(req.body.instituicao)}, Curso_idCurso = ${Number(req.body.curso)} WHERE idAluno = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro de alteração",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Usuario alterado",
      s: "funcionando"
    })
  })
})


app.post("/viewAluno", function(req, res){
  connection.query(`SELECT * FROM aluno WHERE idAluno = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados do aluno",
        mensagem: err
      })
    }
    if(rows[0] == null) {
      return res.json({
        tipo: "Erro ao retornar dados do aluno",
        mensagem: "O código do aluno logado está errado ou não existe"
      })
    }
    
    return res.json({
      aluno: {
        nome: rows[0].nome, cpf: rows[0].cpf, email: rows[0].email, senha: rows[0].senha, endereco: rows[0].endereco, instituicao: rows[0].Instituicao_id, curso: rows[0].Curso_idCurso, moeda: rows[0].moeda
      }
    })
  })
})


app.post("/updateEmpresa", function(req, res){
  connection.query(`UPDATE empresa SET nome = "${req.body.nome}", cnpj = "${req.body.cnpj}", email = "${req.body.email}", senha = "${req.body.senha}" WHERE id = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro de alteração",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Usuario alterado",
      s: "funcionando"
    })
  })
})


app.post("/viewEmpresa", function(req, res){
  connection.query(`SELECT * FROM empresa WHERE id = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados da empresa",
        mensagem: err
      })
    }
    if(rows[0] == null) {
      return res.json({
        tipo: "Erro ao retornar dados da empresa",
        mensagem: "O código da empresa logada está errado ou não existe"
      })
    }
    return res.json({
      empresa: {
        nome: rows[0].nome, cnpj: rows[0].cnpj, email: rows[0].email, senha: rows[0].senha
      }
    })
  })
})

app.post("/deleteEmpresa", function(req, res){
  connection.query(`DELETE from empresa WHERE id = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro na hora de deletar",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Empresa deletada com sucesso",
      s: "funcionando"
    })
  })
})

app.post("/deleteAluno", function(req, res){
  connection.query(`DELETE from aluno WHERE idAluno = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro na hora de deletar",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Aluno deletada com sucesso",
      s: "funcionando"
    })
  })
})


app.post("/cadastrarAluno", function(req, res){
  connection.query(`INSERT INTO aluno VALUES (NULL, "${req.body.nome}", "${req.body.senha}", "${req.body.email}", "${req.body.cpf}", 000000,  "${req.body.endereco}", 0, 1, ${req.body.instituicao});
  `,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro de cadastro",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Usuario cadastrado",
      s: "funcionando"
    })
  })
})

app.get("/viewAllAlunos", function(req, res){
  connection.query(`SELECT * FROM aluno;`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados dos alunos",
        mensagem: err
      })
    }
    
    return res.json({
      alunos: rows
    })
  })
})

app.get("/viewAllEmpresas", function(req, res){
  connection.query(`SELECT * FROM empresa;`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados das empresas",
        mensagem: err
      })
    }
    
    return res.json({
      empresas: rows
    })
  })
})


app.get('/pesquisarInstituicoes', function (req, res) {
  var instituicoes = [];

  connection.query('SELECT * FROM instituicao', (err, rows, fields) => {
    if (err) {
      return res.json({
        tipo: "Erro",
        mensagem: err,
      });
    }
    else {
      for (let i = 0; i < rows.length; i++) {
        instituicoes.push({
          id: rows[i].id,
          nome: rows[i].nome,
        });
      }
    }
    res.send(JSON.stringify(instituicoes));
  })
});

app.post("/cadastrarEmpresa", function(req, res){
  connection.query(`INSERT INTO empresa (nome, cnpj, email, senha) VALUES ("${req.body.nome}", "${req.body.cnpj}", "${req.body.email}", "${req.body.senha}");`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro de cadastro",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Empresa cadastrada com sucesso",
      s: "funcionando"
    })
  })
})

app.post("/login", function(req, res){
  connection.query(`SELECT ${req.body.id} AS id FROM ${req.body.tabela} where email = "${req.body.email}" and senha = "${req.body.senha}" LIMIT 1;`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados",
        mensagem: err
      })
    }
    if(rows[0] == null) {
      return res.json({
        tipo: "Usuário não encontrado",
        mensagem: "Verifique os dados inseridos"
      })
    }
    return res.json({
      id: rows[0].id,
      s: "funcionando"
    })
  })
})


app.post("/updateProfessor", function(req, res){
  connection.query(`UPDATE professor SET nome = "${req.body.nome}", cpf = "${req.body.cpf}", email = "${req.body.email}", senha = "${req.body.senha}", endereco = "${req.body.endereco}", rg = "${req.body.rg}", moedas = ${Number(req.body.moedas)}, Instituicao_id = ${Number(req.body.instituicao)} WHERE idProfessor = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro de alteração",
        mensagem: err
      })
    }
    
    return res.json({
      tipo: "Sucesso!",
      mensagem: "Usuario alterado",
      s: "funcionando"
    })
  })
})

app.post("/viewProfessor", function(req, res){
  connection.query(`SELECT * FROM professor WHERE idProfessor = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados do professor",
        mensagem: err
      })
    }
    if(rows[0] == null) {
      return res.json({
        tipo: "Erro ao retornar dados do professor",
        mensagem: "O código do professor logado está errado ou não existe"
      })
    }
    
    return res.json({
      professor: {
        nome: rows[0].nome, cpf: rows[0].cpf, email: rows[0].email, senha: rows[0].senha, endereco: rows[0].endereco, rg: rows[0].rg, moedas: rows[0].moedas, instituicao: rows[0].Instituicao_id
      }
    })
  })
})

app.get("/getProfessor", function(req, res){
  connection.query(`SELECT * FROM Professor;`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados do Professor",
        mensagem: err
      })
    }
    
    return res.json({
      empresas: rows
    })
  })
})

app.post("/viewAlunosDoProfessor", function(req, res){
  connection.query(`SELECT * FROM aluno INNER JOIN professor on aluno.Instituicao_id = professor.Instituicao_id WHERE professor.Instituicao_id="${req.body.id}";`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar alunos do professor",
        mensagem: err
      })
    }
    
    return res.json({
      alunos: rows
    })
  })
})