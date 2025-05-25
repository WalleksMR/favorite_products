<h1 align="center">
  <img alt="Logo" src="./assets/aiqfome.png" width="200px">
</h1>

<h3 align="center">
  aqifome
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
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-introducao">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licenca">Licença</a>
</p>

## Sobre o projeto

Uma API para gerenciar produtos favoritos integrando com [FakeStoreAPI](https://fakestoreapi.com/).

## 🚀 Tecnologias

Tecnologias que usei para desenvolver esta API.

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

## 💻 Introdução

Para executar este projeto em sua máquina, segue abaixo alguns requisitos.

### Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Uma instância de [PostgresQL](https://www.mysql.com)

**Clona este projeto e acessa a pasta**

```bash
$ git clone https://github.com/WalleksMR/favorite_products.git && cd favorite_products
```

**Segue o passo a passo a baixo**

```bash
# Iniciar aplicação junto com banco de dados
$ yarn up

# Quando os serviços estiverem em execução, ira executar as migrations e seed do usuario "johndoe@email.com"
# Esse usuário sera utilizado para fazer o login

# Muito bem, aplicação está em executação
```

As configuração já estão aplicadas no arquivo `env/development.env`

Para acessar a documentação: [Swagger Docs](http://localhost:3030/aiqfome/docs)

_Obs: para acessar essa documentação, a API precisa esta em execução._

Caso deseja executar a API no seu terminal, segue os passos abaixo:

```bash
# Instalar as dependências
$ yarn

# Levantar uma instancia do banco PostgreSQL local
$ yarn up:db

# Executar o seguinte comentado:
$ yarn local

# Obs: Não pode executar os 2 comandos ao mesmo tempo "yarn up" e "yarn local", pois ambas estão na mesma porta "3030". Mas caso queria executar, altere a porta no arquivo `env/local.env`

```

## 📝 Licença

Este projeto está licenciado sob a licença MIT - Veja [Licença](LICENSE.md) para mais detalhes.

---

Made with ❤️ &nbsp;by Walleks Miranda 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/walleks-r-miranda-b291bb1aa/)
