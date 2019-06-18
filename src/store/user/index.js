/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { formatCardInfo } from "@utils";
import AddressStore from "@store/address";

export const UserStore = types
  .model("UserStore", {
    id: types.number,
    apiKey: types.string,
    name: types.string,
    email: types.string,
    password: types.optional(types.string, ''),
    birthday: types.Date,
    phone: types.string,
    cardInfo: types.model({
      cardNumber: types.string,
      expiryYear: types.number,
      expiryMonth: types.number,
      cvv: types.string,
      cardType: types.string,
      fullName: types.string
    }),
    address: types.optional(AddressStore, {
      name: '',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      apartment_number: '',
      latitude: '',
      longitude: ''

    })
  })
  .actions(self => ({
    setID(value) {
      self.id = value;
    },
    setAPIKey(value) {
      sel.apiKey = value;
    },
    setAuthentication({ id, apiKey}) {
      self.setID(id).setAPIKey(apiKey);
    },
    setName(value) {
      self.name = value;
    },
    setEmail(value) {
      self.email = value;
    },
    setPassword(value) {
      self.password = value;
    },
    setBirthday(value) {
      self.birthday = value;
    },
    setPhone(value) {
      self.phone = value;
    },
    setCardInfo(value) {
      self.cardInfo = {
        ...self.cardInfo,
        ...formatCardInfo(value)
      };
    }
  }));
