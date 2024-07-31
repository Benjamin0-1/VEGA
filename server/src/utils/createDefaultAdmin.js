const { User, Admin } = require('../db.js');

const createDefaultAdmin = async () => {
  const defaultAdminEmail = 'admin@gmail.com';
  const defaultAdminPassword = '12345';

  const adminUser = await User.findOne({ where: { email: defaultAdminEmail } });
  if (!adminUser) {
    const newUser = await User.create({
      email: defaultAdminEmail,
      password: defaultAdminPassword,
      name: 'Admin',
      lastname: 'User',
      isAdmin: true // we use the admin table for a more scalable solution.
    });

    await Admin.create({ user_id: newUser.id }); // this table.
    console.log('Default admin created.');
  } else {
    // Check if the admin record already exists
    const adminRecord = await Admin.findOne({ where: { user_id: adminUser.id } });
    if (!adminRecord) {
      await Admin.create({ user_id: adminUser.id });
      console.log('Admin record created for existing admin user.');
    } else {
      console.log('Default admin already exists.');
    }
  }
};

module.exports = createDefaultAdmin;
