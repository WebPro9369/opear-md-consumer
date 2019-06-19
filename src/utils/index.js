export const formatCardInfo = data => ({
  cardNumber: data.cardNumber || "",
  expiryYear: data.expiryYear || 0,
  expiryMonth: data.expiryMonth || 0,
  cvv: data.cvv || "",
  cardType: data.cardType || "",
  fullName: data.fullName || ""
});

export const getAge = birthDate => {
  console.tron.log(birthDate);
  var birthDateDate = new Date(birthDate);
  console.tron.log(birthDateDate);
  var currentDate = new Date();
  var diffDate = currentDate-birthDateDate;
  var age = Math.floor(diffDate/31557600000);
  console.tron.log(age);
  return age;
});
