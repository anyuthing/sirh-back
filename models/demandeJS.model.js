const mongoose = require("mongoose");
const DemandeJs = mongoose.model(
  "DemandeJs",
  new mongoose.Schema({
    username: String,
    cin: String,
    id: String,
    demande: String,
    resultatFile: String,
    children: {
      type: Array,
      name: String,
      education: String,
    },
  })
);
module.exports = DemandeJs;
