const jwt = require('jsonwebtoken')
//const { SECRET } = process.env
const SECRET = process.env.SECRET

module.exports = (user) => {

    const userForToken = {
        name: user.name,
        lastname: user.lastname,
        id: user.id,
        email:user.email
    }
    const token = jwt.sign(userForToken, SECRET)
    return token
}
