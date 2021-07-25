const UserModel = require("../models/user")
const { BadRequestError } = require("./errors")

const findUserByEmail = async (email, selectPassword = false) => {
    if(selectPassword) {
        return UserModel.findOne({email}).select("password firstName middleName lastName email isEmailVerified emailVerificationCode createdAt updatedAt")
    }
    return UserModel.findOne({email}).lean().exec()
}

const findUserById = async (_id) => {
  return UserModel.findOne({_id}).lean().exec()
}

const createUser = async (userDetails) => {
    try {
      const createdUser = await UserModel.create(userDetails)
      return createdUser
    } catch (error) {
      throw BadRequestError(error.message)
    }
}

const updateUserById = async (_id, data) => {
  try {
    const updatedUser = await UserModel.updateOne({_id}, {$set: data})
    return updatedUser
  } catch (error) {
    throw BadRequestError(error.message)
  }
}


module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserById
}