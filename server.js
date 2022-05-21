const express = require('express');
const bodyParser = require('body-parser')
const serverconfig = require('nconf');

const app = express();
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const jsonParser = bodyParser.json()

serverconfig.argv().env().file({file: './src/json/config/config.json'});

require('./server-init')(app, express);
require('./server/route/mainroute')({
    app: app,
    parser: jsonParser});

app.listen(serverconfig.get('port'), serverconfig.get('domain'), () => {
    console.log(`http://${
        serverconfig.get('domain')
    }:${serverconfig.get('port')} server started on ${
        serverconfig.get('port')
    }`);
});