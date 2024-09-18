class User {
  constructor(username, email, password, confirmPassword) {
    this.username = username.trim().toLowerCase()
    this.email = email.trim().toLowerCase()
    this.password = password,
    this.confirmPassword = confirmPassword
  }
}

export default User
