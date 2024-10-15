# sails

To get started, run following:

```
bun i
bun db:migrate
bun dev
```

## Adding new migrations

After modifying `src/lib/schema.ts`, run:

```
bun db:generate
bun db:migrate
```
