const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const app = express()

const pythonProcess = spawn('python', ['upscale_color.py']);

app.get("/",(req,res) => {
  res.type("text/html")
  res.sendFile(path.join(__dirname,"test.html"))
})

app.get("/runPy", (req, res) => {
  // const fname = req.params.fname
  let output
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    output = data
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    output = data
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  pythonProcess.stdin.write("1.png" + "\n")
  res.send(output)
})

app.listen(5500, () => console.log('Server running on port 5500'));
