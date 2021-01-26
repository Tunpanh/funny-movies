const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getById,
    create,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });

    if (user) {
        if(bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
            return {
                ...user.toJSON(),
                token
            };
        } else {
            return { message: 'Username or password is incorrect' };
        }
    }
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}