const mongoose = require("mongoose");
const DemandeP = mongoose.model(
  "DemandeP",
  new mongoose.Schema({
    username: String,
    cin: String,
    id: String,
    demande: String,
    grade: String,
    sommeD: Number,
    PartitionP: Number,
  })
);
module.exports = DemandeP;
