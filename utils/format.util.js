const isEmailValid = (email) => {
  // Mengecek apakah email tidak kosong
  if (!email) {
    return false
  }

  // Mengecek apakah terdapat tepat satu "@" dalam email
  var atIndex = email.indexOf('@')
  if (atIndex === -1 || email.indexOf('@', atIndex + 1) !== -1) {
    return false
  }

  // Mengecek apakah "@" tidak berada di posisi pertama atau terakhir
  if (atIndex === 0 || atIndex === email.length - 1) {
    return false
  }

  // Mengecek apakah terdapat tepat satu "." setelah "@"
  var dotIndex = email.indexOf('.', atIndex)
  if (
    dotIndex === -1 ||
    dotIndex === email.length - 1 ||
    dotIndex - atIndex === 1
  ) {
    return false
  }

  return true
}

module.exports = { isEmailValid }
