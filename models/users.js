import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../services/healthCheckServices.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  account_created: {
    type: Sequelize.DATE
  },
  account_updated: {
    type: Sequelize.DATE
  }
},
{
    createdAt: 'account_created',
    updatedAt: 'account_updated'
});

export default User;
