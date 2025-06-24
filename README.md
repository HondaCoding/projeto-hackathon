<h1>HACKATHON
<img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Senac_logo.svg" width="100px"> 2025
</h1>

Projeto destinado ao **Hackathon 2025.1** da **Faculdade Senac Maringá** durante a *Semana Acadêmica* do curso de **Análise e Desenvolvimento de Sistemas** que teve duração de 3 dias. 


## 🎯 Objetivo do Projeto
O objetivo do desenvolvimento do CRR é de oferecer uma forma prática, intuitiva e funcional para
que recursos de uma empresa possam ser reservados e utilizados de forma organizada e unificada,
reduzindo com isto, a necessidade de múltiplos meios de controle de reserva de itens como espaços
físicos, aparelhos e outros que estejam disponíveis em uma empresa para uso coletivo.

> [!NOTE]
> Tanto a descrição do [Objetivo do Projeto ](#objetivo-do-projeto) quanto os [Requisitos do Projeto](#requisitos-do-projeto), foram fornecidos pela organização do HACKATHON.


## 💻 Tecnologias utilizadas
<div>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

A linguagem **JavaScript** foi escolhida pela familiaridade do desenvolvedor e pela facilidade de integração entre o front-end e o back-end, o que acelerou o desenvolvimento.

No **front-end**, o **React** foi adotado por sua praticidade no gerenciamento de rotas e reaproveitamento de componentes, o que permitiu uma interface dinâmica e responsiva.

No **back-end**, o **Node.js** foi utilizado em conjunto com o **Express.js**, facilitando a criação das rotas e a estruturação da API de forma simples e eficiente.

No **banco de dados**, o **MySQL** foi usado, pois já havia sido previamente disponibilizado pela organização do Hackathon, sendo integrado ao projeto sem a necessidade de reestruturação.

## 📂 Estrutura de pastas

## 🚀 Como rodar o projeto

Para executar o sistema localmente, siga os passos abaixo:

### 1. Pré-requisitos
- **React.js** instalado na máquina
- **Node.js** instalado na máquina
- **Express.js** instalado na máquina
- **XAMPP** ou outro servidor local com MySQL
- Banco de dados **MySQL**

> [!IMPORTANT]
> O arquivo do banco de dados `.sql` está disponivel na pasta **`database`** do projeto, não sendo necessário fazer a modelagem.

### 2. Configurando o banco de dados

1. Inicie o **XAMPP** e ative os serviços **Apache** e **MySQL**.
2. Acesse o **phpMyAdmin** (geralmente em `http://localhost/phpmyadmin`).
3. Crie um banco de dados com o nome `reservacursos`.
4. Importe o arquivo `hackathon.sql` fornecido com o projeto para criar as tabelas e registros iniciais.s. 


> [!TIP]
> Nota-se que o nome de algumas tabelas do banco de dados estão "invertidas", sendo elas:
> - registros de ``Recursos`` estão na tabela ``tiporecurso``
> - registros de ``Reserva`` estão na tabela ``recurso`` 

### 3. Instalando as dependências

#### No backend:

```bash
cd hackathon-senac
npm install

node index.js
```
#### No frontend:
```bash
cd frontend
npm install

npm run dev
```
Agora o sistema deve estar rodando no navegador:

Backend (API): http://localhost:3000

Frontend: http://localhost:5173


## 🔨 Futuras implemetações
Implementações futuras:
- [ ] Alteração de layout para ocupar mais espaço horizontal
- [ ] Sistema de login com permissões de acessos ao sistema
- [ ] Implementação de 'Dark Mode & Light Mode'
- [ ] Sistema de histórico de devoluções

## 📸 Vídeo do sistema

<!-- <img src="https://i.imgur.com/plm2S4k.gif" /> -->
<img src="./frontend/src/assets/sistemaCRR.gif" />


## 🧾 Requisitos do Projeto
- **RF01** – CRUD de recursos (cadastro, consulta, edição e exclusão de dados).
- **RF02** – Dados para recursos (tipo de recurso, descrição, ativo).
- **RF03** – CRUD para reservas (cadastro, consulta, edição e exclusão de dados).
- **RF04** - Dados para reserva (tipo de recurso, responsável, descrição, data e hora de reserva, data e
hora de devolução, ativo).
- **RF05** – CRUD de pessoas responsáveis pela reserva de recursos (cadastro, consulta, edição e
exclusão de dados).
- **RF06** – responsáveis (nome, crachá, telefone, ativo).
- **RF07** – CRUD de funções para pessoas responsáveis (cadastro, consulta, edição e exclusão de
dados).
- **RF08** – Dados para funções (tipo da função, permissão, ativo).
- **RF09** – Recursos são reservados previamente para uso, sendo tanto no próprio horário de uso,
quanto em caso de reserva antecipada.
- **RF10** – Recursos podem ter suas especificidades, e por isso, o campo descrição deve ser preenchido
no cadastro dos dados (números de patrimônio / série de itens, dados e placas de veículos, etc.) de
acordo com escolhas feitas pelos usuários.
- **RF11** – Recursos reservados não podem ser disponibilizados para novas reservas no mesmo período
de data e horário para evitar duplicidade de reservas de um mesmo recurso simultaneamente, a
menos que este seja devolvido antes do uso no período da reserva.
- **RF12** – É importante estabelecer limites de acesso a opções da reserva de acordo com o perfil de
usuário (administrativo é diferente de externo, por exemplo).
- **RF13** – Usuários podem ser dos tipos e permissões:
  - **Gerente / TEPT** – Administrador (acesso CRUD total).
  - **Coordenador / Professor / Instrutor** – Cadastro e Edição de reservas e devoluções.
  - **Administrativo** – CRUD completo para reservas.
  - **Externo** – inativo (uso futuro).