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
    password: "",
    database: "moedaEstudantil",
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
  connection.query(`UPDATE aluno SET nome = "${req.body.nome}", cpf = "${req.body.cpf}", email = "${req.body.email}", endereco = "${req.body.endereco}", instituicao = "${req.body.instituicao}", curso = "${req.body.curso}" WHERE id = ${req.body.id};`,
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
  connection.query(`SELECT * FROM aluno WHERE id = ${req.body.id};`,
  (err, rows, fields) => {
    if(err) {
      return res.json({
        tipo: "Erro ao retornar dados do aluno",
        mensagem: err
      })
    }
    
    return res.json({
      aluno: {
        nome: rows[0].nome, cpf: rows[0].cpf, email: rows[0].email, endereco: rows[0].endereco, instituicao: rows[0].instituicao, curso: rows[0].curso, moeda: rows[0].moeda
      }
    })
  })
})