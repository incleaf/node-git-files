'use strict';

const spawn = require('child_process').spawn;

const mappedOptions = {
  'modified': '--modified',
  'untracked': '--others',
};

// git ls-files -o -m --exclude-standard
// https://git-scm.com/docs/git-ls-files
function usgf(options, callback) {
  const args = ['ls-files', '--exclude-standard'];

  for (let option in options) {
    if (mappedOptions.hasOwnProperty(option) && mappedOptions[option].length) {
      args.push(mappedOptions[option]);
    }
  }

  let stdoutResult = [];
  let stderrResult = '';
  const command = spawn('git', args, {
    pwd: module.exports.cwd || __dirname,
  });

  command.stdout.on('data', (data) => {
    stdoutResult += data.toString();
    // console.log(`stdout: ${data}`);
  });

  command.stderr.on('data', (data) => {
    stderrResult += data.toString();
    // console.log(`stderr: ${data}`);
  });

  command.on('close', (code) => {
    if (code !== 0) {
      callback(new Error(stderrResult));
    } else {
      stdoutResult = stdoutResult.split('\n');
      if (stdoutResult.length > 1) {
        stdoutResult.pop(); // trim last index
      }
      callback(null, stdoutResult, stderrResult);
    }
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = usgf;
