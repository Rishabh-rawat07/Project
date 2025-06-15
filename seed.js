require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

// Disable password hashing in User model temporarily
User.schema.path("password").options.select = false;

const users = [
  {
    username: "admin",
    password: "admin123", // Stored in plaintext
    role: "admin",
  },
  {
    username: "user",
    password: "user123", // Stored in plaintext
    role: "user",
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Bypass hashing by updating directly
    await User.deleteMany({});
    await User.collection.insertMany(users); // Direct MongoDB insert

    console.log("⚠️  Users seeded with PLAINTEXT passwords (INSECURE)");
    console.log("Admin credentials: admin / admin123");
    console.log("User credentials: user / user123");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedUsers();
