Desafio BeTalentTech – Sistema de Pagamentos Multi-Gateway
Descrição do Projeto

Este projeto é um sistema de gerenciamento de pagamentos multi-gateway construído com Node.js, Express, MySQL, Knex e VineJS.
O sistema permite realizar transações de clientes, tentando os gateways ativos por ordem de prioridade e salvando apenas os últimos 4 dígitos do cartão para segurança.

Estrutura do Banco de Dados

O banco foi estruturado com as seguintes tabelas:

users: id, email, password, role

gateways: id, name, is_active, priority

clients: id, name, email

products: id, name, amount

transactions: id, client, gateway, external_id, status, amount, card_last_numbers

transaction_products (Nível 2): transaction_id, product_id, quantity

Rotas do Sistema
Rotas Públicas

POST /api/login – Realizar login

POST /api/transacoes – Realizar uma compra (Gateway 1 ou 2)

Rotas Privadas (pendente para Nível 1)

CRUD de usuários

CRUD de produtos

Ativar/desativar gateways

Alterar prioridade de gateways

Listar clientes e detalhes

Listar transações e detalhes

Reembolso de transações

Gateways Mockados

Gateway 1 – porta 3001

JSON esperado:

{
  "amount": 1000,
  "name": "tester",
  "email": "tester@email.com",
  "cardNumber": "5569000000006063",
  "cvv": "010"
}

Sempre aprova qualquer transação.

Gateway 2 – porta 3002

JSON esperado:

{
  "valor": 1000,
  "nome": "tester",
  "email": "tester@email.com",
  "numeroCartao": "5569000000006063",
  "cvv": "010"
}

Sempre aprova qualquer transação.

Requisitos para Rodar o Projeto

Node.js ≥ 18

MySQL

NPM

Instalação
# Clonar repositório
git clone <URL_DO_REPOSITORIO>
cd desafioBeTalentTech

# Instalar dependências
npm install

# Criar banco de dados
# (exemplo MySQL)
CREATE DATABASE desafio_betalent;

# Rodar o servidor
npm run dev

Testando os gateways
# Rodar Gateway 1
node src/mocks/gateway1.js

# Rodar Gateway 2
node src/mocks/gateway2.js
Dificuldades Encontradas

Diferença de JSON entre os gateways – Cada gateway recebia campos diferentes (amount vs valor, cardNumber vs numeroCartao).

Erro de tamanho de coluna – O número do cartão completo ultrapassava o limite da coluna card_last_numbers; foi necessário salvar apenas os últimos 4 dígitos.

Erros de módulos e imports – Alguns pacotes como axios, bcryptjs e @vinejs/vine não estavam sendo reconhecidos; ajustes no package.json e importações foram feitos.

Rotas undefined – Erros ao declarar rotas ou controllers que não estavam corretamente exportados.

Reembolso inicial – O endpoint /transacoes/reembolso precisava identificar o gateway correto e enviar payload correto para que funcionasse.

Funcionalidades Implementadas

Criação de transações com tentativa em múltiplos gateways por ordem de prioridade.

Salva transações com últimos 4 dígitos do cartão.

Gateways mockados que aceitam qualquer valor (facilitando testes).

Endpoint de listagem de transações.

Funcionalidades Pendentes (Nível 1 / Futuro Nível 2-3)

CRUD completo de usuários com roles.

CRUD de produtos com roles.

Ativação/desativação e alteração de prioridade de gateways via API.

Detalhes de clientes e todas suas compras.

Endpoint de reembolso integrado com roles e logs.

Testes automatizados completos (TDD).

Docker Compose com MySQL, aplicação e gateways mockados.

POSTMAN- https://documenter.getpostman.com/view/52983232/2sBXigMYhM