TESTE CEDRO SERVER
=====================

## Instalação

Certifique-se que você tenha instalado o [NodeJs](https://nodejs.org/en/download/) em sua máquina.

Clone o projeto para sua máquina:
```bash
$ git clone <LINK DO REPOSITÓRIO>
```

Após ter o projeto em sua máquina, execute o comando abaixo no terminal para poder instalar as dependências necessárias:
```bash
$ npm install
```

#### Testando o projeto

- Para rodar o servidor e testar a api, execute:
```bash 
$ npm start
```

#### CONFIGURANDO CONEXÕES

- Configure a conexão com MongoDB no diretório: `/.env`

No projeto estou alocando o banco de dados Online no site [mlab.com](https://mlab.com/).
Mas essa variavel pode ser alterada para a url de seu banco local.
```bash
$ MONGODB_URI=mongodb:// << USUARIO >> : << SENHA >> @ << URL_DO_MLAB >>
```

- Configure a conexão com TOKEN no diretório: `/.env`

No projeto estou usando JSON Web Token [JWT](https://jwt.io/) para criptgrafia de senhas.
```bash
$ TOKEN_SECRET= << TOKEN >>
```

- Configure a conexão a porta para rodar seu servidor: `/.env`

No projeto estou usando a porta para rodar o server 9000.
```bash
$ PORT=9000
```

#### Rota para Registro de Usuário

- Registro
{POST} /api/v1/auth/registroDeUsuario

```bash 
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
```

#### Rota para Registro de Produtos

- Registro
{POST} /api/v1/produto/registroDeProduto

```bash 
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: String,
        required: true
    },
    id_user: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
```
#### Rotas para Autenticação e Checagem

- Autenticação
{POST} /api/v1/auth/login

```bash 
     email: {
         type: String,
         required: true
     },
     password: {
         type: String,
         required: true,
         min: 6
     }
```
#### Listar produtos
```bash
{GET} /api/v1/produto/:id_produto
```

- Para ordernar a busca por determinada key, acrescente o parametro `orderBy=NOME_DA_KEY` na url.

- Para ordernar a busca em Ascendente ou Descendente, acrescente o parametro `sort=asc` para ordenar em Ascendente ou `sort=desc` para ordenar em Descendente.

- Para limitar a quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `limit=QUANTIDADE`.

- Para pular uma determinada quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `skip=QUANTIDADE`.

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

- Para buscar estórias, por determinada key do documento, acrescente o parametro `key=NOME_KEY&text=TEXTO_KEY`.


