const User = require('../Model/UserSchema');

exports.listUser = async (req, res) => {
    try {
        console.log("users");
        // Include only the name and email fields in the query results
        const users = await User.find({}, 'name email username -_id');
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};




//  const users = await User.find({}, '-password');
