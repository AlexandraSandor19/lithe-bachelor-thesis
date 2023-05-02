const User = require('../models/User');

async function getUserById(req, res) {
    const { id } = req.params;
    
    const userExists = await User.exists({ _id: id }).exec();
    if (!userExists) {
        return res.sendStatus(409);
    }

    const user = await User.findOne({ _id: id }).exec();
    return res.status(200).json(user);
}

module.exports= { getUserById };