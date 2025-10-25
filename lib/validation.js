export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePin = (pin) => {
  return /^\d{5,6}$/.test(pin)
}

export const validateName = (name, minLength, maxLength) => {
  return name.length >= minLength && name.length <= maxLength
}
