const multer = require("multer");
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const BUCKET_NAME = "mytestbucket-09";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  sessionToken:process.env.AWS_SESSION_TOKEN
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}
const upload =  multer({
    fileFilter,
    storage: multerS3({
        // acl: 'public-read',
        s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
})

module.exports = upload;