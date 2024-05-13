const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('Item', {
  nazwa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  opis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kategoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Item;