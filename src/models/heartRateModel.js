const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const HeartRate = sequelize.define('HeartRate', {
  from_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  low: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  high: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'heart_rate_data',
  timestamps: false,
});

module.exports = HeartRate;
