import jwt from 'jsonwebtoken';
export const authMiddleware = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return next({ status: 401, message: 'Missing or invalid Authorization header' });
    }
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (_e) {
        return next({ status: 401, message: 'Invalid or expired token' });
    }
};
