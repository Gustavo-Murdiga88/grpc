import {defineConfig} from "prisma/config"

export default defineConfig({
  schema: "./prisma",
  migrations: {
    seed: "./prisma/seed.ts"
  }
})