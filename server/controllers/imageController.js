const ProfileImage = require('../models/ProfileImage');
const ImageEncoded = require('../models/ImageEncoded')
const Storage = require('../middleware/storage');
const fs = require('fs');
const multer = require('multer');

const upload = multer({
    storage: Storage
}).single('image');

function uploadImage(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            var img = fs.readFileSync(req.file.path);
            var encode_img = img.toString('base64');
            const newImage = new ProfileImage({
                name: req.body.name,
                image: {
                    data: new Buffer.from(encode_img, 'base64'),
                    contentType: 'image/jpeg'
                },
                owner_id: req.body.owner_id
            });
            newImage
                .save()
                .then(() => res.status(200).json(newImage))
                .catch(err => res.status(400).json({"message": "An error occurred when uploading the image!"}));
        }
    })
}

function uploadEncoded(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            var img = fs.readFileSync(req.file.path);
            var encode_img = img.toString('base64');
            const newImage = new ImageEncoded({
                name: req.body.name,
                image: {
                    data: encode_img,
                    contentType: 'image/jpeg'
                },
                owner_id: req.body.owner_id
            });
            newImage
                .save()
                .then(() => res.status(200).json(newImage))
                .catch(err => res.status(400).json({"message": "An error occurred when uploading the image!"}));
        }
    })
}

async function getUserImage(req, res) {
    const { id } = req.params;

    try {
        const image = await ProfileImage.findOne({ owner_id: id }).exec();
        return res.status(200).json(image);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to find image!'});
    }
}

async function getImageEncoded(req, res) {
    const { id } = req.params;

    try {
        const image = await ImageEncoded.findOne({ owner_id: id }).exec();
        return res.status(200).json(image);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to find image!'});
    }
}

async function update(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
        } else {
            const { id } = req.params;

            try {
                const image = await ProfileImage.findOne({ owner_id: id }).exec();
                image.name = req.body.name;
                image.image.data = fs.readFileSync(req.file.path);
        
                image
                    .save()
                    .then(() => res.status(200).json(image))
                    .catch(err => res.status(400).json({"message": "An error occurred when updating the image!"}));
            } catch (error) {
                return res.status(400).json({'message': 'Failed to update image!'});
            }
        }})
}

module.exports = { uploadImage, getUserImage, update, uploadEncoded, getImageEncoded };