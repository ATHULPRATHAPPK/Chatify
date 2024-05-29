const User = require('../Model/UserSchema');
const MESSAGE=require('../Model/Messages')
exports.listUser = async (req, res) => {
    try {
        const {currentUsername}=req.body
        console.log(req.user);

        // Include only the name and email fields in the query results
        const users = await User.find({username:{$ne:currentUsername}}, 'name email username -_id');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


exports.listMessage=async (req,res)=>{
    const { currentUser, recipientUser } = req.body;
  const roomId = `${recipientUser}$${currentUser}`
  const roomId1=`${currentUser}$${recipientUser}`


  try {
    const messages = await MESSAGE.find({ $or: [{ roomId }, { roomId: roomId1 }]}).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}




//  const users = await User.find({}, '-password');
