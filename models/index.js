const User = require('./user');
const Patient = require('./patient');

User.hasMany(Patient, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Patient.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Patient };