const { PrismaClient } = require('@prisma/client');
const { 
    getHeaderData,
    GetPageDataBySlug,
    GetLastFiveLocationsData,
    createCommandArchive } = require('../models/guest');
const { sendMail } = require('../utilities/mail');
const prisma = new PrismaClient();

async function getLandingPage(req, res){
    let { slug } = req.params;
    const headerData = await getHeaderData();

    const pageData = await GetPageDataBySlug(slug);
    
    if(!pageData){
        console.log("yes")
        res.status(404).render(`client/error`,{errorMessage:"This Page Does Not Exist.",layoutData:{Header:headerData}});
        return;
    }

    const locationData = await GetLastFiveLocationsData();

    res.status(200).render(`client/${pageData['template_file']}`,{pageData:pageData,layoutData:{Header:headerData,Footer:{locations:locationData}}});
    return;
}

async function sendContactInformation(req,res){
    const { nom, prenom, sexe, email, ville, telephone, specification, date_jour, date_mois, date_annee } = req.body;

    // [ Page Data pour affichage ]:
    const headerData = await getHeaderData();
    const pageData = await GetPageDataBySlug('contact-us');
    const locationData = await GetLastFiveLocationsData();

    if(nom && prenom && sexe && ville && telephone && specification){

        const htmlFormat = require('../utilities/mail/emailFormat');

        const mailBody = htmlFormat({nom,prenom,sexe,email,ville,telephone,specification,date_jour,date_mois,date_annee});
        
        const data = {
            first_name:prenom,
            last_name:nom,
            phone_number:telephone,
            sexe:sexe,
            ville:ville,
            specification:specification,
            ...(email && {email:email}),
            ...(date_jour && date_mois && date_annee && {interventionDate:new Date(parseInt(date_annee),parseInt(date_mois),parseInt(date_jour))}),
        }
        try{
            const mail = await sendMail('professionalidrissi@gmail.com',mailBody);
            const mailArchivageInsert = await createCommandArchive(data);
        }catch(err){
            res.render(`client/contact-us`,{isSent:0,sendingStatus:"The Form was not submitted, please try again later.",pageData:pageData,layoutData:{Header:headerData,Footer:{locations:locationData}}});
            return;
        }
        res.render(`client/contact-us`,{isSent:1,sendingStatus:"Form Submitted successfully.",pageData:pageData,layoutData:{Header:headerData,Footer:{locations:locationData}}});
        return;
    }else{
        res.render(`client/contact-us`,{isSent:0,sendingStatus:"Fill all the necessary inputs then try again.",pageData:pageData,layoutData:{Header:headerData,Footer:{locations:locationData}}});
        return;
    }
    
}

module.exports = {
    getLandingPage,
    sendContactInformation
}