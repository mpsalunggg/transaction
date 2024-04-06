const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user.repository')

const profileUser = (id, response) => {
  userRepository.getUserById(id, (err, existingUser) => {
    if (err) {
      response(400, err, null)
      return
    }
    const { email, firstname, lastname, profile_image } = existingUser
    response(200, 'Sukses', { email, firstname, lastname, profile_image })
  })
}

const updateProfileUser = (data, id, response) => {
  userRepository.updateUser(data, id, (err, result) => {
    if (err) {
      response(400, err, null)
      return
    }
    userRepository.getUserById(id, (err, updatedUser) => {
      if (err) {
        response(err, null)
        return
      }
      const { email, firstname, lastname, profile_image } = updatedUser
      response(200, "Sukses", { email, firstname, lastname, profile_image })
    })
  })
}
module.exports = { profileUser, updateProfileUser }
