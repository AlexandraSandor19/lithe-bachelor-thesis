const User = require('../models/User');
const ProfileImage = require("../models/ProfileImage");

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

async function uploadImage(req, res) {
    var obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.join('../../uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    };
    
    await ProfileImage.create(obj)
        .then ((err, img) => {
            if (err) {
                return res.send(422).json({'message': 'wrong'})
            }
            else {
                return res.sendStatus(201);
            }
        });
}

module.exports = { data, update, uploadImage, getAll }