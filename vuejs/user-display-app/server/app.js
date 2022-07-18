const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = 'mongodb://localhost/UserDBMain';
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on('open', () => {
  console.log('Connected....');
});

const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

app.listen(9001, () => {
  console.log('Server started');
});
