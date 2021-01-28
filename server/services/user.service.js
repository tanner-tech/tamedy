// Model Modules
const User = require("../models/User");
const EmailConfirmation = require("../models/EmailConfirmation");

/**
 * @param { object } user User data to be added
 * @return { Promise } Promise
 */
const createUser = user => {
    return User.create(user);
}
/**
 * @param { string } query Update User
 * @return { Promise } Promise
 */
const updateUser = (userId, query) => {
    return User.findByIdAndUpdate(userId, query).lean();
}
/**
 * @param { object } query Query to check user
 * @return { Promise } Promise
 */
const checkUserExists = async query => {
    return User.findOne(query).lean();
}
/**
 * @param { object } query Query to check email confirmation
 * @return { Promise } Promise
 */
const checkConfirmationEmailExists = async query => {
    return EmailConfirmation.findOne(query).lean();
}
/**
 * @param { object } query Query to delete email confirmation
 * @return { Promise } Promise
 */
const deleteConfirmationEmail = async query => {
    return EmailConfirmation.findOneAndDelete(query).lean();
}
/**
 * @param { object } confData Data needed for Confirmation
 * @return { Promise } Promise
 */
const createConfirmationData = confData => {
    return EmailConfirmation.create(confData);
}

module.exports = {
    createUser,
    checkUserExists,
    createConfirmationData,
    checkConfirmationEmailExists,
    deleteConfirmationEmail,
    updateUser
}