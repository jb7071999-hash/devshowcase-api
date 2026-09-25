# DevShowcase API

Backend da plataforma DevShowcase — disciplina UAPITSI16 Programação Backend (UESPI, turma TLAGOASF 2025.2).

## Stack
Node.js + Express + Sequelize (PostgreSQL).

## Estrutura de pastas

```
src/
  config/       -> conexão com o banco e configuração do Swagger
  models/       -> entidades (Profile, Project, Technology, Feedback) e relacionamentos
  dtos/         -> validação dos dados de entrada
  repositories/ -> acesso direto ao banco (via Sequelize)
  services/     -> regras de negócio (o que cada endpoint realmente faz)
  controllers/  -> recebem a requisição HTTP e chamam o service certo
  routes/       -> definição dos endpoints + anotações Swagger
  middlewares/  -> tratamento global de erros
  utils/        -> ApiError (erro de aplicação com status HTTP)
  app.js        -> monta o Express (middlewares, rotas, swagger)
  server.js     -> ponto de entrada, conecta ao banco e sobe o servidor
```

Fluxo de uma requisição: **rota → controller → service (regra de negócio) → repository (banco)**.
Isso separa "o que a API expõe" de "como os dados são validados e persistidos" — é o que a Atividade 1
pede em "camada de acesso a dados" e o que a Atividade 2 evolui com regras avançadas.

## Como rodar localmente

```bash
npm install
cp .env.example .env   # preencha com as credenciais reais do banco
npm run dev
```

A API sobe em `http://localhost:3000`. Documentação interativa em `http://localhost:3000/api-docs`.

## Validar que está tudo funcionando (antes de gravar)

```bash
npm run test:smoke
```

Isso sobe a API inteira com um banco sqlite temporário em memória e testa os 24 cenários dos
endpoints (sucesso, erro 400, erro 404, paginação, recálculo de média, etc.) sem precisar de
credenciais reais. Se aparecer "TODOS OS TESTES PASSARAM", o código está correto — o que faltar
depois disso é só configuração de ambiente (banco na nuvem, deploy), não lógica.

## Popular o banco com dados de exemplo (para não gravar com a API vazia)

```bash
npm run seed
```

Cria 1 profile, 3 technologies e 1 project já vinculados — usa o banco configurado no seu `.env`
(local ou já em produção). Ele imprime os ids criados no terminal; use-os na collection do Postman.

## Endpoints (Atividade 1)
- `POST /api/profiles`, `GET /api/profiles`, `GET /api/profiles/:id`
- `POST /api/technologies`, `GET /api/technologies`
- `POST /api/projects`, `GET /api/projects`

## Endpoints (Atividade 2)
- `POST /api/projects/:id/feedbacks` — nota de 1 a 5, recalcula `averageRating` do projeto
- `PUT /api/projects/:id` — incrementa `starCount` (curtidas/destaque)
- `GET /api/projects?search=&technology=&page=&pageSize=` — busca, filtro e paginação
- Erros sempre no formato `{ status, message, details }` (ver `middlewares/errorHandler.js`)
- Documentação: `GET /api-docs`

## Deploy em nuvem (Atividade 2)
1. Suba este projeto para um repositório no GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Crie um banco PostgreSQL gerenciado (Supabase ou Render PostgreSQL) e anote host, porta, nome,
   usuário e senha.
3. No Render, "New +" → "Blueprint" → aponte para o repositório: o `render.yaml` já está neste projeto
   e configura o Web Service sozinho (só peça as 4 variáveis marcadas como `sync: false`: `DB_HOST`,
   `DB_NAME`, `DB_USER`, `DB_PASSWORD`). Alternativa manual: "New +" → "Web Service", `npm install` /
   `npm start`, e preencher as mesmas variáveis do `.env.example` na aba Environment.
4. O deploy automático já fica ativo — cada push no branch principal atualiza a API em produção.
5. Rode `npm run seed` apontando o `.env` local para o banco de produção (mesmas credenciais do passo 2),
   para a API em produção já não estar vazia quando você gravar.

## Roteiro para o vídeo de demonstração
1. Importe `devshowcase-api.postman_collection.json` no Postman e troque a variável `baseUrl` para a
   URL pública em produção.
2. Ligue a webcam, apresente-se (nome completo) e compartilhe a tela inteira.
3. Siga a collection na ordem: criar profile → criar technologies → criar project → listar/filtrar/paginar
   → PUT de curtidas → POST de feedback (mostrando a média mudar) → os 3 requests de erro (400/404) para
   provar o tratamento global de erros → `GET /api-docs` mostrando a documentação Swagger.
4. Sem cortes, 5-8 minutos, áudio limpo — como pedido no enunciado.
