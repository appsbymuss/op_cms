const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { isAdmin } = require('../middlewares/admin');
const adminC = require('../controllers/admin');
const { Router } = require('express');

const route = Router();

// [  CommandsArchive ]:
route.get('/archives',(req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.render('admin/Archivage/commandArchivage');
})

// [ REST API : CommandsArchive ]:
route.get('/api/archives',async (req, res) => {
    const { search, limit, offset } = req.query;
    console.log(req.url)
    console.log(search,limit,offset);

    const fetchedData_Count = await prisma.commandsarchive.aggregate({
        "_count":true,
        ...(search && {where:{
            OR:[
                {first_name:{contains:search}},
                {last_name:{contains:search}},
                {ville:{contains:search}},
                {specification:{contains:search}},
                {email:{contains:search}},
                {phone_number:{contains:search}}
            ]
        }})
    })

    console.log(" count is ", fetchedData_Count['_count']);

    const allData = await prisma.commandsarchive.findMany({
        ...(search && {where:{
            OR:[
                {first_name:{contains:search}},
                {last_name:{contains:search}},
                {ville:{contains:search}},
                {specification:{contains:search}},
                {email:{contains:search}},
                {phone_number:{contains:search}}
            ]
        }}),
        ...(limit && offset && {
            take:parseInt(limit),
            skip:parseInt(offset)
        })
    });
    console.log(allData);
    res.json({results:allData,count:fetchedData_Count['_count']});
})


// [ Login ]
route.get('/login',adminC.serveLogin);
route.post('/login',adminC.handleLogin);


// [ Logout ]
route.get('/logout',adminC.handleLogout);


// [ Dashboard ]
route.get('/dashboard',isAdmin,(req,res) => {
    res.render('admin/dashboard');
});

// [ Theme ]
route.get('/theme',isAdmin,adminC.serveTheme);

route.post('/theme',isAdmin,adminC.handleTheme);

// [ General Information ]
route.get('/information',adminC.servePrams);

route.post('/information',adminC.handleParams)

// [ static Pages ]
route.get('/landingPages',adminC.serveLandingPage);

// [ static Pages: Specific Components ]
route.get('/landingPages/:slug',adminC.serveLandingPageComponents);

route.post('/landingPages/:slug/add/',adminC.handleLandingPageComponentAdd);

route.post('/landingPages/:slug/update/',adminC.handleLandingPageComponentUpdate);

route.get('/landingPages/:slug/remove/',adminC.handleLandingPageComponentDelete);

// [ Location & Pages ]
route.get('/locations',adminC.serveLocation);

route.post('/locations/add/',adminC.handleLocationAdd);

route.post('/locations/update/',adminC.handleLocationUpdate);

route.get('/locations/remove/',adminC.handleLocationDelete);

// Gestion of 404 Errors
route.get('*',(req,res) => {
    res.send("URL Doesn't Exist");
});

module.exports = route;