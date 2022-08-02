
exports.runValidation = (req,res,next)=>{

    const {name, email, password} = req.body

    if(name == null || name.length <= 0){
        res.status(402).json({
            error:"The name don't can are null or empty"})
    }
    else if(email == null || email.length <= 0){
        res.status(402).json({
            error:"The name don't can are null or empty"})
    }
    else if(password == null || password.length <= 0){
        res.status(402).json({
            error:"The name don't can are null or empty"})
    }
    else if(password.length < 6){
        res.status(402).json({
            error:"The password has that have more 6 characters"})
    }
    next()

}

exports.acceptData = (name, email,password)=>{

    if(name == null || name.length <= 0){
       return false
    }
    else if(email == null || email.length <= 0){
        return false
    }
    else if(password == null || password.length <= 0){
        return false
    }
    else if(password.length < 6){
        return false
    }
    else
        return true;

}

