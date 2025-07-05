import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const dbLink = process.env.DBLINK;
    if (!dbLink) {
      console.log("plz provide dB link");
      process.exit(1);
    }
    await mongoose.connect(dbLink);
    console.log(`db connection built successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbconnect;
