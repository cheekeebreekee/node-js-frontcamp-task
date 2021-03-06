let helpers = {};

helpers.logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
}

helpers.clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}

helpers.errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
}

module.exports = helpers;