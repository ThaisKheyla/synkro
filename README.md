

# SYNKRO - Sistema de Monitoramento Proativo de Mainframes

SYNKRO é um projeto acadêmico desenvolvido como parte da disciplina de **Pesquisa e Inovação I**, no curso de **Ciência da Computação** da **SPTech School**.
O sistema tem como objetivo **monitorar recursos críticos de mainframes (CPU, memória e disco)**, oferecendo uma interface organizada e responsiva para **análise e acompanhamento de desempenho em tempo real**.

---

## Objetivo do Projeto

>>[!INFO]
> O **SYNKRO** busca aprimorar o gerenciamento de recursos de infraestrutura em ambientes **mainframe on-premise**, reduzindo falhas e tempo de resposta operacional.
> O sistema tem como propósito:
>
> * Fornecer **monitoramento contínuo** de CPU, memória e disco (DASD);
> * Emitir **alertas automáticos** em situações de uso crítico;
> * Disponibilizar **dashboards web** intuitivos e acessíveis;
> * Armazenar dados históricos para **análise de desempenho**;
> * Apoiar a **tomada de decisão proativa** na gestão de TI.

---

## Funcionalidades

>> [!INFO]
> O projeto contempla as seguintes funcionalidades:
>
> * Dashboard em tempo real com métricas de CPU, memória e disco;
> * Sistema de login e cadastro de usuários;
> * Alertas visuais para uso excessivo de recursos;
> * Armazenamento de histórico de medições em banco de dados;
> * Backend de monitoramento com **Python (psutil)**;
> * Integração com banco de dados **MySQL**;
> * Design web responsivo utilizando **HTML5, CSS3 e JavaScript**.

---

## Tecnologias Utilizadas

>> [!NOTE]
>
> * **HTML5** → Estrutura do front-end.
> * **CSS3** → Estilização e layout responsivo.
> * **JavaScript (ES6+)** → Interatividade e atualização de dados em tempo real.
> * **Python (psutil)** → Coleta de métricas de hardware.
> * **MySQL** → Banco de dados relacional.
> * **Node.js** → Backend e API REST.
> * **dotenv** → Configuração de variáveis de ambiente.

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
https://github.com/ThaisKheyla/synkro.git
cd synkro
code .
```

### 2. Instalar dependências
#### Se o backend for em Node.js:

```bash
npm install
```

## 3. Configurar ambiente

> [!IMPORTANT]
>
> Crie um arquivo `.env` na raiz do projeto com as credenciais do banco:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=synkro
PORT=3000
```
---

### 4. Criar tabelas no banco

Execute o script localizado em:

```
/src/database/script-tabelas.sql
ou copie e cole no seu MySQL e execute
```

### 5. Executar o servidor

#### Python:

```bash
python app.py
```

#### Node.js:

```bash
npm start
```

---

## Estrutura do Projeto

```plaintext
SYNKRO/
├── public/              # Arquivos estáticos (HTML, CSS, JS)
├── src/
│   ├── database/        # Scripts e configuração do banco de dados
│   ├── controllers/     # Lógica de monitoramento e alertas
│   ├── models/          # Modelos de dados e métricas
│   └── routes/          # Definição das rotas da aplicação
├── app.py / app.js      # Arquivo principal do servidor
├── requirements.txt / package.json
└── README.md            # Documentação do projeto
```

---

## Próximos Passos

> [!IMPORTANT]
>
> * Implementar histórico visual de uso de CPU, memória e disco;
> * Adicionar painel administrativo com controle de acessos;
> * Criar relatórios automatizados e exportação de dados;
> * Melhorar layout e experiência do usuário (UX/UI);
> * Ampliar suporte para notificações via e-mail ou SMS.

---

## Sobre o Projeto

O **SYNKRO** foi concebido como uma ferramenta de **monitoramento inteligente para ambientes críticos**, reduzindo a necessidade de inspeção manual e aumentando a confiabilidade operacional.
O sistema representa uma base sólida para futuras expansões voltadas à **análise preditiva e automação de alertas** em infraestrutura corporativa.

---

## Créditos

**Curso:** Ciência da Computação
**Instituição:** SPTech School
**Disciplina:** Pesquisa e Inovação I

> [!NOTE]
> **Integrantes do grupo:**
>
> * Felipe Hideki Inoue de Souza 
> * Guilherme Aoki Eguchi
> * Kheyla Quispe Paucara
> * Lucas Hideo Kawakami
> * Bianca Lopes Ortega
> * Igor Cardoso Trindade

---

## Licença

> [!WARNING]
> Este projeto é de uso **educacional** e sem fins comerciais.
> Todos os direitos reservados aos autores e à instituição SPTech School.


