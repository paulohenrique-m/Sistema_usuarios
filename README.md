# Sistema de Gerenciamento de Usuários

Um sistema simples de gerenciamento de usuários desenvolvido em React e Node.

Foi utilizado Postgress como Banco de Dados

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/sistema-usuarios.git

2. Instale as dependências:
   neste topico destaco o uso de:
   - axios
   - pg

   ```sh
    cd sistema-usuarios
    npm install

## Uso
1. Inicie o servidor de desenvolvimento:

   ```sh
     npm start
2. Abra o navegador e visite http://localhost:5000 para ver o aplicativo em execução.

## Funcionalidades

- **Listar usuários:** Para listar os usuários, você pode criar uma página que faça uma requisição ao seu backend para obter a lista de usuários e exibi-la na interface do usuário.

- **Adicionar usuário:** Crie um formulário onde o usuário possa inserir os dados do novo usuário e envie esses dados para o seu backend para serem salvos no banco de dados.

- **Editar usuário:** Crie um formulário semelhante ao de adicionar usuário, mas preencha-o com os dados do usuário selecionado para edição. Ao enviar o formulário, atualize os dados do usuário no backend.

- **Excluir usuário:** Adicione um botão de "Excluir" ao lado de cada usuário na lista. Ao clicar nesse botão, envie uma requisição para o seu backend para excluir o usuário selecionado.

- **Filtrar usuários por nome:** Adicione um campo de pesquisa na sua lista de usuários. Ao digitar o nome no campo de pesquisa, faça uma requisição para o backend para obter apenas os usuários que correspondem ao nome pesquisado e exiba-os na lista.

