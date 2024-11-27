import { defineConfig } from "astro/config";

// Astro integration imports
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import { VitePWA } from "vite-plugin-pwa";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind({
    configFile: "./tailwind.config.js"
  }), sitemap(), compress(), react()],
  vite: {
    plugins: [VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Schichtplan PWA",
        short_name: "Schichtplan",
        description: "Eine Progessive Web App (PWA) die einen 4 x 12h Schichtplan zeigt.",
        theme_color: "#16A34A",
        // primary color.
        background_color: "#ffffff",
        // background color.
        display: "minimal-ui",
        icons: [{
          src: "/favicons/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        }, {
          src: "/favicons/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }, {
          src: "/favicons/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }]
      },
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes an errant console.log message from showing up.
        navigateFallback: null
      }
    })]
  }
});