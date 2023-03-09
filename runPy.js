const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
let extname = null
// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    cb(null, "test" + path.extname(file.originalname));
    extname = path.extname(file.originalname)
  }
});
const pythonProcess = spawn('python', ['upscale_color.py']);
// Initialize upload
const upload = multer({
  storage: storage
}).single('picture');

app.get("/",(req,res) => {
    res.type("text/html")
    res.sendFile(path.join(__dirname,"test.html"))
  })
// Route for uploading picture
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
      console.log('Picture uploaded!');
      res.redirect("http://localhost:5500/runPy")
    }
  });
});

app.get("/runPy", (req,res) => {
  // const fname = req.params.fname
  let count = 0;
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
  pythonProcess.stdin.write("uploads/test" + extname + "\n")
})

// Start server
app.listen(5500, () => {
  console.log('Server started on port 5500');
});