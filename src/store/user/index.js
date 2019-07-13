/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { setAuthentication } from "@services/authentication";
import AddressStore from "@store/address";
import ChildStore from "../child";
// import ChildStore from "@store/child";

const PaymentAccountStore = types
  .model("PaymentAccountStore", {
    id: types.maybeNull(types.number),
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
    accepted_privacy: types.boolean,
    accepted_terms_of_service: types.boolean,
    avatar: types.string,
    payment_accounts: types.array(PaymentAccountStore),
    notification_token: types.string,
    addresses: types.array(AddressStore, {
      id: -1,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: ""
    }),
    children: types.array(ChildStore, {
      id: -1,
      gender: "",
      avatar_image_index: 0,
      first_name: "",
      last_name: "",
      dob: "01/01/1900",
      surgical_history: "",
      current_medications: "",
      birth_history: "",
      hospitalizations: "",
      current_medical_conditions: "",
      allergies: ""
    }),
    address: types.optional(AddressStore, {
      id: -1,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: ""
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
    setAvatar(value) {
      self.avatar = value;
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
    addChild(value) {
      // console.tron.log(value);
      self.children.push(value);
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
    setAddress(value, index) {
      if (!(index > -1)) {
        index = self.addresses.length - 1;
      }
      self.addresses[index] = value;
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
    },
    setNotificationToken(value) {
      self.notificationToken = value;
      return self;
    },
  }));
