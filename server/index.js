const app = require('./src/app.js');
const { conn, User, Admin } = require('./src/db.js');

(async () => {
  try {
    await conn.sync({ force: false });

    const adminUser = await User.findOne({ where: { email: 'admin@gmail.com' } });

    if (!adminUser) {
      const newUser = await User.create({
        name: 'Admin',
        lastname: 'Admin1',
        username: 'admin',
        password: '12345',
        email: 'admin@gmail.com',
      });
      console.log('Default admin user created.');

      await Admin.create({ user_id: newUser.id });
      console.log('Admin record created.');
    } else {
      await Admin.create({ user_id: adminUser.id });
      console.log('Admin record already exists.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    app.listen(3001, () => {
      console.log('Server is listening at 3001');
    });
  }
})();
