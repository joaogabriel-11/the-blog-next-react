# Servidor

Comandos para iniciar o site do zero:

```sh
# Ter o Node instalado
# Instalar todos os pacotes
npm i
# Configurar o .env.local com DATABASE_URL apontando para um Postgres
npm run migrate
npm run seed # Seed e opcional

# Build do Next
npm run build
npm start # Apenas para teste
```

## Deploy na Vercel

Configure a variavel `DATABASE_URL` nas Environment Variables da Vercel usando
um banco PostgreSQL externo, como Vercel Postgres, Neon ou Supabase.

O comando `npm run build` ja executa `drizzle-kit migrate` antes do `next build`,
garantindo que a tabela `posts` exista antes da prerenderizacao da pagina `/`.
