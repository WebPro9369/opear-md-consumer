/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ProviderStore = types
  .model("ProviderStore", {
    appointment: types.boolean,
    readyProviders: types.boolean,
    outstandingAppointment: types.boolean
  })
  .actions(self => ({
    setAppointment(value) {
      self.appointment = value;
    },
    setReadyProviders(value) {
      self.readyProviders = value;
    },
    setOutstandingAppointment(value) {
      self.outstandingAppointment = value;
    }
  }));

// export default ProviderStore;

// class ProviderState {
//   @persist("object") @observable providerData = {
//     appointment: null,
//     readyProviders: null,
//     outstandingAppointment: null
//   };

//   @action setAppointment(value) {
//     this.providerData.appointment = value;
//   }

//   @action setReadyProviders(value) {
//     this.providerData.readyProviders = value;
//   }

//   @action setOutstandingAppointment(value) {
//     this.providerData.outstandingAppointment = value;
//   }
// }

// const hydrate = create({
//   storage: AsyncStorage,
//   jsonify: true
// });

// const providerSingleton = new ProviderState();
// export default providerSingleton;

// hydrate("providerData", providerSingleton, {
//   providerData: {
//     appointment: null,
//     readyProviders: null,
//     outstandingAppointment: true
//   }
// }).then(() => {
//   // eslint-disable-next-line no-console
//   console.log("Hydrated: providerData");
// });
