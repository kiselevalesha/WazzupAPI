
module.exports = function (req, res, next) {

    //  Достаём из заголовка токен
    let strToken = '';
    if (req)
        if (req.headers)
            if (req.headers.authorization)        
                strToken = req.headers.authorization.split(' ')[1];

    if (strToken.length > 0)
        req.token = strToken;

    next();
}
