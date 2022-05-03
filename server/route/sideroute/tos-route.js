const nconf = require('nconf');

module.exports = (app) => {
    app.get(nconf.get('routing:mainRoute')+nconf.get('routing:privacy'), async (req, res) => {
        res.render('homepage');
    });
}