const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const should = chai.should();
const expect = chai.expect;
const assert = require('chai').assert;

let User = require('../users/user.model');

let Movie = require('../movies/movie.model');

// Register / Login
describe('Register / Login', () => {
    before(() => {
        User.remove({ username: 'IntegrationUser' }, () => {});
    });

    it('should register a new user and return token', () => {
        let _token = null;

        return chai.request(server)
                    .post('/users/authenticate')
                    .send({
                        "username": "IntegrationUser",
                        "password": "integration"
                    })
                    .then((data) => {
                        _token = data.body.token;
                        assert.ok(_token);
                    });
    });

    it('should login existing User', () => {
        let _token = null;

        return chai.request(server)
                    .post('/users/authenticate')
                    .send({
                        "username": "IntegrationUser",
                        "password": "integration"
                    })
                    .then((data) => {
                        _token = data.body.token;
                        assert.ok(_token);
                    });
    });

    it('should return an error bad request if password isn\'t wrong', () => {
        return chai.request(server)
                    .post('/users/authenticate')
                    .send({
                        "username": "IntegrationUser",
                        "password": "wrongPassword"
                    })
                    .then((data) => {
                        data.should.have.status(400);
                    });
    });

});

// Movie Share
describe('Movie Share', () => {
    let _token = null;

    before(() => {
        return chai.request(server)
                    .post('/users/authenticate')
                    .send({
                        "username": "IntegrationUser",
                        "password": "integration"
                    })
                    .then((data) => {
                        _token = data.body.token;
                        assert.ok(_token);
                    });
    });

    before(() => {
        Movie.remove({}, () => {});
    });

    it('share a movie', () => {
        return chai.request(server)
                    .post('/movies/create')
                    .set('Authorization', 'Bearer ' + _token)
                    .send({
                        "sharedBy": "IntegrationUser",
                        "youtubeUrl": "https://www.youtube.com/watch?v=lYWYWyX04JI"
                    })
                    .then((data) => {
                        data.should.have.status(200);
                    });
    });

    it('share a movie', () => {
        return chai.request(server)
                    .post('/movies/create')
                    .set('Authorization', 'Bearer ' + _token)
                    .send({
                        "sharedBy": "IntegrationUser",
                        "youtubeUrl": "https://www.youtube.com/watch?v=ZS_kXvOeQ5Y"
                    })
                    .then((data) => {
                        data.should.have.status(200);
                    });
    });

    it('should return movie list', () => {
        return chai.request(server)
                    .get('/movies')
                    .then((data) => {
                        data.should.have.status(200);
                        data.body.should.be.a('array');
                        data.body.length.should.be.eql(2);
                    });
    });

});