import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      first_name: {
        type: String,
        required: true,
        // minlength: 2,
        // maxLength: 50,
      },
      last_name: {
        type: String,
        required: true,
        // minlength: 2,
        // maxLength: 50,
      },
      biography: {
        type: String,
        maxLength: 500,
      },
      avatar_url: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
      },
      birth_date: {
        type: Date,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("UserModel", UserSchema);
