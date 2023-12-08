const User = require('./User');
const Patient = require('./Patient');

User.hasMany(Patient, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Patient.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Patient };