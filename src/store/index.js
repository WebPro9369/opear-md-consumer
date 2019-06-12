import { types } from "mobx-state-tree";
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
    outstandingAppointment: true
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
  currentUserStore: types.optional(UserStore, {
    id: 0,
    apiKey: "",
    name: "",
    email: "",
    phone: "",
    birthday: new Date("1970-01-01"),
    payment_accounts: []
  })
});

export const mainStore = MainStore.create();
