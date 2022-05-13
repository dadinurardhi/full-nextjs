import bcrypt from 'bcryptjs';
import db from '../../../libs/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  console.log(passwordHash);

  const register = await db('users').insert({ email, password: passwordHash });
  const registeredUser = await db('users').where({ id: register }).first();

  res.status(200);
  res.json({
    message: 'User registered successfully',
    data: registeredUser,
  });
}
