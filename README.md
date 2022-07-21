# ROCKET HELP

É um sistema de cadastro de tickets de problemas a serem resolvidos, o ticket
é cadastrado e então o usuário autenticado pode finaliza-lo, assim indicando
que o ticket foi resolvido.
<br />
<br />

## PROTÓTIPO

O protótipo do projeto se encontra na plataforma FIGMA, acesse o
[prototipo aqui](https://www.figma.com/file/x0VxNBNKwSDXUO2ENG7pLz/Rocket-Help?node-id=47%3A276)
.
<br />
<br />

## EXECUÇÃO

Para executar o projeto, faça o download deste projeto na sua máquina,
abra o terminal e vá até o diretório do seu projeto, e execute o comando
`npm install` ou `yarn` para instalar os pacotes.

Após isso siga para os tópicos <b>Criando o firebase</b> e 
<bConfigurando o expo-firebase</b>, após os tópicos finalizados, é necessário
conectar um aparelho Android ou iOS via USB ou executar um emulador.

Por fim abra o terminal no projeto e execute o comando:
`expo run:android` ou `expo run:ios`.

Em casos de não funcionar, a Rocketseat possui um manual mais detalhado
de como executar aplicações expo com firebase. Acesse o 
[link](https://react-native.rocketseat.dev/) e saiba mais.
<br />
<br />

## CRIANDO O FIREBASE

O processo é bem simples, acesse o [firebase](https://firebase.google.com/)
clique no botão <b>Começar</b> e depois em <b>Adicionar projeto</b> agora
informe o nome do projeto Ex.: <b>rocket-help</b> e confirme.

Ao lado esquerdo, na aba de <b>Criação</b> existe um sub-menu chamado
<b>Authentication</b> clique nele, após isso será aberto uma nova janela,
então clique na aba <b>Sign-in method</b> agora na seção de
<b>Provedores de login</b> clique no botão <b>Adicionar novo fornecedor</b>,
por fim, selecione a opção <b>E-mail/senha</b> e no switch de <b>Ativar</b> e
finalmente pressione o botão <b>Salvar</b>. Com isso foi habilitado a
autenticação via email e senha.

Agora vamos criar o banco de dados, novamente na aba à esquerda na seção de
<b>Criação</b> clique na opção <b>Firestore database</b> e na nova janela que
foi aberta pressione o botão <b>Criar banco de dados</b>, selecione a opção
<b>Iniciar no modo de teste</b>, depois no botão <b>Avançar</b> e por fim no
botão de <b>Ativar</b> e aguarde.

Pronto estamos com o método de autenticação e o banco de dados configurados.
Agora vamos as configurações extras iOS e Android.

Após finalizado, clique na opção <b>Visão geral do projeto</b> localizado no
topo da aba à esquerda, na nova janela aberta clique no botão <b>iOS</b>, agora
vamos completar as etapas.

Na primeira etapa, preencha o campo <b>ID do pacote Apple</b>, Ex.:
`com.rockethelp` e um aviso... <b>GUARDE ESSE NOME</b> ele é o
<b>nome do nosso PACOTE</b>. agora no campo <b>Apelido do app (opcional)</b>
preencha com `iOS` e por fim no código do App Store (opcional) informe qualquer
coisa, <b>esse é o código da App Store quando for para a produção</b>. E depois
pressione o botão <b>Registrar App</b>

Na segunda etapa, faça o download do arquivo <b>GoogleService-Info.plist</b>
e depois jogue o arquivo na raiz do projeto. Agora pode seguir clicando em
próximo para as próximas etapas.

Após finalizado, clique novamente na opção <b>Visão geral do projeto</b>
localizado no topo da aba à esquerda, na nova janela aberta clique no botão
<b>+ Adicionar app</b>, e depois no <b>ícone do android</b>, agora
vamos completar as etapas.

Na primeira etapa, preencha os campos novamente e coloque o nome do pacote
igual ao do passo anterior, agora no campo <b>Apelido do app (opcional)</b>
preencha com `Android` o restantes dos passos é igual ao do iOS.

pronto tudo configurado, agora siga para o próximo tópico.
<br />
<br />

## CONFIGURANDO O EXPO-FIREBASE

Configurar o expo-firebase também não é nada complicado, você pode seguir o
[guia-do-expo]("https://docs.expo.dev/guides/setup-native-firebase/") ou
continuar por aqui, como bem entender.

Bem, vamos lá. Primeiramente instale o pacote <b>@react-native-firebase/app</b>,
execute o comando `yarn add @react-native-firebase/app` ou
`npm install @react-native-firebase/app`.

Enquanto faz a instalação... Vamos adicionar algumas configurações ao nosso app.
No projeto, dentro do arquivo <b>app.json</b> dentro do objeto <b>expo</b>
adicione a seguinte trecho de código:

```
"plugins": [
  "@react-native-firebase/app"
],
"android": {
  "package": "com.rockethelp",
  "googleServicesFile": "./google-services.json"
},
"ios": {
  "bundleIdentifier": "com.rockethelp",
  "googleServicesFile": "./GoogleService-Info.plist"
}
```

<b>OBS:</b> no campo <b>googleServicesFile</b> preencha com os arquivos que
foram feitos os download no tópico anterior. E nos campos <b>package</b> e
<b>bundleIdentifier</b> respectivamente, preencha com o campo do <b>PACOTE</b>
que eu mandei você guardar no também tópico anterior.

Isso diz ao nosso projeto expo que utilizaremos um novo plugin, porém não é só
isso, <b>depois que o pacote anterior já estiver instalado</b>, temos que abrir
o terminal e executar o seguinte comando: `expo prebuild`, esse comando vai
configurar os arquivos dentro do diretório <b>android</b> e <b>ios</b> que estão
na raiz do nosso projeto.

O script vai perguntar algumas coisas, mas somente a seguinte pergunta nos
interessa: <b>What would you like your Android package name to be?</b> nessa
pergunta você deve preencher com o valor do <b>nome do pacote</b> que eu mandei
você guardar no tópico <b>CRIANDO O FIREBASE</b>. Nas perguntas seguintes basta
teclar enter para preencher os valores automaticamente.

Deve aparecer a mensagem <b>Config synced</b> no final, sendo assim estamos
com o firebase e expo configurados. basta adicionar os pacotes para acessarmos
o firestore e authentication. Na raiz do projeto execute os seguintes comandos:

`yarn add @react-native-firebase/firestore @react-native-firebase/auth` <br />
`cd ios/ && pod install` <br />

Se estiver desenvolvendo no iOS é necessário instalar o pod, se não for o caso
você pode ignorar esse passo por hora, se você precisa instalar o pode acesse
[cocoapods]("https://cocoapods.org/").

Pronto firebase e expo configurados.
