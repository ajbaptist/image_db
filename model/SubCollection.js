const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const SubCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

SubCollectionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("SubCollection", SubCollectionSchema);
