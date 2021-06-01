module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/mobile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'mobile',
};
