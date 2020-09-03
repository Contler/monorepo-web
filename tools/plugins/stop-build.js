module.exports = {
  onPreBuild: ({utils: {build}}) => {
    const currentProject = process.env.PROJECT_NAME;
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
  console.log(execSync('ls').toString());
  // const command = `nx affected:apps --plain --base=${fromHash} --head=${toHash}`
  const command = `nx affected:apps --plain --base=cf831f0a897ab08824643f6ea0505760851c2b4f --head=835b6efb12f7e71306bebd4b33176abc7abdf454`
  console.log(command)
  const output = execSync(command).toString().replace('\n', '')
  const apps = output.split(' ')
  console.log(apps);
  return apps.includes(project)
}
