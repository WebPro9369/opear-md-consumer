import { getFormattedDate } from "./helpers";

export const formatCardInfo = data => ({
  cardNumber: data.cardNumber || "",
  expiryYear: data.expiryYear || 0,
  expiryMonth: data.expiryMonth || 0,
  cvv: data.cvv || "",
  cardType: data.cardType || "",
  fullName: data.fullName || ""
});

export const userFromResult = (res, currentUserStore) => {
  const { name, email, phone, payment_accounts, birthday, zip } = res.data;

  const dob = getFormattedDate(new Date(birthday));

  const [firstName, lastName] = name.split(" ");

  currentUserStore
    .setFirstName(firstName)
    .setLastName(lastName)
    .setEmail(email)
    .setPhone(phone)
    .setBirthday(dob)
    .setPaymentAccounts(payment_accounts)
    .setZip(zip);
};
