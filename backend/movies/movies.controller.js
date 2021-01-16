const express = require('express');
const router = express.Router();
const movieService = require('./movie.service');

// routes
router.post('/create', create);
router.get('/', getAll);

module.exports = router;

function create(req, res, next) {
    movieService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    movieService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}
