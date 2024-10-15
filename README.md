# sails

To get started, run following:

```
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
