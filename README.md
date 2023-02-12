# Exercise Tracker

### This is the 4th project to obtain the FreeCodeCamp certification

#

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at

https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

![Excercise Tracker](https://res.cloudinary.com/dulwtefos/image/upload/v1676225366/fcc-backend/project4_qtvhjp.jpg)

### How Work

- Require Node.js version 16.15.1

1. Clone the project
2. `npm install` - for install dependency
3. `npm run dev` - for run development enviroment
4. `npm run start` - for run production enviroment

### Features

- The project was used express framework

- To add persistence, mongodb was used as the NoSql database and mongoose as the database manager

- Ando used body-parser for get data input text type

- When register a new user, the respond is:

`{
  username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
}`

- When register a new excercise the respond is:

`{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}`

- If show all user write this url

[https://boilerplate-project-exercisetracker-omsy.onrender.com/api/users](https://boilerplate-project-exercisetracker-omsy.onrender.com/api/users)

- If you want to see the exercises associated with a user, type this url with optionals query

https://boilerplate-project-exercisetracker-omsy.onrender.com/api/users/:_id/logs?from=2000-01-01&to=2020-12-31&limit=2

`{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}`

&nbsp;

#### [View Demo](https://boilerplate-project-exercisetracker-omsy.onrender.com/)

&nbsp;

### License MIT
