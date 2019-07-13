/* eslint-disable import/no-unresolved */
import { types } from "mobx-state-tree";
import { VisitsStore } from "@store/visits";
import { ApplicationStore } from "./app";
import { ProviderStore } from "./provider";
import { UserStore } from "./user";
import { CardStore } from "./card";
import { VisitRequestStore } from "./visit-request";

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
    email: "",
    avatar: "",
    birthday: new Date("1970-01-01"),
    accepted_terms_of_service: false,
    accepted_privacy: false,
    phone: "",
    payment_accounts: [],
    notification_token: "",
    address: {
      id: -1,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: ""
    }
  }),
  visitsStore: types.optional(VisitsStore, {
    visits: []
  }),
  visitRequestStore: types.optional(VisitRequestStore, {
    symptoms: [""],
    reason: "",
    pickedChild: 1,
    pickedAddress: 1,
    date: "",
    time: 0,
    cost: 150
  })
});

export const mainStore = MainStore.create();
