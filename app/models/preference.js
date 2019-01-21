const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  subtype: [ this ]
});

const Preference = mongoose.model("Preference", PreferenceSchema);

module.exports = Preference;