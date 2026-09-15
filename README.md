# React + JSON Server + Node.js/Express

Projeto didático criado para ensinar, na prática, como desenvolver uma aplicação **React** sem precisar esperar que o backend real esteja pronto.

A proposta do projeto é começar utilizando o **JSON Server como uma API simulada** e, posteriormente, substituir essa API por um **backend real desenvolvido com Node.js e Express**, mantendo o mesmo contrato entre frontend e backend.

---

# 🎯 Objetivo do Projeto

Durante a primeira etapa, o frontend será desenvolvido utilizando:

```text
React
  ↓
Service
  ↓
JSON Server
  ↓
db.json
```

Depois, o JSON Server será substituído por um backend real:

```text
React
  ↓
Service
  ↓
Node.js + Express
  ↓
db.json
```

O objetivo principal é demonstrar que, se o **contrato da API** for mantido, o frontend não precisa ser reconstruído quando o backend real ficar pronto.

---

# 📚 Parte 01 — React + JSON Server

Nesta primeira etapa utilizamos o **JSON Server** para simular uma API REST.

Isso permite desenvolver e testar todo o frontend antes mesmo da existência de um backend real.

---

## 📦 Instalação

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

---

## ▶️ Rodando o JSON Server

Abra um terminal e execute:

```bash
npm run server
```

O JSON Server ficará disponível em:

```text
http://localhost:3001
```

Para testar a rota de tarefas:

```text
http://localhost:3001/tarefas
```

---

## ⚛️ Rodando o React

Abra **outro terminal** e execute:

```bash
npm run dev
```

O Vite mostrará o endereço da aplicação React.

Normalmente:

```text
http://localhost:5173
```

Nesse momento teremos dois servidores funcionando:

```text
React       → http://localhost:5173
JSON Server → http://localhost:3001
```

---

# 📖 Aula 01 — Consumindo a API Simulada

Na primeira aula o foco está na leitura dos dados.

## Conceitos trabalhados

- React
- componentes
- JSON Server
- dados mockados
- API simulada
- GET
- Fetch API
- async/await
- useEffect
- useState
- Service
- renderização de listas

Fluxo da aplicação:

```text
React
  ↓
tarefaService.js
  ↓
GET /tarefas
  ↓
JSON Server
  ↓
db.json
```

O componente React não precisa saber como os dados são armazenados.

A responsabilidade de comunicação com a API fica concentrada no **Service**.

---

# 📖 Aula 02 — CRUD com React

Na segunda aula completamos as operações da aplicação.

## Conceitos trabalhados

- POST
- PATCH
- DELETE
- formulários
- eventos
- props
- atualização do estado
- tratamento de erros
- CRUD
- separação de responsabilidades
- independência entre frontend e backend

As rotas utilizadas são:

```text
GET    /tarefas
POST   /tarefas
PATCH  /tarefas/:id
DELETE /tarefas/:id
```

Ao final dessa etapa temos um CRUD funcionando utilizando:

```text
React → Service → JSON Server
```

---

# 🔌 Contrato da API

Para que frontend e backend possam ser desenvolvidos separadamente, precisamos definir um **contrato**.

Esse contrato determina como as duas aplicações irão se comunicar.

Frontend e backend precisam conhecer previamente:

- endpoints
- métodos HTTP
- dados enviados
- dados recebidos
- estrutura dos objetos
- códigos de resposta
- mensagens de erro

Neste projeto utilizamos o seguinte contrato:

| Operação | Método | Endpoint |
|---|---|---|
| Listar tarefas | GET | `/tarefas` |
| Criar tarefa | POST | `/tarefas` |
| Atualizar tarefa | PATCH | `/tarefas/:id` |
| Excluir tarefa | DELETE | `/tarefas/:id` |

Exemplo de uma tarefa:

```json
{
  "id": 1,
  "titulo": "Estudar React",
  "concluida": false
}
```

Essa estrutura precisa ser conhecida pelas duas partes.

---

# 🚀 Parte 02 — Backend Real com Node.js e Express

Depois que o frontend estiver funcionando com o JSON Server, podemos começar o desenvolvimento do backend real.

Nesta etapa utilizamos:

- Node.js
- Express
- CORS
- File System
- API REST
- persistência em JSON
- tratamento de erros

A ideia é implementar no backend real **o mesmo contrato utilizado pelo JSON Server**.

As rotas continuam sendo:

```text
GET    /tarefas
POST   /tarefas
PATCH  /tarefas/:id
DELETE /tarefas/:id
```

Isso é fundamental.

O frontend já foi desenvolvido esperando esse contrato.

Portanto, o novo backend precisa respeitá-lo.

---

# 🖥️ Rodando o Backend Real

Entre na pasta do backend.

Instale as dependências:

```bash
npm install
```

Depois execute:

```bash
npm run dev
```

O backend ficará disponível em:

```text
http://localhost:3000
```

Para testar:

```text
http://localhost:3000/tarefas
```

Agora teremos:

```text
React        → http://localhost:5173
Backend real → http://localhost:3000
```

O JSON Server não será mais necessário para executar a aplicação.

---

# 🔄 Trocando o JSON Server pelo Backend Real

Essa é a parte mais importante do projeto.

Inicialmente, o `tarefaService.js` utiliza o JSON Server:

```javascript
const API_URL = "http://localhost:3001/tarefas";
```

Nesse momento temos:

```text
React
  ↓
tarefaService.js
  ↓
http://localhost:3001/tarefas
  ↓
JSON Server
```

Depois que o backend real estiver pronto, alteramos o endereço da API:

```javascript
const API_URL = "http://localhost:3000/tarefas";
```

Agora temos:

```text
React
  ↓
tarefaService.js
  ↓
http://localhost:3000/tarefas
  ↓
Node.js + Express
  ↓
db.json
```

---

# 🤔 O que mudou no Frontend?

Praticamente nada.

Os componentes React continuam funcionando.

Não precisamos reconstruir:

- formulário
- lista de tarefas
- componentes
- eventos
- estados
- interface
- regras de apresentação

A principal alteração é o endereço utilizado pelo Service.

Antes:

```text
React → Service → JSON Server
```

Depois:

```text
React → Service → Backend Real
```

Isso funciona porque o backend real respeita o mesmo **contrato da API** utilizado durante o desenvolvimento com JSON Server.

---

# 🧠 Por que utilizar um Service?

O Service cria uma camada responsável pela comunicação com a API.

Em vez dos componentes React conhecerem diretamente todos os detalhes do backend, centralizamos essa responsabilidade.

Exemplo:

```text
Componentes React
       ↓
     App.jsx
       ↓
tarefaService.js
       ↓
      API
```

Dessa forma, podemos trocar a implementação da API sem precisar alterar todos os componentes.

Essa separação melhora a organização da aplicação e reduz o acoplamento entre frontend e backend.

---

# 🏗️ Desenvolvimento Independente

Uma das principais ideias demonstradas neste projeto é que:

> **O frontend não precisa esperar o backend ficar pronto para começar a ser desenvolvido.**

Imagine duas equipes:

```text
EQUIPE FRONTEND                  EQUIPE BACKEND

     React                         Node.js
       ↓                              ↓
   Componentes                      Express
       ↓                              ↓
    Service                          Rotas
       ↓                              ↓
       └────── CONTRATO DA API ──────┘
```

As duas equipes podem trabalhar separadamente.

O que conecta as duas partes é o **contrato**.

Enquanto o backend real está sendo desenvolvido, o frontend pode utilizar:

```text
JSON Server
```

ou outra ferramenta de mock de API.

---

# 🔁 Evolução do Projeto

O projeto passa pelas seguintes etapas:

```text
1. Definição do contrato
           ↓
2. Desenvolvimento do Frontend
           ↓
3. JSON Server simula o Backend
           ↓
4. CRUD funcionando no React
           ↓
5. Desenvolvimento do Backend real
           ↓
6. Backend implementa o mesmo contrato
           ↓
7. JSON Server é removido
           ↓
8. URL do Service é alterada
           ↓
9. React consome o Backend real
```

---

# 📡 Métodos HTTP Utilizados

## GET

Utilizado para buscar as tarefas:

```text
GET /tarefas
```

---

## POST

Utilizado para cadastrar uma nova tarefa:

```text
POST /tarefas
```

Exemplo:

```json
{
  "titulo": "Estudar Node.js",
  "concluida": false
}
```

---

## PATCH

Utilizado para alterar parcialmente uma tarefa.

Exemplo:

```text
PATCH /tarefas/1
```

Podemos alterar apenas o status:

```json
{
  "concluida": true
}
```

---

## DELETE

Utilizado para excluir uma tarefa:

```text
DELETE /tarefas/1
```

O ID identifica qual tarefa deverá ser removida.

---

# 💾 Persistência dos Dados

Para manter o projeto simples e focado na integração entre frontend e backend, utilizamos um arquivo JSON para persistência.

```text
db.json
```

No backend Node.js utilizamos o módulo:

```javascript
fs
```

File System permite realizar operações de leitura e escrita no arquivo.

A proposta desta etapa não é substituir um banco de dados real, mas compreender o fluxo completo:

```text
React
  ↓
HTTP
  ↓
Express
  ↓
Rotas
  ↓
File System
  ↓
db.json
```

Posteriormente, essa camada poderá ser substituída por um banco de dados.

---

# 🛠️ Tecnologias Utilizadas

## Frontend

- React
- JavaScript
- Vite
- Fetch API
- CSS

## API Simulada

- JSON Server

## Backend

- Node.js
- Express
- CORS
- File System
- JSON

---

# 📚 Conceitos Praticados

Durante o projeto são trabalhados:

- React
- componentes
- props
- useState
- useEffect
- eventos
- formulários
- Fetch API
- async/await
- Promises
- CRUD
- API REST
- GET
- POST
- PATCH
- DELETE
- JSON Server
- Mock API
- Node.js
- Express
- CORS
- Service
- tratamento de erros
- persistência em JSON
- integração frontend/backend
- contrato de API
- separação de responsabilidades
- desacoplamento
- desenvolvimento independente

---

# 🎓 Ideia Principal

O objetivo deste projeto não é apenas aprender comandos ou copiar código.

A principal ideia é compreender **o processo de desenvolvimento de uma aplicação dividida entre frontend e backend**.

Primeiro:

```text
React → Service → JSON Server
```

Depois:

```text
React → Service → Node.js + Express
```

E futuramente poderíamos ter:

```text
React
  ↓
Service
  ↓
Node.js + Express
  ↓
Banco de Dados
```

O frontend continua trabalhando com o mesmo contrato.

---

# ✅ Resultado Final

Ao final do projeto temos:

```text
Frontend desenvolvido
        ↓
API simulada utilizada
        ↓
CRUD funcionando
        ↓
Backend real desenvolvido
        ↓
Mesmo contrato implementado
        ↓
Endpoint alterado no Service
        ↓
JSON Server removido
        ↓
Frontend continua funcionando
```

## Conclusão

> **Frontend e backend não precisam ser desenvolvidos ao mesmo tempo. Eles precisam respeitar o mesmo contrato.**

Essa separação permite que diferentes desenvolvedores ou equipes trabalhem de forma independente e realizem a integração posteriormente sem reconstruir toda a aplicação.