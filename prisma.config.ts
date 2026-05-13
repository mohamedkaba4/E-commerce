import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: 'postgresql://mohamed:password123@localhost:5432/ecommerce_store',
  },
});
