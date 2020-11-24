//import the Express package
const express = require('express');
const bodyParser = require('body-parser');
const TestKit = require('./models/testKit');
const mongoose = require("mongoose");
//const bcrypt = require ("bcrypt");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
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

app.post("/api/testkits", (req, res, next) => {
  const testKit = new TestKit({
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitname
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

app.put("/api/testkits/:id",  (req, res, next) => {
  const testKit = new TestKit({
    _id: req.body.id,
    testKitName: req.body.testkitname,
    testKitStock: req.body.testkitstock
  });
  TestKit.updateOne({ _id: req.params.id}, testKit).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get('/api/testkits',(req, res, next)=>{
  TestKit.find().then(documents => {
    res.status(200).json({
      message: 'Test Kit fetched successfully',
      testKits: documents
    });
  });
});

app.delete('/api/testkits/:id', (req, res, next) => {
  TestKit.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Deleted"});
  })
});

// app.post('/api/user/signup', (req,res,next) => {
//   bcrypt.hash(req.body.password, 10)
//   .then(hash =>{
//     const user = new User({
//       email: req.body.email,
//       password: hash
//     });
//     user.save()
//     .then(result => {
//       res.status(201).json({
//         message: 'User created',
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error:err
//       });
//     });
//   });
// });

// app.post('/api/user/login', (req,res,next) => {
//   let fetchedUser;
//   User.findOne({email: req.body.email})
//   .then(user => {
//     if (!user){
//       return res.status(401).json({
//         message: 'Auth failed'
//       });
//     }
//     fetchedUser = user
//     return bcrypt.compare(req.body.password, user.password)
//   })
//   .then(result => {
//     if (!result){
//       return res.status(401).json({
//         message: 'Auth failed'
//       });
//     }
//     const token = jwt.sign(
//       {email: fetchedUser.email, userId: fetchedUser._id},
//       'secret_this_should_be_longer',
//       {expiresIn: '1h'}
//     );
//     res.status(200).json({
//       token: token
//     })
//   })
//   .catch (err=> {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   })
// })

module.exports = app;