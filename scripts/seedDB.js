const mongoose = require("mongoose");
const db = require("../models");

// connect to mongoose database
mongoose.connect(
  process.env.MONGODB_URI || 
  "mongodb://localhost/trek-tips",
  { useNewUrlParser: true }
);

// seed data for Cuisine collection
const categorySeed = [
  { alias: "category 1 alias", title: "category 1 title", parent_aliases: [{ alias: "restaurants" }]	},
  { alias: "category 2 alias", title: "category 2 title", parent_aliases: [{ alias: "active life" }]	},
  { alias: "category 3 alias", title: "category 3 title", parent_aliases: [{ alias: "arts & entertainment" }]	},
  { alias: "category 4 alias", title: "category 4 title", parent_aliases: [{ alias: "restaurants" }]	},
  { alias: "category 5 alias", title: "category 5 title", parent_aliases: [{ alias: "restaurants" }]	}
  // TODO get categories from yelp API: https://www.yelpblog.com/2018/01/yelp_category_list
]

const placeSeed = [
  { 
    yelpId: "id-1",
    name: "Place 1",
    image_url: "image1.jpg",
    url: "http:url1.com",
    price: "$$",
    yelpRating: 4.5,
    phone: "+15555555555",
    categories: [
      { title: "category 1 title"}
    ],
    coordinates: {
      latitude: 12.34654,
      longitude: 
    }
  }
]

// empties, then seeds Category collection
db.Category
.remove({})
.then(() => db.Category.collection.insertMany(categorySeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.log(err);
  process.exit(1);
});