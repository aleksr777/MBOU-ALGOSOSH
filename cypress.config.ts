import 'tsconfig-paths/register'
import { defineConfig } from "cypress"

export default defineConfig( {
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents ( on, config ) {
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  viewportWidth: 1280,
  viewportHeight: 800,

  fileServerFolder: "./"
} )
