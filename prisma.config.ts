import 'dotenv/config';

import { defineConfig } from 'prisma/config';

const databaseUrl = process.env.DB_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  ...(databaseUrl && { datasource: { url: databaseUrl } }),
});
