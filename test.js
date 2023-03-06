const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['main_oop.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
