import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI.replace("<username>", process.env.DB_USER).replace(
        "<password>",
        process.env.DB_PASS
      )
    );
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log(`Error connecting to the database: ${err.message}`);
    process.exit(1);
  }
};
