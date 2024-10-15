# sails

To get started, copy and paste in your terminal:

```
git clone https://github.com/knarkzel/sails
cd sails/
bun i
echo "TURSO_DATABASE_URL=file:database.db" > .env
bun db:migrate
bun dev
```

## Migrations

After modifying `src/lib/schema.ts`, run:

```
bun db:generate
bun db:migrate
```
