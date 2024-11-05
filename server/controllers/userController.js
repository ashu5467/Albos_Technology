// backend/controllers/userController.js
const User = require('../models/User');

// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Function to create a new user
// exports.createUser = async (req, res) => {
//   const { username, email } = req.body;
//   try {
//     const newUser = new User({ username, email });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user' });
//   }
// };

// Add other functions for update and delete as necessary

exports.createUser = async (req, res) => {
  const { name, email, role, status } = req.body;

  if (!name || !email || !role || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const newUser = new User({ name, email, role, status });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};


// Function to update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  if (!name || !email || !role || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, status }, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
