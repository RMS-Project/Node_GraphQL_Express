<h2>API GraphQl</h2>

**Acessar Dashboard GraphyQl**
<p>Criar e testar Queries e Mutations</p>

```
http://127.0.0.1:8080/graphql
```

**nodemon -r esm .**
<p>nodemon - Checks if project files have changed by restarting Node.</p>
<p>-r - Allows running multiple files simultaneously.</p>
<p>esm - ECMAScript module loader.</p>
<p>. - Indicates the project root</p>

-------------------------------------------------------------------------------

**Trabalhando com pacotes**
<p>Esta forma serve para criar um monorepo, que guarda os arquivos do servidor e da interface do usuário (web).
Com esta configuração é possível instalar as dependências dos dois projeto com apenas um comando, assim como inicia-los.</p>

**Inicie o projeto**
```
pnpm init
```

**Crie o arquivo**
```
pnpm-workspaces.yaml
```

**Escreva no arquivo:**
```
packages:
  - 'packages/**'
```
Note: Vai realizar a inicialização de todos os pacotes contidos dentro da pasta "package"

**Altere o nome do projeto no package.json de cada um dos repositórios (server e web)** <br>
Ex: "name": "@api_graphql/server",

**Instalação das dependências do projeto com o gerenciador de pacotes pnpm**
```
pnpm i
```

**Execute o comando para instalar as dependências do projeto server**
```
pnpm i --filter @api_graphql/server
```

**Iniciar o projeto na raiz**
```
pnpm --filter @api_graphql/server run start
```

**Instalação do Apollo Server para o GraphQL**
```
pnpm i apollo-server-express --filter @api_graphql/server
```

-------------------------------------------------------------------------------

**Instalação do Express**
```
pnpm i express --filter @api_graphql/server
```

**Lidar com a politica CORS**
<p>A politica cors não permite que aplicações externas acesse o servidor.</p>
<p>Desta forma é necessário adicionar uma permissão para que aplicações externas possam acessar o servidor.</p>

```
pnpm i cors --filter @api_graphql/server
```
-------------------------------------------------------------------------------

<h2>React package</h2>

**React install**
```
pnpx create-react-app packages/web
```

**Alterar o nome do projeto em package.json**
```
"name": "@api_graphql/web",
```

**Instalar as dependências do projeto web**
```
pnpm i --filter @api_graphql/web
```

**Iniciar o projeto na raiz**
```
pnpm --filter @api_graphql/web run start
```
**O que é o index.html ?**
<p>Página template para todas as páginas da aplicação, uma vez que todas as páginas serão carregadas dentro deste mesmo template.</p>

**O que é o manifest.json ?**
<p>Utilizado para configurar e transformar o site em um aplicativo para Android.</p>

**O que é o robots.txt ?**
<p>Serve para que o algorítimo de busca do Google veja a página.</p>

**Instalar o react-router-dom**
```
pnpm i react-router-dom --filter @api_graphql/web
```