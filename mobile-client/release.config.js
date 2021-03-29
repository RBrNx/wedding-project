export default {
  branches: ['staging'],
  verifyConditions: [
    'semantic-release-expo',
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  generateNotes: ['@semantic-release/release-notes-generator'],
  prepare: [
    'semantic-release-expo',
    '@semantic-release/changelog',
    {
      path: '@semantic-release/git',
      assets: ['CHANGELOG.md', 'package.json', 'yarn.lock', 'app.json'],
    },
  ],
  publish: ['@semantic-release/github'],
  success: false,
  fail: false,
};
