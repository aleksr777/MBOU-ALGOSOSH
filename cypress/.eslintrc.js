module.exports = {
  env: {
    browser: true,
    node: true,
    'cypress/globals': true
  },
  extends: [
    'plugin:cypress/recommended'
  ],
  plugins: [
    'cypress'
  ],
  rules: {
    // Здесь можно добавить или переопределить правила ESLint
  }
}
