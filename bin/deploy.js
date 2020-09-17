const { execSync, spawn } = require('child_process');

const project = process.argv[2];

const respond = execSync('npm run affected:apps -- --plain').toString();
const projectsAffected = respond.split('\n')[4].split(' ');

if (projectsAffected.includes(project)) {
  const command = spawn('firebase', [
    'deploy',
    '--token',
    '"$FIREBASE_TOKEN"',
    '--project',
    '"$FIREBASE_PROJECT"',
    '--only',
    `hosting:${project}`,
  ]);
  command.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  command.on('close', () => console.log('deploy complete'));
} else {
  console.log(`${project} no deployed`);
}
