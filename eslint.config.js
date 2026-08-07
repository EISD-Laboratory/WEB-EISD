const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')

module.exports = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
  ...nextCoreWebVitals,
]
