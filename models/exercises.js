const mongoose = require("mongoose");

let ExercisesSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Execise", ExercisesSchema);
