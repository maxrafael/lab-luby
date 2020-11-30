# lab-luby

## Instruções - Backend

### Ferramentas

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL);

#### Instalação
```js
yarn install
```

#### Banco de dados
- Criar banco de dados **labluby** no PostgreSQL;
- Executar as migrations e as seeds;
```js
yarn sequelize db:migrate
yarn sequelize db:seed:all
