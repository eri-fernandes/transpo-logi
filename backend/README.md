# TranspoLogi

**TranspoLogi** é uma aplicação para gerenciar frotas de caminhões e entregas, desenvolvida com foco em escalabilidade, modularidade e facilidade de manutenção. Ela implementa as regras de negócio fornecidas, utilizando tecnologias modernas e uma arquitetura limpa (Clean Architecture)(Parcialmente).

---

## **Tecnologias Utilizadas**

- **Node.js**: Plataforma para o backend.
- **TypeScript**: Linguagem para maior segurança e produtividade no código.
- **Express**: Framework minimalista para criação de APIs REST.
- **Prisma ORM**: ORM moderno para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Jest**: Framework para testes unitários e de integração.
- **Docker**: Para rodar o banco de dados PostgreSQL em um contêiner.

---

## **Arquitetura**

O projeto foi desenvolvido seguindo o padrão **Clean Architecture** (ou pelo menos as camadas iniciais), dividindo o sistema em camadas para garantir que cada uma tenha responsabilidades bem definidas:

### Estrutura de Pastas:

```plaintext
src/
├── application/      # Casos de uso e interfaces para comunicação entre camadas
│   ├── dtos/         # Objetos de transferência de dados
│   ├── usecases/     # Implementação dos casos de uso
├── domain/           # Entidades de domínio e repositórios
│   ├── entities/     # Modelos de domínio
│   ├── repositories/ # Interfaces de repositórios
├── infrastructure/   # Implementação de repositórios e configuração do ORM
│   ├── database/     # Repositórios Prisma
│   ├── orm/          # Cliente Prisma
│   ├── in-memory/    # Repositórios em memória para testes
├── presentation/     # Controladores e rotas
│   ├── controllers/  # Lógica de entrada de dados
│   ├── routes/       # Definições das rotas
├── tests/            # Testes unitários e de integração
    ├── unit/         # Testes unitários
```

Essa estrutura organiza o projeto em camadas que isolam as responsabilidades:

1. **Domain (Domínio):** Define as entidades principais e regras de negócio centrais.
2. **Application (Aplicação):** Implementa os casos de uso e conecta o domínio às interfaces externas.
3. **Infrastructure (Infraestrutura):** Gerencia a persistência e acesso a dados.
4. **Presentation (Apresentação):** Exposição da API para clientes externos.

**Repositórios em Memória:**
Os repositórios em memória, utilizados para testes unitários e isolamento de lógica de negócio, estão localizados na pasta `infrastructure/in-memory/`. Eles simulam o comportamento dos repositórios reais sem depender do banco de dados.

---

## **Instalação e Configuração**

### **Requisitos**

- **Node.js** v22lts
- **npm**
- **Docker** (opcional, para rodar o PostgreSQL em um contêiner)
- **PostgreSQL** (se preferir rodar localmente)

### **Passos para Instalar**

1. Clone o repositório:

   ```bash
   git clone https://github.com/sua-organizacao/transpologi.git
   cd transpologi
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/transpologi"
   PORT=3000
   ```

---

## **Banco de Dados (PostgreSQL)**

### **Rodando com Docker**

Se você tiver o Docker instalado, pode rodar o PostgreSQL em um contêiner:

```bash
docker run --name transpologi-db -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=transpologi -p 5432:5432 -d postgres
```

### **Rodando Localmente**

Se preferir instalar o PostgreSQL localmente:

1. Baixe e instale o PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Crie o banco de dados:
   ```bash
   psql -U username
   CREATE DATABASE transpologi;
   ```

### **Rodando Migrations**

Após configurar o banco de dados, aplique as migrations para criar as tabelas necessárias:

```bash
npx prisma migrate dev --name init
```

---

## **Como Rodar o Projeto**

### **Ambiente de Desenvolvimento**

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
2. A API estará disponível em [http://localhost:3000](http://localhost:3000).

### **Ambiente de Produção**

1. Compile o código TypeScript:
   ```bash
   npm run build
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```

---

## **Testes**

### **Executando os Testes**

Para rodar os testes unitários e de integração:

```bash
npm test
```

### **Cobertura de Testes**

Gere um relatório de cobertura:

```bash
npm run test:coverage
```
