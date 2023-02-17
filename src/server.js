import express from 'express';
import bodyParser from 'body-parser';
import initRoutes from './route';
import viewEngine from './viewEngine';

require('dotenv').config();

let app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
viewEngine(app);

initRoutes(app);

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log('Backend Nodejs is runing on the port : ' + port);
});
