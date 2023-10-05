export const validatePassword = (password) => {
  return password.length < 6 || password.length > 64 ? false : true;
};
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
