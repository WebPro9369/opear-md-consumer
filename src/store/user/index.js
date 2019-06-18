/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { setAuthentication } from "@services/authentication";

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
    password: types.optional(types.string, ''),
    email: types.string,
    firstName: types.string,
    lastName: types.string,
    phone: types.string,
    birthday: types.Date,
    zip: types.string,
    payment_accounts: types.array(PaymentAccountStore)
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
    setAuthentication({ id, apiKey}) {
      self.setID(id).setAPIKey(apiKey);
      setAuthentication({ id, apiKey});

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
    setEmail(value) {
      self.email = value;
      return self;
    },
    setFirstName(value) {
      self.firstName = value;
      return self;
    },
    setLastName(value) {
      self.lastName = value;
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
