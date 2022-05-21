

const errorHandler = (err, req, res, next) => {
    console.log('entered error handler')

    const errorJson = {msg: '', stack: ''}

    const statusCode = res.statusCode ? res.statusCode: 500;

    res.status(statusCode)

    errorJson.msg = err.message
    errorJson.stack = process.env.NODE_ENV === 'production' ? null: err.stack
    
    res.json(errorJson)
}



module.exports = {errorHandler}