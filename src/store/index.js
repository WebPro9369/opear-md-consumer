import { types } from "mobx-state-tree";
import { ApplicationStore } from "./app";
import { ProviderStore } from "./provider";
import { UserStore } from "./user";

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true
  }),
  providerStore: types.optional(ProviderStore, {
    appointment: false,
    readyProviders: false,
    outstandingAppointment: true
  }),
  userStore: types.optional(UserStore, {
    id: 0,
    apiKey: "",
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    birthday: new Date("1970-01-01"),
    phone: "7177776666",
    cardInfo: {
      cardNumber: "",
      expiryYear: 0,
      expiryMonth: 0,
      cvv: "",
      cardType: "",
      fullName: ""
    }
  })
});

export const mainStore = MainStore.create();
