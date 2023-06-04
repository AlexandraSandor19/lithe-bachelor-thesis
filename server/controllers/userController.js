const User = require('../models/User');

async function getAll(req, res) {
    try {
        const users = await User.find().exec();
        return res.status(200).json(users);
    } catch (error) {
        return res.sendStatus(404);
    }
}

async function data(req, res) {
    const idParam = req.params.id;

    try {
        const user = await User.findById(idParam).exec();
        if (user) {
            return res.status(200).json(user);
        }
        return res.sendStatus(404);
    } catch (error) {
        return res.sendStatus(404);
    }
}

async function update(req, res) {
    const idParam = req.params.id;

    try {
        const result = await User.findByIdAndUpdate({ _id: idParam }, req.body);
        if (!result) {
            return res.sendStatus(422);
        }
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(404);
    }
}

module.exports = { data, update, getAll }