const { execSync, spawn } = require('child_process');

const project = process.argv[2];

console.log('checking....', project);

const respond = execSync(
  'npm run affected:apps -- --base="$BEFORE_COMMIT" --head="$AFTHER_COMMIT" --plain ',
).toString();

console.log(respond);

// const projectsAffected = respond.split('\n')[4].split(' ');
//
// if (projectsAffected.includes(project)) {
//   const command = spawn('firebase', [
//     'deploy',
//     '--token',
//     '"$FIREBASE_TOKEN"',
//     '--project',
//     '"$FIREBASE_PROJECT"',
//     '--only',
//     `hosting:${project}`,
//   ]);
//   command.stdout.on('data', (data) => {
//     console.log(data.toString());
//   });
//   command.on('close', () => console.log('deploy complete'));
// } else {
//   console.log(`${project} no deployed`);
// }
