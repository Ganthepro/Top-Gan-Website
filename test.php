<!DOCTYPE html>
<html>
  <head>
    <title>Drag-and-Drop File Uploader</title>
    <style>
      #drop-zone {
        border: 2px dashed gray;
        padding: 50px;
        text-align: center;
        font-size: 1.5em;
      }
      #drop-zone.hover {
        background-color: lightgray;
      }
      input[type="file"] {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="drop-zone">Drop files here</div>
    <input type="file" id="file-input" multiple>
    <br><br>
    <img id="uploaded-image" style="max-width: 300px;">
    <script>
      const dropZone = document.getElementById('drop-zone');
      const fileInput = document.getElementById('file-input');
      const uploadedImage = document.getElementById('uploaded-image');

      function handleDrop(e) {
        e.preventDefault();
        dropZone.classList.remove('hover');

        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          uploadFile(files[i]);
        }
      }

      function handleDragOver(e) {
        e.preventDefault();
        dropZone.classList.add('hover');
      }

      function handleDragLeave(e) {
        e.preventDefault();
        dropZone.classList.remove('hover');
      }

      function handleFileSelect(e) {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          uploadFile(files[i]);
        }
      }

    function uploadFile(file) {
    //     const xhr = new XMLHttpRequest();
    //     const formData = new FormData();

    //     xhr.open('POST', '/upload', true);

    //     xhr.onload = function() {
    //       if (xhr.status === 200) {
    //         console.log('Upload successful');
    //         const imageURL = URL.createObjectURL(file);
    //         uploadedImage.setAttribute('src', imageURL);
    //         const { spawn } = require('child_process');
    //         const pythonProcess = spawn('python', ['main_oop.py']);
    //         pythonProcess.stdout.on('data', (data) => {
    //           console.log(`stdout: ${data}`);
    //         });
    //         pythonProcess.stderr.on('data', (data) => {
    //           console.error(`stderr: ${data}`);
    //         });
    //         pythonProcess.on('close', (code) => {
    //           console.log(`child process exited with code ${code}`);
    //         });
    //       } else {
    //         console.error('Upload failed');
    //       }
    //     };

    //     xhr.onerror = function() {
    //       console.error('Upload failed');
    //     };

    //     formData.append('file', file);
    //     xhr.send(formData);
    //   }

      dropZone.addEventListener('drop', handleDrop);
      dropZone.addEventListener('dragover', handleDragOver);
      dropZone.addEventListener('dragleave', handleDragLeave);
      fileInput.addEventListener('change', handleFileSelect);
    </script>
  </body>
</html>
