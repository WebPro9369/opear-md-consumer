/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { setAuthentication } from "@services/authentication";
import { formatCardInfo } from "@utils";
import AddressStore from "@store/address";
// import ChildStore from "@store/child";

const PaymentAccountStore = types
  .model("PaymentAccountStore", {
    token_id: types.maybeNull(types.string),
    last4: types.maybeNull(types.string)
  })
  .actions(self => ({
    setTokenId(value) {
      self.token_id = value;
      return self;
    },
    setLast4(value) {
      self.last4 = value;
      return self;
    }
  }));

export const UserStore = types
  .model("UserStore", {
    id: types.number,
    apiKey: types.string,
    active: types.boolean,
    name: types.string,
    email: types.string,
    password: types.optional(types.string, ""),
    birthday: types.Date,
    phone: types.string,
    acceptedPrivacy: types.boolean,
    acceptedTermsOfService: types.boolean,
    payment_accounts: types.array(PaymentAccountStore),
    paymentMethods: types.array(
      types.model({
        id: types.number,
        type: types.string,
        paypalEmail: types.optional(types.string, ""),
        cardNumber: types.optional(types.number, 0),
        expiryYear: types.optional(types.number, 0),
        expiryMonth: types.optional(types.number, 0),
        cvv: types.optional(types.number, 0),
        cardType: types.optional(types.string, ""),
        fullName: types.optional(types.string, "")
      })
    ),
    addresses: types.array(
      types.model({
        id: types.number,
        name: types.string,
        street: types.string,
        city: types.string,
        state: types.optional(types.string, ""),
        zip: types.string
      })
    ),
    children: types.array(
      types.model({
        id: types.number,
        age: types.number,
        gender: types.string,
        name: types.string,
        birthDate: types.Date,
        birthHistory: types.optional(types.string, ""),
        surgicalHistory: types.optional(types.string, ""),
        currentMedications: types.optional(types.string, ""),
        hospitalizations: types.optional(types.string, ""),
        currentMedicalConditions: types.optional(types.string, ""),
        allergies: types.array(types.string, ""),
        avatarImageIndex: types.number
      })
    ),
    visitRequest: types.model({
      symptoms: types.array(types.string, ""),
      pickedChild: types.number,
      pickedAddress: types.number,
      date: types.string,
      time: types.number,
      cost: types.number
    }),
    cardInfo: types.model({
      cardNumber: types.string,
      expiryYear: types.number,
      expiryMonth: types.number,
      cvv: types.string,
      cardType: types.string,
      fullName: types.string
    }),
    address: types.optional(AddressStore, {
      name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      apartment_number: "",
      latitude: "",
      longitude: ""
    })
  })
  .actions(self => ({
    setID(value) {
      self.id = value;
      return self;
    },
    setAPIKey(value) {
      self.apiKey = value;
      return self;
    },
    setActive(value) {
      self.active = value;
      return self;
    },
    setAuthentication({ id, apiKey }) {
      self.setID(id).setAPIKey(apiKey);
      setAuthentication({ id, apiKey });
      return self;
    },
    setPassword(value) {
      self.password = value;
      return self;
    },
    setZip(value) {
      self.zip = value;
      return self;
    },
    setName(value) {
      self.name = value;
      return self;
    },
    setEmail(value) {
      self.email = value;
      return self;
    },
    setPhone(value) {
      self.phone = value;
      return self;
    },
    setBirthday(value) {
      self.birthday = value;
      return self;
    },
    setCardInfo(value) {
      self.cardInfo = {
        ...self.cardInfo,
        ...formatCardInfo(value)
      };
      return self;
    },
    addPaymentMethod(value) {
      self.paymentMethods.push(value);
      return self;
    },
    setPaymentMethods(value) {
      self.paymentMethods.replace(value);
      return self;
    },
    setPaymentMethod(index, value) {
      self.paymentMethods[index] = value;
      return self;
    },
    addChild(value) {
      // console.tron.log(value);
      self.children.push(value);
      return self;
    },
    setVisitRequest(value) {
      self.visitRequest = value;
      return self;
    },
    setVisitRequestSymptoms(value) {
      self.visitRequest.symptoms.replace(value);
      return self;
    },
    setVisitRequestPickedChild(value) {
      self.visitRequest.pickedChild = value;
      return self;
    },
    setVisitRequestPickedAddress(value) {
      self.visitRequest.pickedAddress = value;
      return self;
    },
    setVisitRequestDateTime(date, time) {
      self.visitRequest.date = date;
      self.visitRequest.time = time;
      return self;
    },
    setAcceptedPrivacy(value) {
      self.acceptedPrivacy = value;
      return self;
    },
    setAcceptedTermsOfService(value) {
      self.acceptedTermsOfService = value;
      return self;
    },
    setChild(index, value) {
      self.children[index] = value;
      return self;
    },
    addAddress(value) {
      // console.tron.log(value);
      self.addresses.push(value);
      return self;
    },
    setAddresses(value) {
      self.addresses.replace(value);
      return self;
    },
    setChildren(value) {
      self.children.replace(value);
      return self;
    },
    setPaymentAccounts(value) {
      self.payment_accounts = value;
      return self;
    },
    setPaymentAccount(value, index) {
      self.payment_accounts[index] = value;
      return self;
    },
    addPaymentAccount(value) {
      self.payment_accounts.push(value);
      return self;
    }
  }));
