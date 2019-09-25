const express =require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.fetch = require('node-fetch');

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const cors = require('cors');
const passport = require('passport');

const users = require('./routes/users');
const posts = require('./routes/posts');

// setup environment
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users);
app.use('/api/posts', posts);

console.log(process.env.applicationId);

const unsplash = new Unsplash({
    applicationId : process.env.applicationId,
    secret: process.env.secretKey,
    callbackUrl: process.env.callbackUrl
});

app.get('/api/photos', (req, res) => {
    unsplash.photos.getRandomPhoto()
        .then(toJson)
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

// mongo db connect
mongoose.connect(process.env.MONGODB_URL, {userNewUrlParser: true});
const PORT = process.env.PORT || 5000;

// run app
app.listen(process.env.PORT, () => console.log(`servser is running on port ${PORT}`));
