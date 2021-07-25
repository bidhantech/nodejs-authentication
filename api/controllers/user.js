const { BadRequestError, AuthenticationError, NotFoundError } = require("../services/errors")
const { createUser, findUserByEmail, findUserById } = require("../services/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (data) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password } = data

        // check if same email id already exists in the DB
        if (await findUserByEmail(email)) {
            throw BadRequestError("Email already exists!")
        }

        // hash the password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUND))
        const hashedPassword = await bcrypt.hash(password, salt)

        await createUser({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword
        })

        return {
            message: "User Registered Successfully! Please verify Email!"
        }
    } catch (error) {
        throw BadRequestError(error.message)
    }
}


const loginUser = async (data) => {
    try {
        const { email, password } = data

        // try to find the user and include the password as well for bcrypt compare
        const selectPassword = true
        const user = await findUserByEmail(email, selectPassword)
        if (!user) {
            throw AuthenticationError("Email or password is incorrect!")
        }

        // check if password is correct
        const passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            throw AuthenticationError("Email or password is incorrect!")
        }

        // generate jwt token
        const token = jwt.sign({ _userId: user._id, email: user.email, firstName: user.name }, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRY_IN_SECONDS) })
        return token
    } catch (error) {
        throw AuthenticationError(error.message)
    }
}

const getUserById = async (userId) => {
    try {
        const userDetails = await findUserById(userId)
        if(!userDetails) {
            throw NotFoundError("User Not Found!")
        }
        return userDetails
    } catch (error) {
        throw NotFoundError(error.message)
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserById
}