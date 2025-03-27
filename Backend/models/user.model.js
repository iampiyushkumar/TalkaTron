import mongoose from 'mongoose';

// Define the User schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // The name is required
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Automatically convert the email to lowercase
    },
    password: {
      type: String,
      required: true, // The password is required
    },
  },
  {
    timestamps: true, // Automatically create fields for createdAt and updatedAt
  }
);

// ✅ Removed `confirmpassword` field from schema since it is only needed for validation in the signup process

const User = mongoose.model('User', userSchema);
export default User;
