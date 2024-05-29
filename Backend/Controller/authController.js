const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema');

const generateToken = (id) => {
  return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '30d' });
};

const generateUsername = (email) => {
  const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${baseUsername}${randomSuffix}`;
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const username = generateUsername(email);
    const contacts = [{ roomId: `${username}$shibil7986` }];
    const newUser = new User({
      name,
      email,
      password,
      username,
      contacts,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User created successfully', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        const token = generateToken(user._id);
        res.status(201).json({
          name: user.name,
          username: user.username,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
