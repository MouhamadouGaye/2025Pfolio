// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/

// // export default {
// //   build: {
// //     sourcemap: false,
// //   },
// //   optimizeDeps: {
// //     include: ["lucide-react"], // Force pre-bundling
// //   },
// // };
// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// // export default defineConfig({
// //   plugins: [react()],
// //   optimizeDeps: {
// //     exclude: ['lucide-react'], // don’t pre-bundle lucide-react
// //   },
// //   server: {
// //     watch: {
// //       // use polling to reduce open file handles
// //       usePolling: true,
// //       interval: 100,
// //     },
// //   },
// // });

// // // export default defineConfig({
// // //   plugins: [react()],
// // //   build: {
// // //     sourcemap: false,
// // //   },
// // //   server: {
// // //     sourcemap: false,
// // //   },
// // //   optimizeDeps: {
// // //     include: ["lucide-react"], // Force pre-bundling
// // //   },
// // // });
// // import { defineConfig, loadEnv } from "vite";
// // import react from "@vitejs/plugin-react";

// // export default defineConfig(({ mode }) => {
// //   const env = loadEnv(mode, process.cwd(), "");
// //   return {
// //     plugins: [react()],
// //     define: {
// //       __OPENROUTER_KEY__: JSON.stringify(env.VITE_OPENROUTER_KEY ?? ""),
// //     },
// //   };
// // });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: false,
//   },
//   server: {
//     sourcemap: false,
//   },
//   optimizeDeps: {
//     include: ["lucide-react"],
//   },
// });
// vite.config.ts
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { handleChatRequest } from "./api/_handler";

function chatApiDevPlugin(): Plugin {
  return {
    name: "chat-api-dev",
    apply: "serve", // uniquement en mode dev
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body || "{}");
            const origin = `http://${req.headers.host ?? "localhost:5173"}`;
            const result = await handleChatRequest(parsed, origin);

            res.statusCode = result.status;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result.data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : "Erreur serveur",
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // ⚠️ Charge TOUTES les variables (pas seulement VITE_*) pour le middleware
  const env = loadEnv(mode, process.cwd(), "");

  // Expose OPENROUTER_KEY au middleware Node (jamais au client)
  if (env.OPENROUTER_KEY) {
    process.env.OPENROUTER_KEY = env.OPENROUTER_KEY;
  }

  return {
    plugins: [react(), chatApiDevPlugin()],
    build: { sourcemap: false },
    optimizeDeps: { include: ["lucide-react"] },
  };
});
