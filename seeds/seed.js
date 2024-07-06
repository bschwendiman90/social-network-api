const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const userSeed = require('./userSeed');
const thoughtSeed = require('./thoughtSeed');

mongoose.connect('mongodb://localhost/socialDB');

const seedDatabase = async () => {
    try {
      await mongoose.connection.dropDatabase();
  
      const users = await User.insertMany(userSeed);
      const thoughts = await Thought.insertMany(thoughtSeed);
  
      for (let thought of thoughts) {
        const user = users.find((user) => user.username === thought.username);
        if (user) {
          user.thoughts.push(thought._id);
          await user.save();
        }
      }
  
      console.log('Database seeded!');
      mongoose.connection.close();
    } catch (err) {
      console.error(err);
      mongoose.connection.close();
    }
  };
  
  seedDatabase();