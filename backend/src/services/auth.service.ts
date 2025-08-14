import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import ms from 'ms';
import { User } from '../entities/user.entity.js';

export class AuthService {
  async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE (username=? OR email=?) AND status=1',
      [usernameOrEmail, usernameOrEmail]
    );
    const arr = rows as User[];
    return arr[0] ?? null;
  }

  async login(usernameOrEmail: string, password: string) {
    const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) throw { status: 401, message: 'Invalid credentials' };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw { status: 401, message: 'Invalid credentials' };

    // Validar que el secreto JWT exista
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    // Convertir expiresIn usando ms, forzando tipo StringValue
    const expiresIn = ms((process.env.JWT_EXPIRES_IN || '5m') as ms.StringValue);

    const options: SignOptions = { expiresIn };

    // Generar token
    const token = jwt.sign(
      { sub: user.id, role: user.role, username: user.username },
      jwtSecret as Secret,
      options
    );

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
