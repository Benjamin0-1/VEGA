const app = require('./src/app.js');
const { conn, User, Admin } = require('./src/db.js');
const createDefaultAdmin = require('./src/utils/createDefaultAdmin.js');

(async () => {
  try {
    await conn.sync({ force: false });

    const adminUser = await User.findOne({ where: { email: 'admin@gmail.com' } });

    if (!adminUser) {
      await createDefaultAdmin();
    } else {
      // we also check that it exists in the admin model.
      const adminRecord = await Admin.findOne({ where: { user_id: adminUser.id } });
      if (!adminRecord) {
        await Admin.create({ user_id: adminUser.id }); // if it doesn't exist, we create it.
        console.log('Admin record created for existing admin user.');
      } else {
        console.log('Admin record already exists.');
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    app.listen(3001, () => { // process.env.PORT || 3001 <-
      console.log('Server is listening at 3001');
    });
  }
})();
