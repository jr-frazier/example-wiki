import "dotenv/config";
import {defineConfig} from 'drizzle-kit';
import assert from "node:assert";

assert(process.env.DATABASE_URL, 'DATABASE_URL is not set');

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    schemaFilter: ["public"], // 👈 include neon_auth schema
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});