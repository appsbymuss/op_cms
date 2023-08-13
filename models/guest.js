const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getHeaderData(){
    const data = await prisma.websiteparams.findUnique({
        where:{
            id:1
        },
        select:{
            email:true,
            logo_path:true,
            phone_number:true,
            website_title:true
        }
    });

    return data;
}

async function GetPageDataBySlug(slug){
    const pageData = await prisma.page.findUnique({
        where:{
            slug:slug
        },
        select:{
            template_file:true,
            pagecomponent:{
                include:{
                    pageimage:{
                        select:{
                            image_path:true
                        }
                    }
                }
            }
        }
    });

    if(!pageData){
        return null;
    }

    // Make a key-value array with the key being the classSelector, and the data being the whole object.

    const structuredComponentData = pageData.pagecomponent.reduce((result, item) => {
        result[item.classSelector] = item;
        return result;
      }, {});

    structuredComponentData['template_file'] = pageData['template_file'];
    console.log(pageData);
    console.log(structuredComponentData);
    return structuredComponentData;
}

async function GetLastFiveLocationsData(){
    const locationsData = await prisma.page.findMany({
        select:{
            slug:true,
            location:{
                select:{
                    nom:true
                }
            }
        },
        where:{
            location:{
                isNot:null
            }
        },
        take:5,
        orderBy:{
            createdAt:'desc'
        }
    });
    return locationsData;
}

async function createCommandArchive(data){
    const insertedData = await prisma.commandsarchive.create({
        data:data
    })
    return insertedData;
}

module.exports = {
    getHeaderData,
    GetPageDataBySlug,
    GetLastFiveLocationsData,
    createCommandArchive
}