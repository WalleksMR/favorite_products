<h1 align="center">
  <img alt="Logo" src="./assets/aiqfome.png" width="200px">
</h1>

<h3 align="center">
  aiqfome
</h3>

<p align="center">Gerenciamento de produtos favoritos</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/static/v1?label=TypeScript&message=99.3%&color=blue">
  <img alt="GitHub" src="https://img.shields.io/static/v1?label=Licence&message=MIT&color=blue"/>
  <a href="https://www.linkedin.com/in/walleks-r-miranda-b291bb1aa/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=Made%20by&message=Walleks%20M&color=blueviolet">
  </a>
</p>

<p align="center">
  <a href="#sobre-o-projeto">Sobre o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#introducao">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licenca">Licença</a>
</p>

---

## 📖 Sobre o Projeto

API para gerenciar produtos favoritos, integrando com a [FakeStoreAPI](https://fakestoreapi.com/).

---

## 🚀 Tecnologias

Tecnologias utilizadas neste projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [uuid v7](https://github.com/thenativeweb/uuidv4/)
- [Zod](https://github.com/colinhacks/zod)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🏁 Introdução

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Instalação

1. **Clone o repositório e acesse a pasta:**

   ```bash
   git clone https://github.com/WalleksMR/favorite_products.git
   cd favorite_products
   ```

2. **Inicie a aplicação com Docker (recomendado):**

   ```bash
   # Inicia a aplicação e o banco de dados
   yarn up
   ```

   - As migrations e o seed do usuário `johndoe@email.com` serão executados automaticamente.
   - Use esse usuário para login inicial.

3. **Acesse a documentação da API:**

   - [Swagger Docs](http://localhost:3030/aiqfome/docs)
   - _Obs: a API deve estar em execução para acessar a documentação._

4. **Configuração de ambiente:**
   - As configurações já estão no arquivo `env/development.env`.

---

### 💡 Alternativa: Executar manualmente (sem imagem docker da API)

1. **Instale as dependências:**

   ```bash
   yarn
   ```

2. **Suba uma instância local do PostgreSQL:**

   ```bash
   yarn up:db
   ```

3. **Execute a aplicação:**
   ```bash
   yarn local
   ```

> ⚠️ **Atenção:**  
> Não execute `yarn up` e `yarn local` ao mesmo tempo, pois ambos usam a porta `3030`.  
> Se necessário, altere a porta no arquivo `env/local.env`.

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.  
Veja mais em [LICENSE.md](LICENSE.md).

---

Feito com ❤️ por Walleks Miranda 👋 [Meu LinkedIn](https://www.linkedin.com/in/walleks-r-miranda-b291bb1aa/)
