Projeto Integrador MedObras - Corrigido

Para rodar o projeto:
1. Instale dependências:
   cd backend
   npm install

2. Configure o banco no arquivo .env (baseado no .env.example)

3. Rode as migrations e gere o client Prisma:
   npx prisma generate
   npx prisma migrate dev --name init

4. Inicie o servidor:
   npm run dev

O frontend está na pasta frontend (abra login.html com Live Server).
