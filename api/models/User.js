import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    forename:{
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'Forename is required']
    },
    surname:{
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'Surname is required']
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'Country is required']
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'City is required']
    },
    phone: {
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'Phone is required']
    },
    password: {
      type: String,
      required: [function() { return this.isGoogleAccount === false; }, 'Password is required']
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isGoogleAccount: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);