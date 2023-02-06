const mongoose = require("mongoose");

let UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  log: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Execise",
    },
  ],
});

module.exports = mongoose.model("User", UsersSchema);
