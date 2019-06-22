import { getFormattedDate } from "./helpers";

export const formatCardInfo = data => ({
  cardNumber: data.cardNumber || "",
  expiryYear: data.expiryYear || 0,
  expiryMonth: data.expiryMonth || 0,
  cvv: data.cvv || "",
  cardType: data.cardType || "",
  fullName: data.fullName || ""
});

export const userFromResult = (res, userStore) => {
  const { name, email, phone, payment_accounts, birthday, zip, active } = res.data;

  const dob = getFormattedDate(new Date(birthday));

  const [firstName, lastName] = name.split(" ");

  userStore
    .setFirstName(firstName)
    .setLastName(lastName)
    .setEmail(email)
    .setPhone(phone)
    .setBirthday(dob)
    .setPaymentAccounts(payment_accounts)
    .setZip(zip)
    .setActive(active);
  };

  export const getAge = birthDate => {
    var birthDateDate = new Date(birthDate);
    var currentDate = new Date();
    var diffDate = currentDate-birthDateDate;
    var age = Math.floor(diffDate/31557600000);
    return age;
  };

  export const getIndexByValue = (toSearch,id) => {
    return toSearch.map((o) => o.id).indexOf(id)
};
