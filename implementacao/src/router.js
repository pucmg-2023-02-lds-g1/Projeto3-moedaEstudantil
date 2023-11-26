import express from "express";
import send from "./controller/Send";
import cadastro from "./controller/Cadastro";
import updateAluno from "./controller/UpdateAluno";
import viewAluno from "./controller/ViewAluno";
import updateEmpresa from "./controller/updateEmpresa";
import viewEmpresa from "./controller/ViewEmpresa";
import deleteEmpresa from "./controller/DeleteEmpresa";
import deleteAluno from "./controller/DeleteAluno";
import cadastrarAluno from "./controller/CadastrarAluno";
import viewAllAlunos from "./controller/ViewAllAlunos";
import viewAllEmpresas from "./controller/ViewAllEmpresas";
import pesquisarInstituicoes from "./controller/PesquisarInstituicoes";
import cadastrarEmpresa from "./controller/CadastrarEmpresa";
import login from "./controller/Login";
import updateProfessor from "./controller/UpdateProfessor";
import viewProfessor from "./controller/ViewProfessor";
import getProfessor from "./controller/GetProfessor";
import viewAlunosDoProfessor from "./controller/ViewAlunosDoProfessor";
import viewMoedasAluno from "./controller/ViewMoedasAluno";
import transferirMoedas from "./controller/TransferirMoedas";
import viewTransacoesProfessor from "./controller/ViewTransacoesProfessor";
import pesquisarExtratoAluno from "./controller/PesquisarExtratoAluno";
import listarVantagens from "./controller/ListarVantagens";
import cadastrarVantagem from "./controller/CadastrarVantagem";
import vantagensDoAluno from "./controller/VantagensDoAluno";
import comprarVantagem from "./controller/ComprarVantagem";
import pegarPreco from "./controller/PegarPreco";
import pegarMoedas from "./controller/PegarMoedas";
import enviarEmail from "./controller/EnviarEmail";
const router = express.Router();

router.get("/send", send);

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

router.get("/pesquisarInstituicoes", pesquisarInstituicoes);

router.post("/cadastrarEmpresa", cadastrarEmpresa);

router.post("/login", login);

router.post("/updateProfessor", updateProfessor);

router.post("/viewProfessor", viewProfessor);

router.get("/getProfessor", getProfessor);

router.post("/viewAlunosDoProfessor", viewAlunosDoProfessor);

router.post("/viewMoedasAluno", viewMoedasAluno);

router.post("/transferirMoedas", transferirMoedas);

router.post("/viewTransacoesProfessor", viewTransacoesProfessor);

router.post("/pesquisarExtratoAluno", pesquisarExtratoAluno);

router.get("/listarVantagens", listarVantagens);

router.post("/cadastrarVantagem", cadastrarVantagem);

router.post("/vantagensDoAluno", vantagensDoAluno);

router.post("/comprarVantagem", comprarVantagem);

router.post("/pegarPreco", pegarPreco);

router.post("/pegarMoedas", pegarMoedas);

router.post("/enviar-email", enviarEmail);

export default router;
