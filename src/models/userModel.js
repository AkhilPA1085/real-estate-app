import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email ID"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

let User;

if (mongoose.models.users) {
  User = mongoose.model("users");
} else {
  User = mongoose.model("users", userSchema);
}

export default User;
