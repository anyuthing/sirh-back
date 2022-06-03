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
    grade: String,
    salaire: Number,
    dateDeRecrutement: Date,
  })
);
module.exports = User;
