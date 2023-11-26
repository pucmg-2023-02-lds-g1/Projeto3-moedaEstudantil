const express = require('express');
const send = require('./controller/Send');
const cadastro = require('./controller/Cadastro');
const updateAluno = require('./controller/UpdateAluno');
const viewAluno = require('./controller/ViewAluno');
const updateEmpresa = require('./controller/updateEmpresa');
const viewEmpresa = require('./controller/ViewEmpresa');
const deleteEmpresa = require('./controller/DeleteEmpresa');
const deleteAluno = require('./controller/DeleteAluno');
const cadastrarAluno = require('./controller/CadastrarAluno');
const viewAllAlunos = require('./controller/ViewAllAlunos');
const viewAllEmpresas = require('./controller/ViewAllEmpresas');
const pesquisarInstituicoes = require('./controller/PesquisarInstituicoes');
const cadastrarEmpresa = require('./controller/CadastrarEmpresa');
const login = require('./controller/Login');
const updateProfessor = require('./controller/UpdateProfessor');
const viewProfessor = require('./controller/ViewProfessor');
const getProfessor = require('./controller/GetProfessor');
const viewAlunosDoProfessor = require('./controller/ViewAlunosDoProfessor');
const viewMoedasAluno = require('./controller/ViewMoedasAluno');
const transferirMoedas = require('./controller/TransferirMoedas');
const viewTransacoesProfessor = require('./controller/ViewTransacoesProfessor');
const pesquisarExtratoAluno = require('./controller/PesquisarExtratoAluno');
const listarVantagens = require('./controller/ListarVantagens');
const cadastrarVantagem = require('./controller/CadastrarVantagem');
const vantagensDoAluno = require('./controller/VantagensDoAluno');
const comprarVantagem = require('./controller/ComprarVantagem');
const pegarPreco = require('./controller/PegarPreco');
const pegarMoedas = require('./controller/PegarMoedas');
const enviarEmail = require('./controller/EnviarEmail');
const router = express.Router();


router.get('/send', send);

// ROTES
router.post("/cadastro", cadastro);


router.post("/updateAluno", updateAluno);


router.post("/viewAluno", viewAluno);


router.post("/updateEmpresa", updateEmpresa);


router.post("/viewEmpresa", viewEmpresa);

router.post("/deleteEmpresa", deleteEmpresa);

router.post("/deleteAluno", deleteAluno);


router.post("/cadastrarAluno", cadastrarAluno);

router.get("/viewAllAlunos", viewAllAlunos);

router.get("/viewAllEmpresas", viewAllEmpresas);


router.get('/pesquisarInstituicoes', pesquisarInstituicoes);

router.post("/cadastrarEmpresa", cadastrarEmpresa);

router.post("/login", login);


router.post("/updateProfessor", updateProfessor);

router.post("/viewProfessor", viewProfessor);

router.get("/getProfessor", getProfessor);

router.post("/viewAlunosDoProfessor", viewAlunosDoProfessor);

router.post("/viewMoedasAluno", viewMoedasAluno);

router.post('/transferirMoedas', transferirMoedas);


router.post("/viewTransacoesProfessor", viewTransacoesProfessor);

router.post("/pesquisarExtratoAluno", pesquisarExtratoAluno);


router.get("/listarVantagens", listarVantagens);

router.post("/cadastrarVantagem", cadastrarVantagem);

router.post("/vantagensDoAluno", vantagensDoAluno);


router.post("/comprarVantagem", comprarVantagem);

router.post("/pegarPreco", pegarPreco);

router.post("/pegarMoedas", pegarMoedas);


router.post('/enviar-email', enviarEmail);

module.exports = router;