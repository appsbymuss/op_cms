const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { compileSass } = require('../utilities/sass');
const { getUserAdmin, updateThemeColors, getThemeColors, getWebsiteParameters, updateWebsiteParameters, getStaticPageBySlug, getStaticPageComponentsBySlug, addStaticPageComponent, updateStaticPageComponent, deleteStaticPageComponent, getLocations, addLocation, updateLocation, deleteLocation } = require('../models/admin');

function serveLogin(req,res){
    if(req.session && req.session.username){
        res.redirect('/admin/dashboard');
        return;
    }
    res.render('admin/login');
    return;
}

async function handleLogin(req, res){
    if(req.session.username){
        res.redirect('/admin/dashboard');
        return;
    }else{
        const { username, password } = req.body;
        if( username && password ){
            const userData = await getUserAdmin(username,password);
            // Bad Username or/and Password
            if(!userData){
                res.render('admin/login',{loginStatus:"The Password or/and Username aren't Correct."});
                return;
            }
            // Everything is well, create a session
            req.session.username = username;
            req.session.password = password;
            // Redirect to Dashboard
            res.redirect('/admin/dashboard');
            return;
        }else{
            res.render('admin/login',{loginStatus:"Bad Request"});
            return;
        }
    }
}

function handleLogout(req,res){
    if(req.session && req.session.username){
        req.session.destroy();
    };
    res.redirect('/admin/login');
}

function handleTheme(req,res) {
    const { primaryColor, secondaryColor } = req.body;
    if( primaryColor && secondaryColor){
        compileSass(primaryColor,secondaryColor)
            .then(async () => {
                await updateThemeColors(primaryColor,secondaryColor);
                res.redirect('/admin/theme');
                return;
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/admin/theme');
                return;
            });
    }else{
        res.redirect('/admin/theme');
        return;
    }
}


// [ Theme ]
const serveTheme = async (req,res) => {
    const webParams = await getThemeColors();
    res.render('admin/parametrage/theme',{webParams: webParams});
}

// [ General Information ]
const servePrams = async (req,res) => {
    const webParams = await getWebsiteParameters();
    res.render('admin/parametrage/information',{webParams: webParams});
    return;
}

// Fix Image processing
const handleParams = async (req,res) => {
    const { title, email, phone_number } = req.body;
    // console.log(req.body);
    const logoData = req.files && req.files['logo'];
    if( title && email && phone_number ){
        if(logoData){
            await updateWebsiteParameters(title,logoData['name'],email,phone_number);
            logoData.mv(__dirname +  '/../public/assets_client/img/uploadedImages/websiteLogo/' + logoData['name']);
        }else{
            await updateWebsiteParameters(title,null,email,phone_number);
        }
    }
    res.redirect('/admin/information');
    return;
}

// [ static Pages ]
const serveLandingPage = (req,res) => {
    res.render('admin/CMS/staticWebsites');
}

// [ static Pages: Specific Components ]
const serveLandingPageComponents = async (req,res) => {
    const { slug } = req.params;

    // get from db page w/ components and everything
    const page = await getStaticPageBySlug(slug);

    if(!page){
        res.send('Not Allowed Amigo');
        return;
    }

    const componentsData = await getStaticPageComponentsBySlug(slug);

    console.log(componentsData)

    res.render('admin/CMS/staticWebsitesEdit',{slug:slug,components:componentsData});
}

const handleLandingPageComponentAdd = async (req,res) => {
    const { slug } = req.params;
    const { classSelector, title, content} = req.body;
    console.log(req.files)
    if(req.files && req.files['image[]']){
        const images = req.files['image[]'];
        var dataToInsert = [];

        // Check if the image[] is an object or an array of objects.
        if(Array.isArray(images)){
            images.map((img) => {
                dataToInsert.push({['image_path'] : img.name});
            })
            images.map((img) => {
                img.mv(__dirname +  '/../public/assets_client/img/uploadedImages/componentImages/' + img.name);
            })
        }else{
            dataToInsert = [{['image_path'] : images.name}]
            images.mv(__dirname +  '/../public/assets_client/img/uploadedImages/componentImages/' + images.name);
        }

        console.log(dataToInsert);
        await addStaticPageComponent(title,content,classSelector,slug,dataToInsert);
    }else{
        await addStaticPageComponent(title,content,classSelector,slug,null);
    }

    res.redirect(`/admin/landingPages/${slug}`);
}

const handleLandingPageComponentUpdate = async (req,res) => {
    const { slug } = req.params;
    const { classSelector, title, content, id} = req.body;
    if(req.files && req.files['image[]']){

        const images = req.files['image[]'];
        console.log(images);
        var dataToInsert = [];

        

        // Check if the image[] is an object or an array of objects.
        if(Array.isArray(images)){
            images.map((img) => {
                dataToInsert.push({['image_path'] : img.name});
            });
            images.map((img) => {
                img.mv(__dirname +  '/../public/assets_client/img/uploadedImages/componentImages/' + img.name);
            });
        }else{
            dataToInsert = [{['image_path'] : images.name}]
            images.mv(__dirname +  '/../public/assets_client/img/uploadedImages/componentImages/' + images.name);
        }

        // Insert Image Paths (names)
        await updateStaticPageComponent(id,title,content,classSelector,dataToInsert);
    }else{
        // Insert Image Paths (names)
        await updateStaticPageComponent(id,title,content,classSelector,dataToInsert);
    };
    
    res.redirect(`/admin/landingPages/${slug}`);
}

const handleLandingPageComponentDelete = async (req,res) => {
    const { slug } = req.params;
    const { id } = req.query;
    if(id){
       await deleteStaticPageComponent(id);
    }
    // Process Delete from DB...
    res.redirect(`/admin/landingPages/${slug}`);
}

// [ Location & Pages ]
const serveLocation = async (req,res) => {
    const locationsData = await getLocations();
    console.log(locationsData)
    res.render('admin/CMS/locations',{locationsData:locationsData});
}

const handleLocationAdd = async (req,res) => {
    const { nameLocation, title, address, slug, content} = req.body;
    if(nameLocation && title && address && slug && content){
        const Photo = req.files && req.files['image'];
        // Refactor this code
        await addLocation(slug,nameLocation,address,title,content,(Photo) ? Photo['name'] : "")
        if(Photo){
            Photo.mv(__dirname +  '/../public/assets_client/img/uploadedImages/locations/' + Photo['name']);
        }
    }
    res.redirect('/admin/locations')
}

const handleLocationUpdate = async (req,res) => {
    const { nameLocation, title, address, content, slug, id} = req.body;
    console.log(req.body);
    if(nameLocation && title && address && content && slug && id){
        if(req.files){
            await updateLocation(id, slug, nameLocation, address, title, content, req.files['image']);
            req.files['image'].mv(__dirname +  '/../public/assets_client/img/uploadedImages/locations/' + req.files['image']['name']);
            //
        }else{
            await updateLocation(id, slug, nameLocation, address, title, content, null);
            //
        }
    }
    res.redirect('/admin/locations')
}

const handleLocationDelete = async (req,res) => {
    const { id } = req.query;
    const page_id = await prisma.location.findUnique({
        where:{
            id_location:parseInt(id)
        },
        select:{
            id_page:true
        }
    }).then((data) => {
        return data['id_page']
    })
    console.log(page_id)

    await deleteLocation(page_id);
    
    res.redirect("/admin/locations");
}

module.exports = {
    serveLogin,
    handleLogin,
    
    handleLogout,

    servePrams,
    handleParams,

    serveTheme,
    handleTheme,
    
    serveLandingPage,

    serveLandingPageComponents,
    handleLandingPageComponentAdd,
    handleLandingPageComponentDelete,
    handleLandingPageComponentUpdate,

    serveLocation,
    handleLocationAdd,
    handleLocationUpdate,
    handleLocationDelete
}