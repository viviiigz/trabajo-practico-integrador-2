import {model, Schema, Types } from "mongoose";

const userSchema = new Schema({

    username:{
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profile: {

        first_name:{
            type: String,
            required:true,
            minlength:2,
            kMaxLength:50
        }, 
         last_name: {
            type: String,
            required: true,
            minlength:2,
            kMaxLength:50
         },
          biography: {
            type: String,
            kMaxLength: 500
          },
          avatar_url:{
            type: String,
            match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
          }, 
           birth_date: {
            type:Date,
           }, 
    },
 }, {
        timestamps: true,
        versionKey: false
    }   
);

export default model("UserModel", userSchema)


