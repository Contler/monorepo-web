module.exports = {
  onPreBuild: ({utils: {build}}) => {
    const currentProject = 'hotel';
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const projectChange = checkRunBuild(currentProject,  lastDeployedCommit, latestCommit)
    if(!projectChange) {
      build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected by the latest changes`
      );
    }
  }
}

function checkRunBuild(project, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const command = `nx affected:apps --plain --base=${fromHash} --head=${toHash}`
  const output = execSync(command).toString().replace('\n', '')
  console.log(output);
  const apps = output.split(' ')
  console.log(apps);
  return apps.includes(project)
}
