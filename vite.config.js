import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        guideprofile: resolve(__dirname, "src/guide-profile.html"),
        gallery: resolve(__dirname, "src/gallery.html"),
        contact: resolve(__dirname, "src/contact.html"),
        service: resolve(__dirname, "src/service.html"),
      },
    },
  },
  server: {
    open: true,
    port: 5173,
  },
});
