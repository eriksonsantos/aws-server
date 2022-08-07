
exports.runValidation = (req, res, next) => {

    const { email, password } = req.body

    if (email == null || email.length <= 0) {
        res.status(402).json({
            error: "The email don't can are null or empty"
        })
    }
    else if (!ValidateEmail(email)) {
        res.status(402).json({
            error: "You have entered an invalid email address!"
        })
    }
    else if (password == null || password.length <= 0) {
        res.status(402).json({
            error: "The password don't can are null or empty"
        })
    }
    else if (password.length < 6) {
        res.status(402).json({
            error: "The password has that have more 6 characters"
        })
    }
    next()

}

exports.acceptLoginData = (email, password) => {

    if (email == null || email.length <= 0) {
        return false
    }
    else if (password == null || password.length <= 0) {
        return false
    }
    else if (password.length < 6) {
        return false
    }
    else if(!ValidateEmail(email))
        return false
    else
        return true;

}

function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!mail.match(mailformat))
        return false;
    else
        return true
}

