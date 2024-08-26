const email = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/
const password = /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;'"?/]+$/
const phone = /^0[1-9][0-9]{7}$/

module.exports = { email, password, phone }