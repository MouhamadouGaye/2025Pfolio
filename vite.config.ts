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

const FREE_MODELS = [
  "qwen/qwen3.6-plus:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "openai/gpt-oss-120b:free",
];

function chatApiDevPlugin(apiKey: string): Plugin {
  return {
    name: "chat-api-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          try {
            const { messages } = JSON.parse(body || "{}");
            if (!Array.isArray(messages)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "messages[] requis" }));
              return;
            }

            let lastError = "Tous les modèles sont indisponibles";
            for (const model of FREE_MODELS) {
              try {
                const r = await fetch(
                  "https://openrouter.ai/api/v1/chat/completions",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      "Content-Type": "application/json",
                      "HTTP-Referer": `http://${req.headers.host}`,
                      "X-Title": "MGaye AI",
                    },
                    body: JSON.stringify({
                      model,
                      messages,
                      max_tokens: 1500,
                      temperature: 0.7,
                    }),
                  },
                );

                if (r.status === 429) continue;
                if (!r.ok) {
                  lastError = `OpenRouter ${r.status}`;
                  continue;
                }

                const data = await r.json();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return;
              } catch (e) {
                lastError = e instanceof Error ? e.message : "Erreur";
              }
            }

            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: lastError }));
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
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), chatApiDevPlugin(env.OPENROUTER_KEY ?? "")],
    build: { sourcemap: false },
    optimizeDeps: { include: ["lucide-react"] },
  };
});
