/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { formatCardInfo } from "../../utils";

export const UserStore = types
  .model("UserStore", {
    name: types.string,
    email: types.string,
    birthday: types.Date,
    cardInfo: types.model({
      cardNumber: types.string,
      expiryYear: types.number,
      expiryMonth: types.number,
      cvv: types.string,
      cardType: types.string,
      fullName: types.string
    })
  })
  .actions(self => ({
    setName(value) {
      self.name = value;
    },
    setEmail(value) {
      self.email = value;
    },
    setBirthday(value) {
      self.birthday = value;
    },
    setCardInfo(value) {
      self.cardInfo = {
        ...self.cardInfo,
        ...formatCardInfo(value)
      };
    }
  }));
