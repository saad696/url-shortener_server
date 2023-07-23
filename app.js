const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const cors = require('cors');
const limiter = require('./src/middlewares/apiRateLimiter');

// specific environments to load
if (process.env.NODE_ENV === 'qa') {
    dotenv.config({ path: './config/qa.env' });
} else {
    dotenv.config({ path: './config/prod.env' });
}

const app = express();

app.set('trust proxy', true);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// routes
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(
        `Server running on port ${port} in ${process.env.NODE_ENV} mode`
    );
});
