require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Retrieve MongoDB connection URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // fetchFirebaseData();
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // process.exit(1); // Exit process with failure
  }
};

// async function fetchFirebaseData() {
//   try {
//     const snapshot = await admin
//       .database()
//       .ref("Admin/trending_meme")
//       .once("value");
//     const firebaseData = snapshot.val();

//     if (firebaseData) {
//       const dataArray = Object.values(firebaseData).filter(
//         (item) => Object.keys(item).length > 2
//       );

//       insertDataIntoMongoDB(dataArray);
//     } else {
//       console.log("No data found in Firebase Realtime Database");
//       return [];
//     }
//   } catch (error) {
//     console.error(
//       "Error fetching data from Firebase Realtime Database:",
//       error
//     );
//     return [];
//   }
// }

// async function insertDataIntoMongoDB(data) {
//   try {
//     const convertedData = data.map((item) => ({
//       hashColor: item.blurHash,
//       height: item.hieght,
//       externalId: item.id,
//       imageUrl: item.image,
//       width: item.width,
//     }));
//     await TrendingMeme.insertMany(convertedData);
//     console.log("Data inserted into MongoDB");
//   } catch (error) {
//     console.error("Error inserting data into MongoDB:", error);
//   }
// }

module.exports = connectDB;
