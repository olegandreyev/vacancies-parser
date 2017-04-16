
require('dotenv').config();
const DB = require('./db');
const app = require('./server/app');
const http = require('http');
const port = app.get('port');
const rp = require('request-promise');

const server = http.createServer(app);
server.listen(port, function(){
    console.log(`server in running on ${port} port`)
});



