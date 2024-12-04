import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGOURI}`,
      {
        dbName: "Email_verification",
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default ConnectDb;
