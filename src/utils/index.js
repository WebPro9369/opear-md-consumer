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
    active,
    addresses,
    payment_accounts,
    // birthday,
    zip,
    avatar,
    sms_notification
  } = res.data;

  // const dob = getFormattedDate(new Date(birthday));
  const address =
    addresses && addresses.length ? addresses[addresses.length - 1] : null;

  const addressesAdjusted = (addresses || []).map(a => ({
    id: a.id,
    name: a.name || "",
    street: a.street || "",
    city: a.city || "",
    state: a.state || "",
    zip: a.zip || ""
  }));

  let adjustedAvatar = avatar;

  if (!avatar) {
    adjustedAvatar = "/images/original/missing.png";
  }

  userStore
    .setName(name)
    .setEmail(email)
    .setPhone(phone)
    .setActive(active)
    // .setBirthday(dob)
    .setPaymentAccounts(payment_accounts)
    .setZip(zip)
    .setAddresses(addressesAdjusted)
    .setAvatar(adjustedAvatar)
    .setSmsNotification(sms_notification);

  if (address) {
    userStore.address
      .setName(address.name || "")
      .setStreet(address.street || "")
      .setCity(address.city || "")
      .setState(address.state || "")
      .setZipCode(address.zip || "");
  }
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
