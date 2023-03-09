const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const app = express()
const multer = require('multer');

const pythonProcess = spawn('python', ['upscale_color.py']);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, "img")
  }
});
const upload = multer({ storage: storage });

app.get("/",(req,res) => {
  res.type("text/html")
  res.sendFile(path.join(__dirname,"test.html"))
})

app.post('/upload', upload.single('image'), function(req, res) {
  console.log('File uploaded successfully!')
  // res.redirect("http://localhost:5500/runPy")
  fetch('http://localhost:5500/upload', {
    method: "POST",
    mode: "no-cors"
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
})

app.get("/runPy", (req, file ,res) => {
  // const fname = req.params.fname
  let count = 0;
  try {
    pythonProcess.stdout.on('data', (data) => {
      if (count == 0) {
        res.send(data.toString());
      }
      count++
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    })
    pythonProcess.stdin.write("uploads/img.png" + "\n")
  } catch {}
})

app.listen(5500, () => console.log('Server running on port 5500'));
