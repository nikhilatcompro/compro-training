const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.send('ERROR! ' + err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send('ERROR!' + err);
  }
});

router.post('/', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth
    });
    try {
      const user1 = await user.save();
      res.json(user1);
    } catch (err) {
      res.send(err);
    }
});

router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = user.name === req.body.name ? user.name : req.body.name;
    user.email = user.email === req.body.email ? user.email : req.body.email;
    // eslint-disable-next-line max-len
    user.dateOfBirth = user.dateOfBirth === req.body.dateOfBirth ? user.dateOfBirth : req.body.dateOfBirth;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.send('ERROR ' + err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const deletedUser = await user.remove();
    res.json(deletedUser);
  } catch (err) {
    res.send('ERROR' + err);
  }
});
module.exports = router;
