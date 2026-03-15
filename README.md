<body>

<h1>🟢 Desafio BeTalentTech – Sistema de Pagamentos Multi-Gateway</h1>

<p>
  <img class="badge" src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js">
  <img class="badge" src="https://img.shields.io/badge/MySQL-8+-blue" alt="MySQL">
  <img class="badge" src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange" alt="Status">
</p>

<hr>

<h2>🔹 Descrição do Projeto</h2>
<p>Sistema de <strong>pagamentos multi-gateway</strong> desenvolvido com:</p>
<ul>
  <li><strong>Node.js</strong> + <strong>Express</strong></li>
  <li><strong>MySQL</strong> + <strong>Knex</strong></li>
  <li><strong>VineJS</strong> para validação de dados</li>
</ul>

<p>Funcionalidades:</p>
<ul>
  <li>Realizar transações de clientes.</li>
  <li>Tentar os gateways ativos seguindo a <strong>ordem de prioridade</strong>.</li>
  <li>Salvar apenas os <strong>últimos 4 dígitos do cartão</strong> por segurança.</li>
  <li>Facilitar a adição de novos gateways de forma <strong>modular</strong>.</li>
</ul>

<hr>

<h2>📁 Estrutura do Projeto</h2>
<pre>
desafioBeTalentTech/
├─ src/
│  ├─ controllers/
│  ├─ database/
│  ├─ middlewares/
│  ├─ mocks/
│  │  ├─ gateway1.js
│  │  └─ gateway2.js
│  ├─ routes/
│  ├─ validators/
│  └─ server.js
├─ tests/
├─ package.json
└─ README.md
</pre>

<hr>

<h2>🗄 Estrutura do Banco de Dados</h2>
<table>
  <tr>
    <th>Tabela</th>
    <th>Colunas</th>
  </tr>
  <tr><td><strong>users</strong></td><td>id, email, password, role</td></tr>
  <tr><td><strong>gateways</strong></td><td>id, name, is_active, priority</td></tr>
  <tr><td><strong>clients</strong></td><td>id, name, email</td></tr>
  <tr><td><strong>products</strong></td><td>id, name, amount</td></tr>
  <tr><td><strong>transactions</strong></td><td>id, client, gateway, external_id, status, amount, card_last_numbers</td></tr>
  <tr><td><strong>transaction_products</strong> (Nível 2)</td><td>transaction_id, product_id, quantity</td></tr>
</table>

<hr>

<h2>🚀 Rotas do Sistema</h2>
<h3>Rotas Públicas</h3>
<ul>
  <li><code>POST /api/login</code> – Realizar login</li>
  <li><code>POST /api/transacoes</code> – Criar compra (Gateway 1 ou 2)</li>
</ul>

<h3>Rotas Privadas (pendente Nível 1)</h3>
<ul>
  <li>CRUD de usuários com roles</li>
  <li>CRUD de produtos com roles</li>
  <li>Ativar/desativar gateways</li>
  <li>Alterar prioridade de gateways</li>
  <li>Listar clientes e detalhes</li>
  <li>Listar transações e detalhes</li>
  <li>Reembolso de transações</li>
</ul>

<hr>

<h2>⚡ Gateways Mockados</h2>

<h3>Gateway 1 – Porta 3001</h3>
<pre><code>{
  "amount": 1000,
  "name": "tester",
  "email": "tester@email.com",
  "cardNumber": "5569000000006063",
  "cvv": "010"
}</code></pre>

<h3>Gateway 2 – Porta 3002</h3>
<pre><code>{
  "valor": 1000,
  "nome": "tester",
  "email": "tester@email.com",
  "numeroCartao": "5569000000006063",
  "cvv": "010"
}</code></pre>

<p>Ambos sempre aprovam qualquer transação.</p>

<hr>

<h2>⚙️ Instalação e Execução</h2>
<pre><code># Clonar repositório
git clone &lt;URL_DO_REPOSITORIO&gt;
cd desafioBeTalentTech

# Instalar dependências
npm install

# Criar banco de dados
CREATE DATABASE desafio_betalent;

# Rodar servidor
npm run dev
</code></pre>

<h3>Testando os Gateways</h3>
<pre><code># Gateway 1
node src/mocks/gateway1.js

# Gateway 2
node src/mocks/gateway2.js
</code></pre>

<hr>

<h2>📝 Fluxo de Transações</h2>
<ol>
  <li>Usuário envia requisição de compra.</li>
  <li>API tenta processar no Gateway 1 (porta 3001).</li>
  <li>Se Gateway 1 falhar, tenta Gateway 2 (porta 3002).</li>
  <li>Se algum gateway retornar sucesso:
    <ul>
      <li>Salva a transação no banco com últimos 4 dígitos do cartão.</li>
      <li>Retorna mensagem de sucesso.</li>
    </ul>
  </li>
  <li>Caso todos os gateways falhem:
    <ul>
      <li>Retorna mensagem de erro.</li>
    </ul>
  </li>
</ol>

<hr>

<h2>🔄 Reembolso de Transações</h2>
<p>Endpoint: <code>POST /api/transacoes/reembolso/:id</code></p>
<ul>
  <li>Envia payload correto para o gateway que processou a transação.</li>
  <li>Atualiza status no banco.</li>
  <li>Apenas usuários com roles apropriadas poderão solicitar reembolso (pendente Nível 1).</li>
</ul>

<hr>

<h2>⚠️ Dificuldades Encontradas</h2>
<ul>
  <li>Campos diferentes entre gateways (amount vs valor, cardNumber vs numeroCartao).</li>
  <li>Número do cartão muito longo → salvo apenas os últimos 4 dígitos.</li>
  <li>Erros de módulos e imports (axios, bcryptjs, @vinejs/vine).</li>
  <li>Rotas undefined → controllers ou rotas não exportadas corretamente.</li>
  <li>Reembolso inicial → payload e identificação de gateway precisavam ajuste.</li>
</ul>

<hr>

<h2>✅ Funcionalidades Implementadas</h2>
<ul>
  <li>Criação de transações com múltiplos gateways por prioridade.</li>
  <li>Salva transações com últimos 4 dígitos do cartão.</li>
  <li>Gateways mockados aceitam qualquer valor.</li>
  <li>Endpoint de listagem de transações.</li>
</ul>

<h2>⚡ Funcionalidades Pendentes</h2>
<ul>
  <li>CRUD completo de usuários e produtos com roles.</li>
  <li>Ativação/desativação e alteração de prioridade de gateways via API.</li>
  <li>Listagem detalhada de clientes e todas suas compras.</li>
  <li>Endpoint de reembolso completo.</li>
  <li>Testes automatizados (TDD).</li>
  <li>Docker Compose com MySQL, aplicação e gateways mockados.</li>
</ul>

<h2>📎 Documentação de Testes</h2>
<p>Disponível no Postman: <a href="https://documenter.getpostman.com/view/52983232/2sBXigMYhM" target="_blank">Clique aqui</a></p>

</body>
</html>
