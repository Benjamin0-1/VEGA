const app = require('./src/app.js');
const { conn, User, Admin } = require('./src/db.js');

conn.sync({ force: false }).then(async () => {

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
  } else {
    await Admin.create({ user_id: adminUser.id });
  }

  app.listen(3001, () => {
    console.log('Server is listening at 3001');
  });
});
