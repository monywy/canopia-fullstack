import { AuthService } from '../services/auth.service.js';
const service = new AuthService();
export const loginController = async (req, res, next) => {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return next({ status: 400, message: 'usernameOrEmail and password are required' });
        }
        const result = await service.login(usernameOrEmail, password);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
