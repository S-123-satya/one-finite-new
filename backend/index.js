const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes=require('./routes/tasks')
const mongodb = require("./database/index");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use('/api/notes',taskRoutes );

mongodb()
  .then((respose) => {
    console.log(`database is connected to mongodb`);
    app.listen(PORT, console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));


