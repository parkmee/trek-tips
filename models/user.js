const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: include variables needed for Auth0
// TODO: add pre-validation for capitalization
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String },
  cuisines: [{ type: Schema.Types.ObjectId, ref: "Cuisine" }],
  preferences: [{ type: Schema.Types.ObjectId, ref: "Preference" }],
  history: [{ type: Schema.Types.ObjectId, ref: "History" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;