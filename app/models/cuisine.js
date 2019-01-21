import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CuisineSchema = new Schema({
  name: { type: String, required: true, unique: true },
  subtype: [ this ]
});

const Cuisine = mongoose.model("Cuisine", CuisineSchema);

module.exports = Cuisine;