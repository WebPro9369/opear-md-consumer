/* eslint-disable camelcase */
// import { getFormattedDate } from "./helpers";

export const formatCardInfo = data => ({
  cardNumber: data.cardNumber || "",
  expiryYear: data.expiryYear || 0,
  expiryMonth: data.expiryMonth || 0,
  cvv: data.cvv || "",
  cardType: data.cardType || "",
  fullName: data.fullName || ""
});

export const userFromResult = (res, userStore) => {
  const {
    name,
    email,
    phone,
    // payment_accounts,
    // birthday,
    zip
    // active
  } = res.data;

  // const dob = getFormattedDate(new Date(birthday));

  userStore
    .setName(name)
    .setEmail(email)
    .setPhone(phone)
    // .setBirthday(dob)
    // .setPaymentAccounts(payment_accounts)
    .setZip(zip);
};

export const getAge = birthDate => {
  const birthDateDate = new Date(birthDate);
  const currentDate = new Date();
  const diffDate = currentDate - birthDateDate;
  const age = Math.floor(diffDate / 31557600000);
  return age;
};

export const getIndexByValue = (toSearch, id) => {
  return toSearch.map(o => o.id).indexOf(id);
};

export const getValueById = (toSearch, id) => {
  const index = getIndexByValue(toSearch, id);
  return toSearch[index];
};
