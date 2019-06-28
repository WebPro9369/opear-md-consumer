/* eslint-disable import/no-unresolved */
import { types } from "mobx-state-tree";
import { VisitsStore } from "@store/visits";
import { ApplicationStore } from "./app";
import { ProviderStore } from "./provider";
import { UserStore } from "./user";
import { CardStore } from "./card";

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true
  }),
  providerStore: types.optional(ProviderStore, {
    appointment: false,
    readyProviders: false,
    outstandingAppointment: false,
    providerEnRoute: false
  }),
  cardStore: types.optional(CardStore, {
    cardInfo: {
      cardNumber: "",
      expiryYear: 0,
      expiryMonth: 0,
      cvv: "",
      cardType: "",
      fullName: ""
    }
  }),
  userStore: types.optional(UserStore, {
    id: 112,
    apiKey: "",
    active: false,
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    birthday: new Date("1970-01-01"),
    acceptedTermsOfService: false,
    acceptedPrivacy: false,
    phone: "",
    payment_accounts: [],
    notificationToken: '',
    paymentMethods: [
      {
        id: 0,
        type: "Card",
        cardNumber: 19990,
        expiryYear: 10,
        expiryMonth: 11,
        cvv: 320,
        fullName: "Card Name"
      }
    ],
    visitRequest: {
      symptoms: [""],
      reason: "",
      pickedChild: 1,
      pickedAddress: 1,
      date: "",
      time: 0,
      cost: 150
    },
    cardInfo: {
      cardNumber: "",
      expiryYear: 0,
      expiryMonth: 0,
      cvv: "",
      cardType: "",
      fullName: ""
    },
    address: {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      apartment_number: "",
      latitude: "",
      longitude: ""
    }
  }),
  cardStore: types.optional(CardStore, {
    cardInfo: {
      cardNumber: "",
      expiryYear: 0,
      expiryMonth: 0,
      cvv: "",
      cardType: "",
      fullName: ""
    }
  }),
  visitsStore: types.optional(VisitsStore, {
    visits: [
      {
        id: 1,
        childId: 1,
        addressId: 1,
        reason: "reason",
        symptoms: ["fever", "stomachache"],
        appointmentTime: new Date("1970-01-01"),
        parentNotes: "note",
        paymentAmount: 100,
        avatarImg: "imgFox"
      },
      {
        id: 1,
        childId: 1,
        addressId: 1,
        reason: "alot of reasons",
        symptoms: ["super fever", "stomachache"],
        appointmentTime: new Date("2020-01-01"),
        parentNotes: "note",
        paymentAmount: 100,
        avatarImg: "imgFox"
      },
      {
        id: 1,
        childId: 2,
        addressId: 1,
        reason: "reason",
        symptoms: ["fever", "stomachache"],
        appointmentTime: new Date("1970-01-01"),
        parentNotes: "note",
        paymentAmount: 100,
        avatarImg: "imgDog"
      }
    ]
  })
});

export const mainStore = MainStore.create();
