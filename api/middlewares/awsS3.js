const AWS = require("aws-sdk");

const { ERROR_MESSAGE } = require("../../config/constants");
const Video = require("../../models/Video");

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_BUCKET_NAME;

const deleteS3Video = async (req, res, next) => {
  const { videoId } = req.params;

  const callback = (error, data) => {
    if (data) {
      next();
      return;
    }

    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  };

  try {
    const { videoURL, gifURL } = await Video.findById(videoId).lean().exec();

    const videoKey = videoURL.split("/").pop();
    const gifKey = gifURL.split("/").pop();

    const targetObjects = [{ Key: videoKey }, { Key: gifKey }];

    await s3.deleteObjects(
      {
        Bucket: bucketName,
        Delete: { Objects: targetObjects },
      },
      (error, data) => callback(error, data)
    );
  } catch (error) {
    res.json({
      error: {
        message: ERROR_MESSAGE.SERVER_ERROR,
        code: 500,
      },
    });
  }
};

exports.deleteS3Video = deleteS3Video;
