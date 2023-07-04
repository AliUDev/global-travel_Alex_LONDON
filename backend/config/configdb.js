const mongoose = require("mongoose");

const ConnectDb = async () => {
  await mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`MongoDBDB is connected`))
    .catch((err) => console.log(err.message));
};

module.exports = ConnectDb;
