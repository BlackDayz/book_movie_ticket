module.exports = (app) => {
    require('./sideroute/homepage-route')(app);
    require('./sideroute/legal-route')(app);
}