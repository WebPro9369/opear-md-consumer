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
    acceptedPrivacy: types.boolean,
    acceptedTermsOfService: types.boolean,
    paymentMethods: types.array (
      types.model({
        id: types.number,
        type: types.string,
        paypalEmail: types.optional(types.string, ''),
        cardNumber: types.optional(types.number, 0),
        expiryYear: types.optional(types.number, 0),
        expiryMonth: types.optional(types.number, 0),
        cvv: types.optional(types.number, 0),
        cardType: types.optional(types.string, ''),
        fullName: types.optional(types.string, '')
      })
    ),
    visitAddresses: types.array (
      types.model({
        id: types.number,
        name: types.string,
        address: types.string
      })
    ),
    children: types.array (
      types.model({
        id: types.number,
        name: types.string,
        age: types.number,
        avatarImg: types.optional(types.string,'')
      })
    ),
    visitRequest: types.model ({
      symptoms: types.array (types.string,''),
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
    setZip(value) {
      self.address.zip_code = value
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
    },
    addPaymentMethod(value) {
      self.paymentMethods.push(value);
    },
    setPaymentMethods(value) {
      self.paymentMethods.replace(value);
    },
    setPaymentMethod(index,value) {
      self.paymentMethods[index] = value;
    },
    addChild(value) {
      self.children.push(value);
    },
    setVisitRequest(value) {
      self.visitRequest = value;
    },
    setVisitRequestSymptoms(value) {
      self.visitRequest.symptoms.replace(value);
    },
    setVisitRequestPickedChild(value) {
      self.visitRequest.pickedChild = value;
    },
    setVisitRequestPickedAddress(value) {
      self.visitRequest.pickedAddress = value;
    },
    setVisitRequestDateTime(date, time) {
      self.visitRequest.date = date;
      self.visitRequest.time = time;
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
      self.children[index].replace(value);
    },
    addVisitAddress(value) {
      self.visitAddresses.push(value);
    },
    setVisitAddresses(value) {
      self.visitAddresses.replace(value);
    },
    setChildren(value) {
      self.children.replace(value);
    }
  }));
