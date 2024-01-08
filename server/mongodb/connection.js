const mongoose = require('mongoose');

const mongoDBConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB - Connected");
  } catch (error) {
    console.log("Error - MongoDB Connection " + error);
  }
};

module.exports = mongoDBConnect;
