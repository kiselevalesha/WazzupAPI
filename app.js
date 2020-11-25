"use strict";

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors')

const { LOG } = require('./utils/util');
const { StrOkStartServer, StrErrorServer } = require('./languages/russian');

const app = express();
const PORT = config.get('port') || process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/auth', require('./routes/auth/route'));
app.use('/api/notes', require('./routes/notes/route'));

app.all('*', async (req, res, next) => {
    res.status(404).json({ message: StrError404 });
});

async function start() {
    try {

        app.listen(PORT, () => {
            LOG(StrOkStartServer + PORT);
        })

    } catch(e) {
        LOG(StrErrorServer + ': ' + e.message);
        process.exit(1);
    }
}

start();