const assert = require('chai').assert;
const axios = require('axios');
const cheerio = require('cheerio');

describe('expressjs routing', function() {
    describe('route: /', function() {
        beforeEach(function() {
            this.url = 'http://localhost:3000';
        });

        it('should handle GET requests and respond with 200 OK status code', async function() {
            const response = await axios.get(this.url);
            assert.equal(response.status, 200);
        });

        it('should render the index.html view', async function() {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);
            assert.equal($('body#index').length, 1);
        });

        it('if the "username" query string is given, display it\'s value in an <h2> element anywhere inside the <body>', async function() {
            const response = await axios.get(this.url + '?username=admin');
            const $ = cheerio.load(response.data);
            assert.equal($('h2').text(), 'admin');
        });

        it('if the "username" query string is not given, display "Anonymous" in an <h2> element anywhere inside the <body>', async function() {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);
            assert.equal($('h2').text(), 'Anonymous');
        });
    });

    describe('route: /profile/:username', function() {
        beforeEach(function() {
            this.url = 'http://localhost:3000/profile/admin'
        });

        it('should handle GET requests and respond with 200 OK status code', async function() {
            const response = await axios.get(this.url);
            assert.equal(response.status, 200);
        });

        it('should render the profile.html view', async function() {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data);
            assert.equal($('body#profile').length, 1);
        });

        it('should display the username in the <title> and in an <h1> element anywhere inside the <body>', async function() {
            let response = await axios.get(this.url);
            let $ = cheerio.load(response.data);
            assert.equal($('title').text(), 'admin');
            assert.equal($('h1').text(), 'admin');

            response = await axios.get('http://localhost:3000/profile/not-admin');
            $ = cheerio.load(response.data);
            assert.equal($('title').text(), 'not-admin');
            assert.equal($('h1').text(), 'not-admin');
        });
    });

    describe('route: /submit', function() {
        beforeEach(function() {
            this.url = 'http://localhost:3000/submit';
        });

        it('should handle POST requests', async function() {
            const response = await axios.post(this.url, 'username=admin');
            assert.isBelow(response.status, 400);
        });

        it('if the "username" request body is given, redirect to "/profile/:username"', async function() {
            let response = await axios.post(this.url, 'username=admin');
            assert.equal(response.request.res.responseUrl, 'http://localhost:3000/profile/admin');

            response = await axios.post(this.url, 'username=not-admin');
            assert.equal(response.request.res.responseUrl, 'http://localhost:3000/profile/not-admin');
        });

        it('if the "username" request body is not given, redirect to "/"', async function() {
            const response = await axios.post(this.url);
            assert.equal(response.request.res.responseUrl, 'http://localhost:3000/');
        });
    });
});
