import { model, Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    // relaciOn 1:N a User
    author: {
      //referencia a user
      type: Types.ObjectId,
      ref: "UserModel",
      require: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "TagModel",
      },
    ],
    deletedAt: {
        type: Date,
        default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("ArticleModel", ArticleSchema);
