const jwt = require('jsonwebtoken');
const AuthToken = require('../models/authToken');
const env = require('../config/env');
const responseHelper = require('../helpers/responseHelper');

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const verified = jwt.verify(token,env.JWT_SECRET);
        const checkToken = await AuthToken.findOne({
            where: {userId: verified.id, token: token},
            include: 'users'
        });

        if(!checkToken){
            throw new Error()
        }
        req.user = checkToken.users;
        req.token = token;
        next();
    }catch(e){
        responseHelper.errorHandler(res, 401, 'Unauthenticated');
    }
}

module.exports = auth;