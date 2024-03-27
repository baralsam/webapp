import User from '../models/users.js';
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import logger from "../utilities/logger.js";
import { PubSub } from '@google-cloud/pubsub';

const pubSubClient = new PubSub({ projectId: 'clod-assignment' });

async function createUser(req, res) {
  try {
    const { email, password, firstName, lastName, ...otherFields  } = req.body;

    const allowedFields = ['firstName', 'lastName', 'password', 'email'];
    const invalidFields = Object.keys(otherFields).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
      logger.error("Invalid fields provided while creating a user");
      return res.status(400).json({ error: 'Bad Request: Invalid fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!email || !password || !firstName || !lastName) {
      logger.error("Please provide values for all fields");
      return res.status(400).json({ error: 'Please provide values for all fields' });
    }
    if (existingUser) {
      logger.error("User with this email already exists");
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
      isVerified: false
    });
    await publishMessage(userId,newUser.email, newUser.firstName, newUser.lastName);
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    logger.info("User created successfully");
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function publishMessage(userId,email, firstName, lastName) {
  const topicName = 'verify_email'; 
  const data = JSON.stringify({ userId, email, firstName, lastName });
  const dataBuffer = Buffer.from(data);

  try {
    await pubSubClient.topic(topicName).publish(dataBuffer);
    logger.info("Message published successfully to Pub/Sub");
  } catch (error) {
    logger.error("Error publishing message to Pub/Sub:", error);
  }
}

async function getUsers(req, res) {
    try {
      if (!req.user) {
        logger.error("User not found");
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      } 
      
      const contentType = req.headers['content-type'];
      if(contentType ) { 
              logger.error("Invalid request headers while fetching a user");
              return res.status(400).send();
            }
          if(Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0){   
              logger.error("Invalid request body while fetching a user");
              return res.status(400).send();
          }
      const { password: _, ...userWithoutPassword } = req.user.toJSON();
      logger.info("User fetched successsfully");
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      logger.error("Internal Server Error");
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function updateUser(req, res) {
    try {
      if (!req.user) {
        logger.error("User not found");
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }

      const { firstName, lastName, password, ...otherFields } = req.body;
      const allowedFields = ['firstName', 'lastName', 'password'];
      const invalidFields = Object.keys(otherFields).filter(field => !allowedFields.includes(field));
  
      if (invalidFields.length > 0) {
        logger.error("Invalid fields while updating a user");
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
      logger.info("User updated succesfully");
      return res.status(204).send();
    } catch (error) {
      logger.error("Internal Server Error");
      return res.status(400).send();
    }
  }  

  async function verifyUser(req, res) {
    const token = req.query.token; 
    const user = await User.findOne({ where: { id:token } });
  
    if (!user) {
      return res.status(400).send('Invalid token');
    }
  
    const now = new Date(); // Current UTC time
    const verificationSentAt = new Date(user.verificationSentAt); 
    const diffInMilliseconds = now.getTime() - verificationSentAt.getTime();
    const diffInMinutes = diffInMilliseconds / (1000 * 60); // Convert milliseconds to minutes
  
    if (diffInMinutes > 2) {
        return res.status(400).send('Token expired');
    }
    user.verificationClickedAt = now;
    user.isVerified = true;
    await user.save();
  
    res.send('Email verified successfully. Your account is now activated.');
  }
  

export { createUser, getUsers, updateUser, verifyUser };