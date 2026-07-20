import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const productionCsp = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'none'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'";
const developmentCsp = productionCsp
  .replace("style-src 'self'", "style-src 'self' 'unsafe-inline'")
  .replace("connect-src 'none'", "connect-src 'self' ws: wss:");

const developmentCspPlugin = {
  name: "development-csp",
  apply: "serve",
  transformIndexHtml: {
    order: "pre",
    handler: (html) => html.replace(productionCsp, developmentCsp),
  },
};

export default defineConfig(({ mode }) => ({
  plugins: [react(), developmentCspPlugin],
  base: mode === "artifact" ? "./" : "/",
  build: { outDir: mode === "artifact" ? "dist-artifact" : "dist" },
}));
