module.exports = {
  '*.{js,jsx,ts,tsx}': () => ['turbo lint:fix', 'turbo lint:type'],
  '!(*.{js,jsx,ts,tsx})': 'prettier --ignore-unknown --write',
  '*.md': 'markdownlint-cli2'
}
