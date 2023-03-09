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
// Initialize upload
const upload = multer({
  storage: storage
}).single('picture');

app.get("/",(req,res) => {
    res.type("text/html")
    res.sendFile(path.join(__dirname,"test.html"))
  })
// Route for uploading picture
app.post('/upload', async(req, res) => {
  await upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
    }
  });
  console.log("Uploaded")
  res.redirect('/');
});

app.get("/runPy", (req,res) => {
  // const fname = req.params.fname
  const pythonProcess = spawn('python', ['upscale_color.py']);
  let count = 0;
  console.log(count)
  console.log(extname)
  pythonProcess.stdout.on('data', (data) => {
    if (count == 0) {
      console.log(data.toString())
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