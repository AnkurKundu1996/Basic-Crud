const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/user');
const AuthToken = require('../models/authToken');
const responseHelper = require('../helpers/responseHelper');
const mailSendingHelper = require('../helpers/mailSendingHelper');
const commonHelper = require('../helpers/commonHelper');

/* Register new User */
const createUser = async(req,res) => {
    try{
        const newUser = await User.create({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 8)
        });

        responseHelper.successHandler(res, 201,'User Created Successfully', newUser);
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
};

/* User Login */
const loginUser = async(req,res) => {
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        });
        if(!user){
            responseHelper.errorHandler(res, 404,'User not found');
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            responseHelper.errorHandler(res, 404,'User not found');
        }

        var token = jwt.sign({id: user.id}, env.JWT_SECRET, {expiresIn: 60*60});
        await AuthToken.create({
            userId: user.id,
            token
        });
        responseHelper.successHandler(res, 200,'User Logged in Successfully', {
            user,
            token
        });
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
}

/* User Logout */
const logoutUser = async(req,res) => {
    try{
        await AuthToken.destroy({
            where: {token: req.token}
        });
        responseHelper.successHandler(res, 200,'User Logged out Successfully');
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
};

/* Send Verification code through mail */
const sendForgetPasswordMail = async(req,res) => {
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        });
    
        if(!user){
            responseHelper.errorHandler(res, 404,'No User found');
        }

        let v_code = Math.floor(100000 + Math.random() * 900000);
        let v_timestamp = commonHelper.getTime();
        await user.update({
            vCode: v_code,
            vTimestamp: v_timestamp
        });
        mailSendingHelper.forgetPasswordMail(req.body.email, user.firstName +' '+ user.lastName, v_code);
        responseHelper.successHandler(res, 200,'Mail Send Successfully');
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
}

/* Check the authenticity of the Verification code */
const checkUserVCode = async(req,res) => {
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        });

        if(!user){
            responseHelper.errorHandler(res, 404,'No User found');
        }

        if(!user.vCode){
            responseHelper.errorHandler(res, 401,'Verification code not Found');
        }else if(commonHelper.getTime() - user.vTimestamp > 60){
            responseHelper.errorHandler(res, 401,'OTP Expired');
        }else if(req.body.code != user.vCode){
            responseHelper.errorHandler(res, 401,'OTP mismatched');
        }

        await user.update({
            vCode: null,
            vTimestamp: null
        });

        responseHelper.successHandler(res, 200,'Verification succeeded');
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
}

/* Create a new Password */
const changeUserPassword = async(req,res) => {
    try{
        const user = await User.findOne({
            where: {email: req.body.email}
        });

        if(!user){
            responseHelper.errorHandler(res, 404,'No User found');
        }

        await user.update({
            password: await bcrypt.hash(req.body.password, 8)
        });

        responseHelper.successHandler(res, 200,'Password Changed Successfully');
    }catch(e){
        responseHelper.errorHandler(res, 400, e.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    sendForgetPasswordMail,
    checkUserVCode,
    changeUserPassword
};