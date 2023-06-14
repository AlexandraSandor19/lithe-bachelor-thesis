const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const { username, forename, surname, role, email, password, password_confirm} = req.body;

    if (!username || !forename || !surname || !role || !email || !password || !password_confirm) {
        return res.status(422).json({'message': 'Some required fields have not been completed!\nPlease fill in all the fields.'});
    }

    const userExists = await User.exists({email});
    if (userExists) {
        return res.status(409).json({'message': 'The email address is already in use!\nPlease use a different email address.'});
    }
    
    if (password !== password_confirm) {
        return res.status(422).json({'message': 'The passwords do not match!'});
    }

    if (password.length < 7) {
        return res.status(422).json({'message': 'The chosen password is too short!\nPlease use a password that has at least 7 characters.'});
    }

    try {
        hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword, 
            forename, 
            surname,
            role,
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).json({'message': 'Could not register!'});
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({'message': 'The email and/or password fields have not been completed!'});
    }

    const user =  await User.findOne({email}).exec();
    if (!user) {
        return res.status(401).json({'message': 'The email address in invalid!'});;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({'message': 'The email and password do not match!'});
    }

    const accessToken = jwt.sign(
        {
            id: user.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1800s'
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    );

    user.refresh_token = refreshToken;
    await user.save();
    res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000 });
    res.json({access_token: accessToken});
}

async function logout(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({ refresh_token: refreshToken }).exec();

    if(!user) {
        res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    user.refresh_token = null;
    await user.save()

    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(200);
}

async function refresh(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({ refresh_token: refreshToken }).exec();

    if(!user) {
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.id !== decoded.id) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { id: decoded.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1800s' }
            );
            res.json({ access_token: accessToken });
        }
    );
}

async function user(req, res) {
    const user = req.user;
    
    return res.status(200).json(user);
}

module.exports = { register, login, logout, refresh, user };