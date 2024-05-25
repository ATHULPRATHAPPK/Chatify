const User = require('../Model/UserSchema');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

const generateUsername = (email) => {
  // Remove non-alphanumeric characters and append a random number
  const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${baseUsername}${randomSuffix}`;
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate username based on email
    const username = generateUsername(email);

    const newUser = new User({
        name,
        email,
        password,
        username // Set the generated username
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });

   if(user){

    if(user.password==password){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }else{
      res.status(401).json({ message: 'Invalid password' });
    }

    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
