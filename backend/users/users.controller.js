const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/current', getCurrent);
router.get('/:id', getById);

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

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}