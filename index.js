const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

const app = express();
///Import routes
mongoose.connect('mongodb+srv://****:****.@cluster0.89tx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', ()=>{console.log('connected db...')});
const  authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/specialarea');
///

app.use(express.json());
app.use('/api/user',authRoutes);
app.use('/api/specialarea',postsRoutes);
app.listen(2222, ()=> console.log("Server 2222 listening...") );