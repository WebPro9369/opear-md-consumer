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
