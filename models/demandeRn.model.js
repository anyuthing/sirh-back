const mongoose = require("mongoose");
const DemandeRn = mongoose.model(
  "DemandeRn",
  new mongoose.Schema({
    username: String,
    cin: String,
    id: String,
    demande: String,
  })
);
module.exports = DemandeRn;
