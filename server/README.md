PET HELPER SERVER
=====================

#### SEJA FELIZ POR QUE DEUS É BÃO E É ISSO BESMO

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

No projeto estamos alocando nosso banco de dados Online no site [mlab.com](https://mlab.com/).
Mas essa variavel pode ser alterada para a url de seu banco local.
```bash
$ MONGODB_URI=mongodb:// << USUARIO >> : << SENHA >> @ << URL_DO_MLAB >>
```

- Configure a conexão com TOKEN no diretório: `/.env`

No projeto estamos usando JSON Web Token [JWT](https://jwt.io/) para criptgrafia de senhas.
```bash
$ TOKEN_SECRET= << TOKEN >>
```

- Configure a conexão a porta para rodar seu servidor: `/.env`

No projeto estamos usando a porta para rodar o server 9000.
```bash
$ PORT=9000
```

- Configure a conexão com o WIT.AI para conectar seu chatbot: `/.env`

No projeto estamos usando o token do [WIT.AI](https://wit.ai/) para fazer conexão do CHATBOT
```bash
$ TokenWitAI= '<< TOKEN_DO_WIT >>'
```

#### Rota para Registro de Usuário

- Registro
{POST} /api/v1/auth/register

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

#### Rotas para Conversa com CHATBOT
- Autenticação
{POST} /api/v1/chat
```bash 
     var message = req.body.messages;
     const client = new Wit({accessToken: process.env.TokenWitAI});
     client.message(message, {})
     
     .then((data) => {
       var entities = data.entities
       var resposta = "Não entendi."
 
       if (Object.keys(entities).length !== 0) {
        resposta = data.entities.intent[0].value;
       }
       
       console.log('');
       console.log('valor da resposta:' + resposta);
       return res.status(200).json(resposta); 
     })
     .catch(console.error);
```
