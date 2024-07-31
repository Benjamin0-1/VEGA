// crear usuario admin
// desactivar user
// activar user
// ver users.
// extra: email masivo.
const { User, Admin} = require('../../db');
const { Op, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt'); // en heroku es bcryptjs
const saltRounds = 10;
const nodemailer = require('nodemailer');
//const { User } = require('../../models/User');

// todas llevan el middleware de admin.

// NODEMAILER CONFIG
const nodemailerOptions = {
    service: 'gmail',
    auth: {
        user: 'oliver125125@gmail.com',
        pass: 'aiyp fvhl djxd rjny',
    }
};

async function initializeTransporter() {
    const testAccount = await nodemailer.createTestAccount();

    nodemailerOptions.auth.user = nodemailerOptions.auth.user;
    nodemailerOptions.auth.pass = nodemailerOptions.auth.pass;

    const transporter = nodemailer.createTransport(nodemailerOptions);

    return transporter;
};

async function sendMail(transporter, to, subject, message) {
    try {
        const info = await transporter.sendMail({
            from: nodemailerOptions.auth.user,
            to: to,
            subject: subject,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f2f2f2;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333333;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #666666;
                                font-size: 16px;
                                line-height: 1.5;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>${subject}</h1>
                            <p>${message}</p>
                        </div>
                    </body>
                </html>
            `
        });
        console.log(`Message sent: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
        console.error(`Error sending email to ${to}: ${error}`);
        throw error;
    }
};


// PUT
const disableUserById = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ missingUserId: 'Debe incluir id de usuario a desactivar' });
    }

    try {
        // Asegurar que un admin no puede ser baneado
        const checkIsAdmin = await Admin.findOne({ where: { user_id } });
        if (checkIsAdmin) {
            return res.status(403).json({ cannotBanAdmin: 'No se puede desactivar un administrador' });
        }

        const userToBan = await User.findOne({ where: { id: user_id } });
        if (!userToBan) {
            return res.status(404).json({ userNotFound: 'Usuario no encontrado' });
        }

        if (userToBan.deleted_at) {
            return res.status(400).json({ userAlreadyDisabled: true })
        }

        await userToBan.update({ deleted_at: new Date() });

        // EMAIL
        const transporter = await initializeTransporter();
        await sendMail(transporter, userToBan.email, 'Cuenta desactivada', 'Tu cuenta ha sido desactivada.');


        return res.json({ userBanned: `Usuario con id: ${user_id} ha sido desactivado` });
    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`);
    }
};

// PUT
const disableUserByEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ missingEmail: 'Debe ingresar el email del usuario a desactivar' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ userNotFound: 'Usuario no encontrado' });
        };

        // revisar si el usuario ya ha sido desactivado
        if (user.deleted_at !== null) {
            return res.status(400).json({ userAlreadyDisabled: 'este usuario ya ha sido desactivado' })
        }

        // Revisar si el usuario a eliminar es admin.
        const checkIsAdmin = await Admin.findOne({ where: { user_id: user.id } });

        if (checkIsAdmin) {
            return res.status(403).json({ cannotBanAdmin: 'No se puede desactivar un administrador' });
        }

        await user.update({ deleted_at: new Date() });

        // EMAIL
        const transporter = await initializeTransporter();
        await sendMail(transporter, user.email, 'Cuenta desactivada', 'Tu cuenta ha sido desactivada.');

        return res.json({ userBanned: `Usuario con email: ${email} ha sido desactivado` });
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};


// re-activar un usuario por ID
const activateUserById = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ missingData: 'faltan datos' })
    };
    // revisar si usuario NO SE ENCUENTRA DESACTIVADO
    try {

        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ userNotFound: true })
        }

        if (user.deleted_at === null) {
            return res.status(400).json({ userAlreadyEnabled: true })
        }

        // un ban the user
        await user.update({ deleted_at: null })

        // EMAIL
        const transporter = await initializeTransporter();
        await sendMail(transporter, user.email, 'Cuenta activada', 'Tu cuenta ha sido activada.');


        return res.status(201).json('usuario Activado exitosamente')

    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`)
    }
};

// re-activar a un usuario por EMAIL   
const activateUserByEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ missingEmail: 'Debe ingresar el email del usuario a activar' });
    }

    try {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ userNotFound: 'Usuario no encontrado' });
        };

        // revisar si es que el usuario ya se encuentra activado
        if (user.deleted_at === null) {
            return res.status(400).json({ userAlreadyEnabled: 'El usuario ya está activado', user });
        };

        await user.update({ deleted_at: null });

        // EMAIL
        const transporter = await initializeTransporter();
        await sendMail(transporter, user.email, 'Cuenta activada', 'Tu cuenta ha sido activada.');


        return res.status(201).json({ message: `Usuario con email: ${email} ha sido activado exitosamente` });


    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }

};

// ver todos los usuarios NO desactivados. GET
const viewAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({
            where: { deleted_at: null },
            include: [ {
                model: Admin,
                as: 'admin', // Ensure this alias matches your association alias
                required: false // This makes the Admin association optional
            } ]
        });

        if (allUsers.length === 0) {
            return res.status(404).json({ noUsersFound: 'No existen usuarios' });
        }

        const usersWithAdminStatus = allUsers.map(user => ({
            ...user.toJSON(),
            isAdmin: user.admin !== null // Check if `admin` association exists
        }));

        return res.json(usersWithAdminStatus);
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};





// ver todos los usuarios desactivados. GEY
const viewAllDisabledUsers = async (req, res) => {
    try {
        const allBannedUsers = await User.findAll({
            where: {
                deleted_at: {
                    [ Op.ne ]: null
                }
            }
        });

        if (allBannedUsers.length === 0) {
            return res.status(404).json({ noBannedUsersFound: 'No hay usuarios desactivados actualmente' });
        }

        return res.json(allBannedUsers);

    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};



// POST
const createAdminUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ missingData: 'Faltan datos obligatorios' });
    };


    // email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ invalidEmailFormat: 'El formato del email no es válido' });
    }

    try {
        const checkEmailNotInUse = await User.findOne({ where: { email } });
        if (checkEmailNotInUse) {
            return res.status(400).json({ emailAlreadyInUse: `El email ${email} ya está en uso` });
        }
        // no revisamos si es que el usuario ya existe porque
        // revisando el email ya nos encargamos de eso inmediatamente.

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        await Admin.create({ user_id: user.id });


        return res.status(201).json({ success: 'Usuario administrador creado exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};

// VER TODAS LAS ORDENES REALIZADAS, COMPLETADAS.
const viewAllOrders = async (req, res) => {
    try {
        const allOrders = await OrderPayment.findAll({
            //  la relacion ha sido comentado porque falta arreglarlas en db.js
            include: [
                {
                    model: User,
                    attributes: [ 'id', 'name', 'lastname', 'email' ]
                }
            ]
        });

        if (allOrders.length === 0) {
            return res.status(404).json({ noOrdersFound: 'No existen ordenes realizadas' });
        }

        res.json(allOrders);
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

// Enviar correo masivo a todos los usuarios registrados
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailAllRegisteredUsers = async (req, res) => {
    const { subject, message } = req.body; // lo que les diras a los usuarios en el correo.

    if (!subject || !message) {
        return res.status(400).json({ missingData: 'Faltan datos' });
    }

    try {
        const allUserEmails = await User.findAll({
            attributes: [ 'email' ]
        });

        if (allUserEmails.length === 0) {
            return res.status(404).json({ noEmailsFound: 'No hay correos disponibles' });
        }

        const transporter = await initializeTransporter();


        for (const user of allUserEmails) {
            if (user.email) { // siempre existiran los emails.
                await sendMail(transporter, user.email, subject, message);
            }
        }

        return res.json({ success: 'Emails enviados con éxito' });
    } catch (error) {
        console.error('Error sending emails:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// funcion auxiliar
const addAdminRoleToExistingUser = async (req, res) => {
    const { userId } = req.body;


    try {
        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ userNotFound: `No se encontró un usuario` });
        }

        // Verificar si el usuario ya es administrador
        const isAdmin = await Admin.findOne({ where: { user_id: userId } });
        if (isAdmin) {
            return res.status(400).json({ alreadyAdmin: `El usuario ya es administrador` });
        }
        user.isAdmin = true;
        await user.save();
        // Añadir el rol de administrador al usuario
        await Admin.create({ user_id: user.id });

        return res.status(201).json({ success: 'Rol de administrador añadido exitosamente' });
    } catch (error) {
        console.error('Error al añadir el rol de administrador:', error);
        return res.status(500).json({ error: `Error interno del servidor: ${error}` });
    }
};


const makeAdmin = async (req, res) => {
    const { userId } = req.body
    console.log(userId);
    try {
        // Buscar al usuario por su userId
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Verificar si ya es administrador
        const isAdmin = await Admin.findOne({ where: { user_id: userId } });

        if (isAdmin) {
            return res.status(400).send({ error: 'El usuario ya es administrador' });
        }

        // Actualizar el usuario a administrador
        user.isAdmin = true;
        await user.save();

        // Guardar al usuario como administrador en el modelo Admin
        await Admin.create({ user_id: userId });

        return res.status(201).send({ success: 'Usuario actualizado y guardado como administrador' });
    } catch (error) {
        return { error: `Error al actualizar y guardar usuario como administrador: ${error.message}` };
    }
};

module.exports = {
    disableUserById,
    disableUserByEmail,
    viewAllUsers,
    viewAllDisabledUsers,
    createAdminUser,
    activateUserByEmail,
    activateUserById,
    viewAllOrders,
    addAdminRoleToExistingUser,
    emailAllRegisteredUsers,
    makeAdmin,
};

/**
 * const viewUsers = async (req, res) => {
    const { status } = req.query; 

    try {
        let users;
        if (status === 'disabled') {
            users = await User.findAll({
                where: {
                    deleted_at: {
                        [Op.not]: null // where deleted_at is NOT null.
                    }
                }
            });

            if (users.length === 0) {
                return res.status(404).json({ noDisabledUsersFound: 'No hay usuarios desactivados actualmente' });
            }
        } else {
            users = await User.findAll();

            if (users.length === 0) {
                return res.status(404).json({ noUsersFound: 'No existen usuarios' });
            }
        }

        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};


 */

/**
 * Op.eq: Equal to
Op.ne: Not equal to
Op.gt: Greater than
Op.gte: Greater than or equal to
Op.lt: Less than
Op.lte: Less than or equal to
Op.between: Between
Op.notBetween: Not between
Op.in: In array
Op.notIn: Not in array
Op.like: Like (pattern matching)
Op.notLike: Not like (pattern matching)
Op.startsWith: Starts with (string)
Op.endsWith: Ends with (string)
Op.substring: Contains substring
Op.not: IS NOT (null comparison)
Op.is: IS (null comparison)

 */
