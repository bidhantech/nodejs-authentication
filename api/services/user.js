const UserModel = require("../models/user")
const { BadRequestError } = require("./errors")

const findUserByEmail = async (email, selectPassword = false) => {
    if(selectPassword) {
        return UserModel.findOne({email}).select("password").lean().exec()
    }
    return UserModel.findOne({email}).lean().exec()
}

const createUser = async (userDetails) => {
    try {
      const createdUser = await UserModel.create(userDetails)
      return createdUser
    } catch (error) {
      throw BadRequestError(error.message)
    }
}



module.exports = {
    createUser,
    findUserByEmail
}