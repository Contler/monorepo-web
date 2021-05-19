module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'core',
};
