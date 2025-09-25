import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Types.ObjectId,
            ref: "UserModel", 
            required: true
        },

        article: {
            type: Types.ObjectId,
            ref: "ArticleModel",
            required: true
        },
    },
    { 
        timestamps: true,
        versionKey: false,
    }
);

export default model("CommentModel", CommentSchema);