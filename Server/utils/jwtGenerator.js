import { User } from '../Models/User';

const jwt = require('jsonwebtoken');
require('dotenv').config();

export function generateAccessToken(model) {
    return jwt.sign(model, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}