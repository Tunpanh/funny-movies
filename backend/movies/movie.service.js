const config = require('config.json');
const db = require('_helpers/db');
const Movie = db.Movie;

module.exports = {
    getAll,
    create
};


async function getAll() {
    return await Movie.find();
}

async function create(userParam) {
    const movie = new Movie(userParam);
    await movie.save();
}