Desafio BeTalentTech – Sistema de Pagamentos Multi-Gateway
Descrição do Projeto

Este projeto é um sistema de gerenciamento de pagamentos multi-gateway desenvolvido com Node.js, Express, MySQL, Knex e VineJS.

O sistema permite:

Realizar transações de clientes.

Tentar os gateways ativos seguindo a ordem de prioridade.

Salvar apenas os últimos 4 dígitos do cartão por questões de segurança.

Facilitar a adição de novos gateways de forma modular no futuro.

Estrutura do Banco de Dados

O banco de dados foi estruturado com as seguintes tabelas:

Tabela	Colunas
users	id, email, password, role
gateways	id, name, is_active, priority
clients	id, name, email
products	id, name, amount
transactions	id, client, gateway, external_id, status, amount, card_last_numbers
transaction_products (Nível 2)	transaction_id, product_id, quantity
Rotas do Sistema
Rotas Públicas

POST /api/login – Realizar login.

POST /api/transacoes – Realizar uma compra (Gateway 1 ou 2).

Rotas Privadas (pendente no Nível 1)

CRUD de usuários.

CRUD de produtos.

Ativar/desativar gateways.

Alterar prioridade de gateways.

Listar clientes e seus detalhes.

Listar transações e seus detalhes.

Reembolso de transações.

Gateways Mockados
Gateway 1 – Porta 3001

JSON esperado:

{
  "amount": 1000,
  "name": "tester",
  "email": "tester@email.com",
  "cardNumber": "5569000000006063",
  "cvv": "010"
}

Sempre aprova qualquer transação.

Gateway 2 – Porta 3002

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

Instalação e Execução
# Clonar repositório
git clone <URL_DO_REPOSITORIO>
cd desafioBeTalentTech

# Instalar dependências
npm install

# Criar banco de dados
CREATE DATABASE desafio_betalent;

# Rodar o servidor
npm run dev
Testando os Gateways
# Gateway 1
node src/mocks/gateway1.js

# Gateway 2
node src/mocks/gateway2.js
Dificuldades Encontradas

Diferença de JSON entre os gateways – Campos diferentes (amount vs valor, cardNumber vs numeroCartao).

Erro de tamanho de coluna – Número completo do cartão ultrapassava o limite; foi necessário salvar apenas os últimos 4 dígitos.

Erros de módulos e imports – Pacotes como axios, bcryptjs e @vinejs/vine precisaram ser ajustados.

Rotas undefined – Controllers ou rotas não exportadas corretamente causavam erro.

Reembolso inicial – O endpoint /transacoes/reembolso precisava identificar corretamente o gateway e enviar o payload correto.

Funcionalidades Implementadas

Criação de transações com tentativa em múltiplos gateways por prioridade.

Salva transações com últimos 4 dígitos do cartão.

Gateways mockados aceitam qualquer valor, facilitando testes.

Endpoint de listagem de transações.

Funcionalidades Pendentes (Nível 1 / Futuro Nível 2-3)

CRUD completo de usuários com roles.

CRUD completo de produtos com roles.

Ativação/desativação e alteração de prioridade de gateways via API.

Listagem detalhada de clientes e todas suas compras.

Endpoint de reembolso com validação por roles e logs.

Testes automatizados (TDD).

Docker Compose com MySQL, aplicação e gateways mockados.

Documentação de Testes

Disponível no Postman: Clique aqui