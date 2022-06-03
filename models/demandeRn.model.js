const mongoose = require("mongoose");
const DemandeRn = mongoose.model(
  "DemandeRn",
  new mongoose.Schema({
    username: String,
    cin: String,
    id: String,
    demande: String,
    children: {
      type: Array,

      name: String,
      education: String,
    },
    resultatFile: String,
  })
);
module.exports = DemandeRn;
