<h1>HACKATHON
<img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Senac_logo.svg" width="100px"> 2025
</h1>

Projeto destinado ao **Hackathon 2025.1** da **Faculdade Senac Maringá** durante a *Semana Acadêmica* do curso de **Análise e Desenvolvimento de Sistemas**. 

O objetivo deste **HACKATHON** foi desenvolver em **3 dias** um *Sistema de Controle de Reservas e Recursos* (CRR) genérico, que permitisse o cadastro de recursos e a abertura de reservas para esses itens.
Além de atender aos requisitos técnicos propostos, o projeto teve como foco oferecer uma **experiência de usuário acessível e intuitiva**, considerando que o público-alvo é composto por pessoas com **pouca familiaridade com tecnologia**.

## 💻 Tecnologias utilizadas

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />


A linguagem **JavaScript** foi escolhida pela familiaridade do desenvolvedor e pela facilidade de integração entre o front-end e o back-end, o que acelerou o desenvolvimento.

No **front-end**, o **React** foi adotado por sua praticidade no gerenciamento de rotas e reaproveitamento de componentes, o que permitiu uma interface dinâmica e responsiva.

No **back-end**, o **Node.js** foi utilizado em conjunto com o **Express.js**, facilitando a criação das rotas e a estruturação da API de forma simples e eficiente.

>[!NOTE]
> 🗄️ **O banco de dados MySQL foi utilizado** pois já havia sido previamente disponibilizado pela organização do Hackathon, sendo integrada ao projeto sem a necessidade de reestruturação.

## 📂 Estrutura de pastas

## 🚀 Como rodar o projeto

Para executar o sistema localmente, siga os passos abaixo:

### 1. Pré-requisitos
- **React.js** instalado na máquina
- **Node.js** instalado na máquina
- **Express.js** instalado na máquina
- **XAMPP** ou outro servidor local com MySQL
- **Git** (opcional, para clonar o repositório)

### 2. Configurando o banco de dados

1. Inicie o **XAMPP** e ative os serviços **Apache** e **MySQL**.
2. Acesse o **phpMyAdmin** (geralmente em `http://localhost/phpmyadmin`).
3. Crie um banco de dados com o nome `reservacursos`.
4. Importe o arquivo `.sql` fornecido com o projeto para criar as tabelas e registros iniciais.

> [!WARNING]
> ⚠️ O banco de dados MySQL **já foi previamente disponibilizado** no projeto, portanto, não é necessário modelá-lo manualmente — basta importar o arquivo `.sql`.



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


## 📸 Prints do sistema

<img src="https://i.imgur.com/plm2S4k.gif" />
