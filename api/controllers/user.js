const { BadRequestError, AuthenticationError, NotFoundError } = require("../services/errors")
const { createUser, findUserByEmail, findUserById, updateUserById } = require("../services/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { sendMail } = require("../services/mail")

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
        const emailVerificationCode = crypto.randomBytes(25).toString("hex")

        await createUser({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            emailVerificationCode
        })

        await sendMail({
            to: email,
            subject: "Verify Email | Resume Builder",
            html: `<h1>Verify Your Email</h1>
                    <p>Thank you for signing up on Resume Builder. <br/>
                    Please verify your email by clicking on this link: <br/>
                    <a href="${process.env.API_URL}/auth/verifyEmail?email=${email}&code=${emailVerificationCode}">${process.env.API_URL}/auth/verifyEmail?email=${email}&code=${emailVerificationCode}</a><br/>
                    Thanks & Regards, <br/>
                    Resume Builder
                    </p>`
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

        if(!user.isEmailVerified) {
            throw AuthenticationError("Please verify email!")
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
        if (!userDetails) {
            throw NotFoundError("User Not Found!")
        }
        return userDetails
    } catch (error) {
        throw NotFoundError(error.message)
    }
}


const verifyUserEmail = async (data) => {
    try {
        const { email, code } = data
        const user = await findUserByEmail(email)
        if (!user) {
            throw BadRequestError("Invalid Request!")
        }
        if (user.emailVerificationCode.toLowerCase() !== code.toLowerCase()) {
            throw BadRequestError("Invalid Code!")
        }

        await updateUserById(user._id, { isEmailVerified: true })
        return {
            "message": "User verified successfully!"
        }
    } catch (error) {
        throw BadRequestError(error.message)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    verifyUserEmail
}