# TranspoLogi Frontend

## **TranspoLogi** é uma aplicação de gerenciamento de frotas e entregas.

## **Tecnologias Utilizadas**

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta para build e desenvolvimento rápido.
- **TypeScript**: Superset do JavaScript para maior segurança e produtividade.
- **Tailwind CSS**: Framework de estilização utilitária para design moderno e responsivo.
- **ShadCN**: Componentes estilizados prontos para acelerar o desenvolvimento.

---

## **Requisitos**

- **Node.js** v22lts
- **npm** (gerenciador de pacotes).

---

## **Instalação e Configuração**

### **1. Clone o Repositório**

```bash
git clone https://github.com/eri-fernandes/transpo-logi
cd frontend
```

### **2. Instale as Dependências**

```bash
npm install
```

### **3. Configure as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_BASE_URL=http://localhost:3333/api
```

- Substitua o valor de `VITE_API_BASE_URL` pela URL da API backend.

---

## **Como Rodar o Projeto**

### **Ambiente de Desenvolvimento**

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
2. Acesse o frontend no navegador em [http://localhost:5173](http://localhost:5173).

### **Build para Produção**

1. Gere os arquivos otimizados para produção:
   ```bash
   npm run build
   ```
2. Sirva os arquivos com um servidor HTTP:
   ```bash
   npm run preview
   ```

---

## **Credenciais de Login**

Para acessar a aplicação, utilize as seguintes credenciais:

- **Email:** `admin@transpologi.com`
- **Senha:** `123456`

---

## **Scripts Disponíveis**

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run lint`: Executa o linting do código.

---

## **Estrutura do Projeto**

```plaintext
src/
├── api/          # API Routes e Clientes HTTP
├── assets/       # Arquivos estáticos (imagens, fontes, etc.)
├── components/   # Componentes reutilizáveis
├── hooks/        # Hooks customizados
├── layouts/      # Contém layouts gerais para a estrutura da aplicação
├── lib/          # Configurações de bibliotecas externas
├── pages/        # Páginas principais da aplicação
├── types/        # Tipos da aplicação, como interfaces e enums

```

---

## **Estilização**

- O projeto utiliza **Tailwind CSS** para estilização rápida e responsiva.
- Componentes prontos do **ShadCN** foram utilizados para formulários, botões e tabelas.
- Configuração adicional do Tailwind está disponível no arquivo `tailwind.config.js`.

---

## **Contribuindo**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch com sua feature ou correção: `git checkout -b minha-feature`.
3. Faça o commit das mudanças: `git commit -m 'Minha nova feature'`.
4. Envie para a branch principal: `git push origin minha-feature`.
5. Abra um pull request.

---

## **Licença**

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## **Contato**

Para dúvidas ou sugestões, entre em contato em [seu-email@dominio.com](mailto:seu-email@dominio.com).
