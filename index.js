const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Connect database
const connectDb = require("./db");
connectDb();

//Imports Models
const UsersModel = require("./models/users.js");
const ExerciseModel = require("./models/exercises");

app.use(cors());
app.use(express.static("public"));

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Endpoint for get all users
app.get("/api/users", async (req, res, next) => {
  try {
    let usersData = await UsersModel.find().select("-log");
    res.status(200).json(usersData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  next();
});

// Endpoint for save new users
app.post("/api/users", urlencodedParser, async (req, res, next) => {
  let data_user = await UsersModel.findOne({ username: req.params.username });

  if (!data_user) {
    let newUser = await new UsersModel({
      username: req.body.username,
    });
    await newUser.save((err, _) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
    });
    res.status(201).json({ username: newUser.username, _id: newUser._id });
  } else {
    res.status(200).json({ username: data_user.username, _id: data_user._id });
  }

  next();
});

// Endpoint for seve exercies from users
app.post(
  "/api/users/:_id/exercises",
  urlencodedParser,
  async (req, res, next) => {
    let user_data = await UsersModel.findById(req.params._id);

    if (!user_data) {
      res.status(404).json({ error: "_id User not exist" });
    } else {
      let newExercise = await new ExerciseModel({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
      });

      await user_data.log.push(newExercise._id);

      await user_data.save((err, _) => {
        if (err) {
          console.log(err);
        }
      });

      await newExercise.save((err, _) => {
        if (err) {
          console.log(err);
        }
      });

      res.status(202).json({
        _id: user_data._id,
        username: user_data.username,
        date: new Date(newExercise.date).toDateString(),
        duration: newExercise.duration,
        description: newExercise.description,
      });
    }

    next();
  }
);

app.get("/api/users/:_id/logs", async (req, res, next) => {
  let from = !req.query.from ? "0000-01-01" : req.query.from;
  let to = !req.query.to ? "9999-12-31" : req.query.to;
  try {
    let userData = await UsersModel.findById(req.params._id)
      .populate({
        path: "log",
        select: "-_id -__v",
        match: { date: { $gte: from, $lte: to } },
        limit: req.query.limit,
        options: {
          sort: { date: -1 },
        },
      })
      .select("-__v");

    let newLog = await userData.log.map((val) => {
      return {
        description: val.description,
        duration: val.duration,
        date: new Date(val.date).toDateString(),
      };
    });

    res.status(200).json({
      _id: userData._id,
      username: userData.username,
      count: userData.log.length,
      log: newLog,
    });
  } catch (e) {
    res.status(404).json({ error: "_id User not exist" });
  }
  next();
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
