import { defineConfig } from "cypress"

export default defineConfig( {
  e2e: {
    setupNodeEvents ( on, config ) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  viewportWidth: 1920, // Ширина вьюпорта
  viewportHeight: 1080, // Высота вьюпорта
} )
