module.exports = ({app, parser}) => {
    require('./sideroute/homepage-route')(app);
    require('./sideroute/legal-route')(app);
    require('./sideroute/reserveTicket-route')(app, parser);
}