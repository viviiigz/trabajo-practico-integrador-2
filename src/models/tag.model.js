import { model, Schema, Types } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
    id:false //para desactivar el id q muestra el virtual
  }
);

// Esto permite usar TagModel.findById(id).populate('articles')
TagSchema.virtual('articles', {
  ref: 'ArticleModel', 
  localField: '_id',   
  foreignField: 'tags', 
  justOne: false      // indica que puede haber muchos artículos asociados
});
export default model("TagModel", TagSchema);
