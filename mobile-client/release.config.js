module.exports = {
  branches: ['staging'],
  verifyConditions: [
    'semantic-release-expo',
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
  generateNotes: ['@semantic-release/release-notes-generator'],
  prepare: [
    {
      path: 'semantic-release-expo',
      versions: {
        version: '${next.raw}',
        android: '${increment}',
        ios: '${next.raw}',
      },
    },
    '@semantic-release/changelog',
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      assets: ['CHANGELOG.md', 'package.json', 'yarn.lock', 'app.json'],
    },
  ],
  publish: ['@semantic-release/github'],
  success: false,
  fail: false,
};
