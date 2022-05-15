const mongoose = require("mongoose");
const childs = mongoose.Schema(
  {
    name: { type: String },
    education: { type: String },
  },
  { default: false }
);
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    cin: String,
    position: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    children: {
      type: Array,

      name: String,
      education: String,
    },
  })
);
module.exports = User;
