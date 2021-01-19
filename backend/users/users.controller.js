const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            if (user) {
                if (user.message) {
                    return res.status(400).json({ message: 'Password is incorrect' });
                } else {
                    return res.json(user);
                }
            }
            else
                return register(req, res, next);
        })
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => authenticate(req, res, next))
        .catch(err => next(err));
}