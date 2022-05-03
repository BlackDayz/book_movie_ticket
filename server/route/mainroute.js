module.exports = ({app, parser}) => {
    require('./sideroute/homepage-route')(app);
    require('./sideroute/privacy-route')(app);
    require('./sideroute/reserveTicket-route')(app, parser);
    require('./sideroute/verify-route')(app);
    require('./sideroute/privacy-route')(app);
    require('./sideroute/tos-route')(app);
}