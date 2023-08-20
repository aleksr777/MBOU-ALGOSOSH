import 'tsconfig-paths/register'
import { defineConfig } from "cypress"

export default defineConfig( {
  e2e: {
    setupNodeEvents ( on, config ) {
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  viewportWidth: 1920,
  viewportHeight: 1080,

  fileServerFolder: "./"
} )
