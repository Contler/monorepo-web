module.exports = {
  onPreBuild: ({utils: {build}}) => {
    const currentProject = 'hotel';
    const projectChange = checkRunBuild(currentProject)
    if(!projectChange) {
      build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected by the latest changes`
      );
    }
  }
}

function checkRunBuild(project) {
  const execSync = require('child_process').execSync;
  const command = 'nx affected:apps --plain'
  const output = execSync(command).toString().replace('\n', '')
  const apps = output.split(' ')
  return apps.includes(project)
}
