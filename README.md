# Atac - My Client Routes
Uma aplicação simples, para gestão de clientes e rotas de visitação.

Essa aplicação está escrita em **TypeScript**, utilizando **Node** + **Express** + **PostgreSQL** + **Swagger** no back end e **React** + **Next** + **MaterialUi** no front end.

## Configurando o projeto
**⚠️ ATENÇÃO ⚠️** Estamos utilizando a estrutura de **monorepo**, Uilizando a funcionalidade de workspaces, para dividir Backend, Frontend e documentos compartilhados. Por isso é importante, que **ao rodar um script**, não esqueça de **defirnir** qual é o **workspace** de destino. Você pode fazer isso utilizando a tag `-w` por exemplo `npm i -w 'workspace'`.

### Banco de dados
Dentro do workspace **server** você irá encontrar uma pasta **database/tables** que possui os arquivos necessários para criação das **tabelas** e **plugins**.

Com base nisso, crie o seu **databse** e utilize o DLL disponível em `users.SQL`, para insirir a extensão `pgcrypto` e a tabela `users` no meu banco de dados.

#
### Instalando dependências
Com o banco de dados configurado, instale as dependências do projeto, para isso rode:

####  Backend
```
npm install -w server
```
####  Frontend
```
npm install -w client
```

⚠️ Não esqueça de definir a flag `-w` para direcionar corretamente a ação. ⚠️

#
### Variáveis de ambiente
O projeto utiliza variáveis de ambiente, portanto é importante que você configure-as corretamente.

Dentro dos workspaces **server** e **client** existem os arquivos `.env.example` de cada um desses ambientes. Na raiz de cada um dos ambientes, crie o arquivo `.env` e popule-o com suas respectivas variáveis, utilizando as variáveis do arquivo de exemplo como base.

Os comandos a seguir podem ajudar. Eles criam o `.env` como uma cópia do arquivo `.env.example` de cada ambiente:
#### Backend
```
cp packages/client/.env.example packages/client/.env
```

#### Frontend
```
cp packages/server/.env.example packages/server/.env
```

⚠️ É importante definir todas as variáveis corretamente, para que o projeto possa ser iniciado. Não esqueça de atualizar todas. ⚠️
#
### Rodando o projeto
Com tudo devidamente configurado e instalado, basta rodar os seguintes comando em seu terminal:
#### Backend
``` 
npm run dev -w server
```

#### Frontend
```
npm run dev -w client
```

### ALL DONE ✅
Agora você conseguirá acessar a aplicação partindo dos endpoints que você predefiniu.

### NOTA
A API foi documentada utilizando [Swagger](https://swagger.io/). Você pode acessá-la através do endpoint `/docs`.