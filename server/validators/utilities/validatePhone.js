module.exports = (phone) => {
  const errors = {
    phone: "",
  };
  const phoneNumberRegex = /^(\[0-9]{3}\ |[0-9]{3})[0-9]{3}[0-9]{4}/;

  if (!phoneNumberRegex.test(phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};
