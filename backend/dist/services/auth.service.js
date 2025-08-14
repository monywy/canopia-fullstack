import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ms from 'ms';
export class AuthService {
    async findUserByUsernameOrEmail(usernameOrEmail) {
        const [rows] = await pool.query('SELECT * FROM users WHERE (username=? OR email=?) AND status=1', [usernameOrEmail, usernameOrEmail]);
        const arr = rows;
        return arr[0] ?? null;
    }
    async login(usernameOrEmail, password) {
        const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
        if (!user)
            throw { status: 401, message: 'Invalid credentials' };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw { status: 401, message: 'Invalid credentials' };
        // Validar que el secreto JWT exista
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret)
            throw new Error('JWT_SECRET is not defined');
        // Convertir expiresIn usando ms, forzando tipo StringValue
        const expiresIn = ms((process.env.JWT_EXPIRES_IN || '5m'));
        const options = { expiresIn };
        // Generar token
        const token = jwt.sign({ sub: user.id, role: user.role, username: user.username }, jwtSecret, options);
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };
    }
}
