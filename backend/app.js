const express = require ('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Post = require('./models/post');
const app = express();
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},
  () => console.log ('connected to db'))

app.use (bodyParse.json())
app.use (bodyParse.urlencoded ({extended: false}));
app.use ((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader (
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader (
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post ("/api/posts", (req, res, next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message:"Post add ok"
  });
  next()
})

app.get('/api/posts', ( req, res , next) =>{
  Post.find().then(documents => {
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: documents
  })
});
})
//Connect to MongooseDB

module.exports = app;
