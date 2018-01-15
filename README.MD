# Login com Node.js, Passport.js e React

## Conteúdo

Esse repositório contém um boilerplate para colocar um servidor com [Node.js](https://nodejs.org/en/) rodando.
Fazendo autenticação com [Passport.js](http://www.passportjs.org/), persistência com [MongoDB](https://www.mongodb.com/) e com front-end desenvolvido em
[React.js](https://reactjs.org/).

As autenticações suportadas são:

* local com email e senha: [passport-local](https://github.com/jaredhanson/passport-local)
* via Facebook OAuth: [passport-facebook](https://github.com/jaredhanson/passport-facebook#readme)
* via Google Oauth: [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2#readme)

## Colocando para rodar

Comece clonando o repositório:

`git clone https://github.com/goislimat/login-node.git`

Acesse a pasta clonada e crie seu arquivo .env

```
cd login-node
cp .env-example .env
```

Então crie suas keys corretamente:

* COOKIE_KEY deve ser qualquer string aleatória para criptografia
* FACEBOOK_CLIENT_ID e FACEBOOK_CLIENT_SECRET você deve acessar a página de [desenvolvedores do Facebook](https://developers.facebook.com/) para obter essas credencias
* GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET você deve acessar a página de [desenvolvedores do Google](https://console.developers.google.com) para obter essas credenciais
* MONGO_URI é a URL de conexão com seu banco de dados Mongo

## Instruções de criação das Keys

Antes de qualquer coisa, os callbacks registrados aqui, devem bater com os callbakcs utilizados na Strategy definida no passport:

```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // esse é a URL de callback do passport
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Sign up actions here
    }
  )
);
```

### Facebook

Acesse o link [https://developers.facebook.com/](https://developers.facebook.com/), crie uma aplicação e selecione o serviço **login do facebook**.

No painel da aplicação você vai encontrar suas keys:
![facebook-keys](https://user-images.githubusercontent.com/8589984/34951987-42208f58-f9ff-11e7-8724-5908f97b15e8.png)

E na opção de configuração do produto Login do Facebook, você pode adicionar suas URLs de callback:
![facebook-callbacks](https://user-images.githubusercontent.com/8589984/34952018-60888fc2-f9ff-11e7-8b51-27411e45473a.png)

### Google

Acesse o link [https://console.developers.google.com](https://console.developers.google.com).

Habilite a API do serviço
![google-1](https://user-images.githubusercontent.com/8589984/34952025-659df5ce-f9ff-11e7-9654-44cb3f5088d7.png)
![google-2](https://user-images.githubusercontent.com/8589984/34952026-65c0597a-f9ff-11e7-872e-64f3d9e215d4.png)

Depois garanta que sua aplicação está selecionada (em frente ao ícone 'Google APIs' você deve ver o nome da sua aplicação recém criada) e selecione a opções credenciais
![google-3](https://user-images.githubusercontent.com/8589984/34952027-65e242c4-f9ff-11e7-86fb-6f7200f24718.png)

Crie um ciente OAuth
![google-4](https://user-images.githubusercontent.com/8589984/34952028-6603ae28-f9ff-11e7-84ad-5d60deb39537.png)

Depois crie uma aplicação Web e preencha as informações do seu servidor e de callback
![google-5](https://user-images.githubusercontent.com/8589984/34952029-6624bce4-f9ff-11e7-8137-a2d27efa57d2.png)

Depois da aplicação criada você irá ver suas credenciais.

### Keys criadas, inicie a aplicação

Siga os passos a seguir:

```
cd login-node
npm install
cd client
npm install
cd ..
npm run dev
```

Se tudo correr bem, sua aplicação deve estar rodando nesse momento
