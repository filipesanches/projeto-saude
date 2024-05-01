# Sistema de Saúde

## Descrição

Este é um projeto de desenvolvimento front-end para uma plataforma online de contratação de profissionais de saúde. O projeto permite o cadastro, edição, listagem e exclusão de profissionais de saúde, além de outras funcionalidades.

## Simulação de `API` com `JSON Server`

Este projeto utiliza o `JSON Server` para simular uma `API RESTful` para armazenar e manipular dados dos profissionais de saúde localmente. O JSON Server é uma ferramenta que permite criar rapidamente uma `API RESTful` baseada em um arquivo `JSON`.

### Instalação do `JSON Server`

Se você ainda não tem o `JSON Server` instalado globalmente, você pode instalá-lo usando npm:

```bash
npm install -g json-server 
```

### Inicializando o `JSON Server`

Para iniciar o `JSON Server` e começar a simular sua `API`, você pode usar o seguinte comando:

```bash
json-server --watch db.json --port 3000
```

Isso iniciará o `JSON Server` e o configurará para assistir ao arquivo `db.json` no diretório raiz do projeto. Ele estará disponível em [http://localhost:3001](http://localhost:3001).

### Arquivo `db.json`

O arquivo `db.json` contém os dados simulados para sua API. Certifique-se de ajustar esse arquivo conforme necessário para corresponder à estrutura de dados da sua aplicação.

Para mais informações sobre como usar o `JSON Server`, consulte a documentação oficial em [https://github.com/typicode/json-server](https://github.com/typicode/json-server).


## Como Executar

**Para executar o projeto, siga os passos abaixo:**

1.  Certifique-se de ter o Node.js instalado na sua máquina. Você pode
    baixá-lo em [nodejs.org](nodejs.org).
2.  Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/filipesanches/projeto-saude.git
    ```

3.  Acesse o diretório do projeto:

    ```bash
    cd sistema-saude
    ```

4.  Instale as dependências do projeto:

    ```bash
    npm install
    ```

5.  Execute o projeto em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

6.  Após a execução bem-sucedida, você poderá acessar o projeto no navegador usando o seguinte endereço: [http://localhost:5173/](http://localhost:5173/).

## Como Testar

**Para testar o projeto, você pode executar os seguintes comandos:**

### Linting: Verifica o estilo e a qualidade do código:
```bash
npm run lint
```
    
## Tecnologias Utilizadas

- `React` - Biblioteca `JavaScript` para construção de interfaces de
  usuário.
- `React Router` - Roteamento de aplicativos para React.
- `JSON Server` - Simula uma `API RESTful` utilizando um arquivo `JSON`.
- `TypeScript` - Superset do `JavaScript` que adiciona tipagem estática.
- `Vite` - Build tool rápida para projetos front-end.
- `ESLint` - Ferramenta de análise de código estática para identificar
  padrões problemáticos no código `JavaScript/TypeScript`.
- `Sass` - Pré-processador `CSS`.

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `public/`: Contém arquivos estáticos como `HTML`, imagens e outros
  recursos.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar problemas ou sugerir melhorias. Pull requests também são apreciados.

## Licença

Este projeto está licenciado sob a MIT License.
