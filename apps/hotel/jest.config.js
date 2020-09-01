module.exports = {
  name: 'hotel',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/hotel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
