const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// sub document for Category title
const Category = new Schema({
  title: { type: String, required: true }
});

// sub document for Coordinates
const Coordinates = new Schema({
  latitude: { type: Number },
  longitude: { type: Number }
});

// sub document for location (address)
const Location = new Schema({
  address1: { type: String, required: true },
  address2: { type: String },
  address3: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  display_address: { type: String }
});

// main schema for places (via Yelp)
// refer to https://www.yelp.com/developers/documentation/v3/business for response body
const PlaceSchema = new Schema({
  yelpId: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String },
  url: { type: String },
  yelpRating: { type: Number },
  phone: { type: String },
  categories: [ Category ],
  coordinates: { Coordinates },
  location: { Location },
  rating: [{ type: Schema.Types.ObjectId, ref: "Rating" }]
});

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;