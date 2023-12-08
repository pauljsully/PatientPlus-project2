const sequelize = require('../config/connection');
const { User, Patient } = require('../models');

const userData = require('./userData.json');
const patientData = require('./patientData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const patient of patientData) {
    await Patient.create({
      ...patient,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

