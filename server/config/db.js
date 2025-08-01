const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo Db Connected Successfully ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDb;
