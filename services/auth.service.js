const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRepository = require('../repositories/auth.repository')
const userRepository = require('../repositories/user.repository')
const { isEmailValid } = require('../utils/format.util')
const { secretKey } = require('../configs/jwt.config')

const registerUser = (user, response) => {
  userRepository.getUserByEmail(user.email, async (err, existingUser) => {
    if (err) {
      response(500, err, null)
      return
    }

    if (existingUser) {
      response(409, 'Email already exists', null)
      return
    }

    if (user.password.length < 8) {
      response(400, 'Password kurang dari 8', null)
      return
    }

    if (!isEmailValid(user.email)) {
      response(400, 'Invalid email format', null)
      return
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const newUser = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: hashedPassword,
    }

    authRepository.register(newUser, (err, userId) => {
      if (err) {
        response(500, err, null)
        return
      }
      response(200, 'Registrasi berhasil silahkan login', userId)
    })
  })
}

const loginUser = (user, response) => {
  userRepository.getUserByEmail(user.email, async (err, existingUser) => {
    if (err) {
      response(500, err, null)
      return
    }

    if (!isEmailValid(user.email)) {
      response(400, 'Parameter email tidak sesuai format', null)
      return
    }
    console.log(existingUser)
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      existingUser.password
    )

    if (!isPasswordMatch) {
      response(400, 'Username atau password salah', null)
      return
    }
    console.log(existingUser.id)

    const authToken = jwt.sign({ id: existingUser.id_user }, secretKey, {
      expiresIn: '12h',
    })

    response(200, 'Login berhasil', { token: authToken })
  })
}

module.exports = {
  registerUser,
  loginUser,
}
