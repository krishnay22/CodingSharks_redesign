// your-existing-backend/models/StudentWork.js
const mongoose = require("mongoose");

const studentWorkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to your User model
      required: [true, "Please associate this work with a user"],
    },
    date: {
      type: Date,
      required: [true, "Please add a completion date"],
    },
    url: {
      type: String,
      required: false,
      trim: true,
    },
    // imageUrl will now store the path to the locally saved image
    imageUrl: {
      type: String,
      required: false,
    },
    // REMOVED: cloudinaryId
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentWork", studentWorkSchema);
