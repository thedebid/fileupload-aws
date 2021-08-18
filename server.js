const express = require("express");
const app = express();
const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv/config");
const upload = require('./upload');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',function(req,res){
res.send("Dfv");
});


app.post('/create',upload.single('img'),(req,res)=>{
  console.log(req.file);
  res.send("File Uploaded Successfully");
})


app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("Server is running at port " + process.env.PORT);
});



// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET,
//   sessionToken:process.env.AWS_SESSION_TOKEN
// });


// const uploadFile = (fileName) => {
//   // read content from the file
//   const fileContent = fs.readFileSync(fileName);

//   // setting up s3 upload parameters
//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: "cat.jpg", // file name you want to save as
//     Body: fileContent,
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function (err, data) {
//     if (err) {
//       throw err;
//     }
//     console.log(`File uploaded successfully. ${data.Location}`);
//   });
// };

// // Enter the file you want to upload here
// uploadFile("cat.jpg");
