var mongoose = require('mongoose');
var Entry = require('./models/entry');

mongoose.connect('mongodb://localhost/food_journal');

function quit() {
  mongoose.disconnect;
  console.log("\n Dropping database connection")
}

console.log("Now deleting any previous entries in the DB");
Entry.remove({})
.then(function() {
  console.log("Old entries have been deleted");
  var breakfast = new Entry({ date: "8/15/2016", meal: "Breakfast", food: "Eggs"});
  var lunch = new Entry({ date: "8/15/2016", meal: "Lunch", food: "Turkey Sandwich"});
  var dinner = new Entry({ date: "8/15/2016", meal: "Dinner", food: "Meatloaf"});
  return Entry.create(breakfast, lunch, dinner);
})
.then (function(savedEntries) {
  console.log("Saved", savedEntries.length, "Entries")
  return Entry.find({});
})
.then(function(allEntries) {
    console.log('\n')
    allEntries.forEach(function(entry) {
      console.log("New Entry:", entry.meal, entry.food, entry.date);
    })
    quit();
})
