const config = require('config.json');
const db = require('_helpers/db');
const https = require('https');
const Movie = db.Movie;

module.exports = {
    getAll,
    create
};


async function getAll() {
    return await Movie.find();
}

async function create(userParam) {
    let movie = new Movie(userParam);
    const info = await getMovieInfo(movie.youtubeId);
    movie.thumbnailUrl = info.items[0].snippet.thumbnails.medium.url;
    movie.title = info.items[0].snippet.title;
    movie.description = info.items[0].snippet.description;
    movie.likeCount = info.items[0].statistics.likeCount;
    movie.dislikeCount = info.items[0].statistics.dislikeCount;

    await movie.save();
}

function getMovieInfo(youtubeId) {
    return new Promise((resolve, reject) => {
        const req = https.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${config.youtubeApiKey}&part=snippet,statistics`, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
        }).on('error', (e) => {
            reject(e);
        });
        req.end();
    });
}