# Teste Técnico Prático Seidor

Calculo do desconto de imposto de renda segundo os dados:

|         Base de cálculo        | Alíquota | Parcela a deduzir do IRPF |
|:------------------------------:|:--------:|:-------------------------:|
|         Até R$ 1.903,98        |  Isento  |          R$ 0,00          |
| De R$ 1.903,99 até R$ 2.826,65 |   7,5%   |         R$ 142,80         |
| De R$ 2.826,66 até R$ 3.751,05 |    15%   |         R$ 354,80         |
| De R$ 3.751,06 até R$ 4.664,68 |   22,5%  |         R$ 636,13         |
|      Acima de R$ 4.664,68      |   27,5%  |         R$ 869,36         |

Dedução por dependente: R$ 164,56

Aplicação desenvolvida utilizando: 

- React.js
- Redux (RTK)
- React Router
- React Testing Library + Jest

Para execução: 

Clone o projeto e execute o `npm install` e logo após o `npm start` que inicia a aplicação em http://localhost:3000.
Para executar os testes utilize `npm test` e para verificar a cobertura `npm run coverage`.
