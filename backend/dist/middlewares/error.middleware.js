export const errorMiddleware = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        error: message,
        details: err.details || undefined
    });
};
