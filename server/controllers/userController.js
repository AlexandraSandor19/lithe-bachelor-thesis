const User = require('../models/User');

async function getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({message: 'help me god'});
    }
    
    return res.status(200).json(user);
}

module.exports = { getUserById };