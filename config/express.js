const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consig = require('consign');
const cors = require('cors');

module.exports = () => {

    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));
    app.set('secretkeyjwt', process.env.SECRETKEYJWT || config.get('secretKeys.secretKeyjsonWebToken'));

    app.use(bodyParser.json());

    app.use(cors());

    consig({cwd: 'api'})
        .then('data')
        .then('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;

}