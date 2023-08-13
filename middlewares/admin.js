
function isAdmin(req,res,next){
    let allowed = true;

    if(req.session){
        if(req.session.username){
            allowed = true
        }else{
            allowed = false
        }
    }else{
        allowed = false;
    }

    if(allowed){
        next();
    }else{
        res.redirect('/admin/login');
        return;
    }

}

module.exports = {
    isAdmin
}