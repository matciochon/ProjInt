const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');


const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_przedmiotu: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imię_nazwisko: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data_od: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_do: {
    type: DataTypes.DATE,
    allowNull: false
  },
  komentarz: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Reservation;
