# Projeto monetizze
 
Para a execução do projeto, é necessário ter

- node

Após a instalação do node, execute na pasta raiz o seguinte comando:

    node index.js

Com isso, a aplicação será executada no endereço 127.0.0.1:3000

Agora, é necessário fazer:

- Uma requisição POST para a 127.0.0.1:3000/decode com o seguinte 'body'

        {
            "encoded" : "'String codificada'"
        }
    
ou

- Uma requisição GET para a 127.0.0.1:3000/decode?encoded=StringCodificada