const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require("webpack");


const index = require('./routes/index');

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if(process.env.NODE_ENV === 'DEV'){
    const webpackMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(require('../webpack.config'));
    app.use(webpackMiddleware(compiler,{
        stats: {
            colors: true
        },
        progress:true,
        inline:true,
        noInfo: false,
        publicPath: "/"
    }));
    app.use(webpackHotMiddleware(compiler))
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index')
});

module.exports = app;
