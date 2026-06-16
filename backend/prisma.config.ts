import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://styleforge:styleforge_secret@localhost:5432/styleforge_db',
  },
});
