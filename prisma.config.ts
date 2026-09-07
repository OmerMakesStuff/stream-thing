import { defineConfig } from 'prisma/config';

import 'dotenv/config';

const databaseUrl = process.env.DB_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  ...(databaseUrl && { datasource: { url: databaseUrl } }),
});
