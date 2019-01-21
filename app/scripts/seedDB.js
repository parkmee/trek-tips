import mongoose from "mongoose";
import db from "../models";

// connect to mongoose database
mongoose.connect(
  process.env.MONGODB_URI || 
  "mongodb://localhost/trek-tips"
);

// seed data for Cuisine collection
const cuisineSeed = [
  { name: "Afghan" },
  { 
    name: "African",
    subtype: [
      { name: "Senegalese" },
      { name: "South African" }
    ]    
  },
  { name: "American (New)" },
  { name: "American (traditional)" },
  { name: "Arabian" },
  { name: "Argentine" },
  { name: "Armenian" },
  { name: "Asian Fusion" },
  { name: "Australian" },
  { name: "Austrian" },
  { name: "Bangladeshi" },
  { name: "Barbeque" }
  // TODO continue adding restaurant cuisines: https://www.yelpblog.com/2018/01/yelp_category_list
]

// see data for Preference collection
const preferenceSeed = [
  { name: "Active Life", 
    subtype: [
      { name: "ATV Rentals/Tours" },
      { name: "Airsoft" },
      { name: "Amateur Sports Teams" },
      { name: "Amusement Parks" },
      { name: "Aquariums" },
      { name: "Archery" },
      { name: "Axe Throwing" },
      { name: "Badminton" },
      { name: "Baseball Fields" },
      { name: "Basketball Courts" },
      { name: "Batting Cages" },
      { name: "Beach Equipment Rentals" },
      { name: "Beaches" },
      { name: "Bike Parking" },
      { name: "Bike Rentals" },
      { name: "Boating" },
      { name: "Bobsledding" },
      { name: "Bocce Ball" },
      { name: "Bowling" },
      { name: "Bubble Soccer" },
      { name: "Bungee Jumping" },
      { name: "Carousels" },
      { name: "Challenging Courses" },
      { name: "Climbing" },
      { name: "Cycling Classes" },
      { name: "Day Camps" },
      { name: "Disc Golf" },
      { name: "Diving", 
        subtype: [
          { name: "Free Diving" },
          { name: "Scuba Diving" }
        ]
      },
      // TODO continue adding preferences: https://www.yelpblog.com/2018/01/yelp_category_list
    ]
  }
]

// empties, then seeds Cuisine collection
db.Cuisine
  .remove({})
  .then(() => db.Cuisine.collection.insertMany(cuisineSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

  // empties, then seeds Preference collection
db.Preference
.remove({})
.then(() => db.Preference.collection.insertMany(preferenceSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.log(err);
  process.exit(1);
});