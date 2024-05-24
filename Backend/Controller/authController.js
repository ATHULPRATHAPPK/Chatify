const User = require('../Model/UserSchema');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {console.log(req.body);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
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
