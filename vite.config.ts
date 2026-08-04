import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

// export default {
//   build: {
//     sourcemap: false,
//   },
//   optimizeDeps: {
//     include: ["lucide-react"], // Force pre-bundling
//   },
// };
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'], // don’t pre-bundle lucide-react
//   },
//   server: {
//     watch: {
//       // use polling to reduce open file handles
//       usePolling: true,
//       interval: 100,
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  server: {
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["lucide-react"], // Force pre-bundling
  },
});
