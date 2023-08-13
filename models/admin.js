const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserAdmin(user, pass){
    const userData = await prisma.admin.findFirst({
        where:{
            username:user,
            password:pass
        }
    });
    return userData;
}

async function updateThemeColors(primary_c, secondary_c){
    await prisma.websiteparams.update({
        where:{
            id:1
        },
        data:{
            primary_color:primary_c,
            secondary_color:secondary_c
        }
    })
}

async function getThemeColors(){
    const webParams = await prisma.websiteparams.findUnique({
        where:{
            id:1
        },
        select:{
            primary_color:true,
            secondary_color:true
        }
    });
    return webParams;
}

async function getWebsiteParameters(){
    const webParams = await prisma.websiteparams.findUnique({
        where:{
            id:1
        },
        select:{
            website_title:true,
            phone_number:true,
            email:true,
            logo_path:true
        }
    });
    return webParams;
}

async function updateWebsiteParameters(title,logo_path,email,phone_number){
    await prisma.websiteparams.update({
        where:{
            id:1
        },
        data:{
            website_title:title,
            email:email,
            phone_number:phone_number,
            ...(logo_path && {logo_path:logo_path})
        }
    });
}

async function getStaticPageBySlug(slug){
    const page = await prisma.page.findFirst({
        where:{
            slug:slug,
            location:null
        }
    });
    return page;
}

async function getStaticPageComponentsBySlug(slug){
    const componentsData = await prisma.pagecomponent.findMany({
        where:{
            page:{
                slug:slug,
                location:null
            }
        },
        include:{
            pageimage:true
        }
    });
    return componentsData;
}

async function addStaticPageComponent(title,content,classSelector,slug,imagesPaths){
    await prisma.pagecomponent.create({
        data:{
            title:title,
            content:content,
            classSelector:classSelector,
            page:{
                connect:{
                    slug:slug
                }
            },
            ...(imagesPaths && {pageimage:{
                createMany:{
                    data:imagesPaths
                }
            }}),
        }
    });
}

async function updateStaticPageComponent(id,title,content,classSelector,imagesPaths){
    
    await deleteStaticPageComponentImages(id);
    
    await prisma.pagecomponent.update({
        where:{
            id_component:parseInt(id)
        },
        data:{
            title:title,
            content:content,
            classSelector:classSelector,
            ...(imagesPaths && {pageimage:{
                createMany:{
                    data:imagesPaths
                }
            }})
        }
    });
}

async function deleteStaticPageComponent(id){
    await prisma.pagecomponent.delete({
        where:{
            id_component:parseInt(id)
        },
       })
}

async function getLocations(){
    const locationsData = await prisma.page.findMany({
        where:{
            location:{
                isNot:null
            }
        },
        select:{
            slug:true,
            location:{
                select:{
                    nom:true,
                    id_location:true,
                    address:true
                }
            },
            pagecomponent:{
                select:{
                    title:true,
                    content:true,
                    pageimage:{
                        select:{
                            image_path:true
                        }
                    }
                }
            }
        }
    })
    return locationsData;
}

async function addLocation(slug,nameLocation,address,title,content,imgPath){
    await prisma.$queryRaw`CALL AddLocation(${slug} ,${nameLocation},${address},${title},${content},${imgPath})`;
}

async function updateLocation(id, slug, nameLocation, address, title, content, image){
    await prisma.location.update({
        where:{
            id_location:parseInt(id)
        },
        data:{
            // Update "nom" and "address"
            nom:nameLocation,
            address:address,
            page:{
                update:{
                    // Update "slug"
                    slug:slug,
                    pagecomponent:{
                        updateMany:{
                            where:{},
                            data:{
                                title:title,
                                content:content,
                            }
                        },
                    }
                }
            }
        }
    });
    // Checks if an image path is presents in the parameters
    image && await prisma.pageimage.updateMany({
        where:{
            pagecomponent:{
                page:{
                    location:{
                        id_location:parseInt(id)
                    }
                }
            }
        },
        data:{
            image_path:image['name']
        }
    });
}

async function deleteLocation(page_id){
    await prisma.page.delete({
        where:{
            id_page:page_id
        }
    });
}

async function deleteStaticPageComponentImages(id){
    await prisma.pageimage.deleteMany({
        where:{
            id_component:parseInt(id)
        },
       })
}


module.exports = {
    getUserAdmin,

    updateThemeColors,
    getThemeColors,

    getWebsiteParameters,
    updateWebsiteParameters,

    getStaticPageBySlug,
    getStaticPageComponentsBySlug,
    addStaticPageComponent,
    updateStaticPageComponent,
    deleteStaticPageComponent,

    deleteStaticPageComponentImages,

    getLocations,
    addLocation,
    updateLocation,
    deleteLocation
}