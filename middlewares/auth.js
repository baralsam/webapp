import bcrypt from 'bcrypt';
import User from '../models/users.js';

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid credentials' });
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authenticateUser;
