import jwt from 'jsonwebtoken';
import User from '../models/User';

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, userType: user.userType }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, message: 'Login successful' });
};
