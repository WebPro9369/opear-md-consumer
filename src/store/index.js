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
    outstandingAppointment: true
  }),
  userStore: types.optional(UserStore, {
    id: 94,
    apiKey: "EHzFacI31rswn6yRGxQImQtt",
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    birthday: new Date("1970-01-01"),
    phone: "7177776666",
    paymentMethods: [{
      id:0, type:"Card", cardNumber:0, expiryYear:0, expiryMonth:0, cvv:0, fullName:""
    }],
    children:[
      { id: 1, name: "Benjamin", age: 6, avatarImg: "imgDog"},
      { id: 2, name: "Audrey", age: 8, avatarImg: "imgFox"},
      { id: 3, name: "Tara", age: 12, avatarImg: "imgTiger"}
    ],
    visitAddresses:[
      { id: 1, name: "Place", address: "123 street"},
      { id: 2, name: "My House", address: "123 road"},
      { id: 3, name: "Mom's House", address: "123 avenue"}
    ],
    visitRequest: {
      symptoms: [""],
      pickedChild: 0,
      pickedAddress: 0,
      date: "",
      time: 0
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
  childStore: types.optional(ChildStore, {
    genderIndex: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    birthHistory: "",
    surgicalHistory: "",
    currentMedications: "",
    hospitalizations: "",
    currentMedicalConditions: "",
    allergies: [""]
  }),
  visitsStore: types.optional(VisitsStore, {
    visits: [{
      id: 0,
      childId: 0,
      addressId: 0,
      reason: "",
      symptoms: [""],
      appointmentTime: new Date("1970-01-01"),
      parentNotes: "",
      paymentAmount: 0
    }]
  })
});

export const mainStore = MainStore.create();
