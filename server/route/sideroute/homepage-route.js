const nconf = require('nconf');

module.exports = (app) => {
    app.get(nconf.get('routing:mainRoute'), async (req, res) => {
        res.render('homepage');
    });
}