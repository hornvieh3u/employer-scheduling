const path = require("path");
const cloudinaryUpload = require("cloudinary");
const cloudinary = cloudinaryUpload.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function uploader(file) {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
      if (err) {
        console.log("Err", err);
      }
      resolve(result);
    });
  });
}

const anyUploader = (file) => {
  return new Promise(function (resolve, reject) {
    let __dirname = path.resolve(path.dirname(""));
    const filename =
      Date.now() + "." + String(req.files.file.name).split(".")[1];
    uploadPath = __dirname + "/files/" + filename;

    file.mv(uploadPath, (err) => {
      console.log(err);
      if (err) {
        reject(err);
      }

      resolve({});
      // cloudinary.uploader.upload(
      //   file.tempFilePath,
      //   { resource_type: 'auto' },
      //   function (err, result) {
      //     if (err) {
      //       reject('Err', err);
      //     }
      //     resolve(result);
      //   }
      // );
    });
  });
};

const imageUpload = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.files.file) {
        // throw new Error('Image not represented');
        resolve({ url: "file not found" });
      }
      const file = req.files.file;
      var uploadResult = await uploader(file);
      if (!uploadResult) {
        reject({
          url: uploadResult,
        });
      }
      resolve({
        url: uploadResult.url,
      });
    } catch (error) {
      reject({
        url: error,
      });
    }
  });
};

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.S3_SECRET,
  accessKeyId: process.env.S3_ACCESSKEY,
});

const BUCKET = process.env.S3_BUCKET;
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports = { imageUpload, anyUploader, upload };
