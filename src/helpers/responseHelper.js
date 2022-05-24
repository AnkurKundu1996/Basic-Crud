const successHandler  = (h, code, message, data=null) => {
    return h.status(code).json({
        message,
        data
    });
};

const errorHandler = (h, code, message) =>{
    return h.status(code).json({
        message
    });
};

module.exports = {
    successHandler,
    errorHandler
}