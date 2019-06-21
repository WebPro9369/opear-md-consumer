import { types } from "mobx-state-tree";
import { ApplicationStore } from "./app";
import { ProviderStore } from "./provider";
import { UserStore } from "./user";
import { ChildStore } from "@store/child";
import { VisitsStore } from "@store/visits";

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true
  }),
  providerStore: types.optional(ProviderStore, {
    appointment: false,
    readyProviders: false,
    outstandingAppointment: true,
    providerEnRoute: false
  }),
  userStore: types.optional(UserStore, {
    id: 112,
    apiKey: "",
    active: false,
    name: "",
    email: "",
    birthday: new Date("1970-01-01"),
    phone: "",
    paymentMethods: [{
      id:0, type:"Card", cardNumber:19990, expiryYear:10, expiryMonth:11, cvv:320, fullName:"Card Name"
    }],
    visitRequest: {
      symptoms: [""],
      pickedChild: 1,
      pickedAddress: 1,
      date: "",
      time: 0,
      cost: 0
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
      name: "Name",
      street: "street",
      city: "city",
      state: "state",
      zip_code: "zip",
      apartment_number: "apartment",
      latitude: "lat",
      longitude: "long"
    }
  }),
  visitsStore: types.optional(VisitsStore, {
    visits: [
      {
        id: 1,
        childId: 1,
        addressId: 1,
        reason: "reason",
        symptoms: ['fever','stomachache'],
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
        symptoms: ['super fever','stomachache'],
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
        symptoms: ['fever','stomachache'],
        appointmentTime: new Date("1970-01-01"),
        parentNotes: "note",
        paymentAmount: 100,
        avatarImg: "imgDog"
      }
    ]
  })
});

export const mainStore = MainStore.create();
