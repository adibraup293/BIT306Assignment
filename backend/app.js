//import the Express package
const express = require('express');
const bodyParser = require('body-parser');
const TestKit = require('./models/testKit');
const mongoose = require("mongoose");
//const bcrypt = require ("bcrypt");
//const User = require("./models/user");
//const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');

//Add one route
//Use express function and save as an app constant
const app = express()

mongoose.connect("mongodb+srv://sadip:f1b0X2jNrfnxnNF0@cluster0.hlfhy.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.post("/api/testkits", checkAuth, (req, res, next) => {
  const testKit = new TestKit({
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitstock
  })

  testKit.save().then(createdTestKit => {
    console.log(testKit)
    res.status(200).json({
      message: 'Test Kit added successfully',
      testKitId: createdTestKit._id
    });
  });

  console.log(testKit);
  res.status(201).json({
    message: 'TestKit added successfully'
  });
});

app.put("/api/testkits/:id", checkAuth, (req, res, next) => {
  const testKit = new TestKit({
    _id: req.body.id,
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitstock
  });
  Post.updateOne({ _id: req.params.id}, testKit).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

module.exports = app;
