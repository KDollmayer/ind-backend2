const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./auth');
const { User } = require('../models/User');

const registerUser = (async (req, res) => {
    const { username, password } = req.body.user;
   
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = new User({
      username: username,
      password: password,
      
    });
  
    const newUser = await user.save();
  
    //generate a token then pass it when a new user creates and login
    const token = generateToken(newUser);
  
    res.json({
      user: {
        username: newUser.username,
        password: newUser.password,
        token: token,
      },
    });
  });
  const login = (async (req, res) => {
    const { username, password } = req.body.user;
    const user = await User.findOne({ username });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      //string
  
      return res.json({
        user: {
          username: user.username,
          password: user.password,
          
          token: token,
        },
      });
    } else {
      res.status(400);
      throw new Error('Invalid credential');
    }
  });
  
  const getMe = (async (req, res) => {

    const user = req.user;
    
    const { userId } = user;
    const currentUser = await User.findOne({ _id: userId });
  
    res.json({
      user: {
        username: currentUser.username,
        
        token: req.token,
      },
    });
  });

  module.exports = { registerUser, login, getMe }