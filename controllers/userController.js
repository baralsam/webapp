import User from '../models/users.js';
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

async function createUser(req, res) {
  try {
    const { email, password, firstName, lastName, ...otherFields  } = req.body;

    const allowedFields = ['firstName', 'lastName', 'password', 'email'];
    const invalidFields = Object.keys(otherFields).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
      return res.status(400).json({ error: 'Bad Request: Invalid fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Please provide values for all fields' });
    }
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const userId = uuidv4();
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const newUser = await User.create({
      id: userId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getUsers(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
      const contentType = req.headers['content-type'];
      if(contentType ) { 
              return res.status(400).send();
            }
          if(Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0){   
              return res.status(400).send();
          }
      const { password: _, ...userWithoutPassword } = req.user.toJSON();
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function updateUser(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
      const { firstName, lastName, password, ...otherFields } = req.body;
      const allowedFields = ['firstName', 'lastName', 'password'];
      const invalidFields = Object.keys(otherFields).filter(field => !allowedFields.includes(field));
  
      if (invalidFields.length > 0) {
        return res.status(400).json({ error: 'Bad Request: Invalid fields' });
      }

      const updatedFields = {};
      if (firstName) {
        updatedFields.firstName = firstName;
      }
      if (lastName) {
        updatedFields.lastName = lastName;
      }
      if (password) {
        const saltRounds = 10;
        updatedFields.password = await bcryptjs.hash(password, saltRounds);
      }
      const updatedUser = await req.user.update(updatedFields);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }  

export { createUser, getUsers, updateUser };