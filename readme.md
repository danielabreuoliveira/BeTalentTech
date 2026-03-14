# Payment API - Multi Gateway

API RESTful para gerenciamento de pagamentos utilizando múltiplos gateways.

O sistema tenta realizar cobranças seguindo a ordem de prioridade definida.
Caso o primeiro gateway falhe, o sistema tenta automaticamente o próximo.

---

# Tecnologias

Node.js
Express
MySQL
Axios

---

# Como instalar e rodar

## 1 Clonar repositório

git clone https://github.com/seuusuario/payment-api

## 2 Instalar dependências

npm install

## 3 Configurar banco MySQL

CREATE DATABASE payment_system;

Criar tabelas necessárias.

## 4 Rodar aplicação

node app.js

Servidor iniciará em:

http://localhost:3000

---

# Estrutura da API

POST /api/transactions

Realiza uma nova transação.

Exemplo de body:

{
  "client": 1,
  "card_last_numbers": "1234",
  "products": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}

---

# Funcionamento do Multi-Gateway

1 A API recebe uma requisição de compra  
2 O sistema calcula o valor total com base nos produtos  
3 Busca gateways ordenados por prioridade  
4 Tenta realizar cobrança no primeiro gateway  
5 Caso falhe, tenta no próximo gateway  
6 Quando algum gateway retorna sucesso, a transação é registrada  

---

# Fluxo do sistema

Client Request

↓

API

↓

Buscar produtos

↓

Calcular valor total

↓

Buscar gateways

↓

Tentar gateway 1

↓

Se falhar → gateway 2

↓

Salvar transação

---

# Autor

Daniel de Abreu Oliveira