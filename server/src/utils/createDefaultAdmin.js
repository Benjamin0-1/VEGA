
const createDefaultAdmin = async () => {
    const defaultAdminEmail = 'admin@gmail.com';
    const defaultAdminPassword = '12345'; 
    const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
  
    const adminUser = await User.findOne({ where: { email: defaultAdminEmail } });
    if (!adminUser) {
      const newUser = await User.create({
        email: defaultAdminEmail,
        password: hashedPassword,
        name: 'Admin',
        lastname: 'User'
      });
  
      await Admin.create({ user_id: newUser.id });
  
      console.log('Default admin creado.');
    } else {
      console.log('Admin por defecto ya existe.');
    }
  };

