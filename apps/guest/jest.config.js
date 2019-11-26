module.exports = {
  name: 'guest',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/guest',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
