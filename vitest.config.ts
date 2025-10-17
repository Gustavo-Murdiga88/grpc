import {defineConfig} from "vitest/config"
import paths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [paths()],
  test: {
    include: [
      "./src/**/*.test.ts", 
      "./src/**/*.spec.ts", 
      "./test/**/*.test.ts", 
      "./test/**/*.spec.ts"
    ],
    exclude: ["node_modules", "dist"], 
    globals: true,
    isolate: true,
  }
})