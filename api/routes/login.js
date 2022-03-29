const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", {
    firebaseAuth: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messegingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  });
});

module.exports = router;
