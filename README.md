# Estrutura_de_API
Projeto de estudo focado na arquitetura e organização de uma API inspirada em padrões profissionais de desenvolvimento back-end, aplicando boas práticas como modularização, separação de responsabilidades, uso de controllers, services, rotas, tratamento de erros e estrutura escalável para manutenção e crescimento do sistema.


# 📚 API Study Project

## 📖 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de estudar como APIs profissionais são estruturadas no desenvolvimento Back-end moderno.

A aplicação foi organizada utilizando separação de responsabilidades, arquitetura em camadas e modularização, simulando a estrutura utilizada em projetos reais de mercado.

O principal foco do projeto foi aprender:

- Organização profissional de APIs
- Fluxo completo de requisições HTTP
- Separação entre regras de negócio e controle de requisições
- Utilização de middlewares
- Validação de dados
- Tratamento global de erros
- Segurança básica
- Estrutura escalável e reutilizável

---

# 🏗️ Arquitetura do Projeto

A API foi dividida em várias camadas para deixar o código mais organizado, reutilizável e fácil de manter.

O fluxo da aplicação funciona da seguinte forma:

```text
Cliente → Rotas → Middlewares → Controller → Service → Database
```

---

# 📁 Estrutura Completa do Projeto

```bash
src/
│
├── config/
│   ├── cors.js
│   ├── env.js
│   └── rateLimit.js
│
├── controllers/
│   └── TaskController.js
│
├── database/
│   └── data.json
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── logger.middleware.js
│   ├── notFound.middleware.js
│   └── validation.middleware.js
│
├── routes/
│   └── TaskRoute.js
│
├── schemas/
│   └── TaskSchema.js
│
├── services/
│   └── TaskService.js
│
├── utils/
│   └── AppError.js
│
├── app.js
└── server.js

.env
.env.example
.gitignore
```

---

# ⚙️ Explicação Completa da Lógica do Projeto

---

# 🌐 Fluxo Geral da API

Quando o cliente faz uma requisição para a API, o fluxo ocorre da seguinte forma:

## 1️⃣ O cliente envia uma requisição HTTP

Exemplo:

```http
GET /tasks
```

ou

```http
POST /tasks
```

---

## 2️⃣ A rota recebe a requisição

Arquivo:

```bash
routes/TaskRoute.js
```

As rotas definem quais endpoints existem na API.

Exemplo:

```js
router.get("/tasks", TaskController.GetControll);
```

Aqui a rota:

- Recebe a requisição
- Define qual controller será executado

---

## 3️⃣ Middlewares interceptam a requisição

Antes da requisição chegar ao controller, ela pode passar pelos middlewares.

Exemplo:

```js
router.post(
    "/tasks",
    authMiddleware,
    validationMiddleware,
    TaskController.PostControll
);
```

Os middlewares são responsáveis por:

- Validar autenticação
- Validar dados
- Registrar logs
- Limitar requisições
- Tratar erros

---

# 🛡️ Middlewares

## `auth.middleware.js`

Responsável por verificar se o usuário possui autorização para acessar determinada rota.

Exemplo de lógica:

```js
if (!token) {
    return res.status(401).json({
        message: "Unauthorized"
    });
}
```

---

## `validation.middleware.js`

Valida os dados enviados pelo cliente antes de permitir que a requisição continue.

Exemplo:

- Verificar se o título existe
- Remover espaços usando `trim()`
- Validar tipos de dados
- Garantir tamanho mínimo dos campos

---

## `logger.middleware.js`

Registra informações das requisições realizadas na API.

Exemplo:

```text
[POST] /tasks - 2025-08-26
```

Muito utilizado para:
- Monitoramento
- Debug
- Auditoria

---

## `error.middleware.js`

Centraliza o tratamento de erros da aplicação.

Sem ele:
- Cada controller precisaria tratar erros manualmente

Com ele:
- Todos os erros ficam padronizados

Exemplo:

```js
return res.status(error.statusCode).json({
    message: error.message
});
```

---

## `notFound.middleware.js`

Captura rotas inexistentes.

Exemplo:

```http
GET /rota-inexistente
```

Resposta:

```json
{
    "message": "Route not found"
}
```

---

# 🎮 Controllers

Arquivo:

```bash
controllers/TaskController.js
```

O controller é responsável por controlar o fluxo da requisição.

Ele:
- Recebe os dados enviados pelo cliente
- Chama os métodos do service
- Retorna uma resposta HTTP

Exemplo:

```js
PostControll(req, res) {
    const task = TaskService.PostService(req.body);

    return res.status(201).json(task);
}
```

Neste projeto não foi utilizado `async/await`, pois os dados estão sendo manipulados localmente através de arrays e arquivos JSON simples.

O controller NÃO deve conter regras de negócio complexas.

Sua função principal é organizar a comunicação entre:
- Rotas
- Services
- Cliente

---

# 🧠 Services

Arquivo:

```bash
services/TaskService.js
```

O service contém toda a lógica de negócio da aplicação.

Exemplo de responsabilidades:

- Criar tarefas
- Atualizar tarefas
- Remover tarefas
- Buscar tarefas
- Validar regras internas

Exemplo:

```js
PostService(data) {
    const newTask = {
        id: this.NextId++,
        ...data
    };

    this.tasks.push(newTask);

    return newTask;
}
```

Neste projeto o ID das tarefas não utiliza `crypto.randomUUID()`.

Foi implementado um atributo chamado `NextId`, responsável por gerar IDs sequenciais automaticamente.

Funcionamento da lógica:

- O `NextId` inicia com valor `1`
- Sempre que uma nova tarefa é criada:
  - O valor atual é utilizado como ID
  - Depois disso ele é incrementado automaticamente
- Isso simula um comportamento semelhante ao `AUTO_INCREMENT` de bancos de dados relacionais

Exemplo:

```js
this.NextId = 1;
```

Primeira tarefa:

```js
id: 1
```

Segunda tarefa:

```js
id: 2
```

Terceira tarefa:

```js
id: 3
```

Neste projeto os services utilizam arrays de objetos armazenados na própria classe para simular persistência de dados.

A lógica da aplicação fica isolada dentro dos services para deixar o controller mais limpo e organizado.

# 💾 Database

Arquivo:

```bash
database/data.json
```

O arquivo `data.json` foi utilizado apenas como estrutura inicial de armazenamento para fins de estudo.

Atualmente ele funciona como um banco simples e local para simular persistência de dados.

Objetivos:
- Aprender manipulação de dados
- Simular persistência
- Focar na arquitetura antes de utilizar um banco real

---

# ✅ Schemas

Arquivo:

```bash
schemas/TaskSchema.js
```

Os schemas definem regras de validação utilizando validação de dados.

Exemplo:

```js
title: z.string().trim().min(3)
```

Responsabilidades:
- Validar entrada de dados
- Garantir integridade
- Evitar dados inválidos
- Padronizar informações recebidas

---

# ⚙️ Configurações

## `cors.js`

Configura permissões de acesso da API.

Exemplo:
- Permitir que um frontend acesse a API

---

## `env.js`

Responsável por carregar variáveis de ambiente da aplicação.

Exemplo:

```env
PORT=3000
```

---

## `rateLimit.js`

Limita a quantidade de requisições feitas para a API.

Objetivos:
- Segurança
- Evitar spam
- Reduzir ataques de força bruta

---

# 🧰 Utils

## `AppError.js`

Classe personalizada utilizada para padronizar erros da aplicação.

Exemplo:

```js
throw new AppError("Task not found", 404);
```

Isso permite:
- Melhor organização
- Padronização de respostas
- Facilidade de manutenção

---

# 🚀 Arquivos Principais

# `app.js`

Responsável por configurar toda a aplicação.

Funções:
- Inicializar o Express
- Aplicar middlewares
- Registrar rotas
- Configurar tratamento de erros

Exemplo:

```js
app.use(express.json());
app.use(routes);
```

---

# `server.js`

Responsável por iniciar o servidor da API.

Exemplo:

```js
app.listen(PORT, () => {
    console.log("Servidor rodando");
});
```

---

# 🔐 Variáveis de Ambiente

## `.env`

Armazena informações sensíveis e configurações da aplicação.

Exemplo:

```env
PORT=3000
SECRET_KEY=123456
```

---

## `.env.example`

Arquivo modelo contendo as variáveis necessárias para rodar o projeto.

Utilizado para facilitar configuração em outros ambientes.

---

# 🚫 .gitignore

Define arquivos e pastas que não devem ser enviados ao GitHub.

Exemplo:

```gitignore
node_modules
.env
```

---

# 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido para estudar:

- Arquitetura de APIs profissionais
- Fluxo completo de requisições HTTP
- Modularização
- Escalabilidade
- Middlewares
- Tratamento de erros
- Validação de dados
- Segurança básica
- Organização profissional de código

---

# 🚀 Melhorias Futuras

- Integração com banco de dados real
- JWT Authentication
- Swagger
- Docker
- Testes automatizados
- Upload de arquivos
- Cache
- Deploy em nuvem
- CI/CD

---

# 👨‍💻 Autor

Projeto desenvolvido para fins de estudo em desenvolvimento Back-end, arquitetura de software e construção de APIs profissionais utilizando Node.js.

feito por Henrique Matheus Nobrega para adição de Portifólio e de conhecimento para o Grupo de Estudo de Back End do SENAC PORTÃO
