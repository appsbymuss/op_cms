const { Router } = require('express');
const guestRoute = Router();

// Cache Credentiels of our website
const MainCache = require('../utilities/cache/infoCache');
const { getLandingPage, sendContactInformation } = require('../controllers/guest');
// { mget & mset }
// title
// logo
// phone_number
// email
// !!![ These are stored in the DB, only for admin to see in parameterage of the website ]!!!
// primary_color
// secondary_color

// Main Page:

// guestRoute.get('/',getLandingPage)

guestRoute.get('/:slug([a-z\-]+)',getLandingPage);

guestRoute.post('/contact-us',sendContactInformation);

guestRoute.get('/',(req,res) => {
    res.redirect('/accueil');
})

module.exports = guestRoute;