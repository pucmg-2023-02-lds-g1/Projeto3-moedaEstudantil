# Projeto3-moedaEstudantil
Nesse projeto temos o objetivo de fazer um sistema para estimular o reconhecimento do mérito estudantil através de uma moeda virtual usando a linguagem JavaScript.

## Alunos integrantes da equipe

* Amanda Moura de Souza
* Giovanni Bogliolo Sirihal Duarte
* Guilherme Drumond Silva
* Luiz Gustavo Mendes Santos
* Pedro Ramos Vidigal
* Vitor Nunes Calhau

## Professores responsáveis

* Aline Norberta de Brito

## Tutorial de execução do projeto

* Instalações:
  *  <a href="https://dev.mysql.com/downloads/installer/">MySQL Workbench e MySQL Server</a>
      * Tutorial: https://www.youtube.com/watch?v=u96rVINbAUI
  *  <a href="https://nodejs.org/en/download">Node.js</a>

* Passo a passo:
    * No MySQL Workbench, abra seu local instance que fica na página inicial, área "MySQL Connections"
    * Abra o script SQL que se encontra no caminho "\implementacao\public\bd" nomeado como database.sql
    * Utilize o símbolo do raio para executar o arquivo e confira se o schema "moedaestudantil" aparece ao recarregar a aba de Schemas no Navigator
    * Com o editor de código que desejar, altere o arquivo server.js que se encontra na pasta implementacao do projeto colocando na função de conexão da linha 14 os seus dados de host, user e password, caso não saiba algum deles, mantenha da forma que está e continue o passo a passo
    * Com o banco de dados funcionando, abra o terminal da sua máquina, utilize o caminho do projeto na pasta implementacao e rode os seguintes comandos:
      * npm install
      * npm init -y
      * npm start
    * Caso esteja tudo certo, as seguintes mensagens irão aparecer no terminal:
      * Server listening on Port 3000
      * The solution is:  2
    * Com tudo funcionando, abra no seu browser o link http://localhost:3000/ e pode utilizar o site
    * Caso tenha dúvidas, envie um email para amanda.souza.1381861@sga.pucminas.br
 
  ## (Fork para refatoração do Grupo 4) 
