# Payment API

API REST desenvolvida em Node.js para gerenciamento de transações, clientes, produtos e gateways de pagamento.

O sistema permite registrar transações vinculadas a clientes e gateways utilizando banco de dados MySQL.

---

# Tecnologias utilizadas

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

---

# Estrutura do projeto

payment-api

app.js

src/

config/
db.js

controllers/
transactionController.js

models/
transactionModel.js

routes/
transactionRoutes.js

services/
transactionService.js

package.json

---

# Como instalar e rodar o projeto

### 1 Clonar o repositório

git clone https://github.com/seuusuario/payment-api.git

### 2 Entrar na pasta do projeto

cd payment-api

### 3 Instalar dependências

npm install

### 4 Configurar banco de dados

Criar banco MySQL:

CREATE DATABASE payment_system;

Importar as tabelas necessárias.

### 5 Executar a API

node app.js

O servidor iniciará na porta:

http://localhost:3000

---

# Rotas da API

## Criar transação

POST /api/transactions

### Exemplo de body

{
  "client": 1,
  "gateway": 1,
  "external_id": "TX123456",
  "status": "approved",
  "amount": 200,
  "card_last_numbers": "1234"
}

### Resposta

{
  "message": "Transaction created successfully",
  "transactionId": 10
}

---

# Estrutura do banco de dados

## clients

id  
name  
email  

## gateways

id  
name  

## products

id  
name  
amount  

## transactions

id  
client  
gateway  
external_id  
status  
amount  
card_last_numbers  

## transaction_products

id  
transaction_id  
product_id  
quantity  

---

# Outras informações relevantes

- A API segue arquitetura em camadas:
  - Routes
  - Controllers
  - Services
  - Models

- Controllers recebem requisições HTTP
- Services aplicam regras de negócio
- Models realizam operações no banco de dados

- O banco utiliza chaves estrangeiras para garantir integridade entre tabelas.

---

# Autor

Daniel de Abreu Oliveira
